-- Add new columns to website_visits table for comprehensive visitor tracking
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS browser_version text;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS os_version text;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS screen_width integer;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS screen_height integer;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS screen_color_depth integer;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS viewport_width integer;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS viewport_height integer;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS timezone text;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS language text;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS languages text;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS platform text;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS cookie_enabled boolean;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS online_status boolean;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS do_not_track text;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS connection_type text;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS connection_speed numeric;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS memory_used integer;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS memory_total integer;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS memory_limit integer;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS region text;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS isp text;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS latitude numeric;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS longitude numeric;
ALTER TABLE public.website_visits ADD COLUMN IF NOT EXISTS postal text;

-- Create indexes for better performance on location and device data
CREATE INDEX IF NOT EXISTS idx_website_visits_country ON public.website_visits (country);
CREATE INDEX IF NOT EXISTS idx_website_visits_city ON public.website_visits (city);
CREATE INDEX IF NOT EXISTS idx_website_visits_region ON public.website_visits (region);
CREATE INDEX IF NOT EXISTS idx_website_visits_device_type ON public.website_visits (device_type);
CREATE INDEX IF NOT EXISTS idx_website_visits_browser ON public.website_visits (browser);
CREATE INDEX IF NOT EXISTS idx_website_visits_os ON public.website_visits (os);
