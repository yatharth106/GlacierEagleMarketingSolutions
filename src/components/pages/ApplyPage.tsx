import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    arrRange: '',
    trialVolume: '',
    revenueChallenge: '',
    emailPlatform: '',
    crm: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.arrRange) {
      newErrors.arrRange = 'Please select an ARR range';
    }
    if (!formData.trialVolume.trim()) {
      newErrors.trialVolume = 'Trial volume is required';
    }
    if (!formData.revenueChallenge.trim()) {
      newErrors.revenueChallenge = 'Please describe your revenue challenge';
    }
    if (!formData.emailPlatform.trim()) {
      newErrors.emailPlatform = 'Email platform is required';
    }
    if (!formData.crm.trim()) {
      newErrors.crm = 'CRM is required';
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Your name is required';
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error field
      const formElement = e.currentTarget as HTMLFormElement;
      const firstErrorField = formElement.querySelector('[data-error="true"]') as HTMLElement;
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        companyName: '',
        arrRange: '',
        trialVolume: '',
        revenueChallenge: '',
        emailPlatform: '',
        crm: '',
        contactName: '',
        contactEmail: '',
        contactPhone: ''
      });
      setErrors({});
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-dark text-ivory-primary font-paragraph selection:bg-gold-antique selection:text-navy-dark">
      <Header />

      {/* --- Hero Section --- */}
      <section className="w-full pt-32 pb-20 bg-navy-dark">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="text-center">
            <h1 className="text-6xl md:text-7xl font-heading text-ivory-primary mb-8">
              Request a Private Revenue Audit
            </h1>
            <p className="text-xl text-ivory-primary/60 max-w-2xl mx-auto">
              Limited engagements accepted per quarter. Let's explore if we're the right fit for your revenue goals.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* --- Application Form Section --- */}
      <section id="application" className="w-full py-12 md:py-20 bg-slate-deep">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <FadeIn delay={0.1} className="bg-navy-dark border border-gold-antique/30 p-6 md:p-10">
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gold-antique/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gold-antique" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-heading text-ivory-primary mb-4">Application Received</h2>
                <p className="text-ivory-primary/70 mb-8">
                  Thank you for your interest. We'll review your application and reach out within 2-3 business days if we're a fit.
                </p>
                <p className="text-sm text-gold-antique/70">
                  In the meantime, feel free to explore our framework and case studies.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Company Information */}
                <div>
                  <h3 className="text-lg font-heading text-ivory-primary mb-4 flex items-center gap-3">
                    <span className="text-xs font-bold text-gold-antique tracking-widest uppercase">01</span>
                    Company Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className={`w-full bg-transparent border-b py-2 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                          errors.companyName ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                        }`}
                        placeholder="Your company name"
                      />
                      {errors.companyName && (
                        <p className="text-destructive text-sm mt-1">{errors.companyName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div data-error={!!errors.arrRange}>
                        <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-2">
                          Annual Recurring Revenue (ARR) *
                        </label>
                        <select
                          name="arrRange"
                          value={formData.arrRange}
                          onChange={handleChange}
                          required
                          className={`w-full bg-transparent border-b py-2 text-ivory-primary outline-none transition-colors ${
                            errors.arrRange ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                          }`}
                        >
                          <option value="" className="bg-navy-dark">Select Range</option>
                          <option value="1m-5m" className="bg-navy-dark">$1M - $5M</option>
                          <option value="5m-20m" className="bg-navy-dark">$5M - $20M</option>
                          <option value="20m-50m" className="bg-navy-dark">$20M - $50M</option>
                          <option value="50m+" className="bg-navy-dark">$50M+</option>
                        </select>
                        {errors.arrRange && (
                          <p className="text-destructive text-sm mt-1">{errors.arrRange}</p>
                        )}
                      </div>

                      <div data-error={!!errors.trialVolume}>
                        <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-2">
                          Current Trial Volume (Monthly) *
                        </label>
                        <input
                          type="text"
                          name="trialVolume"
                          value={formData.trialVolume}
                          onChange={handleChange}
                          required
                          className={`w-full bg-transparent border-b py-2 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                            errors.trialVolume ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                          }`}
                          placeholder="e.g., 500 trials/month"
                        />
                        {errors.trialVolume && (
                          <p className="text-destructive text-sm mt-1">{errors.trialVolume}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue Challenge */}
                <div>
                  <h3 className="text-lg font-heading text-ivory-primary mb-4 flex items-center gap-3">
                    <span className="text-xs font-bold text-gold-antique tracking-widest uppercase">02</span>
                    Your Revenue Challenge
                  </h3>
                  <div data-error={!!errors.revenueChallenge}>
                    <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-2">
                      Primary Revenue Challenge *
                    </label>
                    <textarea
                      name="revenueChallenge"
                      value={formData.revenueChallenge}
                      onChange={handleChange}
                      required
                      rows={3}
                      className={`w-full bg-transparent border p-3 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 resize-none ${
                        errors.revenueChallenge ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                      }`}
                      placeholder="What's your biggest revenue bottleneck? (e.g., low trial conversion, long sales cycles, etc.)"
                    />
                    {errors.revenueChallenge && (
                      <p className="text-destructive text-sm mt-1">{errors.revenueChallenge}</p>
                    )}
                  </div>
                </div>

                {/* Technology Stack */}
                <div>
                  <h3 className="text-lg font-heading text-ivory-primary mb-4 flex items-center gap-3">
                    <span className="text-xs font-bold text-gold-antique tracking-widest uppercase">03</span>
                    Technology Stack
                  </h3>
                  <div className="space-y-4">
                    <div data-error={!!errors.emailPlatform}>
                      <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-2">
                        Email Platform *
                      </label>
                      <input
                        type="text"
                        name="emailPlatform"
                        value={formData.emailPlatform}
                        onChange={handleChange}
                        required
                        className={`w-full bg-transparent border-b py-2 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                          errors.emailPlatform ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                        }`}
                        placeholder="e.g., HubSpot, Klaviyo, Marketo"
                      />
                      {errors.emailPlatform && (
                        <p className="text-destructive text-sm mt-1">{errors.emailPlatform}</p>
                      )}
                    </div>

                    <div data-error={!!errors.crm}>
                      <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-2">
                        CRM Used *
                      </label>
                      <input
                        type="text"
                        name="crm"
                        value={formData.crm}
                        onChange={handleChange}
                        required
                        className={`w-full bg-transparent border-b py-2 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                          errors.crm ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                        }`}
                        placeholder="e.g., Salesforce, Pipedrive, HubSpot"
                      />
                      {errors.crm && (
                        <p className="text-destructive text-sm mt-1">{errors.crm}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-heading text-ivory-primary mb-4 flex items-center gap-3">
                    <span className="text-xs font-bold text-gold-antique tracking-widest uppercase">04</span>
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div data-error={!!errors.contactName}>
                      <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        className={`w-full bg-transparent border-b py-2 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                          errors.contactName ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                        }`}
                        placeholder="Full name"
                      />
                      {errors.contactName && (
                        <p className="text-destructive text-sm mt-1">{errors.contactName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div data-error={!!errors.contactEmail}>
                        <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleChange}
                          required
                          className={`w-full bg-transparent border-b py-2 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                            errors.contactEmail ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                          }`}
                          placeholder="your@email.com"
                        />
                        {errors.contactEmail && (
                          <p className="text-destructive text-sm mt-1">{errors.contactEmail}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="contactPhone"
                          value={formData.contactPhone}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-gold-antique/30 py-2 text-ivory-primary focus:border-gold-antique outline-none transition-colors placeholder-ivory-primary/30"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-bronze-burnished text-ivory-primary hover:bg-bronze-burnished/90 rounded-none px-12 py-5 text-base font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </Button>
                </div>

                <p className="text-xs text-ivory-primary/50 text-center">
                  We review applications within 2-3 business days. Limited engagements accepted per quarter.
                </p>
              </form>
            )}
          </FadeIn>

          {/* Qualification Info */}
          <FadeIn delay={0.2} className="mt-12 pt-12 border-t border-gold-antique/20">
            <h3 className="text-2xl font-heading text-ivory-primary mb-8 text-center">
              What We're Looking For
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-lg font-bold text-ivory-primary mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gold-antique rounded-full" />
                  Good Fit
                </h4>
                <ul className="space-y-3 text-ivory-primary/70">
                  {[
                    'B2B founder or revenue leader',
                    'Established product-market fit',
                    'Consistent lead or trial flow',
                    'Want measurable revenue lift',
                    '$1M-$100M+ ARR range'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gold-antique mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-ivory-primary mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gold-antique/40 rounded-full" />
                  Not a Fit
                </h4>
                <ul className="space-y-3 text-ivory-primary/50">
                  {[
                    'Early-stage hobby projects',
                    'D2C/consumer brands',
                    'No CRM visibility',
                    'Seeking "growth hacks"',
                    'Unwilling to invest in systems'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gold-antique/40 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
