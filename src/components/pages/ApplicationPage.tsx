import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/use-seo';

interface FormData {
  // Step 1: Contact Information
  fullName: string;
  jobTitle: string;
  businessEmail: string;
  phoneNumber: string;
  countryCode: string;
  country: string;
  howDidYouFindUs: string;

  // Step 2: Company Profile
  companyName: string;
  companyWebsite: string;
  businessType: string;
  industry: string;
  yearsInBusiness: string;
  teamSize: string;

  // Step 3: Revenue & Business Situation
  monthlyRevenue: string;
  revenueModel: string;
  revenueChallenge: string[];
  workingWithOtherAgency: string;
  missingFromRelationship: string;

  // Step 4: Goals & Readiness
  primaryGoal: string;
  targetMonthlyRevenue: string;
  estimatedBudget: string;
  timelineToStart: string;
  whyGlacierEagle: string;

  // Step 5: Review
  confirmAccuracy: boolean;
}

export default function ApplicationPage() {
  // --- SEO Configuration ---
  useSEO({
    title: 'Application Form | Strategic Advisory',
    description: 'Complete our application form to begin your journey with our strategic advisory services. Tell us about your business and goals.',
    keywords: 'application, business application, advisory form, consultation',
    canonical: typeof window !== 'undefined' ? window.location.origin + '/application' : undefined,
    ogTitle: 'Application Form | Strategic Advisory',
    ogDescription: 'Complete our application form to begin your journey.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    jobTitle: '',
    businessEmail: '',
    phoneNumber: '',
    countryCode: '+1',
    country: '',
    howDidYouFindUs: '',
    companyName: '',
    companyWebsite: '',
    businessType: '',
    industry: '',
    yearsInBusiness: '',
    teamSize: '',
    monthlyRevenue: '',
    revenueModel: '',
    revenueChallenge: [],
    workingWithOtherAgency: '',
    missingFromRelationship: '',
    primaryGoal: '',
    targetMonthlyRevenue: '',
    estimatedBudget: '',
    timelineToStart: '',
    whyGlacierEagle: '',
    confirmAccuracy: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxGroup = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name as keyof FormData].includes(value)
        ? (prev[name as keyof FormData] as string[]).filter(item => item !== value)
        : [...(prev[name as keyof FormData] as string[]), value]
    }));
  };

  const handleButtonSelect = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Required';
      if (!formData.jobTitle) newErrors.jobTitle = 'Required';
      if (!formData.businessEmail.trim()) newErrors.businessEmail = 'Required';
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Required';
      if (!formData.country) newErrors.country = 'Required';
    } else if (step === 2) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Required';
      if (!formData.companyWebsite.trim()) newErrors.companyWebsite = 'Required';
      if (!formData.businessType) newErrors.businessType = 'Required';
      if (!formData.industry.trim()) newErrors.industry = 'Required';
      if (!formData.yearsInBusiness) newErrors.yearsInBusiness = 'Required';
      if (!formData.teamSize) newErrors.teamSize = 'Required';
    } else if (step === 3) {
      if (!formData.monthlyRevenue) newErrors.monthlyRevenue = 'Required';
      if (!formData.revenueModel) newErrors.revenueModel = 'Required';
      if (formData.revenueChallenge.length === 0) newErrors.revenueChallenge = 'Select at least one';
      if (!formData.workingWithOtherAgency) newErrors.workingWithOtherAgency = 'Required';
    } else if (step === 4) {
      if (!formData.primaryGoal.trim()) newErrors.primaryGoal = 'Required';
      if (!formData.targetMonthlyRevenue) newErrors.targetMonthlyRevenue = 'Required';
      if (!formData.estimatedBudget) newErrors.estimatedBudget = 'Required';
      if (!formData.timelineToStart) newErrors.timelineToStart = 'Required';
      if (!formData.whyGlacierEagle.trim()) newErrors.whyGlacierEagle = 'Required';
    } else if (step === 5) {
      if (!formData.confirmAccuracy) newErrors.confirmAccuracy = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(5)) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  const progressPercentage = (currentStep / 5) * 100;

  if (submitted) {
    return (
      <div className="min-h-screen bg-navy-dark">
        <Header />
        <main className="flex-1">
          <motion.div
            className="max-w-[100rem] mx-auto px-6 md:px-12 py-[140px] flex items-center justify-center min-h-[calc(100vh-200px)]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center max-w-[600px]">
              <motion.div
                className="mb-8 flex justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
              >
                <div className="w-24 h-24 rounded-full border-2 border-gold-antique flex items-center justify-center">
                  <Check size={48} className="text-gold-antique" />
                </div>
              </motion.div>

              <motion.h1
                className="font-heading text-6xl md:text-7xl text-ivory-primary mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Application Received
              </motion.h1>

              <motion.p
                className="font-paragraph text-lg text-ivory-body mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                We review every application personally. If there's a fit, you'll hear from us within 48 hours via email or phone.
              </motion.p>

              <motion.div
                className="mb-12 flex justify-center gap-8 md:gap-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="text-center">
                  <div className="font-label text-xs uppercase tracking-widest text-gold-antique mb-2">01</div>
                  <div className="font-paragraph text-sm text-ivory-body">Review</div>
                </div>
                <ChevronRight size={20} className="text-gold-antique/50 self-center" />
                <div className="text-center">
                  <div className="font-label text-xs uppercase tracking-widest text-gold-antique mb-2">02</div>
                  <div className="font-paragraph text-sm text-ivory-body">Qualification Call</div>
                </div>
                <ChevronRight size={20} className="text-gold-antique/50 self-center" />
                <div className="text-center">
                  <div className="font-label text-xs uppercase tracking-widest text-gold-antique mb-2">03</div>
                  <div className="font-paragraph text-sm text-ivory-body">Blueprint Discussion</div>
                </div>
              </motion.div>

              <motion.p
                className="font-label text-xs uppercase tracking-widest text-ivory-body/60 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                // If you don't hear back, it means we aren't the right fit at this time. No hard feelings.
              </motion.p>

              <motion.button
                onClick={() => window.location.href = '/'}
                className="px-11 py-4 border border-gold-antique text-gold-antique font-label text-xs uppercase tracking-[1.8px] hover:bg-gold-antique hover:text-navy-dark transition-all duration-300 hover:-translate-y-0.5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                Back to Home
              </motion.button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-dark">
      <Header />
      <main className="flex-1">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Panel - Fixed Context */}
            <motion.div
              className="lg:col-span-1 lg:sticky lg:top-32 h-fit"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-12">
                <div>
                  <h2 className="font-heading text-4xl md:text-5xl text-gold-antique mb-2">Glacier Eagle</h2>
                  <p className="font-heading text-2xl md:text-3xl text-ivory-primary">Marketing Solutions</p>
                </div>

                <div className="border-l-2 border-gold-antique/30 pl-6 space-y-4">
                  <p className="font-paragraph text-lg text-ivory-primary leading-relaxed">
                    "We don't work with everyone. We work with the right ones."
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="font-label text-xs uppercase tracking-widest text-gold-antique mb-4">// What Happens After You Apply</p>
                    <div className="space-y-3 font-paragraph text-sm text-ivory-body">
                      <p><span className="text-gold-antique font-semibold">01 —</span> We review your application personally within 48 hours</p>
                      <p><span className="text-gold-antique font-semibold">02 —</span> If there's fit, we schedule a qualification call</p>
                      <p><span className="text-gold-antique font-semibold">03 —</span> We scope and deliver your Revenue Architecture Blueprint</p>
                      <p><span className="text-gold-antique font-semibold">04 —</span> If the upside is real, we propose a partnership</p>
                    </div>
                  </div>

                  <div className="border-t border-divider pt-6">
                    <p className="font-label text-xs uppercase tracking-widest text-gold-antique mb-4">// Why We're Selective</p>
                    <p className="font-paragraph text-sm text-ivory-body leading-relaxed">
                      Our model is revenue-share. We only win when you win. That means we only take on businesses where we can see a real path to growth.
                    </p>
                    <p className="font-paragraph text-sm text-ivory-body leading-relaxed mt-3">
                      If we don't take you on — it's not personal. It's just math.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Form */}
            <motion.div
              className="lg:col-span-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Progress Bar */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="relative h-1 bg-divider rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="h-full bg-gold-antique"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-label text-xs uppercase tracking-widest text-ivory-body">
                    Step {currentStep} of 5
                  </p>
                  <p className="font-label text-xs uppercase tracking-widest text-gold-antique">
                    {Math.round(progressPercentage)}%
                  </p>
                </div>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`step-${currentStep}`}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-8"
                  >
                    {/* STEP 1: Contact Information */}
                    {currentStep === 1 && (
                      <div className="space-y-8">
                        <div>
                          <p className="font-label text-xs uppercase tracking-widest text-gold-antique mb-8">// Contact Information</p>
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-3">Full Name *</label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary placeholder-ivory-body/40 focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base"
                            placeholder="Your full name"
                          />
                          {errors.fullName && <p className="text-red-500 text-xs mt-2">{errors.fullName}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-3">Job Title / Role *</label>
                          <select
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base"
                          >
                            <option value="">Select your role</option>
                            <option value="founder">Founder</option>
                            <option value="ceo">CEO</option>
                            <option value="cmo">CMO</option>
                            <option value="head-of-growth">Head of Growth</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.jobTitle && <p className="text-red-500 text-xs mt-2">{errors.jobTitle}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-3">Business Email *</label>
                          <input
                            type="email"
                            name="businessEmail"
                            value={formData.businessEmail}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary placeholder-ivory-body/40 focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base"
                            placeholder="your@company.com"
                          />
                          {errors.businessEmail && <p className="text-red-500 text-xs mt-2">{errors.businessEmail}</p>}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-1">
                            <label className="block font-paragraph text-sm text-ivory-primary mb-3">Country Code *</label>
                            <select
                              name="countryCode"
                              value={formData.countryCode}
                              onChange={handleInputChange}
                              className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base"
                            >
                              <option value="+1">+1 (US)</option>
                              <option value="+44">+44 (UK)</option>
                              <option value="+91">+91 (IN)</option>
                              <option value="+61">+61 (AU)</option>
                              <option value="+33">+33 (FR)</option>
                              <option value="+49">+49 (DE)</option>
                            </select>
                          </div>
                          <div className="col-span-2">
                            <label className="block font-paragraph text-sm text-ivory-primary mb-3">Phone Number *</label>
                            <input
                              type="tel"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleInputChange}
                              className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary placeholder-ivory-body/40 focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base"
                              placeholder="Your phone number"
                            />
                          </div>
                        </div>
                        {errors.phoneNumber && <p className="text-red-500 text-xs mt-2">{errors.phoneNumber}</p>}

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-3">Country / Region *</label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base"
                          >
                            <option value="">Select your country</option>
                            <option value="us">United States</option>
                            <option value="uk">United Kingdom</option>
                            <option value="ca">Canada</option>
                            <option value="au">Australia</option>
                            <option value="in">India</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.country && <p className="text-red-500 text-xs mt-2">{errors.country}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-3">How did you find us?</label>
                          <select
                            name="howDidYouFindUs"
                            value={formData.howDidYouFindUs}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base"
                          >
                            <option value="">Select an option</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="referral">Referral</option>
                            <option value="google">Google</option>
                            <option value="social">Social Media</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Company Profile */}
                    {currentStep === 2 && (
                      <div className="space-y-8">
                        <div>
                          <p className="font-label text-xs uppercase tracking-widest text-gold-antique mb-8">// Company Profile</p>
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-3">Company Name *</label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary placeholder-ivory-body/40 focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base"
                            placeholder="Your company name"
                          />
                          {errors.companyName && <p className="text-red-500 text-xs mt-2">{errors.companyName}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-3">Company Website URL *</label>
                          <input
                            type="url"
                            name="companyWebsite"
                            value={formData.companyWebsite}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary placeholder-ivory-body/40 focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base"
                            placeholder="https://yourcompany.com"
                          />
                          {errors.companyWebsite && <p className="text-red-500 text-xs mt-2">{errors.companyWebsite}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-4">Business Type *</label>
                          <div className="flex flex-wrap gap-3">
                            {['SaaS', 'eCommerce', 'Both', 'Other'].map(type => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => handleButtonSelect('businessType', type)}
                                className={`px-6 py-2 border transition-all duration-300 font-paragraph text-sm ${
                                  formData.businessType === type
                                    ? 'border-gold-antique bg-gold-antique/10 text-gold-antique'
                                    : 'border-divider text-ivory-body hover:border-gold-antique/50'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                          {errors.businessType && <p className="text-red-500 text-xs mt-2">{errors.businessType}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-3">Industry / Niche *</label>
                          <input
                            type="text"
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary placeholder-ivory-body/40 focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base"
                            placeholder="e.g., B2B SaaS, Direct-to-Consumer"
                          />
                          {errors.industry && <p className="text-red-500 text-xs mt-2">{errors.industry}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-3">How long have you been in business? *</label>
                          <select
                            name="yearsInBusiness"
                            value={formData.yearsInBusiness}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base"
                          >
                            <option value="">Select timeframe</option>
                            <option value="less-than-1">Less than 1 year</option>
                            <option value="1-2">1–2 years</option>
                            <option value="2-5">2–5 years</option>
                            <option value="5-plus">5+ years</option>
                          </select>
                          {errors.yearsInBusiness && <p className="text-red-500 text-xs mt-2">{errors.yearsInBusiness}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-3">Team Size *</label>
                          <select
                            name="teamSize"
                            value={formData.teamSize}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base"
                          >
                            <option value="">Select team size</option>
                            <option value="solo">Solo</option>
                            <option value="2-5">2–5</option>
                            <option value="6-15">6–15</option>
                            <option value="16-50">16–50</option>
                            <option value="50-plus">50+</option>
                          </select>
                          {errors.teamSize && <p className="text-red-500 text-xs mt-2">{errors.teamSize}</p>}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Revenue & Business Situation */}
                    {currentStep === 3 && (
                      <div className="space-y-8">
                        <div>
                          <p className="font-label text-xs uppercase tracking-widest text-gold-antique mb-2">// Revenue Snapshot</p>
                          <p className="font-label text-xs text-ivory-body/60 mb-6">This section is confidential. We use this to determine fit only.</p>
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-4">Current Monthly Revenue *</label>
                          <div className="flex flex-wrap gap-3">
                            {['Under $5K', '$5K–$10K', '$10K–$30K', '$30K–$100K', '$100K+'].map(range => (
                              <button
                                key={range}
                                type="button"
                                onClick={() => handleButtonSelect('monthlyRevenue', range)}
                                className={`px-4 py-2 border transition-all duration-300 font-paragraph text-sm ${
                                  formData.monthlyRevenue === range
                                    ? 'border-gold-antique bg-gold-antique/10 text-gold-antique'
                                    : 'border-divider text-ivory-body hover:border-gold-antique/50'
                                }`}
                              >
                                {range}
                              </button>
                            ))}
                          </div>
                          {errors.monthlyRevenue && <p className="text-red-500 text-xs mt-2">{errors.monthlyRevenue}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-4">Primary Revenue Model *</label>
                          <div className="flex flex-wrap gap-3">
                            {['Subscription', 'One-time Purchase', 'Both', 'Other'].map(model => (
                              <button
                                key={model}
                                type="button"
                                onClick={() => handleButtonSelect('revenueModel', model)}
                                className={`px-4 py-2 border transition-all duration-300 font-paragraph text-sm ${
                                  formData.revenueModel === model
                                    ? 'border-gold-antique bg-gold-antique/10 text-gold-antique'
                                    : 'border-divider text-ivory-body hover:border-gold-antique/50'
                                }`}
                              >
                                {model}
                              </button>
                            ))}
                          </div>
                          {errors.revenueModel && <p className="text-red-500 text-xs mt-2">{errors.revenueModel}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-4">Current biggest revenue challenge(s) *</label>
                          <div className="space-y-3">
                            {[
                              'Low conversion rates',
                              'High customer acquisition cost',
                              'Poor email performance',
                              'Funnel drop-offs',
                              'Retention / churn issues',
                              'No clear revenue system',
                              'Scaling feels chaotic'
                            ].map(challenge => (
                              <label key={challenge} className="flex items-center cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={formData.revenueChallenge.includes(challenge)}
                                  onChange={() => handleCheckboxGroup('revenueChallenge', challenge)}
                                  className="mr-3 w-4 h-4 border border-gold-antique/50 bg-transparent cursor-pointer accent-gold-antique"
                                />
                                <span className="font-paragraph text-sm text-ivory-body group-hover:text-ivory-primary transition-colors">{challenge}</span>
                              </label>
                            ))}
                          </div>
                          {errors.revenueChallenge && <p className="text-red-500 text-xs mt-2">{errors.revenueChallenge}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-4">Are you currently working with any other agency or consultant? *</label>
                          <div className="flex gap-4">
                            {['Yes', 'No'].map(option => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => handleButtonSelect('workingWithOtherAgency', option)}
                                className={`px-6 py-2 border transition-all duration-300 font-paragraph text-sm ${
                                  formData.workingWithOtherAgency === option
                                    ? 'border-gold-antique bg-gold-antique/10 text-gold-antique'
                                    : 'border-divider text-ivory-body hover:border-gold-antique/50'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                          {errors.workingWithOtherAgency && <p className="text-red-500 text-xs mt-2">{errors.workingWithOtherAgency}</p>}
                        </div>

                        {formData.workingWithOtherAgency === 'Yes' && (
                          <div>
                            <label className="block font-paragraph text-sm text-ivory-primary mb-3">If yes, what's missing from that relationship?</label>
                            <textarea
                              name="missingFromRelationship"
                              value={formData.missingFromRelationship}
                              onChange={handleInputChange}
                              className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary placeholder-ivory-body/40 focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base resize-none"
                              placeholder="Tell us what's not working..."
                              rows={3}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* STEP 4: Goals & Readiness */}
                    {currentStep === 4 && (
                      <div className="space-y-8">
                        <div>
                          <p className="font-label text-xs uppercase tracking-widest text-gold-antique mb-8">// Growth Intent</p>
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-3">What is your primary goal for the next 6 months? *</label>
                          <textarea
                            name="primaryGoal"
                            value={formData.primaryGoal}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary placeholder-ivory-body/40 focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base resize-none"
                            placeholder="Be specific. What does success look like?"
                            rows={3}
                          />
                          {errors.primaryGoal && <p className="text-red-500 text-xs mt-2">{errors.primaryGoal}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-4">What's your target monthly revenue? *</label>
                          <div className="flex flex-wrap gap-3">
                            {['$10K–$30K', '$30K–$100K', '$100K–$500K', '$500K+'].map(target => (
                              <button
                                key={target}
                                type="button"
                                onClick={() => handleButtonSelect('targetMonthlyRevenue', target)}
                                className={`px-4 py-2 border transition-all duration-300 font-paragraph text-sm ${
                                  formData.targetMonthlyRevenue === target
                                    ? 'border-gold-antique bg-gold-antique/10 text-gold-antique'
                                    : 'border-divider text-ivory-body hover:border-gold-antique/50'
                                }`}
                              >
                                {target}
                              </button>
                            ))}
                          </div>
                          {errors.targetMonthlyRevenue && <p className="text-red-500 text-xs mt-2">{errors.targetMonthlyRevenue}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-4">What's your estimated budget for this engagement? *</label>
                          <div className="flex flex-wrap gap-3">
                            {['I\'m Flexible', 'Under $1K', '$1K–$3K', '$3K–$5K', '$5K+'].map(budget => (
                              <button
                                key={budget}
                                type="button"
                                onClick={() => handleButtonSelect('estimatedBudget', budget)}
                                className={`px-4 py-2 border transition-all duration-300 font-paragraph text-sm ${
                                  formData.estimatedBudget === budget
                                    ? 'border-gold-antique bg-gold-antique/10 text-gold-antique'
                                    : 'border-divider text-ivory-body hover:border-gold-antique/50'
                                }`}
                              >
                                {budget}
                              </button>
                            ))}
                          </div>
                          {errors.estimatedBudget && <p className="text-red-500 text-xs mt-2">{errors.estimatedBudget}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-3">How soon are you looking to start? *</label>
                          <select
                            name="timelineToStart"
                            value={formData.timelineToStart}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base"
                          >
                            <option value="">Select timeline</option>
                            <option value="immediately">Immediately</option>
                            <option value="2-weeks">Within 2 weeks</option>
                            <option value="1-month">Within a month</option>
                            <option value="exploring">Just exploring</option>
                          </select>
                          {errors.timelineToStart && <p className="text-red-500 text-xs mt-2">{errors.timelineToStart}</p>}
                        </div>

                        <div>
                          <label className="block font-paragraph text-sm text-ivory-primary mb-3">Why Glacier Eagle specifically? *</label>
                          <textarea
                            name="whyGlacierEagle"
                            value={formData.whyGlacierEagle}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gold-antique/30 text-ivory-primary placeholder-ivory-body/40 focus:outline-none focus:border-gold-antique transition-colors duration-300 pb-3 font-paragraph text-base resize-none"
                            placeholder="What made you apply here and not somewhere else?"
                            rows={3}
                          />
                          {errors.whyGlacierEagle && <p className="text-red-500 text-xs mt-2">{errors.whyGlacierEagle}</p>}
                        </div>
                      </div>
                    )}

                    {/* STEP 5: Review & Submit */}
                    {currentStep === 5 && (
                      <div className="space-y-8">
                        <div>
                          <p className="font-label text-xs uppercase tracking-widest text-gold-antique mb-8">// Confirm Your Application</p>
                        </div>

                        <div className="space-y-8 bg-card-bg border border-divider p-8 rounded-sm">
                          {/* Contact Information Summary */}
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-heading text-lg text-ivory-primary">Contact Information</h3>
                              <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className="text-gold-antique text-sm hover:text-ivory-primary transition-colors"
                              >
                                Edit
                              </button>
                            </div>
                            <div className="space-y-2 font-paragraph text-sm text-ivory-body">
                              <p><span className="text-ivory-primary">Name:</span> {formData.fullName}</p>
                              <p><span className="text-ivory-primary">Role:</span> {formData.jobTitle}</p>
                              <p><span className="text-ivory-primary">Email:</span> {formData.businessEmail}</p>
                              <p><span className="text-ivory-primary">Phone:</span> {formData.countryCode} {formData.phoneNumber}</p>
                              <p><span className="text-ivory-primary">Country:</span> {formData.country}</p>
                            </div>
                          </div>

                          {/* Company Profile Summary */}
                          <div className="border-t border-divider pt-6">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-heading text-lg text-ivory-primary">Company Profile</h3>
                              <button
                                type="button"
                                onClick={() => setCurrentStep(2)}
                                className="text-gold-antique text-sm hover:text-ivory-primary transition-colors"
                              >
                                Edit
                              </button>
                            </div>
                            <div className="space-y-2 font-paragraph text-sm text-ivory-body">
                              <p><span className="text-ivory-primary">Company:</span> {formData.companyName}</p>
                              <p><span className="text-ivory-primary">Website:</span> {formData.companyWebsite}</p>
                              <p><span className="text-ivory-primary">Type:</span> {formData.businessType}</p>
                              <p><span className="text-ivory-primary">Industry:</span> {formData.industry}</p>
                              <p><span className="text-ivory-primary">Years in Business:</span> {formData.yearsInBusiness}</p>
                              <p><span className="text-ivory-primary">Team Size:</span> {formData.teamSize}</p>
                            </div>
                          </div>

                          {/* Revenue Summary */}
                          <div className="border-t border-divider pt-6">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-heading text-lg text-ivory-primary">Revenue & Situation</h3>
                              <button
                                type="button"
                                onClick={() => setCurrentStep(3)}
                                className="text-gold-antique text-sm hover:text-ivory-primary transition-colors"
                              >
                                Edit
                              </button>
                            </div>
                            <div className="space-y-2 font-paragraph text-sm text-ivory-body">
                              <p><span className="text-ivory-primary">Monthly Revenue:</span> {formData.monthlyRevenue}</p>
                              <p><span className="text-ivory-primary">Revenue Model:</span> {formData.revenueModel}</p>
                              <p><span className="text-ivory-primary">Challenges:</span> {formData.revenueChallenge.join(', ')}</p>
                              <p><span className="text-ivory-primary">Working with Other Agency:</span> {formData.workingWithOtherAgency}</p>
                            </div>
                          </div>

                          {/* Goals Summary */}
                          <div className="border-t border-divider pt-6">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-heading text-lg text-ivory-primary">Goals & Readiness</h3>
                              <button
                                type="button"
                                onClick={() => setCurrentStep(4)}
                                className="text-gold-antique text-sm hover:text-ivory-primary transition-colors"
                              >
                                Edit
                              </button>
                            </div>
                            <div className="space-y-2 font-paragraph text-sm text-ivory-body">
                              <p><span className="text-ivory-primary">Primary Goal:</span> {formData.primaryGoal}</p>
                              <p><span className="text-ivory-primary">Target Revenue:</span> {formData.targetMonthlyRevenue}</p>
                              <p><span className="text-ivory-primary">Budget:</span> {formData.estimatedBudget}</p>
                              <p><span className="text-ivory-primary">Timeline:</span> {formData.timelineToStart}</p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-divider pt-8">
                          <p className="font-label text-xs uppercase tracking-widest text-ivory-body/60 mb-6">
                            // By submitting this application, you confirm the information provided is accurate and you are authorized to make business decisions for your company.
                          </p>
                          <label className="flex items-start cursor-pointer group">
                            <input
                              type="checkbox"
                              name="confirmAccuracy"
                              checked={formData.confirmAccuracy}
                              onChange={handleInputChange}
                              className="mr-3 w-4 h-4 border border-gold-antique/50 bg-transparent cursor-pointer accent-gold-antique mt-1"
                            />
                            <span className="font-paragraph text-sm text-ivory-body group-hover:text-ivory-primary transition-colors">
                              I confirm the above information is accurate and complete
                            </span>
                          </label>
                          {errors.confirmAccuracy && <p className="text-red-500 text-xs mt-2">{errors.confirmAccuracy}</p>}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <motion.div
                  className="flex justify-between items-center mt-12 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className={`px-8 py-3 font-label text-xs uppercase tracking-[1.8px] transition-all duration-300 ${
                      currentStep === 1
                        ? 'text-ivory-body opacity-50 cursor-not-allowed'
                        : 'text-ivory-primary hover:text-gold-antique'
                    }`}
                  >
                    Previous
                  </button>

                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-11 py-4 border border-gold-antique text-gold-antique font-label text-xs uppercase tracking-[1.8px] hover:bg-gold-antique hover:text-navy-dark transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-11 py-4 border border-gold-antique text-gold-antique font-label text-xs uppercase tracking-[1.8px] hover:bg-gold-antique hover:text-navy-dark transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Submit Application
                    </button>
                  )}
                </motion.div>

                {currentStep === 5 && (
                  <motion.p
                    className="text-center font-label text-xs uppercase tracking-widest text-ivory-body/60 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    ≈ 48hr response · Strictly confidential · No spam
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
