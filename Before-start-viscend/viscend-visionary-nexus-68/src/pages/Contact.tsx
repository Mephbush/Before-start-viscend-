import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

const Contact = () => {
  const { language } = useOutletContext<{ language: "en" | "ar" }>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service_type: "",
    message: ""
  });

  const { toast } = useToast();

  const content = {
    en: {
      heroTitle: "Get In Touch",
      heroSubtitle: "Let's Create Something Amazing Together",
      heroDescription: "Ready to transform your vision into reality? We'd love to hear about your project and discuss how we can bring it to life.",

      formTitle: "Start Your Project",
      formDescription: "Tell us about your project requirements and we'll get back to you within 24 hours.",

      // Form fields
      nameLabel: "Full Name",
      namePlaceholder: "Enter your full name",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      companyLabel: "Company Name",
      companyPlaceholder: "Enter your company name (optional)",
      serviceLabel: "Service Type",
      servicePlaceholder: "Select service type",
      messageLabel: "Project Details",
      messagePlaceholder: "Tell us about your project, goals, timeline, and any specific requirements...",

      // Service options
      services: {
        studio: "Studio Services",
        web: "Web Solutions",
        both: "Both Studio & Web",
        other: "Other / Consultation"
      },

      submitButton: "Send Message",
      submitting: "Sending...",

      // Contact info
      contactInfoTitle: "Contact Information",
      contactInfoDescription: "Prefer to reach out directly? Here's how you can get in touch with us.",

      officeHours: "Office Hours",
      officeHoursTime: "Sunday - Thursday, 9:00 AM - 6:00 PM GMT+3 (Yemen Time)",

      // Success message
      successTitle: "Message Sent Successfully!",
      successDescription: "Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.",

      // Error message
      errorTitle: "Failed to Send Message",
      errorDescription: "There was an error sending your message. Please try again or contact us directly."
    },
    ar: {
      heroTitle: "تواصل معنا",
      heroSubtitle: "دعنا نصنع شيئا مذهلا معا",
      heroDescription: "هل أنت مستعد لتحويل رؤيتك إلى واقع؟ نحب أن نسمع عن مشروعك ونناقش كيف يمكننا تحقيقه.",
      formTitle: "ابدأ مشروعك",
      formDescription: "أخبرنا عن متطلبات مشروعك وسنعاود الاتصال بك خلال 24 ساعة.",
      nameLabel: "الاسم الكامل",
      namePlaceholder: "أدخل اسمك الكامل",
      emailLabel: "عنوان البريد الإلكتروني", 
      emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
      phoneLabel: "رقم الهاتف",
      phonePlaceholder: "أدخل رقم هاتفك",
      companyLabel: "اسم الشركة",
      companyPlaceholder: "أدخل اسم شركتك (اختياري)",
      serviceLabel: "نوع الخدمة",
      servicePlaceholder: "اختر نوع الخدمة",
      messageLabel: "تفاصيل المشروع",
      messagePlaceholder: "أخبرنا عن مشروعك وأهدافك والجدول الزمني وأي متطلبات خاصة...",
      services: {
        studio: "خدمات الاستوديو",
        web: "حلول الويب",
        both: "كلاً من الاستوديو والويب",
        other: "أخرى / استشارة"
      },
      submitButton: "إرسال الرسالة",
      submitting: "جارٍ الإرسال...",
      contactInfoTitle: "معلومات الاتصال",
      contactInfoDescription: "تفضل التواصل مباشرة؟ إليك كيفية التواصل معنا.",
      officeHours: "ساعات العمل",
      officeHoursTime: "الاحد - الخميس، 9:00 صباحا - 6:00 مساء بتوقيت اليمن (GMT+3)",
      successTitle: "تم إرسال الرسالة بنجاح!",
      successDescription: "شكرًا لك على التواصل. سيراجع فريقنا استفسارك ويعاود الاتصال بك خلال 24 ساعة.",
      errorTitle: "فشل في إرسال الرسالة",
      errorDescription: "حدث خطأ في إرسال رسالتك. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة."
    }
  };

  const t = content[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        toast({
          title: "Missing Required Fields",
          description: "Please fill in all required fields (Name, Email, Message).",
          variant: "destructive",
        });
        return;
      }

      // Insert into Supabase
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          service_type: formData.service_type || 'other',
          message: formData.message,
          preferred_language: language
        }]);

      if (error) {
        throw error;
      }

      // Success
      toast({
        title: t.successTitle,
        description: t.successDescription,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service_type: "",
        message: ""
      });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: t.errorTitle,
        description: t.errorDescription,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "hello@viscend.com",
      action: "mailto:hello@viscend.com"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+971 50 123 4567",
      action: "tel:+971501234567"
    },
    {
      icon: MapPin,
      title: "Location",
      details: language === 'ar' ? "صنعاء، اليمن" : "Sana'a, Yemen",
      action: null
    },
    {
      icon: Clock,
      title: t.officeHours,
      details: t.officeHoursTime,
      action: null
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="text-gradient-primary animate-gradient-shift bg-[length:200%_auto]">
                {t.heroTitle}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-light text-neon-secondary mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {t.heroSubtitle}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {t.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className={"grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto" + (language === 'ar' ? ' text-right' : '')}>
            {/* Contact Form */}
            <Card className="glass border-border/20 animate-slide-in-left">
              <CardHeader>
                <CardTitle className={cn("text-2xl font-bold text-neon-primary flex items-center gap-3", language === 'ar' && "flex-row-reverse text-right")}>
                  <MessageCircle className="h-6 w-6" />
                  <span>{t.formTitle}</span>
                </CardTitle>
                <p className="text-muted-foreground">
                  {t.formDescription}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      {t.nameLabel} *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="glass border-border/20 focus:border-primary/50"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      {t.emailLabel} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="glass border-border/20 focus:border-primary/50"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      {t.phoneLabel}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="glass border-border/20 focus:border-primary/50"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium">
                      {t.companyLabel}
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder={t.companyPlaceholder}
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="glass border-border/20 focus:border-primary/50"
                    />
                  </div>

                  {/* Service Type */}
                  <div className="space-y-2">
                    <Label htmlFor="service_type" className="text-sm font-medium">
                      {t.serviceLabel}
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('service_type', value)}>
                      <SelectTrigger className="glass border-border/20 focus:border-primary/50">
                        <SelectValue placeholder={t.servicePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">{t.services.studio}</SelectItem>
                        <SelectItem value="web">{t.services.web}</SelectItem>
                        <SelectItem value="both">{t.services.both}</SelectItem>
                        <SelectItem value="other">{t.services.other}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      {t.messageLabel} *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={t.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="glass border-border/20 focus:border-primary/50 min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-cinematic text-white border-none py-6 text-lg"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                        {t.submitting}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        {t.submitButton}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8 animate-slide-in-right">
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className={cn("text-2xl font-bold text-neon-secondary flex items-center gap-3", language === 'ar' && "flex-row-reverse text-right")}>
                    <Users className="h-6 w-6" />
                    <span>{t.contactInfoTitle}</span>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {t.contactInfoDescription}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div key={index} className={cn("flex items-start gap-4", language === 'ar' && "flex-row-reverse text-right")}>
                        <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {info.title}
                          </h3>
                          {info.action ? (
                            <a 
                              href={info.action}
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              {info.details}
                            </a>
                          ) : (
                            <p className="text-muted-foreground">
                              {info.details}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card className="glass border-border/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">
                      Quick Response
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We typically respond to all inquiries within 24 hours during business days. 
                    For urgent matters, feel free to call us directly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
