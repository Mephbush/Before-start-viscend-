-- Create contact inquiries table
CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_type TEXT CHECK (service_type IN ('studio', 'web', 'both', 'other')),
  message TEXT NOT NULL,
  preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'ar')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed'))
);

-- Create portfolio items table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_ar TEXT,
  description_en TEXT,
  description_ar TEXT,
  category TEXT NOT NULL CHECK (category IN ('studio', 'web')),
  service_type TEXT NOT NULL,
  image_url TEXT,
  project_url TEXT,
  technologies TEXT[],
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Create policies for contact inquiries (read-only for public)
CREATE POLICY "Anyone can insert contact inquiries" 
ON public.contact_inquiries 
FOR INSERT 
WITH CHECK (true);

-- Create policies for portfolio items (read-only for public)
CREATE POLICY "Anyone can view portfolio items" 
ON public.portfolio_items 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_portfolio_updated_at
  BEFORE UPDATE ON public.portfolio_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample portfolio items
INSERT INTO public.portfolio_items (title_en, title_ar, description_en, description_ar, category, service_type, featured, technologies) VALUES
('Cinematic Brand Film', 'فيلم العلامة التجارية السينمائي', 'A stunning brand film showcasing corporate values through cinematic storytelling.', 'فيلم علامة تجارية مذهل يعرض قيم الشركة من خلال السرد السينمائي.', 'studio', 'Brand Films', true, ARRAY['4K Cinema', 'Color Grading', 'Motion Graphics']),
('E-Commerce Platform', 'منصة التجارة الإلكترونية', 'Complete digital transformation with modern e-commerce solution.', 'تحول رقمي كامل مع حل التجارة الإلكترونية الحديث.', 'web', 'E-Commerce', true, ARRAY['React', 'Node.js', 'Stripe', 'AWS']),
('VFX Commercial', 'إعلان المؤثرات البصرية', 'High-end visual effects for automotive commercial campaign.', 'مؤثرات بصرية عالية الجودة لحملة إعلانية لشركة سيارات.', 'studio', 'VFX & CGI', false, ARRAY['3D Animation', 'Compositing', 'Particle Systems']),
('Corporate Website', 'موقع الشركة', 'Professional corporate website with advanced CMS integration.', 'موقع شركة مهني مع تكامل نظام إدارة محتوى متقدم.', 'web', 'Corporate Sites', false, ARRAY['Next.js', 'Headless CMS', 'SEO Optimization']);