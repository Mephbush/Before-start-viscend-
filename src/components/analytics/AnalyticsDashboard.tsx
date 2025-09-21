import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Eye, 
  Clock, 
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

interface AnalyticsData {
  totalVisitors: number;
  uniqueVisitors: number;
  totalPageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  deviceStats: Array<{ device: string; count: number }>;
  countryStats: Array<{ country: string; count: number }>;
  browserStats: Array<{ browser: string; count: number }>;
}

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // تحديد التاريخ بناءً على الفترة المحددة
      let dateFilter = new Date();
      if (selectedPeriod === 'week') {
        dateFilter.setDate(dateFilter.getDate() - 7);
      } else if (selectedPeriod === 'month') {
        dateFilter.setDate(dateFilter.getDate() - 30);
      }

      // جلب الإحصائيات العامة
      const { data: siteAnalytics } = await supabase
        .from('site_analytics')
        .select('*')
        .gte('date', dateFilter.toISOString().split('T')[0])
        .order('date', { ascending: false });

      // جلب إحصائيات الجلسات
      const { data: sessions } = await supabase
        .from('visitor_sessions')
        .select('*')
        .gte('created_at', dateFilter.toISOString());

      // جلب أكثر الصفحات زيارة
      const { data: pageVisits } = await supabase
        .from('page_visits')
        .select('page_path, page_title')
        .gte('created_at', dateFilter.toISOString());

      if (siteAnalytics && sessions && pageVisits) {
        // حساب الإحصائيات
        const totalVisitors = siteAnalytics.reduce((sum, day) => sum + (day.total_visitors || 0), 0);
        const uniqueVisitors = siteAnalytics.reduce((sum, day) => sum + (day.unique_visitors || 0), 0);
        const totalPageViews = siteAnalytics.reduce((sum, day) => sum + (day.total_page_views || 0), 0);
        const avgBounceRate = siteAnalytics.reduce((sum, day) => sum + (day.bounce_rate || 0), 0) / siteAnalytics.length;
        const avgSessionDuration = siteAnalytics.reduce((sum, day) => sum + (day.avg_session_duration || 0), 0) / siteAnalytics.length;

        // حساب أكثر الصفحات زيارة
        const pageViewCounts = pageVisits.reduce((acc: Record<string, number>, visit) => {
          acc[visit.page_path] = (acc[visit.page_path] || 0) + 1;
          return acc;
        }, {});

        const topPages = Object.entries(pageViewCounts)
          .map(([page, views]) => ({ page, views }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 5);

        // حساب إحصائيات الأجهزة
        const deviceCounts = sessions.reduce((acc: Record<string, number>, session) => {
          const device = session.device_type || 'unknown';
          acc[device] = (acc[device] || 0) + 1;
          return acc;
        }, {});

        const deviceStats = Object.entries(deviceCounts)
          .map(([device, count]) => ({ device, count }))
          .sort((a, b) => b.count - a.count);

        // حساب إحصائيات البلدان
        const countryCounts = sessions.reduce((acc: Record<string, number>, session) => {
          const country = session.country || 'Unknown';
          acc[country] = (acc[country] || 0) + 1;
          return acc;
        }, {});

        const countryStats = Object.entries(countryCounts)
          .map(([country, count]) => ({ country, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        // حساب إحصائيات المتصفحات
        const browserCounts = sessions.reduce((acc: Record<string, number>, session) => {
          const browser = session.browser || 'Unknown';
          acc[browser] = (acc[browser] || 0) + 1;
          return acc;
        }, {});

        const browserStats = Object.entries(browserCounts)
          .map(([browser, count]) => ({ browser, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setAnalytics({
          totalVisitors,
          uniqueVisitors,
          totalPageViews,
          bounceRate: avgBounceRate,
          avgSessionDuration,
          topPages,
          deviceStats,
          countryStats,
          browserStats,
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل الإحصائيات...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">لا توجد بيانات متاحة</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* فلاتر الفترة الزمنية */}
      <div className="flex gap-2">
        {[
          { key: 'today', label: 'اليوم' },
          { key: 'week', label: 'الأسبوع' },
          { key: 'month', label: 'الشهر' }
        ].map((period) => (
          <Badge
            key={period.key}
            variant={selectedPeriod === period.key ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedPeriod(period.key as any)}
          >
            {period.label}
          </Badge>
        ))}
      </div>

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الزوار</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalVisitors.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الزوار الفريدون</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.uniqueVisitors.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مشاهدات الصفحات</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalPageViews.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط مدة الجلسة</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(Math.round(analytics.avgSessionDuration))}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* أكثر الصفحات زيارة */}
        <Card>
          <CardHeader>
            <CardTitle>أكثر الصفحات زيارة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">#{index + 1}</span>
                    <span className="text-sm">{page.page}</span>
                  </div>
                  <Badge variant="secondary">{page.views}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* إحصائيات الأجهزة */}
        <Card>
          <CardHeader>
            <CardTitle>أنواع الأجهزة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.deviceStats.map((device) => (
                <div key={device.device} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getDeviceIcon(device.device)}
                    <span className="text-sm capitalize">{device.device}</span>
                  </div>
                  <Badge variant="secondary">{device.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* إحصائيات البلدان */}
        <Card>
          <CardHeader>
            <CardTitle>أكثر البلدان زيارة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.countryStats.map((country) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">{country.country}</span>
                  </div>
                  <Badge variant="secondary">{country.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* إحصائيات المتصفحات */}
        <Card>
          <CardHeader>
            <CardTitle>المتصفحات الأكثر استخداماً</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.browserStats.map((browser) => (
                <div key={browser.browser} className="flex items-center justify-between">
                  <span className="text-sm">{browser.browser}</span>
                  <Badge variant="secondary">{browser.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* معدل الارتداد */}
      <Card>
        <CardHeader>
          <CardTitle>معدل الارتداد</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-center">
            {analytics.bounceRate.toFixed(1)}%
          </div>
          <p className="text-sm text-muted-foreground text-center mt-2">
            نسبة الزوار الذين غادروا الموقع بعد مشاهدة صفحة واحدة فقط
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;