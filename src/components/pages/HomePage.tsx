// HPI 1.7-G
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ProblemStatements, OptimizationMetrics, TargetIndustries } from '@/entities';
import PageLayout from '@/components/PageLayout';
import { ArrowRight, Check, ChevronDown, Minus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// --- Utility Components for Motion & Layout ---

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

const StaggerContainer = ({ children, className = "", staggerDelay = 0.1 }: { children: React.ReactNode, className?: string, staggerDelay?: number }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const ParallaxText = ({ children, speed = 1, className = "" }: { children: React.ReactNode, speed?: number, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);
  
  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

// --- Main Component ---

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [problems, setProblems] = useState<ProblemStatements[]>([]);
  const [metrics, setMetrics] = useState<OptimizationMetrics[]>([]);
  const [industries, setIndustries] = useState<TargetIndustries[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditFormData, setAuditFormData] = useState({
    companyName: '',
    arrRange: '',
    revenueChallenge: '',
    emailPlatform: '',
    crm: '',
    leadVolume: '',
    founderContactNumber: ''
  });
  const [auditFormErrors, setAuditFormErrors] = useState<Record<string, string>>({});
  const [isSubmittingAudit, setIsSubmittingAudit] = useState(false);
  const [auditSubmitStatus, setAuditSubmitStatus] = useState<'idle' | 'success'>('idle');

  // --- Scroll Progress for Global Indicator ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    loadData();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isAuditModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAuditModalOpen]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [problemsResult, metricsResult, industriesResult] = await Promise.all([
        BaseCrudService.getAll<ProblemStatements>('problemstatements'),
        BaseCrudService.getAll<OptimizationMetrics>('optimizationmetrics'),
        BaseCrudService.getAll<TargetIndustries>('targetindustries')
      ]);
      setProblems(problemsResult.items);
      setMetrics(metricsResult.items);
      setIndustries(industriesResult.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateAuditForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!auditFormData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!auditFormData.arrRange) {
      newErrors.arrRange = 'ARR range is required';
    }
    if (!auditFormData.revenueChallenge.trim()) {
      newErrors.revenueChallenge = 'Revenue challenge is required';
    }
    if (!auditFormData.emailPlatform) {
      newErrors.emailPlatform = 'Email platform is required';
    }
    if (!auditFormData.crm) {
      newErrors.crm = 'CRM is required';
    }
    if (!auditFormData.leadVolume) {
      newErrors.leadVolume = 'Lead volume is required';
    }
    if (!auditFormData.founderContactNumber.trim()) {
      newErrors.founderContactNumber = 'Contact number is required';
    }

    setAuditFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation check - does not affect scroll ref rendering
    if (validateAuditForm()) {
      setIsSubmittingAudit(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmittingAudit(false);
      setAuditSubmitStatus('success');
    }
  };

  const closeAuditModal = () => {
    setAuditFormData({
      companyName: '',
      arrRange: '',
      revenueChallenge: '',
      emailPlatform: '',
      crm: '',
      leadVolume: '',
      founderContactNumber: ''
    });
    setAuditFormErrors({});
    setAuditSubmitStatus('idle');
    setIsAuditModalOpen(false);
  };

  return (
    <PageLayout>
      {/* Global Scroll Progress - Rendered unconditionally to ensure ref hydration */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold-antique origin-left z-50"
        style={{ scaleX }}
      />
      {/* --- Audit Modal --- */}
      {isAuditModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          onClick={() => setIsAuditModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-navy-dark border border-gold-antique/30 rounded-lg max-w-2xl w-full max-h-[95vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {auditSubmitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center p-6 md:p-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-gold-antique/20 rounded-full flex items-center justify-center mb-6"
                >
                  <Check className="w-8 h-8 text-gold-antique" />
                </motion.div>
                <h2 className="text-3xl font-heading text-ivory-primary mb-4">Application Received</h2>
                <p className="text-ivory-primary/70 mb-2">
                  Thank you for your interest in Glacier Eagle.
                </p>
                <p className="text-sm text-ivory-primary/60 mb-8">
                  We'll review your application and reach out within 2-3 business days if we're a fit.
                </p>
                <Button
                  onClick={closeAuditModal}
                  className="bg-bronze-burnished text-ivory-primary hover:bg-bronze-burnished/90 rounded-none px-8 py-3 text-base font-medium tracking-wide"
                >
                  Close
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6 flex-shrink-0 px-6 md:px-8 pt-6 md:pt-8">
                  <h2 className="text-2xl md:text-3xl font-heading text-ivory-primary">Request a Private Revenue Audit</h2>
                  <button
                    onClick={() => setIsAuditModalOpen(false)}
                    className="text-ivory-primary/60 hover:text-ivory-primary transition-colors flex-shrink-0 ml-4"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAuditSubmit} className="flex-1 overflow-y-auto px-6 md:px-8 space-y-4">
                  {Object.keys(auditFormErrors).length > 0 && (
                <div className="p-3 bg-destructive/10 border border-destructive rounded-lg flex-shrink-0">
                  <p className="text-xs md:text-sm font-paragraph text-destructive font-semibold">
                    Please fill out all required fields
                  </p>
                </div>
              )}

              <div>
                <Label className={`text-ivory-primary mb-1 block text-sm ${auditFormErrors.companyName ? 'text-destructive' : ''}`}>
                  Company Name
                </Label>
                <Input
                  type="text"
                  placeholder="Your company name"
                  value={auditFormData.companyName}
                  onChange={(e) => {
                    setAuditFormData({ ...auditFormData, companyName: e.target.value });
                    if (auditFormErrors.companyName) {
                      setAuditFormErrors({ ...auditFormErrors, companyName: '' });
                    }
                  }}
                  className={`bg-slate-deep text-ivory-primary placeholder:text-ivory-primary/40 text-sm py-2 ${
                    auditFormErrors.companyName ? 'border-2 border-destructive' : 'border-gold-antique/30'
                  }`}
                />
                {auditFormErrors.companyName && (
                  <p className="text-xs text-destructive mt-0.5">{auditFormErrors.companyName}</p>
                )}
              </div>

              <div>
                <Label className={`text-ivory-primary mb-1 block text-sm ${auditFormErrors.arrRange ? 'text-destructive' : ''}`}>
                  Annual Recurring Revenue (ARR)
                </Label>
                <Select value={auditFormData.arrRange} onValueChange={(value) => {
                  setAuditFormData({ ...auditFormData, arrRange: value });
                  if (auditFormErrors.arrRange) {
                    setAuditFormErrors({ ...auditFormErrors, arrRange: '' });
                  }
                }}>
                  <SelectTrigger className={`bg-slate-deep text-ivory-primary text-sm py-2 ${
                    auditFormErrors.arrRange ? 'border-2 border-destructive' : 'border-gold-antique/30'
                  }`}>
                    <SelectValue placeholder="Select ARR range" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-deep border-gold-antique/30">
                    <SelectItem value="0-500k" className="text-ivory-primary">$0 - $500K</SelectItem>
                    <SelectItem value="500k-2m" className="text-ivory-primary">$500K - $2M</SelectItem>
                    <SelectItem value="2m-10m" className="text-ivory-primary">$2M - $10M</SelectItem>
                    <SelectItem value="10m+" className="text-ivory-primary">$10M+</SelectItem>
                  </SelectContent>
                </Select>
                {auditFormErrors.arrRange && (
                  <p className="text-xs text-destructive mt-0.5">{auditFormErrors.arrRange}</p>
                )}
              </div>

              <div>
                <Label className={`text-ivory-primary mb-1 block text-sm ${auditFormErrors.revenueChallenge ? 'text-destructive' : ''}`}>
                  Primary Revenue Challenge
                </Label>
                <Textarea
                  placeholder="What's your biggest revenue bottleneck?"
                  value={auditFormData.revenueChallenge}
                  onChange={(e) => {
                    setAuditFormData({ ...auditFormData, revenueChallenge: e.target.value });
                    if (auditFormErrors.revenueChallenge) {
                      setAuditFormErrors({ ...auditFormErrors, revenueChallenge: '' });
                    }
                  }}
                  className={`bg-slate-deep text-ivory-primary placeholder:text-ivory-primary/40 min-h-16 text-sm py-2 ${
                    auditFormErrors.revenueChallenge ? 'border-2 border-destructive' : 'border-gold-antique/30'
                  }`}
                />
                {auditFormErrors.revenueChallenge && (
                  <p className="text-xs text-destructive mt-0.5">{auditFormErrors.revenueChallenge}</p>
                )}
              </div>

              <div>
                <Label className={`text-ivory-primary mb-1 block text-sm ${auditFormErrors.emailPlatform ? 'text-destructive' : ''}`}>
                  Email Platform
                </Label>
                <Select value={auditFormData.emailPlatform} onValueChange={(value) => {
                  setAuditFormData({ ...auditFormData, emailPlatform: value });
                  if (auditFormErrors.emailPlatform) {
                    setAuditFormErrors({ ...auditFormErrors, emailPlatform: '' });
                  }
                }}>
                  <SelectTrigger className={`bg-slate-deep text-ivory-primary text-sm py-2 ${
                    auditFormErrors.emailPlatform ? 'border-2 border-destructive' : 'border-gold-antique/30'
                  }`}>
                    <SelectValue placeholder="Select email platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-deep border-gold-antique/30">
                    <SelectItem value="klaviyo" className="text-ivory-primary">Klaviyo</SelectItem>
                    <SelectItem value="hubspot" className="text-ivory-primary">HubSpot</SelectItem>
                    <SelectItem value="mailchimp" className="text-ivory-primary">Mailchimp</SelectItem>
                    <SelectItem value="other" className="text-ivory-primary">Other</SelectItem>
                  </SelectContent>
                </Select>
                {auditFormErrors.emailPlatform && (
                  <p className="text-xs text-destructive mt-0.5">{auditFormErrors.emailPlatform}</p>
                )}
              </div>

              <div>
                <Label className={`text-ivory-primary mb-1 block text-sm ${auditFormErrors.crm ? 'text-destructive' : ''}`}>
                  CRM System
                </Label>
                <Select value={auditFormData.crm} onValueChange={(value) => {
                  setAuditFormData({ ...auditFormData, crm: value });
                  if (auditFormErrors.crm) {
                    setAuditFormErrors({ ...auditFormErrors, crm: '' });
                  }
                }}>
                  <SelectTrigger className={`bg-slate-deep text-ivory-primary text-sm py-2 ${
                    auditFormErrors.crm ? 'border-2 border-destructive' : 'border-gold-antique/30'
                  }`}>
                    <SelectValue placeholder="Select CRM" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-deep border-gold-antique/30">
                    <SelectItem value="salesforce" className="text-ivory-primary">Salesforce</SelectItem>
                    <SelectItem value="hubspot" className="text-ivory-primary">HubSpot</SelectItem>
                    <SelectItem value="pipedrive" className="text-ivory-primary">Pipedrive</SelectItem>
                    <SelectItem value="other" className="text-ivory-primary">Other</SelectItem>
                  </SelectContent>
                </Select>
                {auditFormErrors.crm && (
                  <p className="text-xs text-destructive mt-0.5">{auditFormErrors.crm}</p>
                )}
              </div>

              <div>
                <Label className={`text-ivory-primary mb-1 block text-sm ${auditFormErrors.leadVolume ? 'text-destructive' : ''}`}>
                  Monthly Lead Volume
                </Label>
                <Select value={auditFormData.leadVolume} onValueChange={(value) => {
                  setAuditFormData({ ...auditFormData, leadVolume: value });
                  if (auditFormErrors.leadVolume) {
                    setAuditFormErrors({ ...auditFormErrors, leadVolume: '' });
                  }
                }}>
                  <SelectTrigger className={`bg-slate-deep text-ivory-primary text-sm py-2 ${
                    auditFormErrors.leadVolume ? 'border-2 border-destructive' : 'border-gold-antique/30'
                  }`}>
                    <SelectValue placeholder="Select lead volume" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-deep border-gold-antique/30">
                    <SelectItem value="0-100" className="text-ivory-primary">0 - 100</SelectItem>
                    <SelectItem value="100-500" className="text-ivory-primary">100 - 500</SelectItem>
                    <SelectItem value="500-1000" className="text-ivory-primary">500 - 1,000</SelectItem>
                    <SelectItem value="1000+" className="text-ivory-primary">1,000+</SelectItem>
                  </SelectContent>
                </Select>
                {auditFormErrors.leadVolume && (
                  <p className="text-xs text-destructive mt-0.5">{auditFormErrors.leadVolume}</p>
                )}
              </div>

              <div>
                <Label className={`text-ivory-primary mb-1 block text-sm ${auditFormErrors.founderContactNumber ? 'text-destructive' : ''}`}>
                  Founder/Executive Contact Number
                </Label>
                <Input
                  type="tel"
                  placeholder="Your phone number"
                  value={auditFormData.founderContactNumber}
                  onChange={(e) => {
                    setAuditFormData({ ...auditFormData, founderContactNumber: e.target.value });
                    if (auditFormErrors.founderContactNumber) {
                      setAuditFormErrors({ ...auditFormErrors, founderContactNumber: '' });
                    }
                  }}
                  className={`bg-slate-deep text-ivory-primary placeholder:text-ivory-primary/40 text-sm py-2 ${
                    auditFormErrors.founderContactNumber ? 'border-2 border-destructive' : 'border-gold-antique/30'
                  }`}
                />
                {auditFormErrors.founderContactNumber && (
                  <p className="text-xs text-destructive mt-0.5">{auditFormErrors.founderContactNumber}</p>
                )}
              </div>

              <Button
                type="submit"
                onClick={handleAuditSubmit}
                disabled={isSubmittingAudit}
                className="w-full bg-bronze-burnished text-ivory-primary hover:bg-bronze-burnished/90 rounded-none px-6 py-4 text-base font-medium tracking-wide disabled:opacity-50 flex-shrink-0 mt-4 mb-6 md:mb-8"
              >
                {isSubmittingAudit ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
            </>
            )}
          </motion.div>
        </motion.div>
      )}
      {/* --- 1. Pre-Hero Micro Statement --- */}
      <section className="w-full pt-32 pb-8 relative z-10">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-ivory-primary/50">
              Private Revenue Advisory for B2B Founders
            </p>
          </FadeIn>
        </div>
      </section>
      {/* --- 2. Hero Section --- */}
      <section className="w-full relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Subtle Background Texture/Motion */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
           <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-forest/10 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }} />
           <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold-antique/5 rounded-full blur-[120px] mix-blend-multiply" />
        </div>

        <div className="max-w-[120rem] mx-auto px-6 md:px-12 relative z-10 text-center">
          <FadeIn delay={0.1}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-ivory-primary leading-[0.95] tracking-tight mb-12">
              Email That Moves <br />
              <span className="text-gold-antique italic font-serif">Revenue.</span> Not Just Metrics.
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-ivory-primary/80 max-w-3xl mx-auto leading-relaxed mb-16">
              We design AI-assisted, strategist-led email systems that convert free trials, dormant leads, and silent prospects into qualified pipeline and measurable cash flow.
            </p>
          </FadeIn>

          <FadeIn delay={0.5} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => setIsAuditModalOpen(true)}
              className="bg-bronze-burnished text-ivory-primary border border-gold-antique hover:bg-bronze-burnished/90 rounded-none px-10 py-8 text-lg font-medium tracking-wide transition-all duration-200"
            >
              Request a Private Revenue Audit
            </Button>
            <a href="#glacier-model" onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('glacier-model');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-ivory-primary text-ivory-primary hover:bg-slate-deep/50 rounded-none px-10 py-8 text-lg font-medium tracking-wide bg-transparent transition-all duration-200"
              >
                View Our Model
              </Button>
            </a>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-ivory-primary/40">Scroll</span>
          <div className="w-[1px] h-12 bg-ivory-primary/20 overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-1/2 bg-ivory-primary"
            />
          </div>
        </motion.div>
      </section>
      {/* --- 3. Credibility Strip (Authority Bar) --- */}
      {/* --- 3.5. INDUSTRY EXPERTISE SECTION — SCALABLE VERSION --- */}
      <section className="w-full py-[140px] bg-navy-dark">
        <div className="max-w-[1150px] mx-auto px-6 md:px-12">
          {/* E1 — INTRO BLOCK (CENTERED) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center mb-24"
          >
            {/* Eyebrow */}
            <p className="text-[11px] uppercase tracking-[3px] text-gold-antique font-sans font-bold mb-6">
              Industry Architecture
            </p>
            
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-ivory-primary mb-8 leading-tight">
              Built for Structural Complexity.
            </h2>
            
            {/* Subline */}
            <p className="text-lg font-serif text-ivory-primary/75 max-w-[760px] mx-auto leading-relaxed mb-10">
              Different business models demand different revenue systems. Our work adapts to the structural mechanics of each industry we operate within.
            </p>
            
            {/* Divider */}
            <div className="w-[60px] h-px bg-gold-antique mx-auto" />
          </motion.div>

          {/* E2 — INDUSTRY GRID SYSTEM */}
          <div className="mb-24">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 gap-y-24">
                {[1, 2].map(i => (
                  <div key={i} className="h-80 bg-gold-antique/10 animate-pulse rounded-sm" />
                ))}
              </div>
            ) : (
              <StaggerContainer staggerDelay={0.12} className={`grid gap-20 gap-y-24 ${
                industries.length >= 6 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 md:grid-cols-2'
              }`}>
                {/* SaaS Card */}
                <StaggerItem>
                  <motion.div
                    whileHover={{ 
                      borderColor: 'rgba(168, 132, 59, 0.4)',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
                      y: -2
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-[rgba(255,255,255,0.02)] p-[60px] border border-[rgba(255,255,255,0.06)] rounded-[6px] min-h-full flex flex-col justify-between"
                  >
                    {/* Industry Label */}
                    <p className="text-[10px] uppercase tracking-[2px] text-gold-antique font-sans font-bold mb-[14px]">
                      SaaS
                    </p>
                    
                    {/* Headline */}
                    <h3 className="text-[26px] md:text-[30px] font-heading text-ivory-primary mb-5 leading-tight">
                      Recurring Revenue Architecture
                    </h3>
                    
                    {/* Description */}
                    <p className="text-[17px] font-serif text-ivory-primary/75 leading-[1.8] mb-7">
                      SaaS growth depends on retention mechanics, activation velocity, pricing logic, and lifetime value alignment. Scale compounds only when churn, onboarding, and expansion are structurally integrated.
                    </p>
                    
                    {/* Divider */}
                    <div className="w-full h-px bg-[rgba(255,255,255,0.08)] my-7" />
                    
                    {/* Leverage List */}
                    <div className="space-y-4">
                      {[
                        'LTV/CAC alignment',
                        'Activation flow engineering',
                        'Pricing model optimization',
                        'Expansion revenue design',
                        'Data-informed growth loops'
                      ].map((item, idx) => (
                        <p key={idx} className="text-[16px] font-serif text-ivory-primary/75 leading-[1.8]">
                          {item}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                </StaggerItem>

                {/* Retail & E-Commerce Card */}
                <StaggerItem>
                  <motion.div
                    whileHover={{ 
                      borderColor: 'rgba(168, 132, 59, 0.4)',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
                      y: -2
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-[rgba(255,255,255,0.02)] p-[60px] border border-[rgba(255,255,255,0.06)] rounded-[6px] min-h-full flex flex-col justify-between"
                  >
                    {/* Industry Label */}
                    <p className="text-[10px] uppercase tracking-[2px] text-gold-antique font-sans font-bold mb-[14px]">
                      Retail & E-Commerce
                    </p>
                    
                    {/* Headline */}
                    <h3 className="text-[26px] md:text-[30px] font-heading text-ivory-primary mb-5 leading-tight">
                      Conversion & Margin Systems
                    </h3>
                    
                    {/* Description */}
                    <p className="text-[17px] font-serif text-ivory-primary/75 leading-[1.8] mb-7">
                      Retail performance is governed by unit economics, conversion efficiency, offer structure, and customer lifetime value. Sustainable scale requires margin-aware acquisition and retention architecture.
                    </p>
                    
                    {/* Divider */}
                    <div className="w-full h-px bg-[rgba(255,255,255,0.08)] my-7" />
                    
                    {/* Leverage List */}
                    <div className="space-y-4">
                      {[
                        'Conversion rate optimization',
                        'AOV and bundling logic',
                        'Retention lifecycle design',
                        'Paid acquisition efficiency',
                        'Margin-sensitive scaling models'
                      ].map((item, idx) => (
                        <p key={idx} className="text-[16px] font-serif text-ivory-primary/75 leading-[1.8]">
                          {item}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                </StaggerItem>

                {/* Render additional industries from CMS if available */}
                {industries.map((industry, idx) => (
                  <StaggerItem key={industry._id}>
                    <motion.div
                      whileHover={{ 
                        borderColor: 'rgba(168, 132, 59, 0.4)',
                        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
                        y: -2
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="bg-[rgba(255,255,255,0.02)] p-[60px] border border-[rgba(255,255,255,0.06)] rounded-[6px] min-h-full flex flex-col justify-between"
                    >
                      {/* Industry Label */}
                      <p className="text-[10px] uppercase tracking-[2px] text-gold-antique font-sans font-bold mb-[14px]">
                        {industry.industryName}
                      </p>
                      
                      {/* Headline */}
                      <h3 className="text-[26px] md:text-[30px] font-heading text-ivory-primary mb-5 leading-tight">
                        {industry.description}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-[17px] font-serif text-ivory-primary/75 leading-[1.8] mb-7">
                        {industry.targetAudience}
                      </p>
                      
                      {/* Divider */}
                      <div className="w-full h-px bg-[rgba(255,255,255,0.08)] my-7" />
                      
                      {/* Leverage List */}
                      <div className="space-y-4">
                        {industry.exampleCompanies && (
                          <p className="text-[16px] font-serif text-ivory-primary/75 leading-[1.8]">
                            {industry.exampleCompanies}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>

          {/* E3 — REINFORCEMENT STATEMENT */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mt-[110px]"
          >
            <p className="text-lg font-serif text-ivory-primary/75 leading-relaxed">
              Our expansion into new industries follows structural qualification, not trend participation.
            </p>
          </motion.div>
        </div>
      </section>
      {/* --- 4. The Real Problem (Sticky Scroll Layout) --- */}
      <section className="w-full bg-navy-dark py-[150px]">
        <div className="max-w-[1150px] mx-auto px-6 md:px-12">
          {/* E1 — HEADLINE BLOCK */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center mb-[100px]"
          >
            {/* Eyebrow */}
            <p className="text-[11px] uppercase tracking-[3px] text-gold-antique font-sans font-bold mb-6">
              Selection Criteria
            </p>
            
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-heading font-semibold text-ivory-primary mb-8 leading-[1.15]">
              Most Firms Optimize Tactics.<br />
              We Engineer Systems.
            </h2>
            
            {/* Subline */}
            <p className="text-lg font-serif text-ivory-primary/75 max-w-[760px] mx-auto leading-relaxed mb-10">
              The difference is not stylistic. It is architectural.
            </p>
            
            {/* Divider */}
            <div className="w-[60px] h-px bg-gold-antique mx-auto" />
          </motion.div>

          {/* E2 — COMPARISON GRID */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-[100px]"
          >
            {/* Top Divider */}
            <div className="w-full h-px bg-[rgba(255,255,255,0.08)] mb-12" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {/* LEFT COLUMN — Typical Firms */}
              <div className="space-y-12">
                {[
                  {
                    title: "TACTIC FRAGMENTATION",
                    desc: "Separate teams for ads, funnels, and messaging with limited systemic integration."
                  },
                  {
                    title: "VOLUME DEPENDENCE",
                    desc: "Growth relies heavily on increasing traffic rather than improving architecture."
                  },
                  {
                    title: "CAMPAIGN-LEVEL OPTIMIZATION",
                    desc: "Metrics improved in isolation without structural alignment."
                  },
                  {
                    title: "SHORT ENGAGEMENT CYCLES",
                    desc: "Projects executed, then exited. System durability rarely addressed."
                  },
                  {
                    title: "AI AS TOOLING",
                    desc: "AI used for execution speed, not structural intelligence."
                  }
                ].map((item, idx) => (
                  <div key={idx} className={idx !== 0 ? "border-t border-[rgba(255,255,255,0.08)] pt-12" : ""}>
                    <p className="text-[10px] uppercase tracking-[2px] text-[rgba(255,255,255,0.5)] font-sans font-bold mb-3">
                      {item.title}
                    </p>
                    <p className="text-[16px] font-serif text-[rgba(244,241,234,0.6)] leading-[1.8]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* RIGHT COLUMN — Our Model */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-[rgba(255,255,255,0.02)] border border-[rgba(168,132,59,0.2)] p-[60px] rounded-[6px] space-y-12"
              >
                {[
                  {
                    title: "SYSTEM ARCHITECTURE",
                    desc: "Acquisition, conversion, retention, and expansion engineered as a unified revenue engine."
                  },
                  {
                    title: "STRUCTURAL EFFICIENCY",
                    desc: "Revenue growth derived from leverage, not dependency on traffic volume."
                  },
                  {
                    title: "DATA-DRIVEN CAUSATION",
                    desc: "AI identifies structural friction. Human oversight determines directional decisions."
                  },
                  {
                    title: "LONG-HORIZON DESIGN",
                    desc: "Engagement structured around durable systems, not campaign bursts."
                  },
                  {
                    title: "AI + HUMAN HYBRID",
                    desc: "AI handles modeling and diagnostics. Human judgment governs risk and prioritization."
                  }
                ].map((item, idx) => (
                  <div key={idx} className={idx !== 0 ? "border-t border-[rgba(255,255,255,0.08)] pt-12" : ""}>
                    <p className="text-[10px] uppercase tracking-[2px] text-gold-antique font-sans font-bold mb-3">
                      {item.title}
                    </p>
                    <p className="text-[17px] font-serif text-[rgba(244,241,234,0.75)] leading-[1.8]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* E3 — STRUCTURAL PROOF INDICATORS */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-[120px] pt-[100px] border-t border-[rgba(255,255,255,0.08)]"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 text-center">
              {[
                { number: "< 10", label: "Active Clients at Any Time" },
                { number: "100%", label: "System-Level Engagements" },
                { number: "AI + Human", label: "Hybrid Operating Model" },
                { number: "Zero", label: "Pre-Built Templates Used" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: idx * 0.12, ease: "easeOut" }}
                >
                  <div className="text-4xl md:text-5xl font-heading text-ivory-primary mb-3 leading-tight">
                    {metric.number}
                  </div>
                  <p className="text-[10px] uppercase tracking-[2px] text-gold-antique font-sans font-bold">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* E4 — CONTROLLED CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >

          </motion.div>
        </div>
      </section>
      <section className="w-full pt-0 pb-32 bg-navy-dark relative">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Sticky Left Column */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <FadeIn>
                  <h2 className="text-5xl md:text-6xl font-heading text-ivory-primary mb-8 leading-tight">
                    Your Inbox Is <br />
                    <span className="text-gold-antique italic">Leaking Revenue.</span>
                  </h2>
                  <p className="text-lg text-ivory-primary/70 mb-12 max-w-md leading-relaxed">
                    Most B2B email systems are designed for marketing metrics, not revenue outcomes. While you track open rates, your actual pipeline is silently draining away.
                  </p>
                  <div className="hidden lg:block w-24 h-[1px] bg-ivory-primary/20" />
                </FadeIn>
              </div>
            </div>

            {/* Scrollable Right Column */}
            <div className="lg:col-span-7 space-y-12">
              {isLoading ? (
                <div className="space-y-8">
                  {[1, 2, 3].map(i => <div key={i} className="h-40 bg-gold-antique/10 animate-pulse rounded-sm" />)}
                </div>
              ) : (
                problems.filter(p => p.isCommon).map((problem, index) => (
                  <motion.div
                    key={problem._id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group border-l-2 border-gold-antique/30 pl-8 py-4 hover:border-gold-antique transition-colors duration-500"
                  >
                    <h3 className="text-2xl font-heading text-ivory-primary mb-3 group-hover:text-gold-antique transition-colors">
                      {problem.problemDescription}
                    </h3>
                    {problem.symptomExample && (
                      <p className="text-base text-ivory-primary/60 leading-relaxed">
                        {problem.symptomExample}
                      </p>
                    )}
                    {problem.revenueImpact && (
                      <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-antique/70">
                        <Minus className="w-4 h-4" />
                        {problem.revenueImpact}
                      </div>
                    )}
                  </motion.div>
                ))
              )}
              
              <FadeIn delay={0.4} className="pt-12">
                <p className="text-2xl font-heading italic text-ivory-primary text-center lg:text-left">
                  "Email should accelerate pipeline velocity — not generate vanity metrics."
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      {/* --- 4.5. WHY CHOOSE US — STRUCTURAL DIFFERENTIATION SECTION --- */}
      {/* --- 5. The Glacier Eagle Model (Split Section) --- */}
      <section id="glacier-model" className="w-full bg-slate-deep py-32 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="mb-24 text-center">
            <h2 className="text-5xl md:text-6xl font-heading text-ivory-primary mb-6">A Hybrid Revenue Engine</h2>
            <p className="text-lg text-ivory-primary/60 max-w-2xl mx-auto">
              We bridge the gap between technical automation and high-level revenue strategy.
            </p>
          </FadeIn>

          {/* CTA Button after model intro */}
          <FadeIn delay={0.3} className="flex justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => setIsAuditModalOpen(true)}
              className="bg-bronze-burnished text-ivory-primary border border-gold-antique hover:bg-bronze-burnished/90 rounded-none px-10 py-8 text-lg font-medium tracking-wide transition-all duration-200"
            >
              Request a Private Revenue Audit
            </Button>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gold-antique/30 bg-navy-dark">
            {/* Left: AI Framework */}
            <div className="p-12 md:p-20 border-b md:border-b-0 md:border-r border-gold-antique/30 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold-antique/30 group-hover:bg-gold-antique transition-colors duration-500" />
              <h3 className="text-3xl font-heading text-ivory-primary mb-8 flex items-center gap-4">
                <span className="text-sm font-sans font-bold tracking-widest uppercase text-gold-antique/60">01</span>
                AI Framework Layer
              </h3>
              <ul className="space-y-6">
                {['Behavioral tracking logic', 'Trigger-based automation', 'Predictive segmentation', 'CRM integration', 'Conversion mapping'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-lg text-ivory-primary/80"
                  >
                    <div className="w-1.5 h-1.5 bg-gold-antique rounded-full" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right: Human Strategy */}
            <div className="p-12 md:p-20 bg-emerald-forest text-ivory-primary relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-1 h-full bg-gold-antique group-hover:bg-ivory-primary transition-colors duration-500" />
              <h3 className="text-3xl font-heading text-ivory-primary mb-8 flex items-center gap-4">
                <span className="text-sm font-sans font-bold tracking-widest uppercase text-gold-antique">02</span>
                Human Strategy Layer
              </h3>
              <ul className="space-y-6">
                {['Founder-level messaging', 'Revenue modeling', 'Sales cycle engineering', 'High-trust persuasion', 'Pipeline optimization'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-lg text-ivory-primary/90"
                  >
                    <div className="w-1.5 h-1.5 bg-gold-antique rounded-full" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <FadeIn className="mt-16 text-center">
            <p className="text-2xl font-heading text-ivory-primary">
              Technology executes. <span className="italic text-gold-antique">Strategy decides.</span>
            </p>
          </FadeIn>
        </div>
      </section>
      {/* --- 6. Revenue Metrics We Optimize (Grid) --- */}
      <section className="w-full py-32 bg-navy-dark">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <FadeIn>
              <h2 className="text-5xl font-heading text-ivory-primary max-w-xl leading-tight">
                We Optimize What <br />Actually Matters.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-ivory-primary/60 max-w-md text-right md:text-left">
                No vanity metrics. We focus purely on the levers that drive revenue growth and business health.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold-antique/20 border border-gold-antique/20">
            {isLoading ? (
              [1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 bg-slate-deep animate-pulse" />)
            ) : (
              metrics.map((metric, index) => (
                <motion.div
                  key={metric._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-deep p-12 hover:bg-emerald-forest/20 transition-colors duration-300 group min-h-[300px] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 mb-6 text-gold-antique opacity-50 group-hover:opacity-100 transition-opacity">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 20V10" />
                        <path d="M18 20V4" />
                        <path d="M6 20v-4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-ivory-primary mb-3">{metric.metricName}</h3>
                    <p className="text-sm text-ivory-primary/60 leading-relaxed">
                      {metric.metricDescription || metric.businessImpact}
                    </p>
                  </div>
                  {metric.displayFormat && (
                    <div className="mt-8 text-3xl font-heading text-ivory-primary/20 group-hover:text-gold-antique transition-colors">
                      {metric.displayFormat}
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
      {/* --- 7. Services Breakdown (Accordion/Cards) --- */}
      <section className="w-full py-32 bg-slate-deep text-ivory-primary">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="mb-20">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">Done-For-You Revenue Systems</h2>
            <Separator className="bg-ivory-primary/20" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            {[
              {
                title: "Trial Conversion Architecture",
                desc: "We design onboarding and behavioral sequences that move users toward payment decisions.",
                icon: "01"
              },
              {
                title: "Pipeline Nurture Systems",
                desc: "Multi-touch sequences aligned with your sales motion to keep prospects engaged.",
                icon: "02"
              },
              {
                title: "CRM-Integrated Attribution",
                desc: "We track which emails influence real pipeline — not just clicks and opens.",
                icon: "03"
              },
              {
                title: "Infrastructure Hardening",
                desc: "Technical optimization to ensure your revenue engine reaches inboxes, not spam.",
                icon: "04"
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="text-xs font-bold text-gold-antique mb-4 tracking-widest">{service.icon}</div>
                <h3 className="text-2xl md:text-3xl font-heading mb-4 group-hover:text-gold-antique transition-colors">
                  {service.title}
                </h3>
                <p className="text-ivory-primary/60 text-lg leading-relaxed max-w-md">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* --- 8. Engagement Model (Vertical Tiers) --- */}
      <section className="w-full py-32 bg-navy-dark">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Header Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <h2 className="text-5xl font-heading text-ivory-primary mb-8">Engagement Models</h2>
                <p className="text-lg text-ivory-primary/60 mb-12">
                  Structured as advisory retainers, not SaaS plans. We limit client capacity to ensure depth of focus.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAuditModalOpen(true)}
                  className="border-ivory-primary text-ivory-primary hover:bg-slate-deep hover:text-gold-antique rounded-none px-8 py-6"
                >
                  Check Availability
                </Button>
              </div>
            </div>

            {/* Tiers Column */}
            <div className="lg:col-span-2 space-y-8">
              {[
                { name: "Trust", outcome: "Foundation & Compliance", scope: "Core Infrastructure", limit: "4 Clients/Qtr" },
                { name: "Patrimony", outcome: "Growth & Optimization", scope: "Full Revenue System", limit: "2 Clients/Qtr" },
                { name: "Estate", outcome: "Market Dominance", scope: "Fractional CRO + System", limit: "Waitlist Only" }
              ].map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="border border-gold-antique/30 p-8 md:p-12 hover:border-gold-antique hover:shadow-lg hover:shadow-gold-antique/10 transition-all duration-500 bg-slate-deep"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h3 className="text-3xl font-heading text-ivory-primary">{tier.name}</h3>
                    <span className="text-xs font-bold uppercase tracking-widest bg-gold-antique/20 px-3 py-1 text-gold-antique">
                      {tier.limit}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <span className="text-xs text-gold-antique/60 uppercase tracking-wider block mb-2">Core Outcome</span>
                      <p className="text-lg font-medium text-ivory-primary">{tier.outcome}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gold-antique/60 uppercase tracking-wider block mb-2">Scope</span>
                      <p className="text-lg font-medium text-ivory-primary">{tier.scope}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* --- 9. Who We Work With (Qualification) --- */}
      <section className="w-full py-32 bg-slate-deep border-y border-gold-antique/20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-20">
            <h2 className="text-4xl font-heading text-ivory-primary">Qualification Criteria</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-xl font-bold text-ivory-primary border-b border-ivory-primary pb-4">This Is For You If:</h3>
              <ul className="space-y-4">
                {[
                  "You are a B2B founder or revenue leader",
                  "You have an existing sales process",
                  "You generate consistent leads or trials",
                  "You want measurable revenue lift"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg text-ivory-primary/80">
                    <Check className="w-5 h-5 text-gold-antique mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 opacity-60"
            >
              <h3 className="text-xl font-bold text-ivory-primary border-b border-gold-antique/30 pb-4">Not For:</h3>
              <ul className="space-y-4">
                {[
                  "Early-stage hobby projects",
                  "D2C brands",
                  "Businesses without CRM visibility",
                  "Teams seeking 'growth hacks'"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg text-ivory-primary/80">
                    <div className="w-1.5 h-1.5 bg-ivory-primary/40 rounded-full mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      {/* --- 10. Process Section (Timeline) --- */}
      <section className="w-full py-32 bg-navy-dark">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <FadeIn className="mb-24 text-center">
            <h2 className="text-5xl font-heading text-ivory-primary">Our Advisory Process</h2>
          </FadeIn>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gold-antique/30 md:-translate-x-1/2" />

            {[
              { step: "01", title: "Revenue Audit", desc: "Deep dive into your current metrics, leaks, and opportunities." },
              { step: "02", title: "Funnel Mapping", desc: "Architecting the ideal user journey and behavioral triggers." },
              { step: "03", title: "System Build", desc: "Implementation of automation, copy, and technical infrastructure." },
              { step: "04", title: "Optimization", desc: "Continuous testing and refinement based on revenue data." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center mb-20 last:mb-0 ${
                  i % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div className={`md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pl-16 text-left' : 'md:pr-16 md:text-right'}`}>
                  <span className="text-sm font-bold text-gold-antique tracking-widest uppercase mb-2 block">Step {item.step}</span>
                  <h3 className="text-2xl font-heading text-ivory-primary mb-3">{item.title}</h3>
                  <p className="text-ivory-primary/60">{item.desc}</p>
                </div>

                {/* Center Node */}
                <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-navy-dark border-2 border-gold-antique rounded-full flex items-center justify-center z-10 md:-translate-x-1/2">
                  <div className="w-2 h-2 bg-gold-antique rounded-full" />
                </div>

                {/* Empty Side for Balance */}
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* --- 11. Case Study Placeholder (Visual Breather) --- */}
      <section className="w-full py-24 bg-slate-deep text-ivory-primary">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-ivory-primary/10">
            {[
              { val: "+32%", label: "Trial Conversion" },
              { val: "+41%", label: "Qualified Meetings" },
              { val: "-27%", label: "Sales Cycle Time" },
              { val: "+18%", label: "Deal Size" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4"
              >
                <div className="text-4xl md:text-5xl font-heading font-bold text-ivory-primary mb-2">{stat.val}</div>
                <div className="text-sm text-ivory-primary/60 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* --- 12. Founder Letter --- */}
      <section className="w-full py-32 bg-navy-dark">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <div className="w-16 h-1 bg-gold-antique mx-auto mb-12" />
            <h2 className="text-3xl font-heading text-ivory-primary mb-8">A Note From the Founder</h2>
            <div className="space-y-6 text-lg text-ivory-primary/80 leading-relaxed font-serif italic">
              <p>
                "Glacier Eagle was built for founders who want quiet execution and measurable results."
              </p>
              <p>
                "We limit the number of engagements to ensure depth, not volume. We believe revenue systems should feel invisible — yet powerful."
              </p>
            </div>
            <div className="mt-12">
              <p className="font-heading font-bold text-ivory-primary">The Glacier Eagle Team</p>
            </div>
          </FadeIn>
        </div>
      </section>
      {/* --- 13. Application Section (CTA) --- */}
      <section className="w-full py-32 bg-slate-deep relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
          <div className="bg-navy-dark p-8 md:p-16 border border-gold-antique/30">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading text-ivory-primary mb-4">Request a Private Revenue Audit</h2>
              <p className="text-ivory-primary/60">Limited engagements accepted quarterly.</p>
            </div>

            <div className="text-center">
              <Link to="/application">
                <Button className="bg-bronze-burnished text-ivory-primary hover:bg-bronze-burnished/90 rounded-none px-12 py-6 text-lg font-medium tracking-wide">
                  Start Your Application
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* --- 14. FAQ Section --- */}
      <section className="w-full py-24 bg-navy-dark">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-heading text-ivory-primary mb-12 text-center">Common Questions</h2>
          <div className="space-y-8">
            {[
              { q: "Do you work with startups?", a: "Only if they have established product-market fit and consistent lead flow. We accelerate existing momentum." },
              { q: "Do you guarantee revenue?", a: "We guarantee the implementation of a system designed for revenue. Outcomes depend on your product and market." },
              { q: "How is this different from hiring internally?", a: "You get a complete revenue systems team (Strategy + Tech + Copy) for less than the cost of one senior hire." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-gold-antique/20 pb-8">
                <h3 className="text-lg font-bold text-ivory-primary mb-2">{faq.q}</h3>
                <p className="text-ivory-primary/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
