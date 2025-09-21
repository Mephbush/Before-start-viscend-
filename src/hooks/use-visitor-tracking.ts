import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VisitorData {
  sessionId: string;
  ipAddress?: string;
  userAgent: string;
  country?: string;
  city?: string;
  deviceType: string;
  browser: string;
  os: string;
  referrer: string;
  landingPage: string;
  language: string;
}

interface PageVisitData {
  sessionId: string;
  pagePath: string;
  pageTitle: string;
  visitTime: string;
}

// دالة لاستخراج معلومات المتصفح ونظام التشغيل
const getBrowserInfo = (userAgent: string) => {
  const browsers = [
    { name: 'Chrome', regex: /Chrome\/([0-9.]+)/ },
    { name: 'Firefox', regex: /Firefox\/([0-9.]+)/ },
    { name: 'Safari', regex: /Safari\/([0-9.]+)/ },
    { name: 'Edge', regex: /Edge\/([0-9.]+)/ },
    { name: 'Opera', regex: /Opera\/([0-9.]+)/ },
  ];

  for (const browser of browsers) {
    if (browser.regex.test(userAgent)) {
      return browser.name;
    }
  }
  return 'Unknown';
};

const getOSInfo = (userAgent: string) => {
  const systems = [
    { name: 'Windows', regex: /Windows/ },
    { name: 'macOS', regex: /Mac OS X/ },
    { name: 'Linux', regex: /Linux/ },
    { name: 'Android', regex: /Android/ },
    { name: 'iOS', regex: /iPhone|iPad/ },
  ];

  for (const system of systems) {
    if (system.regex.test(userAgent)) {
      return system.name;
    }
  }
  return 'Unknown';
};

const getDeviceType = (userAgent: string) => {
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
    return /iPad/.test(userAgent) ? 'tablet' : 'mobile';
  }
  return 'desktop';
};

// دالة لإنشاء معرف جلسة فريد
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// دالة لحفظ معرف الجلسة في localStorage
const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem('visitor_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('visitor_session_id', sessionId);
  }
  return sessionId;
};

export const useVisitorTracking = () => {
  const sessionStartTime = useRef<number>(Date.now());
  const currentPageStartTime = useRef<number>(Date.now());
  const sessionId = useRef<string>('');
  const hasTrackedSession = useRef<boolean>(false);

  // تتبع الجلسة الأولى
  useEffect(() => {
    if (hasTrackedSession.current) return;

    const trackVisitorSession = async () => {
      try {
        sessionId.current = getOrCreateSessionId();
        const userAgent = navigator.userAgent;
        
        const visitorData: VisitorData = {
          sessionId: sessionId.current,
          userAgent,
          deviceType: getDeviceType(userAgent),
          browser: getBrowserInfo(userAgent),
          os: getOSInfo(userAgent),
          referrer: document.referrer || 'direct',
          landingPage: window.location.pathname,
          language: navigator.language || 'en',
        };

        // محاولة الحصول على معلومات الموقع الجغرافي (اختياري)
        try {
          const geoResponse = await fetch('https://ipapi.co/json/');
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            visitorData.country = geoData.country_name;
            visitorData.city = geoData.city;
            visitorData.ipAddress = geoData.ip;
          }
        } catch (error) {
          console.log('Could not fetch geo data:', error);
        }

        // التحقق من وجود الجلسة وتحديثها أو إنشاء جديدة
        const { data: existingSession } = await supabase
          .from('visitor_sessions')
          .select('*')
          .eq('session_id', sessionId.current)
          .single();

        if (existingSession) {
          // تحديث الجلسة الموجودة
          await supabase
            .from('visitor_sessions')
            .update({
              last_visit: new Date().toISOString(),
              total_visits: existingSession.total_visits + 1,
              total_page_views: existingSession.total_page_views + 1,
              is_active: true,
            })
            .eq('session_id', sessionId.current);
        } else {
          // إنشاء جلسة جديدة
          await supabase
            .from('visitor_sessions')
            .insert([visitorData]);
        }

        hasTrackedSession.current = true;
      } catch (error) {
        console.error('Error tracking visitor session:', error);
      }
    };

    trackVisitorSession();
  }, []);

  // تتبع زيارات الصفحات
  const trackPageVisit = async (pagePath: string, pageTitle: string) => {
    if (!sessionId.current) return;

    try {
      const pageVisitData: PageVisitData = {
        sessionId: sessionId.current,
        pagePath,
        pageTitle,
        visitTime: new Date().toISOString(),
      };

      // البحث عن الجلسة بمعرف الجلسة
      const { data: session } = await supabase
        .from('visitor_sessions')
        .select('id')
        .eq('session_id', sessionId.current)
        .single();

      if (session) {
        await supabase
          .from('page_visits')
          .insert([{
            session_id: session.id,
            page_path: pagePath,
            page_title: pageTitle,
            visit_time: new Date().toISOString(),
          }]);

        // تحديث عدد مشاهدات الصفحات في الجلسة
        await supabase
          .from('visitor_sessions')
          .update({
            total_page_views: supabase.rpc('increment_page_views', { session_uuid: session.id }),
            last_visit: new Date().toISOString(),
          })
          .eq('id', session.id);
      }

      currentPageStartTime.current = Date.now();
    } catch (error) {
      console.error('Error tracking page visit:', error);
    }
  };

  // تتبع مدة الجلسة عند مغادرة الصفحة
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (!sessionId.current) return;

      const sessionDuration = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      const timeOnPage = Math.floor((Date.now() - currentPageStartTime.current) / 1000);

      try {
        const { data: session } = await supabase
          .from('visitor_sessions')
          .select('id')
          .eq('session_id', sessionId.current)
          .single();

        if (session) {
          // تحديث مدة الجلسة
          await supabase
            .from('visitor_sessions')
            .update({
              session_duration: sessionDuration,
              is_active: false,
            })
            .eq('id', session.id);

          // تحديث الوقت المقضي في الصفحة الحالية
          await supabase
            .from('page_visits')
            .update({
              time_on_page: timeOnPage,
            })
            .eq('session_id', session.id)
            .order('created_at', { ascending: false })
            .limit(1);
        }
      } catch (error) {
        console.error('Error updating session duration:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return { trackPageVisit };
};

// دالة مساعدة لتحديث الإحصائيات اليومية
export const updateDailyAnalytics = async () => {
  try {
    await supabase.rpc('update_daily_analytics');
  } catch (error) {
    console.error('Error updating daily analytics:', error);
  }
};