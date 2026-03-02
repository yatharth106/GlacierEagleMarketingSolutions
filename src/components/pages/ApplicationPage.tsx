import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    arrRange: '',
    revenueChallenge: '',
    emailPlatform: '',
    crm: '',
    leadVolume: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const firstErrorRef = useRef<HTMLDivElement>(null);

  // Check for test mode in URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const testMode = params.get('testMode') === 'true';
    setIsTestMode(testMode);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company Name is required';
    }
    if (!formData.arrRange) {
      newErrors.arrRange = 'Annual Recurring Revenue Range is required';
    }
    if (!formData.revenueChallenge.trim()) {
      newErrors.revenueChallenge = 'Primary Revenue Challenge is required';
    }
    if (!formData.emailPlatform) {
      newErrors.emailPlatform = 'Current Email Platform is required';
    }
    if (!formData.crm.trim()) {
      newErrors.crm = 'CRM Used is required';
    }
    if (!formData.leadVolume) {
      newErrors.leadVolume = 'Monthly Trial / Lead Volume is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error field after a brief delay to ensure DOM is updated
      setTimeout(() => {
        firstErrorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 0);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  if (isSubmitted) {
    return (
      <PageLayout>
        <section className="w-full bg-navy-dark pt-32 pb-32">
          <div className="max-w-[100rem] mx-auto px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-2xl mx-auto text-center"
            >
              {isTestMode && (
                <div className="mb-8 p-4 bg-emerald-forest/10 border border-emerald-forest rounded-lg">
                  <Badge className="bg-emerald-forest text-ivory mb-3">Test Mode</Badge>
                  <p className="text-sm font-paragraph text-ivory-primary">
                    This is a test submission. No live business process was triggered.
                  </p>
                </div>
              )}
              <h1 className="text-5xl font-heading text-ivory-primary mb-8">
                Application Received
              </h1>
              <p className="text-lg font-paragraph text-ivory-primary mb-8">
                Thank you for your interest in Glacier Eagle. We review all applications carefully and will respond within 3-5 business days.
              </p>
              <p className="text-base font-paragraph text-ivory-primary opacity-70">
                Limited engagements accepted quarterly.
              </p>
              {isTestMode && (
                <div className="mt-12 pt-8 border-t border-ivory-primary/20">
                  <p className="text-sm font-paragraph text-ivory-primary opacity-70 mb-4">
                    Submitted Data (Test Mode):
                  </p>
                  <div className="bg-charcoal/5 p-6 rounded-lg text-left space-y-2">
                    <p className="text-sm font-paragraph"><span className="font-semibold">Company:</span> {formData.companyName}</p>
                    <p className="text-sm font-paragraph"><span className="font-semibold">ARR Range:</span> {formData.arrRange}</p>
                    <p className="text-sm font-paragraph"><span className="font-semibold">Email Platform:</span> {formData.emailPlatform}</p>
                    <p className="text-sm font-paragraph"><span className="font-semibold">CRM:</span> {formData.crm}</p>
                    <p className="text-sm font-paragraph"><span className="font-semibold">Lead Volume:</span> {formData.leadVolume}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="w-full bg-navy-dark pt-32 pb-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <h1 className="text-5xl md:text-6xl font-heading text-ivory-primary text-center">
                Request a Private Revenue Audit
              </h1>
              {isTestMode && <Badge className="bg-emerald-forest text-ivory">Test Mode</Badge>}
            </div>
            <p className="text-lg font-paragraph text-ivory-primary mb-12 text-center">
              Complete this application to be considered for engagement. We review all submissions and respond within 3-5 business days.
            </p>

            {isTestMode && (
              <div className="mb-8 p-4 bg-emerald-forest/10 border border-emerald-forest rounded-lg">
                <p className="text-sm font-paragraph text-ivory-primary">
                  <span className="font-semibold">🧪 Test Mode Active:</span> Submitting this form will simulate a successful submission without triggering any live business processes.
                </p>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-7 bg-slate-deep p-12">
              {Object.keys(errors).length > 0 && (
                <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                  <p className="text-sm font-paragraph text-destructive font-semibold">
                    Please fill out all required fields
                  </p>
                </div>
              )}

              <div className="space-y-3" ref={Object.keys(errors).length > 0 && errors.companyName ? firstErrorRef : undefined}>
                <Label htmlFor="companyName" className="text-xs font-label uppercase tracking-widest text-gold-antique">
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => {
                    setFormData({ ...formData, companyName: e.target.value });
                    if (errors.companyName) {
                      setErrors({ ...errors, companyName: '' });
                    }
                  }}
                  className={`w-full bg-card-bg border text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors px-4 py-3 rounded-sm font-paragraph text-base ${errors.companyName ? 'border-destructive focus:border-destructive' : 'border-divider'}`}
                  aria-invalid={!!errors.companyName}
                  placeholder="Your company name"
                />
                {errors.companyName && (
                  <p className="text-sm text-destructive font-paragraph">{errors.companyName}</p>
                )}
              </div>

              <div className="space-y-3" ref={Object.keys(errors).length > 0 && errors.arrRange && !errors.companyName ? firstErrorRef : undefined}>
                <Label htmlFor="arrRange" className="text-xs font-label uppercase tracking-widest text-gold-antique">
                  Annual Recurring Revenue Range *
                </Label>
                <Select
                  value={formData.arrRange}
                  onValueChange={(value) => {
                    setFormData({ ...formData, arrRange: value });
                    if (errors.arrRange) {
                      setErrors({ ...errors, arrRange: '' });
                    }
                  }}
                >
                  <SelectTrigger className={`w-full bg-card-bg border text-ivory-primary focus:border-gold-antique focus:outline-none transition-colors px-4 py-3 rounded-sm font-paragraph text-base ${errors.arrRange ? 'border-destructive focus:border-destructive' : 'border-divider'}`}>
                    <SelectValue placeholder="Select ARR range" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy-dark border-divider">
                    <SelectItem value="under-500k" className="text-ivory-primary">Under $500K</SelectItem>
                    <SelectItem value="500k-1m" className="text-ivory-primary">$500K - $1M</SelectItem>
                    <SelectItem value="1m-5m" className="text-ivory-primary">$1M - $5M</SelectItem>
                    <SelectItem value="5m-10m" className="text-ivory-primary">$5M - $10M</SelectItem>
                    <SelectItem value="10m-plus" className="text-ivory-primary">$10M+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.arrRange && (
                  <p className="text-sm text-destructive font-paragraph">{errors.arrRange}</p>
                )}
              </div>

              <div className="space-y-3" ref={Object.keys(errors).length > 0 && errors.revenueChallenge && !errors.companyName && !errors.arrRange ? firstErrorRef : undefined}>
                <Label htmlFor="revenueChallenge" className="text-xs font-label uppercase tracking-widest text-gold-antique">
                  Primary Revenue Challenge *
                </Label>
                <Textarea
                  id="revenueChallenge"
                  rows={4}
                  value={formData.revenueChallenge}
                  onChange={(e) => {
                    setFormData({ ...formData, revenueChallenge: e.target.value });
                    if (errors.revenueChallenge) {
                      setErrors({ ...errors, revenueChallenge: '' });
                    }
                  }}
                  placeholder="Describe your primary revenue challenge or opportunity"
                  className={`w-full bg-card-bg border text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors px-4 py-3 rounded-sm font-paragraph text-base resize-none ${errors.revenueChallenge ? 'border-destructive focus:border-destructive' : 'border-divider'}`}
                  aria-invalid={!!errors.revenueChallenge}
                />
                {errors.revenueChallenge && (
                  <p className="text-sm text-destructive font-paragraph">{errors.revenueChallenge}</p>
                )}
              </div>

              <div className="space-y-3" ref={Object.keys(errors).length > 0 && errors.emailPlatform && !errors.companyName && !errors.arrRange && !errors.revenueChallenge ? firstErrorRef : undefined}>
                <Label htmlFor="emailPlatform" className="text-xs font-label uppercase tracking-widest text-gold-antique">
                  Current Email Platform *
                </Label>
                <Select
                  value={formData.emailPlatform}
                  onValueChange={(value) => {
                    setFormData({ ...formData, emailPlatform: value });
                    if (errors.emailPlatform) {
                      setErrors({ ...errors, emailPlatform: '' });
                    }
                  }}
                >
                  <SelectTrigger className={`w-full bg-card-bg border text-ivory-primary focus:border-gold-antique focus:outline-none transition-colors px-4 py-3 rounded-sm font-paragraph text-base ${errors.emailPlatform ? 'border-destructive focus:border-destructive' : 'border-divider'}`}>
                    <SelectValue placeholder="Select email platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy-dark border-divider">
                    <SelectItem value="klaviyo" className="text-ivory-primary">Klaviyo</SelectItem>
                    <SelectItem value="hubspot" className="text-ivory-primary">HubSpot</SelectItem>
                    <SelectItem value="mailchimp" className="text-ivory-primary">Mailchimp</SelectItem>
                    <SelectItem value="marketo" className="text-ivory-primary">Marketo</SelectItem>
                    <SelectItem value="activecampaign" className="text-ivory-primary">ActiveCampaign</SelectItem>
                    <SelectItem value="other" className="text-ivory-primary">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.emailPlatform && (
                  <p className="text-sm text-destructive font-paragraph">{errors.emailPlatform}</p>
                )}
              </div>

              <div className="space-y-3" ref={Object.keys(errors).length > 0 && errors.crm && !errors.companyName && !errors.arrRange && !errors.revenueChallenge && !errors.emailPlatform ? firstErrorRef : undefined}>
                <Label htmlFor="crm" className="text-xs font-label uppercase tracking-widest text-gold-antique">
                  CRM Used *
                </Label>
                <Input
                  id="crm"
                  value={formData.crm}
                  onChange={(e) => {
                    setFormData({ ...formData, crm: e.target.value });
                    if (errors.crm) {
                      setErrors({ ...errors, crm: '' });
                    }
                  }}
                  placeholder="e.g., Salesforce, HubSpot, Pipedrive"
                  className={`w-full bg-card-bg border text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors px-4 py-3 rounded-sm font-paragraph text-base ${errors.crm ? 'border-destructive focus:border-destructive' : 'border-divider'}`}
                  aria-invalid={!!errors.crm}
                />
                {errors.crm && (
                  <p className="text-sm text-destructive font-paragraph">{errors.crm}</p>
                )}
              </div>

              <div className="space-y-3" ref={Object.keys(errors).length > 0 && errors.leadVolume && !errors.companyName && !errors.arrRange && !errors.revenueChallenge && !errors.emailPlatform && !errors.crm ? firstErrorRef : undefined}>
                <Label htmlFor="leadVolume" className="text-xs font-label uppercase tracking-widest text-gold-antique">
                  Monthly Trial / Lead Volume *
                </Label>
                <Select
                  value={formData.leadVolume}
                  onValueChange={(value) => {
                    setFormData({ ...formData, leadVolume: value });
                    if (errors.leadVolume) {
                      setErrors({ ...errors, leadVolume: '' });
                    }
                  }}
                >
                  <SelectTrigger className={`w-full bg-card-bg border text-ivory-primary focus:border-gold-antique focus:outline-none transition-colors px-4 py-3 rounded-sm font-paragraph text-base ${errors.leadVolume ? 'border-destructive focus:border-destructive' : 'border-divider'}`}>
                    <SelectValue placeholder="Select monthly volume" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy-dark border-divider">
                    <SelectItem value="under-50" className="text-ivory-primary">Under 50</SelectItem>
                    <SelectItem value="50-100" className="text-ivory-primary">50 - 100</SelectItem>
                    <SelectItem value="100-250" className="text-ivory-primary">100 - 250</SelectItem>
                    <SelectItem value="250-500" className="text-ivory-primary">250 - 500</SelectItem>
                    <SelectItem value="500-plus" className="text-ivory-primary">500+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.leadVolume && (
                  <p className="text-sm text-destructive font-paragraph">{errors.leadVolume}</p>
                )}
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-11 py-4 border border-gold-antique text-gold-antique font-label text-xs uppercase tracking-[1.8px] hover:bg-gold-antique hover:text-navy-dark transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                </button>
                <p className="text-sm font-paragraph text-ivory-body text-center mt-4">
                  Limited engagements accepted quarterly.
                </p>
                {isTestMode && (
                  <p className="text-xs font-paragraph text-emerald-forest text-center mt-3">
                    ✓ Test mode enabled - safe to submit
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
