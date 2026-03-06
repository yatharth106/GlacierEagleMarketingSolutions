import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, ChevronDown, Check, ChevronLeft } from 'lucide-react';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    arrRange: '',
    leadVolume: '',
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

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
      if (!formData.arrRange) {
        newErrors.arrRange = 'Please select an ARR range';
      }
      if (!formData.leadVolume) {
        newErrors.leadVolume = 'Monthly lead volume is required';
      }
    } else if (step === 2) {
      if (!formData.revenueChallenge.trim()) {
        newErrors.revenueChallenge = 'Please describe your revenue challenge';
      }
    } else if (step === 3) {
      if (!formData.emailPlatform) {
        newErrors.emailPlatform = 'Email platform is required';
      }
      if (!formData.crm.trim()) {
        newErrors.crm = 'CRM is required';
      }
    } else if (step === 4) {
      if (!formData.contactName.trim()) {
        newErrors.contactName = 'Your name is required';
      }
      if (!formData.contactEmail.trim()) {
        newErrors.contactEmail = 'Email address is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
        newErrors.contactEmail = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        companyName: '',
        arrRange: '',
        leadVolume: '',
        revenueChallenge: '',
        emailPlatform: '',
        crm: '',
        contactName: '',
        contactEmail: '',
        contactPhone: ''
      });
      setErrors({});
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = [
    'Company Fundamentals',
    'Revenue Challenge',
    'Technology Stack',
    'Contact Information',
    'Review & Submit'
  ];

  const stepDescriptions = [
    'Tell us about your business scale and lead generation',
    'What\'s your primary revenue bottleneck?',
    'What tools power your revenue engine?',
    'How can we reach you?',
    'Confirm your application details'
  ];

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
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn delay={0.1}>
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-navy-dark border border-gold-antique/30 p-12 md:p-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gold-antique/20 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <Check className="w-10 h-10 text-gold-antique" />
                </motion.div>
                <h2 className="text-4xl font-heading text-ivory-primary mb-4">Application Received</h2>
                <p className="text-ivory-primary/70 mb-8 text-lg">
                  Thank you for your interest. We'll review your application and reach out within 2-3 business days if we're a fit.
                </p>
                <p className="text-sm text-gold-antique/70">
                  In the meantime, feel free to explore our framework and case studies.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Panel - Progress & Copy */}
                <div className="lg:col-span-1">
                  <div className="bg-navy-dark border border-gold-antique/30 p-8 sticky top-32">
                    {/* Progress Steps */}
                    <div className="mb-12">
                      <p className="text-xs font-bold uppercase tracking-widest text-gold-antique/60 mb-6">Progress</p>
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((step) => (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: step * 0.05 }}
                            className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                              step === currentStep ? 'opacity-100' : step < currentStep ? 'opacity-60' : 'opacity-40'
                            }`}
                            onClick={() => {
                              if (step < currentStep) {
                                setCurrentStep(step);
                                setErrors({});
                              }
                            }}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                step < currentStep
                                  ? 'bg-gold-antique text-navy-dark'
                                  : step === currentStep
                                  ? 'bg-gold-antique/30 border border-gold-antique text-ivory-primary'
                                  : 'bg-transparent border border-gold-antique/20 text-ivory-primary/40'
                              }`}
                            >
                              {step < currentStep ? <Check className="w-4 h-4" /> : step}
                            </div>
                            <span className={`text-xs uppercase tracking-widest font-bold ${
                              step === currentStep ? 'text-ivory-primary' : 'text-ivory-primary/50'
                            }`}>
                              Step {step}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Step Info */}
                    <div className="border-t border-gold-antique/20 pt-8">
                      <p className="text-xs font-bold uppercase tracking-widest text-gold-antique/60 mb-4">Current Step</p>
                      <h3 className="text-lg font-heading text-ivory-primary mb-3">{stepTitles[currentStep - 1]}</h3>
                      <p className="text-sm text-ivory-primary/60">{stepDescriptions[currentStep - 1]}</p>
                    </div>
                  </div>
                </div>

                {/* Right Panel - Form */}
                <div className="lg:col-span-3">
                  <form onSubmit={handleSubmit} className="bg-navy-dark border border-gold-antique/30 p-8 md:p-12">
                    <AnimatePresence mode="wait">
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                              Company Name *
                            </label>
                            <input
                              type="text"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleChange}
                              className={`w-full bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                                errors.companyName ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                              }`}
                              placeholder="Your company name"
                            />
                            {errors.companyName && (
                              <p className="text-destructive text-sm mt-2">{errors.companyName}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                              Monthly Revenue *
                            </label>
                            <div className="relative">
                              <Select value={formData.arrRange} onValueChange={(value) => {
                                setFormData(prev => ({ ...prev, arrRange: value }));
                                if (errors.arrRange) {
                                  setErrors(prev => ({ ...prev, arrRange: '' }));
                                }
                              }}>
                                <SelectTrigger className={`bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors pr-8 ${
                                  errors.arrRange ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                                }`}>
                                  <SelectValue placeholder="Select Range" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-dark border-gold-antique/30">
                                  <SelectItem value="under-10k" className="text-ivory-primary">Under $10K/month</SelectItem>
                                  <SelectItem value="10k-30k" className="text-ivory-primary">$10K–$30K/month</SelectItem>
                                  <SelectItem value="30k-100k" className="text-ivory-primary">$30K–$100K/month</SelectItem>
                                  <SelectItem value="100k-500k" className="text-ivory-primary">$100K–$500K/month</SelectItem>
                                  <SelectItem value="500k+" className="text-ivory-primary">$500K+/month</SelectItem>
                                </SelectContent>
                              </Select>
                              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-antique/60 pointer-events-none" />
                            </div>
                            {errors.arrRange && (
                              <p className="text-destructive text-sm mt-2">{errors.arrRange}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                              Monthly Lead Volume *
                            </label>
                            <input
                              type="text"
                              name="leadVolume"
                              value={formData.leadVolume}
                              onChange={handleChange}
                              className={`w-full bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                                errors.leadVolume ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                              }`}
                              placeholder="e.g., 500 leads/month"
                            />
                            {errors.leadVolume && (
                              <p className="text-destructive text-sm mt-2">{errors.leadVolume}</p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                              Primary Revenue Challenge *
                            </label>
                            <textarea
                              name="revenueChallenge"
                              value={formData.revenueChallenge}
                              onChange={handleChange}
                              rows={5}
                              className={`w-full bg-transparent border p-4 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 resize-none ${
                                errors.revenueChallenge ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                              }`}
                              placeholder="What's your biggest revenue bottleneck? (e.g., low trial conversion, long sales cycles, etc.)"
                            />
                            {errors.revenueChallenge && (
                              <p className="text-destructive text-sm mt-2">{errors.revenueChallenge}</p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                              Email Platform *
                            </label>
                            <div className="relative">
                              <Select value={formData.emailPlatform} onValueChange={(value) => {
                                setFormData(prev => ({ ...prev, emailPlatform: value }));
                                if (errors.emailPlatform) {
                                  setErrors(prev => ({ ...prev, emailPlatform: '' }));
                                }
                              }}>
                                <SelectTrigger className={`bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors pr-8 ${
                                  errors.emailPlatform ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                                }`}>
                                  <SelectValue placeholder="Select email platform" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-dark border-gold-antique/30">
                                  <SelectItem value="klaviyo" className="text-ivory-primary">Klaviyo</SelectItem>
                                  <SelectItem value="hubspot" className="text-ivory-primary">HubSpot</SelectItem>
                                  <SelectItem value="mailchimp" className="text-ivory-primary">Mailchimp</SelectItem>
                                  <SelectItem value="marketo" className="text-ivory-primary">Marketo</SelectItem>
                                  <SelectItem value="other" className="text-ivory-primary">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-antique/60 pointer-events-none" />
                            </div>
                            {errors.emailPlatform && (
                              <p className="text-destructive text-sm mt-2">{errors.emailPlatform}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                              CRM Used *
                            </label>
                            <input
                              type="text"
                              name="crm"
                              value={formData.crm}
                              onChange={handleChange}
                              className={`w-full bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                                errors.crm ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                              }`}
                              placeholder="e.g., Salesforce, Pipedrive, HubSpot"
                            />
                            {errors.crm && (
                              <p className="text-destructive text-sm mt-2">{errors.crm}</p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              name="contactName"
                              value={formData.contactName}
                              onChange={handleChange}
                              className={`w-full bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                                errors.contactName ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                              }`}
                              placeholder="Full name"
                            />
                            {errors.contactName && (
                              <p className="text-destructive text-sm mt-2">{errors.contactName}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="contactEmail"
                              value={formData.contactEmail}
                              onChange={handleChange}
                              className={`w-full bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                                errors.contactEmail ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                              }`}
                              placeholder="your@email.com"
                            />
                            {errors.contactEmail && (
                              <p className="text-destructive text-sm mt-2">{errors.contactEmail}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                              Phone Number (Optional)
                            </label>
                            <input
                              type="tel"
                              name="contactPhone"
                              value={formData.contactPhone}
                              onChange={handleChange}
                              className="w-full bg-transparent border-b border-gold-antique/30 py-3 text-ivory-primary focus:border-gold-antique outline-none transition-colors placeholder-ivory-primary/30"
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 5 && (
                        <motion.div
                          key="step5"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-8"
                        >
                          <div className="bg-gold-antique/10 border border-gold-antique/20 p-6 rounded-sm">
                            <h3 className="text-lg font-heading text-ivory-primary mb-6">Review Your Application</h3>
                            
                            <div className="space-y-4">
                              <div className="flex justify-between items-start pb-4 border-b border-gold-antique/10">
                                <span className="text-sm text-ivory-primary/60">Company Name</span>
                                <span className="text-sm font-bold text-ivory-primary">{formData.companyName}</span>
                              </div>
                              <div className="flex justify-between items-start pb-4 border-b border-gold-antique/10">
                                <span className="text-sm text-ivory-primary/60">ARR Range</span>
                                <span className="text-sm font-bold text-ivory-primary">{formData.arrRange}</span>
                              </div>
                              <div className="flex justify-between items-start pb-4 border-b border-gold-antique/10">
                                <span className="text-sm text-ivory-primary/60">Monthly Lead Volume</span>
                                <span className="text-sm font-bold text-ivory-primary">{formData.leadVolume}</span>
                              </div>
                              <div className="flex justify-between items-start pb-4 border-b border-gold-antique/10">
                                <span className="text-sm text-ivory-primary/60">Email Platform</span>
                                <span className="text-sm font-bold text-ivory-primary">{formData.emailPlatform}</span>
                              </div>
                              <div className="flex justify-between items-start pb-4 border-b border-gold-antique/10">
                                <span className="text-sm text-ivory-primary/60">CRM</span>
                                <span className="text-sm font-bold text-ivory-primary">{formData.crm}</span>
                              </div>
                              <div className="flex justify-between items-start pb-4 border-b border-gold-antique/10">
                                <span className="text-sm text-ivory-primary/60">Contact Name</span>
                                <span className="text-sm font-bold text-ivory-primary">{formData.contactName}</span>
                              </div>
                              <div className="flex justify-between items-start">
                                <span className="text-sm text-ivory-primary/60">Email</span>
                                <span className="text-sm font-bold text-ivory-primary">{formData.contactEmail}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-ivory-primary/50 text-center">
                            By submitting this application, you agree to be contacted by Glacier Eagle Marketing Solutions regarding your audit.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 mt-12 pt-8 border-t border-gold-antique/20">
                      <motion.button
                        type="button"
                        onClick={handlePrevStep}
                        disabled={currentStep === 1}
                        whileHover={{ scale: currentStep > 1 ? 1.02 : 1 }}
                        whileTap={{ scale: currentStep > 1 ? 0.98 : 1 }}
                        className={`flex items-center gap-2 px-6 py-3 border border-gold-antique/30 text-ivory-primary text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                          currentStep === 1
                            ? 'opacity-30 cursor-not-allowed'
                            : 'hover:bg-gold-antique/10 hover:border-gold-antique/60'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </motion.button>

                      {currentStep < 5 ? (
                        <motion.button
                          type="button"
                          onClick={handleNextStep}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="ml-auto flex items-center gap-2 px-8 py-3 bg-gold-antique text-navy-dark text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-gold-antique/90"
                        >
                          Next
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                          className="ml-auto flex items-center gap-2 px-8 py-3 bg-gold-antique text-navy-dark text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-gold-antique/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                          {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                        </motion.button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}
          </FadeIn>

          {/* Qualification Info - Only show when not on form */}
          {submitStatus !== 'success' && (
            <FadeIn delay={0.2} className="mt-16 pt-16 border-t border-gold-antique/20">
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
                      '$10K-$500K+/month revenue range'
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
