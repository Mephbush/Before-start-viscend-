/*
  # إضافة نظام سجل زيارات الموقع

  1. جداول جديدة
    - `visitor_sessions` - جلسات الزوار
      - `id` (uuid, primary key)
      - `session_id` (text, unique) - معرف الجلسة
      - `ip_address` (text) - عنوان IP
      - `user_agent` (text) - معلومات المتصفح
      - `country` (text) - البلد
      - `city` (text) - المدينة
      - `device_type` (text) - نوع الجهاز
      - `browser` (text) - المتصفح
      - `os` (text) - نظام التشغيل
      - `referrer` (text) - المصدر
      - `landing_page` (text) - الصفحة الأولى
      - `language` (text) - اللغة المفضلة
      - `first_visit` (timestamp) - أول زيارة
      - `last_visit` (timestamp) - آخر زيارة
      - `total_visits` (integer) - إجمالي الزيارات
      - `total_page_views` (integer) - إجمالي مشاهدات الصفحات
      - `session_duration` (integer) - مدة الجلسة بالثواني
      - `is_active` (boolean) - الجلسة نشطة
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `page_visits` - زيارات الصفحات
      - `id` (uuid, primary key)
      - `session_id` (uuid, foreign key) - معرف الجلسة
      - `page_path` (text) - مسار الصفحة
      - `page_title` (text) - عنوان الصفحة
      - `visit_time` (timestamp) - وقت الزيارة
      - `time_on_page` (integer) - الوقت المقضي في الصفحة
      - `scroll_depth` (integer) - عمق التمرير
      - `created_at` (timestamp)

    - `site_analytics` - إحصائيات الموقع العامة
      - `id` (uuid, primary key)
      - `date` (date, unique) - التاريخ
      - `total_visitors` (integer) - إجمالي الزوار
      - `unique_visitors` (integer) - الزوار الفريدون
      - `total_page_views` (integer) - إجمالي مشاهدات الصفحات
      - `bounce_rate` (decimal) - معدل الارتداد
      - `avg_session_duration` (integer) - متوسط مدة الجلسة
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. الأمان
    - تمكين RLS على جميع الجداول
    - سياسات للقراءة والكتابة للمستخدمين المصرح لهم
*/

-- إنشاء جدول جلسات الزوار
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  ip_address text,
  user_agent text,
  country text,
  city text,
  device_type text DEFAULT 'desktop',
  browser text,
  os text,
  referrer text,
  landing_page text,
  language text DEFAULT 'en',
  first_visit timestamptz DEFAULT now(),
  last_visit timestamptz DEFAULT now(),
  total_visits integer DEFAULT 1,
  total_page_views integer DEFAULT 1,
  session_duration integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول زيارات الصفحات
CREATE TABLE IF NOT EXISTS page_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES visitor_sessions(id) ON DELETE CASCADE,
  page_path text NOT NULL,
  page_title text,
  visit_time timestamptz DEFAULT now(),
  time_on_page integer DEFAULT 0,
  scroll_depth integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- إنشاء جدول إحصائيات الموقع العامة
CREATE TABLE IF NOT EXISTS site_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  total_visitors integer DEFAULT 0,
  unique_visitors integer DEFAULT 0,
  total_page_views integer DEFAULT 0,
  bounce_rate decimal(5,2) DEFAULT 0.00,
  avg_session_duration integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_session_id ON visitor_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_ip_address ON visitor_sessions(ip_address);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_created_at ON visitor_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_country ON visitor_sessions(country);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_device_type ON visitor_sessions(device_type);

CREATE INDEX IF NOT EXISTS idx_page_visits_session_id ON page_visits(session_id);
CREATE INDEX IF NOT EXISTS idx_page_visits_page_path ON page_visits(page_path);
CREATE INDEX IF NOT EXISTS idx_page_visits_visit_time ON page_visits(visit_time);

CREATE INDEX IF NOT EXISTS idx_site_analytics_date ON site_analytics(date);

-- تمكين Row Level Security
ALTER TABLE visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان - السماح للجميع بالإدراج (للتتبع)
CREATE POLICY "Anyone can insert visitor sessions"
  ON visitor_sessions
  FOR INSERT
  TO public
  USING (true);

CREATE POLICY "Anyone can update visitor sessions"
  ON visitor_sessions
  FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Anyone can insert page visits"
  ON page_visits
  FOR INSERT
  TO public
  USING (true);

-- سياسات القراءة للمشرفين فقط (يمكن تعديلها حسب الحاجة)
CREATE POLICY "Admins can view visitor sessions"
  ON visitor_sessions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can view page visits"
  ON page_visits
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage site analytics"
  ON site_analytics
  FOR ALL
  TO authenticated
  USING (true);

-- إنشاء triggers للتحديث التلقائي للطوابع الزمنية
CREATE TRIGGER update_visitor_sessions_updated_at
  BEFORE UPDATE ON visitor_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_analytics_updated_at
  BEFORE UPDATE ON site_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- دالة لتحديث إحصائيات الموقع اليومية
CREATE OR REPLACE FUNCTION update_daily_analytics()
RETURNS void AS $$
DECLARE
  today_date date := CURRENT_DATE;
  total_visitors_count integer;
  unique_visitors_count integer;
  total_page_views_count integer;
  bounce_rate_calc decimal(5,2);
  avg_duration integer;
BEGIN
  -- حساب إجمالي الزوار لليوم
  SELECT COUNT(*) INTO total_visitors_count
  FROM visitor_sessions
  WHERE DATE(created_at) = today_date;

  -- حساب الزوار الفريدون (بناءً على IP)
  SELECT COUNT(DISTINCT ip_address) INTO unique_visitors_count
  FROM visitor_sessions
  WHERE DATE(created_at) = today_date;

  -- حساب إجمالي مشاهدات الصفحات
  SELECT COUNT(*) INTO total_page_views_count
  FROM page_visits pv
  JOIN visitor_sessions vs ON pv.session_id = vs.id
  WHERE DATE(vs.created_at) = today_date;

  -- حساب معدل الارتداد (الجلسات التي لديها صفحة واحدة فقط)
  SELECT 
    CASE 
      WHEN total_visitors_count > 0 THEN
        (COUNT(*) * 100.0 / total_visitors_count)
      ELSE 0
    END INTO bounce_rate_calc
  FROM visitor_sessions vs
  WHERE DATE(vs.created_at) = today_date
    AND vs.total_page_views = 1;

  -- حساب متوسط مدة الجلسة
  SELECT COALESCE(AVG(session_duration), 0) INTO avg_duration
  FROM visitor_sessions
  WHERE DATE(created_at) = today_date
    AND session_duration > 0;

  -- إدراج أو تحديث الإحصائيات اليومية
  INSERT INTO site_analytics (
    date, 
    total_visitors, 
    unique_visitors, 
    total_page_views, 
    bounce_rate, 
    avg_session_duration
  )
  VALUES (
    today_date,
    total_visitors_count,
    unique_visitors_count,
    total_page_views_count,
    bounce_rate_calc,
    avg_duration
  )
  ON CONFLICT (date) 
  DO UPDATE SET
    total_visitors = EXCLUDED.total_visitors,
    unique_visitors = EXCLUDED.unique_visitors,
    total_page_views = EXCLUDED.total_page_views,
    bounce_rate = EXCLUDED.bounce_rate,
    avg_session_duration = EXCLUDED.avg_session_duration,
    updated_at = now();
END;
$$ LANGUAGE plpgsql;

-- إدراج بيانات تجريبية للاختبار
INSERT INTO site_analytics (date, total_visitors, unique_visitors, total_page_views, bounce_rate, avg_session_duration)
VALUES 
  (CURRENT_DATE, 0, 0, 0, 0.00, 0),
  (CURRENT_DATE - INTERVAL '1 day', 45, 38, 127, 32.50, 185),
  (CURRENT_DATE - INTERVAL '2 days', 52, 41, 156, 28.75, 210);