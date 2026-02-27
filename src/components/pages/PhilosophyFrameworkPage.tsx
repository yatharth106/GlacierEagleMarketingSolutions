import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { AdvisoryProcessSteps } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

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
  const [processSteps, setProcessSteps] = useState<AdvisoryProcessSteps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

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
      <section className="w-full pt-[140px] pb-[140px] bg-navy-dark relative overflow-hidden">
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
            <motion.button
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="border border-gold-antique text-ivory-primary bg-transparent px-11 py-4 text-[11px] uppercase tracking-[1.8px] font-light hover:bg-gold-antique hover:text-navy-dark transition-all duration-300 rounded-sm"
            >
              Request Private Revenue Audit
            </motion.button>
          </FadeIn>
        </div>
      </section>

      {/* --- Framework Section: The Revenue Architecture --- */}
      <section className="w-full py-32 bg-slate-deep">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          {/* Framework Headline */}
          <FadeIn className="mb-24 text-center">
            <h1 className="text-6xl md:text-7xl font-heading text-ivory-primary mb-6">
              The Revenue Architecture
            </h1>
            <p className="text-lg text-ivory-primary/60 max-w-2xl mx-auto">
              How we bridge technical automation and high-level revenue strategy.
            </p>
          </FadeIn>

          {/* The Hybrid Model */}
          <FadeIn delay={0.1} className="mb-32">
            <h2 className="text-4xl font-heading text-ivory-primary mb-12 text-center">The Hybrid Model: AI + Human</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gold-antique/30 bg-navy-dark">
              {/* AI Layer */}
              <div className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-gold-antique/30 relative group overflow-hidden">
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

              {/* Human Strategy Layer */}
              <div className="p-12 md:p-16 bg-emerald-forest text-ivory-primary relative group overflow-hidden">
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

            <FadeIn className="mt-12 text-center">
              <p className="text-2xl font-heading text-ivory-primary">
                Technology executes. <span className="italic text-gold-antique">Strategy decides.</span>
              </p>
            </FadeIn>
          </FadeIn>

          {/* The 4-Step Advisory Process */}
          <FadeIn delay={0.2}>
            <h2 className="text-4xl font-heading text-ivory-primary mb-16 text-center">The 4-Step Advisory Process</h2>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gold-antique/30 md:-translate-x-1/2" />

              {isLoading ? (
                <div className="space-y-12">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-32 bg-gold-antique/10 animate-pulse rounded-sm" />
                  ))}
                </div>
              ) : (
                processSteps.map((step, i) => (
                  <motion.div
                    key={step._id}
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
                      <span className="text-sm font-bold text-gold-antique tracking-widest uppercase mb-2 block">
                        Step {step.stepNumber || i + 1}
                      </span>
                      <h3 className="text-2xl font-heading text-ivory-primary mb-3">{step.stepName}</h3>
                      <p className="text-ivory-primary/60">{step.description || step.shortDescription}</p>
                    </div>

                    {/* Center Node */}
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-navy-dark border-2 border-gold-antique rounded-full flex items-center justify-center z-10 md:-translate-x-1/2">
                      <div className="w-2 h-2 bg-gold-antique rounded-full" />
                    </div>

                    {/* Empty Side for Balance */}
                    <div className="md:w-1/2" />
                  </motion.div>
                ))
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
