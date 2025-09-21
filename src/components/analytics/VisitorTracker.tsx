import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useVisitorTracking } from '@/hooks/use-visitor-tracking';

const VisitorTracker = () => {
  const location = useLocation();
  const { trackPageVisit } = useVisitorTracking();

  useEffect(() => {
    // تتبع زيارة الصفحة عند تغيير المسار
    const pageTitle = document.title || 'VisCend';
    const pagePath = location.pathname;

    trackPageVisit(pagePath, pageTitle);
  }, [location.pathname, trackPageVisit]);

  // هذا المكون لا يعرض أي شيء، فقط يتتبع الزيارات
  return null;
};

export default VisitorTracker;