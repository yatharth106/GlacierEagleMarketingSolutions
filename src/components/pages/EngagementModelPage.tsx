import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function EngagementModelPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleCTA = () => {
    if (isHomePage) {
      // Scroll to application section
      const element = document.getElementById('application-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Redirect to application page
      navigate('/application');
    }
  };

  return (
    <div className="min-h-screen bg-navy-dark">
      <Header />

      {/* 1️⃣ Intro Section */}
      <motion.section
        className="w-full py-section px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInVariants}
      >
        <div className="max-w-[1100px] mx-auto text-center">
          <motion.div variants={itemVariants} className="mb-6">
            <p className="font-label text-sm tracking-widest text-gold-antique uppercase">
              Engagement Model
            </p>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-6xl md:text-7xl text-ivory-primary mb-8 leading-tight"
          >
            How We Engineer Revenue Growth
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="w-12 h-px bg-gold-antique mx-auto mb-8"
          />

          <motion.p
            variants={itemVariants}
            className="font-paragraph text-lg text-ivory-body max-w-2xl mx-auto"
          >
            Hybrid AI and human expertise working in tandem to diagnose, restructure, and optimize your revenue architecture.
          </motion.p>
        </div>
      </motion.section>

      {/* 2️⃣ Phase I — Structural Diagnosis */}
      <motion.section
        className="w-full py-section px-6 border-t border-divider"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInVariants}
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div variants={containerVariants} className="space-y-12">
            <motion.div variants={itemVariants}>
              <h2 className="font-heading text-4xl md:text-5xl text-ivory-primary mb-2">
                Phase I
              </h2>
              <p className="font-label text-sm text-gold-antique uppercase tracking-widest">
                Structural Diagnosis
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-3">
                <h3 className="font-heading text-xl text-ivory-primary">What We Audit</h3>
                <ul className="space-y-3 font-paragraph text-ivory-body">
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>Data audit — Complete visibility into customer behavior, conversion patterns, and operational metrics</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>Revenue flow mapping — Tracing capital movement through acquisition, retention, and expansion</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>Offer + positioning audit — Evaluating market fit and messaging clarity</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>Acquisition efficiency — Analyzing CAC, payback period, and channel performance</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>Retention analysis — Understanding churn drivers and expansion opportunities</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>Forecast modeling — Projecting revenue scenarios under different operational conditions</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-6 border-t border-divider space-y-3">
                <p className="font-paragraph text-ivory-body">
                  <span className="text-gold-antique font-label">Timeline:</span> 2–3 weeks
                </p>
                <p className="font-paragraph text-ivory-body">
                  <span className="text-gold-antique font-label">Deliverable:</span> Revenue Architecture Blueprint + 90-day roadmap
                </p>
                <p className="font-paragraph text-ivory-body text-sm">
                  Our focus is clarity. We identify structural inefficiencies and opportunities. We don't promise results—we provide the intelligence to make informed decisions.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 3️⃣ Phase II — Performance Alignment */}
      <motion.section
        className="w-full py-section px-6 border-t border-divider"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInVariants}
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div variants={containerVariants} className="space-y-12">
            <motion.div variants={itemVariants}>
              <h2 className="font-heading text-4xl md:text-5xl text-ivory-primary mb-2">
                Phase II
              </h2>
              <p className="font-label text-sm text-gold-antique uppercase tracking-widest">
                Performance Alignment
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-3">
                <h3 className="font-heading text-xl text-ivory-primary">What We Execute</h3>
                <ul className="space-y-3 font-paragraph text-ivory-body">
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>System restructuring — Rebuilding operational workflows for efficiency and scalability</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>Funnel architecture implementation — Optimizing each stage of the customer journey</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>Messaging recalibration — Aligning communication with market positioning</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>Controlled execution — Implementing changes with measurable checkpoints</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>Continuous optimization — Real-time adjustments based on performance data</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-6 border-t border-divider space-y-3">
                <p className="font-paragraph text-ivory-body">
                  <span className="text-gold-antique font-label">Model:</span> Revenue-share based engagement
                </p>
                <p className="font-paragraph text-ivory-body text-sm">
                  We operate at the system level, not the campaign level. Our incentives align with your revenue growth. We succeed when your business succeeds.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 4️⃣ AI + Human Model */}
      <motion.section
        className="w-full py-section px-6 border-t border-divider"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInVariants}
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div variants={containerVariants} className="space-y-12">
            <motion.h2
              variants={itemVariants}
              className="font-heading text-4xl md:text-5xl text-ivory-primary text-center"
            >
              Human Judgment. Artificial Precision.
            </motion.h2>

            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-2 gap-12"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="font-heading text-2xl text-gold-antique">AI Layer</h3>
                <ul className="space-y-3 font-paragraph text-ivory-body">
                  <li className="flex gap-3">
                    <span className="text-gold-antique flex-shrink-0">—</span>
                    <span>Pattern detection across datasets</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-antique flex-shrink-0">—</span>
                    <span>Predictive modeling and forecasting</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-antique flex-shrink-0">—</span>
                    <span>Data interpretation and anomaly detection</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-antique flex-shrink-0">—</span>
                    <span>Scenario analysis and optimization</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="font-heading text-2xl text-gold-antique">Human Layer</h3>
                <ul className="space-y-3 font-paragraph text-ivory-body">
                  <li className="flex gap-3">
                    <span className="text-gold-antique flex-shrink-0">—</span>
                    <span>Strategic direction and business alignment</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-antique flex-shrink-0">—</span>
                    <span>Sequencing and execution prioritization</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-antique flex-shrink-0">—</span>
                    <span>Risk management and contingency planning</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-antique flex-shrink-0">—</span>
                    <span>Stakeholder communication and change management</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 5️⃣ Client Qualification Criteria */}
      <motion.section
        className="w-full py-section px-6 border-t border-divider"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInVariants}
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div variants={containerVariants} className="space-y-12">
            <motion.h2
              variants={itemVariants}
              className="font-heading text-4xl md:text-5xl text-ivory-primary"
            >
              Who This Is For
            </motion.h2>

            <motion.div variants={containerVariants} className="space-y-6">
              <motion.ul variants={containerVariants} className="space-y-4 font-paragraph text-ivory-body">
                <motion.li variants={itemVariants} className="flex gap-4">
                  <span className="text-gold-antique flex-shrink-0 text-lg">•</span>
                  <span>Established SaaS or eCommerce brand with proven product-market fit</span>
                </motion.li>
                <motion.li variants={itemVariants} className="flex gap-4">
                  <span className="text-gold-antique flex-shrink-0 text-lg">•</span>
                  <span>Minimum annual revenue of $500K+ (or equivalent growth trajectory)</span>
                </motion.li>
                <motion.li variants={itemVariants} className="flex gap-4">
                  <span className="text-gold-antique flex-shrink-0 text-lg">•</span>
                  <span>Clear operational capacity to implement structural changes</span>
                </motion.li>
                <motion.li variants={itemVariants} className="flex gap-4">
                  <span className="text-gold-antique flex-shrink-0 text-lg">•</span>
                  <span>Long-term mindset — committed to 6–12 month engagement minimum</span>
                </motion.li>
                <motion.li variants={itemVariants} className="flex gap-4">
                  <span className="text-gold-antique flex-shrink-0 text-lg">•</span>
                  <span>Willingness to share performance data and operational transparency</span>
                </motion.li>
              </motion.ul>

              <motion.div
                variants={itemVariants}
                className="pt-8 border-t border-divider"
              >
                <p className="font-paragraph text-ivory-body italic">
                  We decline misaligned engagements. This increases our effectiveness and protects your investment.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 6️⃣ Timeline Transparency */}
      <motion.section
        className="w-full py-section px-6 border-t border-divider"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInVariants}
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div variants={containerVariants} className="space-y-12">
            <motion.h2
              variants={itemVariants}
              className="font-heading text-4xl md:text-5xl text-ivory-primary"
            >
              90-Day Engagement Structure
            </motion.h2>

            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div
                variants={itemVariants}
                className="space-y-4 p-6 border border-divider"
              >
                <h3 className="font-heading text-2xl text-gold-antique">Month 1</h3>
                <p className="font-label text-sm text-gold-antique uppercase tracking-widest">
                  Diagnosis
                </p>
                <p className="font-paragraph text-ivory-body text-sm">
                  Complete audit of data, revenue flows, positioning, and operational efficiency. Deliverable: Revenue Architecture Blueprint.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-4 p-6 border border-divider"
              >
                <h3 className="font-heading text-2xl text-gold-antique">Month 2</h3>
                <p className="font-label text-sm text-gold-antique uppercase tracking-widest">
                  Structural Deployment
                </p>
                <p className="font-paragraph text-ivory-body text-sm">
                  Implementation of system restructuring, funnel optimization, and messaging recalibration. Controlled rollout with checkpoints.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-4 p-6 border border-divider"
              >
                <h3 className="font-heading text-2xl text-gold-antique">Month 3</h3>
                <p className="font-label text-sm text-gold-antique uppercase tracking-widest">
                  Optimization & Stabilization
                </p>
                <p className="font-paragraph text-ivory-body text-sm">
                  Real-time performance monitoring, adjustments, and stabilization. Transition to ongoing optimization phase.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 7️⃣ Pricing Model Section */}
      <motion.section
        className="w-full py-section px-6 border-t border-divider"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInVariants}
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div variants={containerVariants} className="space-y-12">
            <motion.h2
              variants={itemVariants}
              className="font-heading text-4xl md:text-5xl text-ivory-primary"
            >
              Aligned Incentives
            </motion.h2>

            <motion.div variants={containerVariants} className="space-y-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="font-heading text-xl text-ivory-primary">Engagement Structure</h3>
                <ul className="space-y-3 font-paragraph text-ivory-body">
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>No traditional agency retainers — we don't charge by the hour</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>Revenue-share structure — we participate in your growth</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>Select tiers include optional base stabilization fee for predictability</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-gold-antique flex-shrink-0">•</span>
                    <span>Equity partnership option (1%) available for qualified high-growth companies</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="pt-6 border-t border-divider"
              >
                <p className="font-paragraph text-ivory-body text-sm">
                  This model is structured, not experimental. We've designed it to align our success with yours while maintaining operational clarity and predictability.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 8️⃣ Final CTA */}
      <motion.section
        className="w-full py-section px-6 border-t border-divider"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInVariants}
      >
        <div className="max-w-[1100px] mx-auto text-center">
          <motion.div variants={containerVariants} className="space-y-8">
            <motion.button
              variants={itemVariants}
              onClick={handleCTA}
              className="inline-block px-8 py-4 border border-gold-antique text-gold-antique font-label text-xs uppercase tracking-[1.8px] hover:bg-gold-antique hover:text-navy-dark transition-all duration-300 hover:-translate-y-0.5"
            >
              Request Private Revenue Audit
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
