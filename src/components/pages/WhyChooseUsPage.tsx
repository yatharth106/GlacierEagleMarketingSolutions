import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/use-seo';

export default function WhyChooseUsPage() {
  // --- SEO Configuration ---
  useSEO({
    title: 'Why Choose Us | Strategic Advisory',
    description: 'Discover why leading companies choose our strategic advisory services. Compare our approach to traditional consulting and see the difference.',
    keywords: 'why choose us, advisory comparison, strategic consulting, business advisory',
    canonical: typeof window !== 'undefined' ? window.location.origin + '/why-choose-us' : undefined,
    ogTitle: 'Why Choose Us | Strategic Advisory',
    ogDescription: 'Discover why leading companies choose our strategic advisory services.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  });
  const comparisonData = [
    {
      dimension: 'Strategic Depth',
      traditional: 'Channel-level planning',
      performance: 'Paid media optimization',
      diy: 'Template-based automation',
      internal: 'Execution-focused',
      us: 'System-level revenue architecture (acquisition + conversion + retention integration)',
    },
    {
      dimension: 'AI Integration',
      traditional: 'Minimal or external tools',
      performance: 'Platform-level AI (Meta, Google automation)',
      diy: 'AI output without strategic judgment',
      internal: 'Limited AI implementation',
      us: 'Custom AI-assisted structural diagnostics + human strategic oversight',
    },
    {
      dimension: 'Scope of Influence',
      traditional: 'Marketing campaigns',
      performance: 'Paid traffic only',
      diy: 'Content / automation tasks',
      internal: 'Departmental scope',
      us: 'Entire revenue engine (offer logic, funnel, retention, capital efficiency)',
    },
    {
      dimension: 'Incentive Structure',
      traditional: 'Retainer-based (activity-driven)',
      performance: 'Ad-spend scaling incentives',
      diy: 'Subscription model',
      internal: 'Salary-based output',
      us: 'Outcome-aligned advisory focused on structural improvement, not activity volume',
    },
    {
      dimension: 'Decision Speed vs Precision',
      traditional: 'Fast execution',
      performance: 'Rapid campaign iteration',
      diy: 'Instant outputs',
      internal: 'Operational tempo',
      us: 'Deliberate architectural implementation to reduce compounding inefficiencies',
    },
    {
      dimension: 'Client Load Model',
      traditional: '20–100+ clients per account team',
      performance: 'High client volume for margin',
      diy: 'Unlimited users',
      internal: 'Single company focus',
      us: 'Limited advisory capacity to maintain strategic depth',
    },
    {
      dimension: 'Reporting Focus',
      traditional: 'Engagement metrics',
      performance: 'ROAS / CPA',
      diy: 'Activity output',
      internal: 'KPI dashboards',
      us: 'Revenue system diagnostics (conversion architecture, retention lift, margin structure)',
    },
  ];

  const credibilityPoints = [
    'No performance promises before diagnosis',
    'No tactic-first engagements',
    'No client volume scaling',
  ];

  return (
    <div className="min-h-screen bg-navy-dark">
      <Header />

      {/* E1 — INTRO BLOCK */}
      <section className="py-40 px-6 bg-navy-dark">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Eyebrow */}
            <div className="text-[11px] uppercase tracking-[3px] text-gold-antique mb-6 font-semibold">
              Why Us
            </div>

            {/* Headline */}
            <h1 className="font-heading text-6xl text-ivory-primary mb-8 leading-tight">
              Structural Advantage.
            </h1>

            {/* Subline */}
            <p className="font-paragraph text-lg text-ivory-primary max-w-[720px] mx-auto mb-12">
              Most providers optimize channels. We engineer revenue systems.
            </p>

            {/* Gold Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-gold-antique max-w-[60px] mx-auto"
              style={{ transformOrigin: 'center' }}
            />
          </motion.div>
        </div>
      </section>

      {/* E2 — COMPARISON GRID */}
      <section className="px-6 bg-navy-dark pb-20">
        <div className="max-w-[1100px] mx-auto">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-left py-4 px-4 text-[10px] uppercase tracking-[2px] text-gold-antique font-semibold">
                    Dimension
                  </th>
                  <th className="text-left py-4 px-4 text-[10px] uppercase tracking-[2px] text-gold-antique font-semibold">
                    Traditional Agency
                  </th>
                  <th className="text-left py-4 px-4 text-[10px] uppercase tracking-[2px] text-gold-antique font-semibold">
                    Performance Agency
                  </th>
                  <th className="text-left py-4 px-4 text-[10px] uppercase tracking-[2px] text-gold-antique font-semibold">
                    DIY AI Tools
                  </th>
                  <th className="text-left py-4 px-4 text-[10px] uppercase tracking-[2px] text-gold-antique font-semibold">
                    Internal Team
                  </th>
                  <th className="text-left py-4 px-4 text-[10px] uppercase tracking-[2px] text-gold-antique font-semibold">
                    Us
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[rgba(255,255,255,0.08)] hover:bg-[rgba(168,132,59,0.02)] transition-colors"
                  >
                    <td className="py-6 px-4 font-paragraph text-base text-ivory-primary font-semibold">
                      {row.dimension}
                    </td>
                    <td className="py-6 px-4 font-paragraph text-base text-[rgba(244,241,234,0.75)]">
                      {row.traditional}
                    </td>
                    <td className="py-6 px-4 font-paragraph text-base text-[rgba(244,241,234,0.75)]">
                      {row.performance}
                    </td>
                    <td className="py-6 px-4 font-paragraph text-base text-[rgba(244,241,234,0.75)]">
                      {row.diy}
                    </td>
                    <td className="py-6 px-4 font-paragraph text-base text-[rgba(244,241,234,0.75)]">
                      {row.internal}
                    </td>
                    <td className="py-6 px-4 font-paragraph text-base text-[rgba(244,241,234,0.75)] bg-[rgba(168,132,59,0.06)] border-l-2 border-gold-antique">
                      {row.us}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="lg:hidden space-y-8">
            {comparisonData.map((row, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="border border-[rgba(255,255,255,0.08)] rounded-lg p-6 bg-[rgba(168,132,59,0.02)]"
              >
                <h3 className="font-paragraph text-base font-semibold text-gold-antique mb-6">
                  {row.dimension}
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[2px] text-gold-antique mb-2 font-semibold">
                      Traditional Agency
                    </p>
                    <p className="font-paragraph text-sm text-[rgba(244,241,234,0.75)]">
                      {row.traditional}
                    </p>
                  </div>

                  <div className="border-t border-[rgba(255,255,255,0.08)] pt-4">
                    <p className="text-xs uppercase tracking-[2px] text-gold-antique mb-2 font-semibold">
                      Performance Agency
                    </p>
                    <p className="font-paragraph text-sm text-[rgba(244,241,234,0.75)]">
                      {row.performance}
                    </p>
                  </div>

                  <div className="border-t border-[rgba(255,255,255,0.08)] pt-4">
                    <p className="text-xs uppercase tracking-[2px] text-gold-antique mb-2 font-semibold">
                      DIY AI Tools
                    </p>
                    <p className="font-paragraph text-sm text-[rgba(244,241,234,0.75)]">
                      {row.diy}
                    </p>
                  </div>

                  <div className="border-t border-[rgba(255,255,255,0.08)] pt-4">
                    <p className="text-xs uppercase tracking-[2px] text-gold-antique mb-2 font-semibold">
                      Internal Team
                    </p>
                    <p className="font-paragraph text-sm text-[rgba(244,241,234,0.75)]">
                      {row.internal}
                    </p>
                  </div>

                  <div className="border-t border-[rgba(255,255,255,0.08)] pt-4 bg-[rgba(168,132,59,0.06)] -mx-6 -mb-6 px-6 py-4 rounded-b-lg border-l-2 border-gold-antique">
                    <p className="text-xs uppercase tracking-[2px] text-gold-antique mb-2 font-semibold">
                      Us
                    </p>
                    <p className="font-paragraph text-sm text-[rgba(244,241,234,0.75)]">
                      {row.us}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* E3 — RISK REVERSAL LOGIC BLOCK */}
      <section className="py-20 px-6 bg-navy-dark">
        <div className="max-w-[760px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl text-ivory-primary mb-8">
              Reduced Structural Risk.
            </h2>

            <p className="font-paragraph text-base text-[rgba(244,241,234,0.75)] leading-relaxed mb-6">
              Most revenue underperformance is not caused by insufficient effort. It is caused by misaligned systems. Activity scales inefficiency. Architecture compounds advantage.
            </p>

            <p className="font-paragraph text-base text-[rgba(244,241,234,0.75)] leading-relaxed">
              This firm intervenes at the structural level before scaling activity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* E4 — CREDIBILITY REINFORCEMENT */}
      <section className="py-20 px-6 bg-navy-dark border-t border-[rgba(255,255,255,0.08)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {credibilityPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="text-center"
              >
                <p className="font-paragraph text-base text-ivory-primary">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* E5 — CTA */}
      <section className="py-20 px-6 bg-navy-dark">
        <div className="max-w-[1100px] mx-auto text-center">
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="px-8 py-4 bg-gold-antique text-navy-dark font-paragraph font-semibold text-base rounded-lg hover:bg-[#B8934B] transition-colors"
          >
            REQUEST PRIVATE REVENUE AUDIT
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
