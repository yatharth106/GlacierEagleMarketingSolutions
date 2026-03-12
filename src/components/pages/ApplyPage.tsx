import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, ChevronDown, Check, ChevronLeft } from 'lucide-react';
import { useSEO } from '@/hooks/use-seo';

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
  // --- SEO Configuration ---
  useSEO({
    title: 'Apply for Private Revenue Audit | GEMS',
    description: 'Request a private revenue audit from GEMS. Limited engagements accepted quarterly. We review every application personally.',
    keywords: 'apply, revenue audit, advisory application, business consultation, strategic partnership',
    canonical: typeof window !== 'undefined' ? window.location.origin + '/apply' : undefined,
    ogTitle: 'Apply for Private Revenue Audit | GEMS',
    ogDescription: 'Request a private revenue audit from GEMS.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    companyName: '',
    websiteUrl: '',
    whatsappNumber: '',
    // Step 2
    monthlyRevenue: '',
    trialSignups: '',
    industry: '',
    // Step 3
    revenueChallenge: '',
    attemptedSolutions: '',
    // Step 4
    businessVision: '',
    urgencyReason: '',
    // Step 5
    heardAbout: '',
    decisionMaker: '',
    readyToMove: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.websiteUrl.trim()) newErrors.websiteUrl = 'Website URL is required';
      if (!formData.whatsappNumber.trim()) newErrors.whatsappNumber = 'Contact number is required';
    } else if (step === 2) {
      if (!formData.monthlyRevenue) newErrors.monthlyRevenue = 'Monthly revenue is required';
      if (!formData.trialSignups) newErrors.trialSignups = 'Trial signups/lead volume is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
    } else if (step === 3) {
      if (!formData.revenueChallenge.trim()) newErrors.revenueChallenge = 'Revenue challenge is required';
      if (!formData.attemptedSolutions.trim()) newErrors.attemptedSolutions = 'This field is required';
    } else if (step === 4) {
      if (!formData.businessVision.trim()) newErrors.businessVision = 'Business vision is required';
      if (!formData.urgencyReason.trim()) newErrors.urgencyReason = 'Urgency reason is required';
    } else if (step === 5) {
      if (!formData.heardAbout) newErrors.heardAbout = 'This field is required';
      if (!formData.decisionMaker) newErrors.decisionMaker = 'This field is required';
      if (!formData.readyToMove) newErrors.readyToMove = 'This field is required';
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

  const handleSelectChange = (name: string, value: string) => {
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
    
    if (!validateStep(5)) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        companyName: '',
        websiteUrl: '',
        whatsappNumber: '',
        monthlyRevenue: '',
        trialSignups: '',
        industry: '',
        revenueChallenge: '',
        attemptedSolutions: '',
        businessVision: '',
        urgencyReason: '',
        heardAbout: '',
        decisionMaker: '',
        readyToMove: ''
      });
      setErrors({});
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = [
    'Business Fundamentals',
    'Revenue Snapshot',
    'Revenue Challenges',
    'Vision',
    'Final Qualification'
  ];

  const stepDescriptions = [
    'Tell us about your business',
    'Share your revenue metrics',
    'What\'s holding you back?',
    'Where are you headed?',
    'Final qualification questions'
  ];

  return (
    <div className="min-h-screen bg-navy-dark text-ivory-primary font-paragraph selection:bg-gold-antique selection:text-navy-dark">
      <Header />

      {/* --- Hero Section --- */}
      <section className="w-full pt-32 pb-20 bg-navy-dark">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="text-center">
            <h1 className="text-6xl md:text-7xl font-heading text-ivory-primary mb-4">
              Request a Private Revenue Audit
            </h1>
            <p className="text-lg text-ivory-primary/60 max-w-2xl mx-auto">
              Limited engagements accepted quarterly. We review every application personally.
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
                  Your application has been received. We review every submission personally and will be in touch within 48 hours if there is a strong fit.
                </p>
              </motion.div>
            ) : (
              <div>
                {/* Progress Bar */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-antique">Progress</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-ivory-primary/60">Step {currentStep} of 5</p>
                  </div>
                  <div className="w-full h-1 bg-gold-antique/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gold-antique"
                      initial={{ width: '20%' }}
                      animate={{ width: `${(currentStep / 5) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-navy-dark border border-gold-antique/30 p-8 md:p-12">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        <div>
                          <h3 className="text-2xl font-heading text-ivory-primary mb-2">Business Fundamentals</h3>
                          <p className="text-sm text-ivory-primary/60 mb-8">Tell us about your business</p>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                              errors.fullName ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                            }`}
                            placeholder="Your full name"
                          />
                          {errors.fullName && (
                            <p className="text-destructive text-sm mt-2">{errors.fullName}</p>
                          )}
                        </div>

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
                            Website URL *
                          </label>
                          <input
                            type="url"
                            name="websiteUrl"
                            value={formData.websiteUrl}
                            onChange={handleChange}
                            className={`w-full bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                              errors.websiteUrl ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                            }`}
                            placeholder="https://yourcompany.com"
                          />
                          {errors.websiteUrl && (
                            <p className="text-destructive text-sm mt-2">{errors.websiteUrl}</p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                            Founder's WhatsApp/Contact Number *
                          </label>
                          <input
                            type="tel"
                            name="whatsappNumber"
                            value={formData.whatsappNumber}
                            onChange={handleChange}
                            className={`w-full bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 ${
                              errors.whatsappNumber ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                            }`}
                            placeholder="+1 (555) 000-0000"
                          />
                          {errors.whatsappNumber && (
                            <p className="text-destructive text-sm mt-2">{errors.whatsappNumber}</p>
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
                        className="space-y-8"
                      >
                        <div>
                          <h3 className="text-2xl font-heading text-ivory-primary mb-2">Revenue Snapshot</h3>
                          <p className="text-sm text-ivory-primary/60 mb-8">Share your revenue metrics</p>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                            Monthly Revenue *
                          </label>
                          <div className="relative">
                            <Select value={formData.monthlyRevenue} onValueChange={(value) => handleSelectChange('monthlyRevenue', value)}>
                              <SelectTrigger className={`bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors pr-8 ${
                                errors.monthlyRevenue ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                              }`}>
                                <SelectValue placeholder="Select range" />
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
                          {errors.monthlyRevenue && (
                            <p className="text-destructive text-sm mt-2">{errors.monthlyRevenue}</p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                            Monthly Trial Signups or Lead Volume *
                          </label>
                          <div className="relative">
                            <Select value={formData.trialSignups} onValueChange={(value) => handleSelectChange('trialSignups', value)}>
                              <SelectTrigger className={`bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors pr-8 ${
                                errors.trialSignups ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                              }`}>
                                <SelectValue placeholder="Select range" />
                              </SelectTrigger>
                              <SelectContent className="bg-navy-dark border-gold-antique/30">
                                <SelectItem value="under-50" className="text-ivory-primary">Under 50</SelectItem>
                                <SelectItem value="50-200" className="text-ivory-primary">50–200</SelectItem>
                                <SelectItem value="200-500" className="text-ivory-primary">200–500</SelectItem>
                                <SelectItem value="500-1000" className="text-ivory-primary">500–1,000</SelectItem>
                                <SelectItem value="1000-5000" className="text-ivory-primary">1,000–5,000</SelectItem>
                                <SelectItem value="5000-10000" className="text-ivory-primary">5,000–10,000</SelectItem>
                                <SelectItem value="10000+" className="text-ivory-primary">10,000+</SelectItem>
                              </SelectContent>
                            </Select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-antique/60 pointer-events-none" />
                          </div>
                          {errors.trialSignups && (
                            <p className="text-destructive text-sm mt-2">{errors.trialSignups}</p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                            Industry *
                          </label>
                          <div className="relative">
                            <Select value={formData.industry} onValueChange={(value) => handleSelectChange('industry', value)}>
                              <SelectTrigger className={`bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors pr-8 ${
                                errors.industry ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                              }`}>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                              <SelectContent className="bg-navy-dark border-gold-antique/30">
                                <SelectItem value="saas" className="text-ivory-primary">SaaS</SelectItem>
                                <SelectItem value="ecommerce" className="text-ivory-primary">eCommerce</SelectItem>
                                <SelectItem value="both" className="text-ivory-primary">Both</SelectItem>
                              </SelectContent>
                            </Select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-antique/60 pointer-events-none" />
                          </div>
                          {errors.industry && (
                            <p className="text-destructive text-sm mt-2">{errors.industry}</p>
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
                        className="space-y-8"
                      >
                        <div>
                          <h3 className="text-2xl font-heading text-ivory-primary mb-2">Revenue Challenges</h3>
                          <p className="text-sm text-ivory-primary/60 mb-8">What's holding you back?</p>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                            What is your biggest revenue challenge right now? *
                          </label>
                          <textarea
                            name="revenueChallenge"
                            value={formData.revenueChallenge}
                            onChange={handleChange}
                            rows={5}
                            className={`w-full bg-transparent border p-4 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 resize-none ${
                              errors.revenueChallenge ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                            }`}
                            placeholder="Be specific — trial conversion, churn, pipeline velocity, pricing..."
                          />
                          {errors.revenueChallenge && (
                            <p className="text-destructive text-sm mt-2">{errors.revenueChallenge}</p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                            What have you already tried to fix it? *
                          </label>
                          <textarea
                            name="attemptedSolutions"
                            value={formData.attemptedSolutions}
                            onChange={handleChange}
                            rows={5}
                            className={`w-full bg-transparent border p-4 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 resize-none ${
                              errors.attemptedSolutions ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                            }`}
                            placeholder="Agencies, freelancers, internal hires, tools..."
                          />
                          {errors.attemptedSolutions && (
                            <p className="text-destructive text-sm mt-2">{errors.attemptedSolutions}</p>
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
                        className="space-y-8"
                      >
                        <div>
                          <h3 className="text-2xl font-heading text-ivory-primary mb-2">Vision</h3>
                          <p className="text-sm text-ivory-primary/60 mb-8">Where are you headed?</p>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                            Where do you want your business to be in 12 months? *
                          </label>
                          <textarea
                            name="businessVision"
                            value={formData.businessVision}
                            onChange={handleChange}
                            rows={5}
                            className={`w-full bg-transparent border p-4 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 resize-none ${
                              errors.businessVision ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                            }`}
                            placeholder="Revenue targets, market position, team size..."
                          />
                          {errors.businessVision && (
                            <p className="text-destructive text-sm mt-2">{errors.businessVision}</p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                            Why is solving this revenue problem urgent for you right now? *
                          </label>
                          <textarea
                            name="urgencyReason"
                            value={formData.urgencyReason}
                            onChange={handleChange}
                            rows={5}
                            className={`w-full bg-transparent border p-4 text-ivory-primary outline-none transition-colors placeholder-ivory-primary/30 resize-none ${
                              errors.urgencyReason ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                            }`}
                            placeholder="What happens if this doesn't get fixed?"
                          />
                          {errors.urgencyReason && (
                            <p className="text-destructive text-sm mt-2">{errors.urgencyReason}</p>
                          )}
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
                        <div>
                          <h3 className="text-2xl font-heading text-ivory-primary mb-2">Final Qualification</h3>
                          <p className="text-sm text-ivory-primary/60 mb-8">Final qualification questions</p>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                            How did you hear about GEMS? *
                          </label>
                          <div className="relative">
                            <Select value={formData.heardAbout} onValueChange={(value) => handleSelectChange('heardAbout', value)}>
                              <SelectTrigger className={`bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors pr-8 ${
                                errors.heardAbout ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                              }`}>
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                              <SelectContent className="bg-navy-dark border-gold-antique/30">
                                <SelectItem value="cold-email" className="text-ivory-primary">Cold email</SelectItem>
                                <SelectItem value="twitter" className="text-ivory-primary">X (Twitter)</SelectItem>
                                <SelectItem value="linkedin" className="text-ivory-primary">LinkedIn</SelectItem>
                                <SelectItem value="referral" className="text-ivory-primary">Referral</SelectItem>
                                <SelectItem value="other" className="text-ivory-primary">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-antique/60 pointer-events-none" />
                          </div>
                          {errors.heardAbout && (
                            <p className="text-destructive text-sm mt-2">{errors.heardAbout}</p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                            Are you the final decision maker for this engagement? *
                          </label>
                          <div className="relative">
                            <Select value={formData.decisionMaker} onValueChange={(value) => handleSelectChange('decisionMaker', value)}>
                              <SelectTrigger className={`bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors pr-8 ${
                                errors.decisionMaker ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                              }`}>
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                              <SelectContent className="bg-navy-dark border-gold-antique/30">
                                <SelectItem value="yes" className="text-ivory-primary">Yes, I am the founder/decision maker</SelectItem>
                                <SelectItem value="no" className="text-ivory-primary">No, I need approval from others</SelectItem>
                              </SelectContent>
                            </Select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-antique/60 pointer-events-none" />
                          </div>
                          {errors.decisionMaker && (
                            <p className="text-destructive text-sm mt-2">{errors.decisionMaker}</p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70 block mb-3">
                            Are you ready to move forward within the next 2 weeks if accepted? *
                          </label>
                          <div className="relative">
                            <Select value={formData.readyToMove} onValueChange={(value) => handleSelectChange('readyToMove', value)}>
                              <SelectTrigger className={`bg-transparent border-b py-3 text-ivory-primary outline-none transition-colors pr-8 ${
                                errors.readyToMove ? 'border-destructive focus:border-destructive' : 'border-gold-antique/30 focus:border-gold-antique'
                              }`}>
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                              <SelectContent className="bg-navy-dark border-gold-antique/30">
                                <SelectItem value="yes" className="text-ivory-primary">Yes, I am ready</SelectItem>
                                <SelectItem value="no" className="text-ivory-primary">No, I need more time</SelectItem>
                              </SelectContent>
                            </Select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-antique/60 pointer-events-none" />
                          </div>
                          {errors.readyToMove && (
                            <p className="text-destructive text-sm mt-2">{errors.readyToMove}</p>
                          )}
                        </div>
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
            )}
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
