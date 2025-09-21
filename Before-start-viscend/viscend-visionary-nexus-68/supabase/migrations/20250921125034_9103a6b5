-- Create website_visits table to track all visits
CREATE TABLE public.website_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  page_path TEXT NOT NULL,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  session_duration INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX idx_website_visits_created_at ON public.website_visits(created_at);
CREATE INDEX idx_website_visits_page_path ON public.website_visits(page_path);
CREATE INDEX idx_website_visits_visitor_ip ON public.website_visits(visitor_ip);

-- Enable RLS
ALTER TABLE public.website_visits ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to visit stats (anonymous users can see visit counts)
CREATE POLICY "Public can view visit statistics" 
ON public.website_visits 
FOR SELECT 
USING (true);

-- Create policy for anyone to insert visit records
CREATE POLICY "Anyone can log visits" 
ON public.website_visits 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_website_visits_updated_at
BEFORE UPDATE ON public.website_visits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create a view for visit statistics
CREATE VIEW public.visit_stats AS
SELECT 
  COUNT(*) as total_visits,
  COUNT(DISTINCT visitor_ip) as unique_visitors,
  DATE(created_at) as visit_date,
  page_path
FROM public.website_visits 
GROUP BY DATE(created_at), page_path
ORDER BY visit_date DESC;
