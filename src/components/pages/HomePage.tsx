// HPI 1.7-G
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ProblemStatements, OptimizationMetrics, TargetIndustries } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Check, ChevronDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Image } from '@/components/ui/image';

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
    <div className="min-h-screen bg-navy-dark text-ivory-primary font-paragraph selection:bg-gold-antique selection:text-navy-dark overflow-x-clip">
      {/* Global Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold-antique origin-left z-50"
        style={{ scaleX }}
      />

      <Header />

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
            <Link to="/application">
              <Button 
                size="lg" 
                className="bg-bronze-burnished text-ivory-primary border border-gold-antique hover:bg-bronze-burnished/90 rounded-none px-10 py-8 text-lg font-medium tracking-wide transition-all duration-200"
              >
                Request Private Revenue Audit
              </Button>
            </Link>
            <a href="#glacier-model">
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
      <section className="w-full border-y border-gold-antique/20 bg-slate-deep py-12">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          {isLoading ? (
            <div className="h-8 w-full bg-gold-antique/10 animate-pulse" />
          ) : (
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-x-12 gap-y-6 opacity-70">
              {industries.length > 0 ? (
                industries.map((industry, i) => (
                  <motion.div
                    key={industry._id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-gold-antique rounded-full" />
                    <span className="text-sm font-medium uppercase tracking-widest text-ivory-primary">
                      {industry.industryName}
                    </span>
                  </motion.div>
                ))
              ) : (
                // Fallback if no data
                <>
                  <span className="text-sm font-medium uppercase tracking-widest text-ivory-primary">B2B SaaS</span>
                  <span className="text-sm font-medium uppercase tracking-widest text-ivory-primary">Professional Services</span>
                  <span className="text-sm font-medium uppercase tracking-widest text-ivory-primary">High-Ticket Consultancies</span>
                  <span className="text-sm font-medium uppercase tracking-widest text-ivory-primary">Mid-Market Technology</span>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* --- 4. The Real Problem (Sticky Scroll Layout) --- */}
      <section className="w-full py-32 bg-navy-dark relative">
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

      {/* --- 5. The Glacier Eagle Model (Split Section) --- */}
      <section id="glacier-model" className="w-full bg-slate-deep py-32 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="mb-24 text-center">
            <h2 className="text-5xl md:text-6xl font-heading text-ivory-primary mb-6">A Hybrid Revenue Engine</h2>
            <p className="text-lg text-ivory-primary/60 max-w-2xl mx-auto">
              We bridge the gap between technical automation and high-level revenue strategy.
            </p>
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
                <Link to="/application">
                  <Button variant="outline" className="border-ivory-primary text-ivory-primary hover:bg-slate-deep hover:text-gold-antique rounded-none px-8 py-6">
                    Check Availability
                  </Button>
                </Link>
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

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70">Company Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-gold-antique/30 py-2 text-ivory-primary focus:border-gold-antique outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70">ARR Range</label>
                  <select className="w-full bg-transparent border-b border-gold-antique/30 py-2 text-ivory-primary focus:border-gold-antique outline-none transition-colors">
                    <option className="bg-navy-dark">Select Range</option>
                    <option className="bg-navy-dark">$1M - $5M</option>
                    <option className="bg-navy-dark">$5M - $20M</option>
                    <option className="bg-navy-dark">$20M+</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70">Primary Revenue Challenge</label>
                <input type="text" className="w-full bg-transparent border-b border-gold-antique/30 py-2 text-ivory-primary focus:border-gold-antique outline-none transition-colors" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70">Current Email Platform</label>
                  <input type="text" className="w-full bg-transparent border-b border-gold-antique/30 py-2 text-ivory-primary focus:border-gold-antique outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ivory-primary/70">CRM Used</label>
                  <input type="text" className="w-full bg-transparent border-b border-gold-antique/30 py-2 text-ivory-primary focus:border-gold-antique outline-none transition-colors" />
                </div>
              </div>

              <div className="pt-8 text-center">
                <Link to="/application">
                  <Button className="w-full md:w-auto bg-bronze-burnished text-ivory-primary hover:bg-bronze-burnished/90 rounded-none px-12 py-6 text-lg font-medium tracking-wide">
                    Submit for Review
                  </Button>
                </Link>
              </div>
            </form>
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

      <Footer />
    </div>
  );
}
