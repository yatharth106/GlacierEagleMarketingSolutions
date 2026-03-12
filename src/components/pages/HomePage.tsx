import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ProblemStatements, OptimizationMetrics, TargetIndustries } from '@/entities';
import PageLayout from '@/components/PageLayout';
import { ArrowRight, Check, ChevronDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSEO } from '@/hooks/use-seo';

// --- Utility Components for Motion & Layout ---

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
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
      hidden: { opacity: 0, y: 14 },
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

  // --- SEO Configuration ---
  useSEO({
    title: 'Private Equity & AI Advisory | Strategic Business Optimization',
    description: 'Transform your business with expert private equity and AI-driven advisory services. We optimize operations, maximize growth, and deliver measurable results for ambitious enterprises.',
    keywords: 'private equity advisory, AI consulting, business optimization, growth strategy, enterprise advisory',
    canonical: typeof window !== 'undefined' ? window.location.origin + '/' : undefined,
    ogTitle: 'Private Equity & AI Advisory | Strategic Business Optimization',
    ogDescription: 'Transform your business with expert private equity and AI-driven advisory services.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Strategic Advisory Group',
      description: 'Private equity and AI advisory services for business optimization',
      url: typeof window !== 'undefined' ? window.location.origin : undefined,
      sameAs: [],
    },
  });

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

  return (
    <PageLayout>
      {/* Global Scroll Progress - Rendered unconditionally to ensure ref hydration */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold-antique origin-left z-50"
        style={{ scaleX }}
      />
      {/* --- 1. Pre-Hero Micro Statement --- */}
      <section className="w-full pt-32 pb-8 relative z-10">
        <div className="max-w-content mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <p className="text-xs md:text-sm font-label font-bold tracking-[0.25em] uppercase text-gold-antique">
              PRIVATE REVENUE ADVISORY FOR SAAS & ECOMMERCE
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

        <div className="max-w-content mx-auto px-6 md:px-12 relative z-10 text-center">
          <FadeIn delay={0.1}>
            <h1 className="text-6xl md:text-7xl lg:text-[88px] font-heading font-light text-ivory-primary leading-[0.95] tracking-tight mb-12">
              Revenue Systems Built to <br />
              <span className="text-gold-antique italic">Scale.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-ivory-body max-w-3xl mx-auto leading-relaxed mb-16">
              We take $0 until you grow. Then we split the upside. No retainers. No risk. Just results.
            </p>
          </FadeIn>

          <FadeIn delay={0.5} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/apply">
              <Button 
                size="lg" 
                className="bg-gold-antique text-navy-dark border-none hover:bg-gold-antique/90 rounded-none px-10 py-8 text-sm font-mono font-bold tracking-widest uppercase transition-all duration-200"
              >
                APPLY FOR A BLUEPRINT
              </Button>
            </Link>
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
      {/* --- THE GEMS DIFFERENCE SECTION --- */}
      <section className="w-full bg-[#0C0D10] py-[60px] md:py-[100px] px-6 md:px-[80px] border-t border-[#C9A84C]/20">
        <div className="max-w-[100rem] mx-auto">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-24"
          >
            <h2 className="text-[56px] font-heading font-light text-[#F0EDE8] leading-tight mb-6">
              Why Serious Businesses Choose <span className="text-[#C9A84C] italic">GEMS</span>
            </h2>
            <p className="font-mono text-[11px] text-[#C9A84C] uppercase tracking-[0.25em]">
              // NOT AN AGENCY. NOT A FREELANCER. A REVENUE ARCHITECTURE FIRM.
            </p>
          </motion.div>

          {/* Three Column Layout - Stacks on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 mb-16">
            {/* Column 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
              className="px-6 md:px-12 py-10 md:py-8 border-b md:border-b-0 md:border-r border-[#1A1B20] flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* Diamond Icon */}
              <div className="w-6 h-6 mb-8 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#C9A84C] transform rotate-45" />
              </div>
              <h3 className="text-xl font-bold text-[#F0EDE8] mb-4">We Think in Systems</h3>
              <p className="text-sm text-[#C9A84C] mb-3">Powered by a proprietary AI Revenue Operating System — built for speed, precision, and scale without the overhead.</p>
              <p className="text-base text-[#9A9AA0] leading-relaxed">
                We don't run one-off campaigns. We map your entire revenue infrastructure and fix the architecture — not just the symptoms.
              </p>
            </motion.div>

            {/* Column 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="px-6 md:px-12 py-10 md:py-8 border-b md:border-b-0 md:border-r border-[#1A1B20] flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* Diamond Icon */}
              <div className="w-6 h-6 mb-8 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#C9A84C] transform rotate-45" />
              </div>
              <h3 className="text-xl font-bold text-[#F0EDE8] mb-4">Aligned Incentives</h3>
              <p className="text-base text-[#9A9AA0] leading-relaxed">
                Our revenue-share model means we only win when you win. No retainers. No guarantees without skin in the game.
              </p>
            </motion.div>

            {/* Column 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="px-6 md:px-12 py-10 md:py-8 flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* Diamond Icon */}
              <div className="w-6 h-6 mb-8 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#C9A84C] transform rotate-45" />
              </div>
              <h3 className="text-xl font-bold text-[#F0EDE8] mb-4">Selective by Design</h3>
              <p className="text-base text-[#9A9AA0] leading-relaxed">
                We cap at 5 active clients at all times. Not for optics — because real partnership requires real attention. Every client gets everything.
              </p>
            </motion.div>
          </div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-center"
          >
            <p className="font-mono text-[11px] text-[#6B6B72] uppercase tracking-[0.25em]">
              // REVENUE ARCHITECTURE FOR SAAS AND ECOMMERCE BRANDS
            </p>
          </motion.div>
        </div>
      </section>
      {/* --- 1. ENGAGEMENT PHILOSOPHY SECTION --- */}
      <section className="w-full py-section bg-navy-dark">
        <div className="max-w-content mx-auto px-6 md:px-12">
          {/* Intro Block */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center mb-24"
          >
            {/* Eyebrow */}
            <p className="text-[11px] uppercase tracking-[3px] text-gold-antique font-label font-bold mb-6">
              Engagement Structure
            </p>
            
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-ivory-primary mb-8 leading-tight">
              We Do Not Sell Marketing.<br />We Engineer Revenue Systems.
            </h2>
            
            {/* Subline */}
            <p className="text-lg font-paragraph text-ivory-body max-w-[760px] mx-auto leading-relaxed mb-10">
              Our compensation aligns with measurable structural improvement.
            </p>
            
            {/* Divider */}
            <div className="w-[60px] h-px bg-gold-antique mx-auto" />
          </motion.div>

          {/* Three Paragraph Body Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-5xl mx-auto"
          >
            {/* Paragraph 1: Fixed Retainers */}
            <div className="space-y-4">
              <h3 className="text-xl font-heading text-ivory-primary leading-tight">
                Fixed Retainers Misalign Incentives
              </h3>
              <p className="text-base font-paragraph text-ivory-body leading-relaxed">
                When compensation is decoupled from outcomes, the incentive structure becomes perverse. Agencies optimize for billable hours and campaign volume, not revenue impact. Your growth becomes their secondary concern.
              </p>
            </div>

            {/* Paragraph 2: Revenue-Share */}
            <div className="space-y-4">
              <h3 className="text-xl font-heading text-ivory-primary leading-tight">
                Revenue-Share Creates Accountability
              </h3>
              <p className="text-base font-paragraph text-ivory-body leading-relaxed">
                When we win only when you win, every decision is filtered through a single lens: measurable revenue impact. This alignment eliminates the noise of vanity metrics and forces structural thinking.
              </p>
            </div>

            {/* Paragraph 3: Equity */}
            <div className="space-y-4">
              <h3 className="text-xl font-heading text-ivory-primary leading-tight">
                Equity Reflects Long-Term Conviction
              </h3>
              <p className="text-base font-paragraph text-ivory-body leading-relaxed">
                We take equity in select engagements because we believe in the structural durability of the systems we build. This is not a transaction. It is a partnership in revenue architecture.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* --- 3. Credibility Strip (Authority Bar) --- */}
      {/* --- 3.5. INDUSTRY EXPERTISE SECTION — SCALABLE VERSION --- */}
      <section className="w-full py-section bg-navy-dark">
        <div className="max-w-content mx-auto px-6 md:px-12">
          {/* E1 — INTRO BLOCK (CENTERED) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-24"
          >
            {/* Eyebrow */}
            <p className="text-[11px] uppercase tracking-[3px] text-gold-antique font-label font-bold mb-6">
              Industry Architecture
            </p>
            
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-ivory-primary mb-8 leading-tight">
              Built for Structural Complexity.
            </h2>
            
            {/* Subline */}
            <p className="text-lg font-paragraph text-ivory-body max-w-[760px] mx-auto leading-relaxed mb-10">
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
                    className="bg-card-bg p-[60px] border border-divider rounded-[6px] min-h-full flex flex-col justify-between"
                  >
                    {/* Industry Label */}
                    <p className="text-[10px] uppercase tracking-[2px] text-gold-antique font-label font-bold mb-[14px]">
                      SaaS
                    </p>
                    
                    {/* Headline */}
                    <h3 className="text-[26px] md:text-[30px] font-heading text-ivory-primary mb-5 leading-tight">
                      Recurring Revenue Architecture
                    </h3>
                    
                    {/* Description */}
                    <p className="text-[17px] font-paragraph text-ivory-body leading-[1.8] mb-7">
                      SaaS growth depends on retention mechanics, activation velocity, pricing logic, and lifetime value alignment. Scale compounds only when churn, onboarding, and expansion are structurally integrated.
                    </p>
                    
                    {/* Divider */}
                    <div className="w-full h-px bg-divider my-7" />
                    
                    {/* Leverage List */}
                    <div className="space-y-4">
                      {[
                        'LTV/CAC alignment',
                        'Activation flow engineering',
                        'Pricing model optimization',
                        'Expansion revenue design',
                        'Data-informed growth loops'
                      ].map((item, idx) => (
                        <p key={idx} className="text-[16px] font-paragraph text-ivory-body leading-[1.8]">
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
                    className="bg-card-bg p-[60px] border border-divider rounded-[6px] min-h-full flex flex-col justify-between"
                  >
                    {/* Industry Label */}
                    <p className="text-[10px] uppercase tracking-[2px] text-gold-antique font-label font-bold mb-[14px]">
                      Retail & E-Commerce
                    </p>
                    
                    {/* Headline */}
                    <h3 className="text-[26px] md:text-[30px] font-heading text-ivory-primary mb-5 leading-tight">
                      Conversion & Margin Systems
                    </h3>
                    
                    {/* Description */}
                    <p className="text-[17px] font-paragraph text-ivory-body leading-[1.8] mb-7">
                      Retail performance is governed by unit economics, conversion efficiency, offer structure, and customer lifetime value. Sustainable scale requires margin-aware acquisition and retention architecture.
                    </p>
                    
                    {/* Divider */}
                    <div className="w-full h-px bg-divider my-7" />
                    
                    {/* Leverage List */}
                    <div className="space-y-4">
                      {[
                        'Conversion rate optimization',
                        'AOV and bundling logic',
                        'Retention lifecycle design',
                        'Paid acquisition efficiency',
                        'Margin-sensitive scaling models'
                      ].map((item, idx) => (
                        <p key={idx} className="text-[16px] font-paragraph text-ivory-body leading-[1.8]">
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
                      className="bg-card-bg p-[60px] border border-divider rounded-[6px] min-h-full flex flex-col justify-between"
                    >
                      {/* Industry Label */}
                      <p className="text-[10px] uppercase tracking-[2px] text-gold-antique font-label font-bold mb-[14px]">
                        {industry.industryName}
                      </p>
                      
                      {/* Headline */}
                      <h3 className="text-[26px] md:text-[30px] font-heading text-ivory-primary mb-5 leading-tight">
                        {industry.description}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-[17px] font-paragraph text-ivory-body leading-[1.8] mb-7">
                        {industry.targetAudience}
                      </p>
                      
                      {/* Divider */}
                      <div className="w-full h-px bg-divider my-7" />
                      
                      {/* Leverage List */}
                      <div className="space-y-4">
                        {industry.exampleCompanies && (
                          <p className="text-[16px] font-paragraph text-ivory-body leading-[1.8]">
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
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mt-[110px]"
          >
            <p className="text-lg font-paragraph text-ivory-body leading-relaxed">
              Our expansion into new industries follows structural qualification, not trend participation.
            </p>
          </motion.div>
        </div>
      </section>
      {/* --- 4. The Real Problem (Sticky Scroll Layout) --- */}
      <section className="w-full bg-navy-dark py-section">
        <div className="max-w-content mx-auto px-6 md:px-12">
          {/* E1 — HEADLINE BLOCK */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-section-gap"
          >
            {/* Eyebrow */}
            <p className="text-[11px] uppercase tracking-[3px] text-gold-antique font-label font-bold mb-6">
              Selection Criteria
            </p>
            
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-heading font-semibold text-ivory-primary mb-8 leading-[1.15]">
              Most Firms Optimize Tactics.<br />
              We Engineer Systems.
            </h2>
            
            {/* Subline */}
            <p className="text-lg font-paragraph text-ivory-body max-w-[760px] mx-auto leading-relaxed mb-10">
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
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-section-gap"
          >
            {/* Top Divider */}
            <div className="w-full h-px bg-divider mb-12" />
            
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
                  <div key={idx} className={idx !== 0 ? "border-t border-divider pt-12" : ""}>
                    <p className="text-[10px] uppercase tracking-[2px] text-ivory-primary/50 font-label font-bold mb-3">
                      {item.title}
                    </p>
                    <p className="text-[16px] font-paragraph text-ivory-body leading-[1.8]">
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
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-card-bg border border-gold-antique/20 p-[60px] rounded-[6px] space-y-12"
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
                  <div key={idx} className={idx !== 0 ? "border-t border-divider pt-12" : ""}>
                    <p className="text-[10px] uppercase tracking-[2px] text-gold-antique font-label font-bold mb-3">
                      {item.title}
                    </p>
                    <p className="text-[17px] font-paragraph text-ivory-body leading-[1.8]">
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
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-[120px] pt-section-gap border-t border-divider"
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
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                >
                  <div className="text-4xl md:text-5xl font-heading text-ivory-primary mb-3 leading-tight">
                    {metric.number}
                  </div>
                  <p className="text-[10px] uppercase tracking-[2px] text-gold-antique font-label font-bold">
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
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >

          </motion.div>
        </div>
      </section>
      <section className="w-full pt-0 pb-32 bg-navy-dark relative">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Sticky Left Column */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <FadeIn>
                  <h2 className="text-5xl md:text-6xl font-heading text-ivory-primary mb-8 leading-tight">
                    Your Inbox Is <br />
                    <span className="text-gold-antique italic">Leaking Revenue.</span>
                  </h2>
                  <p className="text-lg text-ivory-body mb-12 max-w-md leading-relaxed">
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
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    className="group border-l-2 border-gold-antique/30 pl-8 py-4 hover:border-gold-antique transition-colors duration-500"
                  >
                    <h3 className="text-2xl font-heading text-ivory-primary mb-3 group-hover:text-gold-antique transition-colors">
                      {problem.problemDescription}
                    </h3>
                    {problem.symptomExample && (
                      <p className="text-base text-ivory-body leading-relaxed">
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
        <div className="max-w-content mx-auto px-6 md:px-12">
          <FadeIn className="mb-24 text-center">
            <h2 className="text-5xl md:text-6xl font-heading text-ivory-primary mb-6">A Hybrid Revenue Engine</h2>
            <p className="text-lg text-ivory-body max-w-2xl mx-auto">
              We bridge the gap between technical automation and high-level revenue strategy.
            </p>
          </FadeIn>

          {/* CTA Button after model intro */}
          <FadeIn delay={0.3} className="flex justify-center mb-16">
            <Link to="/apply">
              <Button 
                size="lg" 
                className="bg-gold-antique text-navy-dark border-none hover:bg-gold-antique/90 rounded-none px-10 py-8 text-sm font-mono font-bold tracking-widest uppercase transition-all duration-200"
              >
                APPLY FOR A BLUEPRINT
              </Button>
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gold-antique/30 bg-navy-dark">
            {/* Left: AI Framework */}
            <div className="p-12 md:p-20 border-b md:border-b-0 md:border-r border-gold-antique/30 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold-antique/30 group-hover:bg-gold-antique transition-colors duration-500" />
              <h3 className="text-3xl font-heading text-ivory-primary mb-8 flex items-center gap-4">
                <span className="text-sm font-label font-bold tracking-widest uppercase text-gold-antique/60">01</span>
                AI Framework Layer
              </h3>
              <ul className="space-y-6">
                {['Behavioral tracking logic', 'Trigger-based automation', 'Predictive segmentation', 'CRM integration', 'Conversion mapping'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, ease: "easeOut" }}
                    className="flex items-center gap-4 text-lg text-ivory-body"
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
                <span className="text-sm font-label font-bold tracking-widest uppercase text-gold-antique">02</span>
                Human Strategy Layer
              </h3>
              <ul className="space-y-6">
                {['Founder-level messaging', 'Revenue modeling', 'Sales cycle engineering', 'High-trust persuasion', 'Pipeline optimization'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, ease: "easeOut" }}
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
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <FadeIn>
              <h2 className="text-5xl font-heading text-ivory-primary max-w-xl leading-tight">
                We Optimize What <br />Actually Matters.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-ivory-body max-w-md text-right md:text-left">
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
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, ease: "easeOut" }}
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
                    <p className="text-sm text-ivory-body leading-relaxed">
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
        <div className="max-w-content mx-auto px-6 md:px-12">
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
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: "easeOut" }}
                className="group"
              >
                <div className="text-xs font-bold text-gold-antique mb-4 tracking-widest">{service.icon}</div>
                <h3 className="text-2xl md:text-3xl font-heading mb-4 group-hover:text-gold-antique transition-colors">
                  {service.title}
                </h3>
                <p className="text-ivory-body text-lg leading-relaxed max-w-md">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* --- 8. Engagement Model (Vertical Tiers) --- */}
      <section className="w-full py-32 bg-navy-dark">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="mb-20 text-center">
            <h2 className="text-5xl font-heading text-ivory-primary mb-8">Engagement Models</h2>
            <p className="text-lg text-ivory-body mb-12 max-w-2xl mx-auto">
              Structured as advisory retainers, not SaaS plans. We limit client capacity to ensure depth of focus.
            </p>
          </div>

          {/* Three-Column Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
            {/* Card 1: Trust */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, ease: "easeOut" }}
              className="border border-gold-antique/30 p-8 md:p-12 hover:border-gold-antique hover:shadow-lg hover:shadow-gold-antique/10 transition-all duration-500 bg-slate-deep flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-heading text-ivory-primary">Trust</h3>
                <span className="text-xs font-bold uppercase tracking-widest bg-gold-antique/20 px-3 py-1 text-gold-antique rounded-sm">
                  NOW OPEN
                </span>
              </div>
              
              <p className="text-lg text-ivory-body mb-8 leading-relaxed">
                Our entry partnership. We prove results before you pay a retainer.
              </p>
              
              <div className="space-y-6 mb-8 flex-grow">
                <div>
                  <span className="text-xs text-gold-antique/60 uppercase tracking-wider block mb-2">Blueprint</span>
                  <p className="text-2xl font-heading text-ivory-primary">$497</p>
                </div>
                <div>
                  <span className="text-xs text-gold-antique/60 uppercase tracking-wider block mb-2">Phase II</span>
                  <p className="text-lg text-ivory-primary">$0 base + 20% of new MRR</p>
                </div>
                <div>
                  <span className="text-xs text-gold-antique/60 uppercase tracking-wider block mb-2">Minimum</span>
                  <p className="text-lg text-ivory-primary">3 months</p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Patrimony */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, ease: "easeOut" }}
              className="border border-gold-antique/30 p-8 md:p-12 hover:border-gold-antique hover:shadow-lg hover:shadow-gold-antique/10 transition-all duration-500 bg-slate-deep flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-heading text-ivory-primary">Patrimony</h3>
                <span className="text-xs font-bold uppercase tracking-widest bg-gold-antique/20 px-3 py-1 text-gold-antique rounded-sm">
                  COMING SOON
                </span>
              </div>
              
              <p className="text-lg text-ivory-body mb-8 leading-relaxed">
                For founders ready to scale with a proven partner.
              </p>
              
              <div className="space-y-6 mb-8 flex-grow">
                <div>
                  <span className="text-xs text-gold-antique/60 uppercase tracking-wider block mb-2">Blueprint</span>
                  <p className="text-2xl font-heading text-ivory-primary">$997</p>
                </div>
                <div>
                  <span className="text-xs text-gold-antique/60 uppercase tracking-wider block mb-2">Phase II</span>
                  <p className="text-lg text-ivory-primary">$1,500/month base + 15% of new MRR</p>
                </div>
                <div>
                  <span className="text-xs text-gold-antique/60 uppercase tracking-wider block mb-2">Minimum</span>
                  <p className="text-lg text-ivory-primary">4 months</p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Estate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, ease: "easeOut" }}
              className="border border-gold-antique/30 p-8 md:p-12 hover:border-gold-antique hover:shadow-lg hover:shadow-gold-antique/10 transition-all duration-500 bg-slate-deep flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-heading text-ivory-primary">Estate</h3>
                <span className="text-xs font-bold uppercase tracking-widest bg-gold-antique/20 px-3 py-1 text-gold-antique rounded-sm">
                  WAITLIST ONLY
                </span>
              </div>
              
              <p className="text-lg text-ivory-body mb-8 leading-relaxed">
                Full fractional CRO engagement for high-revenue businesses.
              </p>
              
              <div className="space-y-6 mb-8 flex-grow">
                <div>
                  <span className="text-xs text-gold-antique/60 uppercase tracking-wider block mb-2">Blueprint</span>
                  <p className="text-2xl font-heading text-ivory-primary">$2,000</p>
                </div>
                <div>
                  <span className="text-xs text-gold-antique/60 uppercase tracking-wider block mb-2">Phase II</span>
                  <p className="text-lg text-ivory-primary">$3,000/month base + 12% of new MRR</p>
                </div>
                <div>
                  <span className="text-xs text-gold-antique/60 uppercase tracking-wider block mb-2">Minimum</span>
                  <p className="text-lg text-ivory-primary">6 months</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Pricing Lock Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, ease: "easeOut" }}
            className="text-center"
          >
            <p className="text-lg font-paragraph text-ivory-body italic">
              Trust clients lock in these rates forever. Pricing only increases from here.
            </p>
          </motion.div>

          {/* CTA Button */}
          <div className="flex justify-center mt-16">
            <Link to="/apply">
              <Button 
                variant="outline" 
                className="border-ivory-primary text-ivory-primary hover:bg-slate-deep hover:text-gold-antique rounded-none px-8 py-6"
              >
                Check Availability
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* --- 9. Who We Work With (Qualification) --- */}
      <section className="w-full py-32 bg-slate-deep border-y border-gold-antique/20">
        <div className="max-w-content mx-auto px-6 md:px-12">
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
                  <li key={i} className="flex items-start gap-3 text-lg text-ivory-body">
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
                  <li key={i} className="flex items-start gap-3 text-lg text-ivory-body">
                    <div className="w-1.5 h-1.5 bg-ivory-primary/40 rounded-full mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 11. Case Study Placeholder (Visual Breather) --- */}
      <section className="w-full py-24 bg-slate-deep text-ivory-primary">
        <div className="max-w-content mx-auto px-6 md:px-12">
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
                transition={{ delay: i * 0.1, ease: "easeOut" }}
                className="p-4"
              >
                <div className="text-4xl md:text-5xl font-heading font-bold text-ivory-primary mb-2">{stat.val}</div>
                <div className="text-sm text-ivory-body uppercase tracking-widest">{stat.label}</div>
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
            <div className="space-y-6 text-lg text-ivory-body leading-relaxed font-paragraph italic">
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
              <p className="text-ivory-body">Limited engagements accepted quarterly.</p>
            </div>

            <div className="text-center">
              <Link to="/apply">
                <Button className="bg-gold-antique text-navy-dark hover:bg-gold-antique/90 rounded-none px-12 py-6 text-sm font-mono font-bold tracking-widest uppercase">
                  APPLY FOR A BLUEPRINT
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
                <p className="text-ivory-body">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
