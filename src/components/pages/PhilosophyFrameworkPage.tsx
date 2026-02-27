import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { AdvisoryProcessSteps } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

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
      <section className="w-full pt-32 pb-24 bg-navy-dark">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          {/* Philosophy Headline */}
          <FadeIn className="mb-24 text-center">
            <h1 className="text-6xl md:text-7xl font-heading text-ivory-primary mb-6">
              Our Philosophy
            </h1>
            <p className="text-lg text-ivory-primary/60 max-w-2xl mx-auto">
              Revenue systems should be invisible yet powerful. We believe in quiet execution and measurable results.
            </p>
          </FadeIn>

          {/* Two-Column Philosophy Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-24">
            {/* Core Philosophy */}
            <FadeIn delay={0.1}>
              <h2 className="text-3xl font-heading text-ivory-primary mb-8">Core Philosophy</h2>
              <div className="space-y-6 text-lg text-ivory-primary/80 leading-relaxed">
                <p>
                  We design revenue systems for founders who understand that email is infrastructure, not marketing.
                </p>
                <p>
                  Your inbox is either accelerating pipeline velocity or silently draining it. There is no middle ground.
                </p>
                <p>
                  We limit engagements to ensure depth. We measure success in revenue, not vanity metrics. We execute quietly and let results speak.
                </p>
              </div>
            </FadeIn>

            {/* Core Beliefs */}
            <FadeIn delay={0.2}>
              <h2 className="text-3xl font-heading text-ivory-primary mb-8">Core Beliefs</h2>
              <ul className="space-y-6">
                {[
                  "Technology executes. Strategy decides.",
                  "Automation without psychology is just noise.",
                  "Revenue systems compound over time.",
                  "Founders deserve advisory partners, not vendors.",
                  "Depth beats volume. Always."
                ].map((belief, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 text-lg text-ivory-primary/80"
                  >
                    <div className="w-2 h-2 bg-gold-antique rounded-full mt-3 shrink-0" />
                    <span>{belief}</span>
                  </motion.li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Divider */}
          <div className="flex justify-center mb-24">
            <div className="w-24 h-px bg-gold-antique" />
          </div>

          {/* Founder Letter */}
          <FadeIn delay={0.3} className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-heading text-ivory-primary mb-12">A Note From the Founder</h2>
            <div className="space-y-6 text-lg text-ivory-primary/80 leading-relaxed font-serif italic">
              <p>
                "Glacier Eagle was built for founders who want quiet execution and measurable results."
              </p>
              <p>
                "We limit the number of engagements to ensure depth, not volume. We believe revenue systems should feel invisible — yet powerful."
              </p>
              <p>
                "Every founder deserves a revenue partner who understands that email is not a channel. It's infrastructure. And infrastructure should be engineered, not guessed."
              </p>
            </div>
            <div className="mt-12">
              <p className="font-heading font-bold text-ivory-primary">The Glacier Eagle Team</p>
            </div>
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
