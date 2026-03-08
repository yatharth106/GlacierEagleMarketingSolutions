import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { AdvisoryProcessSteps } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSEO } from '@/hooks/use-seo';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const SlideInLeft = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const SlideInRight = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, x: 24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function PhilosophyFrameworkPage() {
  // --- SEO Configuration ---
  useSEO({
    title: 'Our Philosophy & Framework | Strategic Advisory',
    description: 'Learn about our strategic philosophy and proven advisory framework that drives measurable business transformation.',
    keywords: 'philosophy, framework, advisory process, business strategy, methodology',
    canonical: typeof window !== 'undefined' ? window.location.origin + '/philosophy' : undefined,
    ogTitle: 'Our Philosophy & Framework | Strategic Advisory',
    ogDescription: 'Learn about our strategic philosophy and proven advisory framework.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      name: 'Our Philosophy & Framework',
      description: 'Strategic advisory philosophy and proven framework',
    },
  });

  const [processSteps, setProcessSteps] = useState<AdvisoryProcessSteps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    loadData();
  }, [location.pathname]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<AdvisoryProcessSteps>('processsteps');
      setProcessSteps(result.items.sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0)));
    } catch (error) {
      console.error('Error loading process steps:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-dark text-ivory-primary font-paragraph selection:bg-gold-antique selection:text-navy-dark">
      <Header />

      {/* --- Philosophy Section --- */}
      <section className={`w-full pt-[140px] pb-[140px] bg-navy-dark relative overflow-hidden ${location.pathname === '/framework' ? 'hidden' : ''}`}>
        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2" /%3E%3C/filter%3E%3Crect width="400" height="400" filter="url(%23noiseFilter)" /%3E%3C/svg%3E")',
          backgroundSize: '200px 200px'
        }} />

        <div className="max-w-[1050px] mx-auto px-6 md:px-12 relative z-10">
          {/* Headline Block */}
          <div className="mb-16 text-center">
            {/* Eyebrow */}
            <FadeIn delay={0}>
              <p className="text-[11px] uppercase tracking-[3.5px] text-gold-antique mb-7 font-light">
                Our Philosophy
              </p>
            </FadeIn>

            {/* Main Headline with glow */}
            <FadeIn delay={0}>
              <div className="relative inline-block">
                <div className="absolute inset-0 blur-[60px] bg-gold-antique/13 rounded-full w-[120%] h-[120%] -top-[10%] -left-[10%]" />
                <h1 className="text-[54px] md:text-[54px] font-heading text-ivory-primary leading-[1.15] relative z-10">
                  Our Philosophy
                </h1>
              </div>
            </FadeIn>

            {/* Sub-headline */}
            <FadeIn delay={0}>
              <p className="text-gold-antique italic mt-6 text-lg font-light">
                Intelligence Over Noise.
              </p>
            </FadeIn>

            {/* Divider */}
            <FadeIn delay={0}>
              <div className="flex justify-center mt-8">
                <div className="w-[60px] h-px bg-gold-antique" />
              </div>
            </FadeIn>
          </div>

          {/* Core Statement */}
          <FadeIn delay={0.4} className="mb-20">
            <div className="max-w-[750px] mx-auto text-center">
              <p className="text-[20px] md:text-[20px] leading-[1.75] text-ivory-primary/75 font-light">
                Most companies do not suffer from a <span className="text-ivory-primary font-normal">marketing problem</span>. They suffer from <span className="text-ivory-primary font-normal">structural misalignment</span>. Revenue rarely collapses because of effort. It erodes because <span className="text-ivory-primary font-normal">acquisition, positioning, conversion, and retention</span> were never engineered as a <span className="text-ivory-primary font-normal">unified system</span>. The firms that scale predictably are not more active. They are <span className="text-ivory-primary font-normal">more precisely constructed</span>.
              </p>
            </div>
          </FadeIn>

          {/* Separator */}
          <div className="my-20 flex justify-center">
            <div className="w-full h-px bg-white/8" />
          </div>

          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-20 mb-24">
            {/* Left Column - Philosophy Text */}
            <SlideInLeft delay={0.8}>
              <div className="space-y-8">
                {/* Paragraph 1 */}
                <div>
                  <h3 className="text-[10.5px] uppercase tracking-[2px] text-gold-antique mb-4 font-light">
                    Diagnosis Before Strategy
                  </h3>
                  <p className="text-[17.5px] leading-[1.8] text-ivory-primary/75 font-light">
                    Strategy applied to a <span className="text-ivory-primary font-normal">misdiagnosed system</span> only accelerates waste. Before channels are optimized or campaigns deployed, <span className="text-ivory-primary font-normal">structural friction must be identified</span>. Growth is rarely blocked by effort. It is blocked by <span className="text-ivory-primary font-normal">architecture</span>.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/8" />

                {/* Paragraph 2 */}
                <div>
                  <h3 className="text-[10.5px] uppercase tracking-[2px] text-gold-antique mb-4 font-light">
                    Architecture Over Tactics
                  </h3>
                  <p className="text-[17.5px] leading-[1.8] text-ivory-primary/75 font-light">
                    Channels do not fail in isolation. When performance fluctuates, the cause is often <span className="text-ivory-primary font-normal">upstream</span> — positioning, offer clarity, internal process, or conversion sequencing. <span className="text-ivory-primary font-normal">Treating tactics without examining the system</span> creates temporary improvements, not durable outcomes.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/8" />

                {/* Paragraph 3 */}
                <div>
                  <h3 className="text-[10.5px] uppercase tracking-[2px] text-gold-antique mb-4 font-light">
                    Depth Over Volume
                  </h3>
                  <p className="text-[17.5px] leading-[1.8] text-ivory-primary/75 font-light">
                    Serious intervention requires <span className="text-ivory-primary font-normal">attention</span>. Structural work cannot be templated across dozens of accounts simultaneously. <span className="text-ivory-primary font-normal">Precision demands constraint</span> — in focus, in diagnosis, and in execution.
                  </p>
                </div>
              </div>
            </SlideInLeft>

            {/* Right Column - Core Principles */}
            <SlideInRight delay={0.8}>
              <div className="space-y-9">
                {/* Principle 1 */}
                <div>
                  <h3 className="text-[10.5px] uppercase tracking-[2px] text-gold-antique mb-3 font-light">
                    Diagnosis Before Direction
                  </h3>
                  <p className="text-[16.5px] leading-[1.72] text-ivory-primary/75 font-light">
                    No strategic action is taken without structural clarity. Speed of recommendation is not a virtue.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/8" />

                {/* Principle 2 */}
                <div>
                  <h3 className="text-[10.5px] uppercase tracking-[2px] text-gold-antique mb-3 font-light">
                    Systems Determine Outcomes
                  </h3>
                  <p className="text-[16.5px] leading-[1.72] text-ivory-primary/75 font-light">
                    Tactics operate within systems. Systems determine performance. Work begins at the system level.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/8" />

                {/* Principle 3 */}
                <div>
                  <h3 className="text-[10.5px] uppercase tracking-[2px] text-gold-antique mb-3 font-light">
                    Precision Over Volume
                  </h3>
                  <p className="text-[16.5px] leading-[1.72] text-ivory-primary/75 font-light">
                    Interventions are selective and deliberate. Fewer decisions. Higher consequence.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/8" />

                {/* Principle 4 */}
                <div>
                  <h3 className="text-[10.5px] uppercase tracking-[2px] text-gold-antique mb-3 font-light">
                    Calm Conviction
                  </h3>
                  <p className="text-[16.5px] leading-[1.72] text-ivory-primary/75 font-light">
                    Urgency is not confused with importance. Process creates certainty. Certainty allows restraint.
                  </p>
                </div>
              </div>
            </SlideInRight>
          </div>

          {/* CTA Button */}
          <FadeIn delay={1.2} className="flex justify-center">
            <Link to="/apply">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gold-antique text-navy-dark px-11 py-4 text-[11px] uppercase tracking-[1.8px] font-mono font-bold hover:bg-gold-antique/90 transition-all duration-300 rounded-none border-none"
              >
                APPLY FOR A BLUEPRINT
              </motion.button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* --- Framework Section: The Revenue Architecture Model --- */}
      <section id="framework" className="w-full pt-[160px] pb-[160px] md:pt-[120px] md:pb-[120px] bg-navy-dark relative overflow-hidden">
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 relative z-10">
          
          {/* E1 — INTRO BLOCK */}
          <div className="mb-[100px] text-center">
            {/* Eyebrow */}
            <FadeIn delay={0}>
              <p className="text-[11px] uppercase tracking-[3px] text-gold-antique mb-7 font-light">
                Framework
              </p>
            </FadeIn>

            {/* Primary Headline */}
            <FadeIn delay={0}>
              <h1 className="text-[34px] md:text-[56px] font-heading text-ivory-primary leading-[1.15] mb-6">
                The Revenue Architecture Model
              </h1>
            </FadeIn>

            {/* Supporting Line */}
            <FadeIn delay={0}>
              <p className="text-[19px] leading-[1.6] text-ivory-primary/75 max-w-[700px] mx-auto font-light">
                A human-directed, AI-structured system for engineered growth.
              </p>
            </FadeIn>

            {/* Gold Divider */}
            <FadeIn delay={0}>
              <div className="flex justify-center mt-11">
                <div className="w-[60px] h-px bg-gold-antique" />
              </div>
            </FadeIn>
          </div>

          {/* Full-width divider before grid */}
          <div className="w-full h-px bg-white/8 mb-[120px]" />

          {/* E2 — FOUR-PHASE ARCHITECTURE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[72px] md:gap-x-[100px] md:gap-y-[120px] mb-[120px]">
            
            {/* Phase 01 */}
            <FadeIn delay={0.12}>
              <div>
                <p className="text-[10.5px] uppercase tracking-[2.2px] text-gold-antique mb-3 font-light">
                  01 — Structural Diagnosis
                </p>
                <h3 className="text-[28px] font-heading text-ivory-primary mb-[14px] leading-[1.2]">
                  System Audit
                </h3>
                <p className="text-[17px] leading-[1.85] text-ivory-primary/75 font-light">
                  Evaluate positioning, acquisition pathways, offer structure, conversion mechanics, retention logic, and revenue leakage. AI detects pattern friction. Human analysis determines causation.
                </p>
              </div>
            </FadeIn>

            {/* Phase 02 */}
            <FadeIn delay={0.24}>
              <div>
                <p className="text-[10.5px] uppercase tracking-[2.2px] text-gold-antique mb-3 font-light">
                  02 — Strategic Blueprint
                </p>
                <h3 className="text-[28px] font-heading text-ivory-primary mb-[14px] leading-[1.2]">
                  Revenue Design
                </h3>
                <p className="text-[17px] leading-[1.85] text-ivory-primary/75 font-light">
                  Construct an integrated revenue architecture aligning acquisition, conversion, messaging, and retention into one unified system. No isolated tactics.
                </p>
              </div>
            </FadeIn>

            {/* Phase 03 */}
            <FadeIn delay={0.36}>
              <div>
                <p className="text-[10.5px] uppercase tracking-[2.2px] text-gold-antique mb-3 font-light">
                  03 — Controlled Execution
                </p>
                <h3 className="text-[28px] font-heading text-ivory-primary mb-[14px] leading-[1.2]">
                  Precision Deployment
                </h3>
                <p className="text-[17px] leading-[1.85] text-ivory-primary/75 font-light">
                  Deploy high-leverage interventions within the engineered structure. AI manages modeling and measurement. Human strategy governs sequencing and risk.
                </p>
              </div>
            </FadeIn>

            {/* Phase 04 */}
            <FadeIn delay={0.48}>
              <div>
                <p className="text-[10.5px] uppercase tracking-[2.2px] text-gold-antique mb-3 font-light">
                  04 — Iterative Refinement
                </p>
                <h3 className="text-[28px] font-heading text-ivory-primary mb-[14px] leading-[1.2]">
                  Compounding Optimization
                </h3>
                <p className="text-[17px] leading-[1.85] text-ivory-primary/75 font-light">
                  Continuous structural refinement based on system-level data. Improvement occurs at architecture level, not campaign level.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* E3 — AI / HUMAN ARCHITECTURE STRIP */}
          <FadeIn delay={0.6}>
            <div className="bg-white/[0.02] px-[72px] py-[72px] mb-[120px]">
              {/* Headline */}
              <h2 className="text-[38px] font-heading text-ivory-primary text-center mb-14">
                Human Judgment. Artificial Precision.
              </h2>

              {/* Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[100px]">
                {/* Left Column */}
                <div>
                  <p className="text-[10.5px] uppercase tracking-[2px] text-gold-antique mb-6 font-light">
                    AI Infrastructure
                  </p>
                  <p className="text-[17px] leading-[1.85] text-ivory-primary/75 font-light">
                    Pattern recognition. Predictive diagnostics. Structural modeling. Data-layer optimization. Performance mapping.
                  </p>
                </div>

                {/* Right Column */}
                <div>
                  <p className="text-[10.5px] uppercase tracking-[2px] text-gold-antique mb-6 font-light">
                    Strategic Authority
                  </p>
                  <p className="text-[17px] leading-[1.85] text-ivory-primary/75 font-light">
                    Priority determination. Sequencing decisions. Risk calibration. Capital allocation logic. Business alignment.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* E4 — CTA SYSTEM */}
          <FadeIn delay={0.72} className="flex justify-center">
            <Link to="/apply">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 1 }}
                transition={{ duration: 0.3 }}
                className="px-12 py-[18px] min-h-[46px] bg-gold-antique text-navy-dark text-[11px] uppercase tracking-[1.8px] font-mono font-bold hover:bg-gold-antique/90 transition-all duration-300 rounded-none border-none w-full md:w-auto max-w-[340px] md:max-w-none"
              >
                APPLY FOR A BLUEPRINT
              </motion.button>
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
