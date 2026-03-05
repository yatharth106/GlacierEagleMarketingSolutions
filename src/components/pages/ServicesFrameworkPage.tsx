import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Services, EngagementTiers, AdvisoryProcessSteps } from '@/entities';
import PageLayout from '@/components/PageLayout';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const HeroLine = () => (
  <motion.div
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
    className="h-px bg-gradient-to-r from-transparent via-gold-antique to-transparent"
    style={{ transformOrigin: "left" }}
  />
);

const FadeInOnScroll = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function ServicesFrameworkPage() {
  const [tiers, setTiers] = useState<EngagementTiers[]>([]);
  const [processSteps, setProcessSteps] = useState<AdvisoryProcessSteps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    loadData();
  }, [location.pathname]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [tiersResult, stepsResult] = await Promise.all([
        BaseCrudService.getAll<EngagementTiers>('engagementtiers'),
        BaseCrudService.getAll<AdvisoryProcessSteps>('processsteps')
      ]);
      setTiers(tiersResult.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
      setProcessSteps(stepsResult.items.sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0)));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      {/* === HERO SECTION === */}
      <section className="relative w-full min-h-screen flex items-center justify-start bg-[#050608] overflow-hidden pt-32 pb-20">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 w-full relative z-10">
          <div className="max-w-3xl">
            {/* Hero headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl md:text-8xl font-heading font-light text-ivory-primary mb-8 leading-tight"
            >
              Revenue Systems Built to{' '}
              <span className="italic text-gold-antique">Scale</span>
            </motion.h1>

            {/* Hero subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-ivory-body leading-relaxed mb-12 max-w-2xl"
            >
              We don't run campaigns. We architect the infrastructure that turns traffic into customers, customers into revenue, and revenue into compounding growth.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gold-antique mb-2">
                  Execution Model
                </div>
                <p className="text-lg text-ivory-primary font-light">AI + Human Model</p>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gold-antique mb-2">
                  Alignment
                </div>
                <p className="text-lg text-ivory-primary font-light">Revenue-Share Aligned</p>
              </div>
            </motion.div>

            {/* Animated line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-gold-antique via-gold-antique to-transparent mb-12"
              style={{ transformOrigin: "left", maxWidth: "200px" }}
            />

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/apply">
                <Button className="bg-gold-antique hover:bg-gold-antique/90 text-navy-dark font-bold uppercase tracking-widest px-8 py-6 text-sm rounded-none transition-all duration-300 hover:shadow-lg hover:shadow-gold-antique/30 hover:-translate-y-1 font-mono border-none">
                  APPLY FOR A BLUEPRINT
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === POSITIONING STRIP === */}
      <section className="w-full bg-[#050608] py-8 overflow-hidden border-y border-gold-antique/20">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="text-xs font-bold uppercase tracking-widest text-gold-antique px-12">
              // NOT AN AGENCY. NOT A FREELANCER. A REVENUE ARCHITECTURE FIRM.
            </div>
          ))}
        </motion.div>
      </section>

      {/* === WHO THIS IS FOR === */}
      <section className="w-full py-32 bg-[#050608] relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Heading */}
            <FadeInOnScroll>
              <h2 className="text-5xl md:text-6xl font-heading font-light text-ivory-primary mb-8">
                Built for the <span className="italic text-gold-antique">Right</span> Businesses
              </h2>
              <p className="text-ivory-body text-lg leading-relaxed">
                We're selective. Our model only works when there's real upside to unlock and a team ready to execute.
              </p>
            </FadeInOnScroll>

            {/* Right: Qualifiers */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6"
            >
              {[
                "Established SaaS or eCommerce brands",
                "$10K+ monthly recurring revenue",
                "Predictable customer acquisition channels",
                "Team ready to implement systems",
                "Ready to implement strategic changes within your business"
              ].map((qualifier, i) => (
                <motion.div key={i} variants={itemVariants} className="flex gap-4 items-start">
                  <div className="text-gold-antique text-xl mt-1 flex-shrink-0">→</div>
                  <p className="text-ivory-primary text-lg font-light">{qualifier}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Exclusion box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 p-6 border border-red-500/30 bg-red-500/5 rounded-sm"
          >
            <p className="text-sm text-red-400 font-light">
              ✗ Not for idea-stage startups or businesses under $10K/mo revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === THE TWO PHASES === */}
      <section className="w-full py-32 bg-[#050608] relative overflow-hidden">
        {/* Section label */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-xs font-bold uppercase tracking-widest text-gold-antique/40 rotate-90 whitespace-nowrap pointer-events-none">
          // PHASES
        </div>

        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeInOnScroll>
            <h2 className="text-5xl md:text-6xl font-heading font-light text-ivory-primary mb-20 text-center">
              Two Paths to <span className="italic text-gold-antique">Growth</span>
            </h2>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* PHASE 1 - GOLD */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* Faded background number */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-9xl font-heading font-light text-gold-antique/5">01</span>
              </div>

              {/* Card */}
              <div className="relative z-10 border-t-2 border-gold-antique p-16 bg-[#050608] hover:bg-[#050608]/80 transition-all duration-500 group-hover:-translate-y-2 min-h-[650px] flex flex-col">
                {/* Tag */}
                <div className="text-xs font-bold uppercase tracking-widest text-gold-antique mb-6">
                  Phase I — Entry
                </div>

                {/* Title */}
                <h3 className="text-4xl font-heading font-light text-ivory-primary mb-2">
                  Revenue Architecture <span className="italic">Blueprint</span>
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-gold-antique/70 mb-8">Paid Diagnostic Audit</p>

                {/* Description */}
                <p className="text-ivory-body text-lg leading-relaxed mb-10">
                  A forensic audit of your revenue infrastructure. We map your entire customer journey, identify leaks, and deliver a detailed blueprint for optimization.
                </p>

                {/* Deliverables */}
                <div className="space-y-4 mb-10 pb-10 border-b border-gold-antique/20 flex-grow">
                  {[
                    "Complete revenue system audit",
                    "Customer journey mapping",
                    "Optimization roadmap (12 months)",
                    "Executive presentation deck"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-gold-antique text-lg mt-0.5">•</span>
                      <p className="text-ivory-primary text-sm font-light">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Engagement model */}
                <div className="text-xs text-gold-antique/60 uppercase tracking-wider mt-auto">
                  Engagement Model: One-Time Paid Audit
                </div>
              </div>
            </motion.div>

            {/* PHASE 2 - GREEN */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative group"
            >
              {/* Faded background number */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-9xl font-heading font-light text-green-600/5">02</span>
              </div>

              {/* Card */}
              <div className="relative z-10 border-t-2 border-green-600 p-16 bg-[#050608] hover:bg-[#050608]/80 transition-all duration-500 group-hover:-translate-y-2 min-h-[650px] flex flex-col">
                {/* Tag */}
                <div className="text-xs font-bold uppercase tracking-widest text-green-600 mb-6">
                  Phase II — Partnership
                </div>

                {/* Title */}
                <h3 className="text-4xl font-heading font-light text-ivory-primary mb-2">
                  Revenue Share <span className="italic">Partnership</span>
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-green-600/70 mb-8">Ongoing Advisory & Implementation</p>

                {/* Description */}
                <p className="text-ivory-body text-lg leading-relaxed mb-10">
                  We become your fractional revenue team. We implement the blueprint, optimize in real-time, and share in the upside we create.
                </p>

                {/* Deliverables */}
                <div className="space-y-4 mb-10 pb-10 border-b border-green-600/20 flex-grow">
                  {[
                    "Ongoing system implementation",
                    "Monthly optimization cycles",
                    "Real-time performance tracking",
                    "Revenue-share alignment"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-green-600 text-lg mt-0.5">•</span>
                      <p className="text-ivory-primary text-sm font-light">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Engagement model */}
                <div className="text-xs text-green-600/60 uppercase tracking-wider mt-auto">
                  Engagement Model: Revenue-Share — We Win When You Win
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === THE PROCESS === */}
      <section className="w-full py-32 bg-[#050608] relative overflow-hidden">
        {/* Section label */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-xs font-bold uppercase tracking-widest text-gold-antique/40 rotate-90 whitespace-nowrap pointer-events-none">
          // PROCESS
        </div>

        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeInOnScroll>
            <h2 className="text-5xl md:text-6xl font-heading font-light text-ivory-primary mb-20 text-center">
              How It <span className="italic text-gold-antique">Works</span>
            </h2>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold-antique/10">
            {[
              { step: "01", title: "Apply", desc: "Submit your application and business overview. We review your submission and assess whether your business aligns with our model and revenue potential." },
              { step: "02", title: "Qualification Call", desc: "We assess fit and discuss your revenue challenges. During this call, we dive deep into your current systems, growth bottlenecks, and long-term vision." },
              { step: "03", title: "Blueprint Delivered", desc: "Receive your custom revenue architecture plan. This comprehensive document outlines the exact systems and optimizations needed to unlock your growth potential." },
              { step: "04", title: "Partnership Begins", desc: "Implementation and ongoing optimization starts. We become your fractional revenue team, executing the blueprint and iterating based on real-time performance data." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-[#050608] p-8 md:p-10 relative"
              >
                {/* Faded step number */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-6xl font-heading font-light text-gold-antique/5">{item.step}</span>
                </div>

                <div className="relative z-10">
                  <div className="text-xs font-bold uppercase tracking-widest text-gold-antique mb-4">
                    Step {item.step}
                  </div>
                  <h3 className="text-2xl font-heading font-light text-ivory-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-ivory-body text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === TRUST / CREDIBILITY STRIP === */}
      <section className="w-full bg-[#050608] py-16 border-y border-gold-antique/20">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { title: "AI + Human Hybrid", desc: "Execution" },
              { title: "Revenue-Share Aligned", desc: "Incentives" },
              { title: "SaaS & eCommerce", desc: "Specialists" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`py-8 ${i < 2 ? 'border-r border-gold-antique/20' : ''}`}
              >
                <div className="text-gold-antique text-2xl mb-3">◆</div>
                <h3 className="text-lg font-heading font-light text-ivory-primary mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gold-antique/60 uppercase tracking-widest">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="w-full py-40 bg-[#050608] relative overflow-hidden flex items-center justify-center min-h-[600px]">
        {/* Subtle pulsing radial glow */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(201, 168, 76, 0.1) 0%, transparent 70%)"
          }}
        />

        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10">
          <FadeInOnScroll>
            <h2 className="text-6xl md:text-7xl font-heading font-light text-ivory-primary mb-6">
              Apply for Your <span className="italic text-gold-antique">Blueprint</span>
            </h2>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <p className="text-lg text-ivory-body leading-relaxed mb-12 max-w-2xl mx-auto">
              Spots are limited. We're selective about who we work with — because our model only works when there's real upside to unlock.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.2}>
            <Link to="/apply">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gold-antique hover:bg-gold-antique/90 text-navy-dark font-bold uppercase tracking-widest px-12 py-8 text-base rounded-none transition-all duration-300 hover:shadow-lg hover:shadow-gold-antique/40 relative overflow-hidden group font-mono border-none">
                  <span className="relative z-10">APPLY FOR A BLUEPRINT</span>
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
            </Link>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <p className="text-xs text-gold-antique/60 uppercase tracking-widest mt-8">
              ≈ 48hr response · No commitment required · Limited spots
            </p>
          </FadeInOnScroll>
        </div>
      </section>
    </PageLayout>
  );
}
