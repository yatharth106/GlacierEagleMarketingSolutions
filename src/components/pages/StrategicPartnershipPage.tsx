import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FormData {
  // Step 1
  fullName: string;
  companyName: string;
  websiteUrl: string;
  industry: string;
  monthlyRevenue: string;
  yearsInOperation: string;
  
  // Step 2
  primaryAcquisitionChannel: string;
  monthlyAdSpend: string;
  conversionRate: string;
  customerLifetimeValue: string;
  revenueConstraint: string;
  
  // Step 3
  openToRevenueShare: string;
  comfortableSharingData: string;
  partnershipModel: string;
  successIn12Months: string;
  
  // Step 4
  operationalCapacity: string;
  decisionMakersAvailable: string;
  timelineToBegin: string;
  whyGoodFit: string;
}

export default function StrategicPartnershipPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    companyName: '',
    websiteUrl: '',
    industry: '',
    monthlyRevenue: '',
    yearsInOperation: '',
    primaryAcquisitionChannel: '',
    monthlyAdSpend: '',
    conversionRate: '',
    customerLifetimeValue: '',
    revenueConstraint: '',
    openToRevenueShare: '',
    comfortableSharingData: '',
    partnershipModel: '',
    successIn12Months: '',
    operationalCapacity: '',
    decisionMakersAvailable: '',
    timelineToBegin: '',
    whyGoodFit: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
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
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-navy-dark">
        <Header />
        <main className="flex-1">
          <motion.div
            className="max-w-[850px] mx-auto px-6 py-[140px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center">
              <h1 className="font-heading text-5xl md:text-6xl text-ivory-primary mb-8">
                Application Received
              </h1>
              <p className="font-paragraph text-lg text-ivory-body mb-12">
                Our team reviews each submission personally.<br />
                If aligned, you will receive a response within 3–5 business days.<br />
                <br />
                No automated scheduling links immediately.<br />
                Manual review = authority.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="inline-block px-11 py-4 border border-gold-antique text-gold-antique font-label text-xs uppercase tracking-[1.8px] hover:bg-gold-antique hover:text-navy-dark transition-all duration-300 hover:-translate-y-0.5"
              >
                Return Home
              </button>
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
        <motion.div
          className="max-w-[850px] mx-auto px-6 py-[140px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Intro Block */}
          <div className="text-center mb-16">
            <motion.p
              className="font-label text-xs uppercase tracking-widest text-gold-antique mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Application
            </motion.p>
            <motion.h1
              className="font-heading text-5xl md:text-6xl text-ivory-primary mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Request a Private Revenue Audit
            </motion.h1>
            <motion.div
              className="w-[60px] h-px bg-gold-antique mx-auto mb-8"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
            <motion.p
              className="font-paragraph text-lg text-ivory-body max-w-[600px] mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              We work with a limited number of companies at a time.
              This application determines structural fit and growth alignment.
            </motion.p>
          </div>

          {/* Progress Bar */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex-1 mx-1">
                  <div
                    className={`h-1 rounded-full transition-colors duration-300 ${
                      step <= currentStep ? 'bg-gold-antique' : 'bg-divider'
                    }`}
                  />
                </div>
              ))}
            </div>
            <p className="text-center font-label text-xs uppercase tracking-widest text-ivory-body">
              Step {currentStep} of 4
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <motion.div
              key={`step-${currentStep}`}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* STEP 1 - COMPANY FOUNDATION */}
              {currentStep === 1 && (
                <div className="space-y-7">
                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Website URL
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base"
                      placeholder="https://yourcompany.com"
                    />
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base"
                    >
                      <option value="">Select an industry</option>
                      <option value="saas">SaaS</option>
                      <option value="retail">Retail / eCommerce</option>
                      <option value="other">Other (specify)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Current Monthly Revenue
                    </label>
                    <select
                      name="monthlyRevenue"
                      value={formData.monthlyRevenue}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base"
                    >
                      <option value="">Select revenue range</option>
                      <option value="under-25k">Under $25k</option>
                      <option value="25k-100k">$25k–$100k</option>
                      <option value="100k-500k">$100k–$500k</option>
                      <option value="500k-plus">$500k+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Years in Operation
                    </label>
                    <input
                      type="number"
                      name="yearsInOperation"
                      value={formData.yearsInOperation}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base"
                      placeholder="Years"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2 - STRUCTURAL DATA */}
              {currentStep === 2 && (
                <div className="space-y-7">
                  <div>
                    <h2 className="font-heading text-3xl text-ivory-primary mb-8">
                      Performance Architecture
                    </h2>
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Primary Acquisition Channel
                    </label>
                    <input
                      type="text"
                      name="primaryAcquisitionChannel"
                      value={formData.primaryAcquisitionChannel}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base"
                      placeholder="e.g., Paid ads, organic, partnerships"
                    />
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Monthly Ad Spend (if any)
                    </label>
                    <input
                      type="text"
                      name="monthlyAdSpend"
                      value={formData.monthlyAdSpend}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base"
                      placeholder="$0 or amount"
                    />
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Current Conversion Rate (if known)
                    </label>
                    <input
                      type="text"
                      name="conversionRate"
                      value={formData.conversionRate}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base"
                      placeholder="e.g., 2.5%"
                    />
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Customer Lifetime Value (if known)
                    </label>
                    <input
                      type="text"
                      name="customerLifetimeValue"
                      value={formData.customerLifetimeValue}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base"
                      placeholder="$0 or amount"
                    />
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Biggest Revenue Constraint
                    </label>
                    <textarea
                      name="revenueConstraint"
                      value={formData.revenueConstraint}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base resize-none"
                      placeholder="What's holding you back from growing faster?"
                      rows={4}
                    />
                  </div>

                  <p className="font-paragraph text-sm text-ivory-body">
                    Accurate data allows us to diagnose structural gaps precisely.
                  </p>
                </div>
              )}

              {/* STEP 3 - ALIGNMENT & MODEL FIT */}
              {currentStep === 3 && (
                <div className="space-y-7">
                  <div>
                    <h2 className="font-heading text-3xl text-ivory-primary mb-8">
                      Partnership Alignment
                    </h2>
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Are you open to performance-based revenue share?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="openToRevenueShare"
                          value="yes"
                          checked={formData.openToRevenueShare === 'yes'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="font-paragraph text-base text-ivory-primary">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="openToRevenueShare"
                          value="no"
                          checked={formData.openToRevenueShare === 'no'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="font-paragraph text-base text-ivory-primary">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Are you comfortable sharing backend performance data?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="comfortableSharingData"
                          value="yes"
                          checked={formData.comfortableSharingData === 'yes'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="font-paragraph text-base text-ivory-primary">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="comfortableSharingData"
                          value="no"
                          checked={formData.comfortableSharingData === 'no'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="font-paragraph text-base text-ivory-primary">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Partnership Model Preference
                    </label>
                    <select
                      name="partnershipModel"
                      value={formData.partnershipModel}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base"
                    >
                      <option value="">Select a model</option>
                      <option value="pure-revenue-share">Pure revenue share</option>
                      <option value="hybrid">Hybrid (stabilization + revenue share)</option>
                      <option value="equity">Equity partnership discussion (1% option for qualified companies)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      What does success look like in 12 months?
                    </label>
                    <textarea
                      name="successIn12Months"
                      value={formData.successIn12Months}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base resize-none"
                      placeholder="Describe your vision for growth..."
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4 - STRATEGIC READINESS */}
              {currentStep === 4 && (
                <div className="space-y-7">
                  <div>
                    <h2 className="font-heading text-3xl text-ivory-primary mb-8">
                      Commitment & Readiness
                    </h2>
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Do you have internal operational capacity to handle growth?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="operationalCapacity"
                          value="yes"
                          checked={formData.operationalCapacity === 'yes'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="font-paragraph text-base text-ivory-primary">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="operationalCapacity"
                          value="no"
                          checked={formData.operationalCapacity === 'no'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="font-paragraph text-base text-ivory-primary">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Are key decision-makers available weekly?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="decisionMakersAvailable"
                          value="yes"
                          checked={formData.decisionMakersAvailable === 'yes'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="font-paragraph text-base text-ivory-primary">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="decisionMakersAvailable"
                          value="no"
                          checked={formData.decisionMakersAvailable === 'no'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="font-paragraph text-base text-ivory-primary">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Timeline to Begin
                    </label>
                    <select
                      name="timelineToBegin"
                      value={formData.timelineToBegin}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base"
                    >
                      <option value="">Select timeline</option>
                      <option value="immediately">Immediately</option>
                      <option value="30-days">30 days</option>
                      <option value="60-plus-days">60+ days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-gold-antique mb-3">
                      Why do you believe your company is a strong fit for a revenue-aligned partnership?
                    </label>
                    <textarea
                      name="whyGoodFit"
                      value={formData.whyGoodFit}
                      onChange={handleInputChange}
                      className="w-full bg-card-bg border border-divider text-ivory-primary placeholder-ivory-body focus:border-gold-antique focus:outline-none transition-colors duration-300 px-4 py-3 rounded-sm font-paragraph text-base resize-none"
                      placeholder="Tell us why you're a strong fit..."
                      rows={5}
                    />
                  </div>
                </div>
              )}
            </motion.div>

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

              {currentStep < 4 ? (
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
                  Submit for Review
                </button>
              )}
            </motion.div>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
