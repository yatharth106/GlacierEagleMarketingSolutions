import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Services, EngagementTiers } from '@/entities';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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

export default function ServicesFrameworkPage() {
  const [services, setServices] = useState<Services[]>([]);
  const [tiers, setTiers] = useState<EngagementTiers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [servicesResult, tiersResult] = await Promise.all([
        BaseCrudService.getAll<Services>('services'),
        BaseCrudService.getAll<EngagementTiers>('engagementtiers')
      ]);
      setServices(servicesResult.items);
      setTiers(tiersResult.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>

      {/* --- Services Overview Section --- */}
      <section className="w-full pt-32 pb-24 bg-navy-dark">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 text-center">
            <h1 className="text-6xl md:text-7xl font-heading text-ivory-primary mb-8">
              Revenue Systems
            </h1>
            <p className="text-xl text-ivory-primary/70 max-w-3xl mx-auto leading-relaxed">
              We design AI-assisted, strategist-led systems that convert free trials, dormant leads, and silent prospects into qualified pipeline and measurable cash flow.
            </p>
          </FadeIn>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {isLoading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="h-64 bg-gold-antique/10 animate-pulse rounded-sm" />
              ))
            ) : services.length > 0 ? (
              services.map((service, i) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="text-xs font-bold text-gold-antique mb-4 tracking-widest uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading text-ivory-primary mb-4 group-hover:text-gold-antique transition-colors">
                    {service.serviceName}
                  </h3>
                  <p className="text-ivory-primary/70 text-lg leading-relaxed mb-4">
                    {service.description}
                  </p>
                  {service.outcomeFocus && (
                    <p className="text-sm text-gold-antique/70 italic">
                      Focus: {service.outcomeFocus}
                    </p>
                  )}
                </motion.div>
              ))
            ) : (
              [
                {
                  title: "Trial Conversion Architecture",
                  desc: "We design onboarding and behavioral sequences that move users toward payment decisions.",
                  focus: "Conversion optimization"
                },
                {
                  title: "Pipeline Nurture Systems",
                  desc: "Multi-touch sequences aligned with your sales motion to keep prospects engaged.",
                  focus: "Sales acceleration"
                },
                {
                  title: "CRM-Integrated Attribution",
                  desc: "We track which emails influence real pipeline — not just clicks and opens.",
                  focus: "Revenue attribution"
                },
                {
                  title: "Infrastructure Hardening",
                  desc: "Technical optimization to ensure your revenue engine reaches inboxes, not spam.",
                  focus: "Deliverability"
                }
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="text-xs font-bold text-gold-antique mb-4 tracking-widest uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading text-ivory-primary mb-4 group-hover:text-gold-antique transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-ivory-primary/70 text-lg leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <p className="text-sm text-gold-antique/70 italic">
                    Focus: {service.focus}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* --- Engagement Tiers Section --- */}
      <section className="w-full py-32 bg-slate-deep">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Header Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <h2 className="text-5xl font-heading text-ivory-primary mb-8">Engagement Tiers</h2>
                <p className="text-lg text-ivory-primary/60 mb-12">
                  Structured as advisory retainers, not SaaS plans. We limit client capacity to ensure depth of focus.
                </p>
                <Link to="/apply">
                  <Button variant="outline" className="border-ivory-primary text-ivory-primary hover:bg-navy-dark hover:text-gold-antique rounded-none px-8 py-6">
                    Check Availability
                  </Button>
                </Link>
              </div>
            </div>

            {/* Tiers Column */}
            <div className="lg:col-span-2 space-y-8">
              {isLoading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="h-40 bg-gold-antique/10 animate-pulse rounded-sm" />
                ))
              ) : tiers.length > 0 ? (
                tiers.map((tier, i) => (
                  <motion.div
                    key={tier._id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="border border-gold-antique/30 p-8 md:p-12 hover:border-gold-antique hover:shadow-lg hover:shadow-gold-antique/10 transition-all duration-500 bg-navy-dark"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                      <h3 className="text-3xl font-heading text-ivory-primary">{tier.tierName}</h3>
                      <span className="text-xs font-bold uppercase tracking-widest bg-gold-antique/20 px-3 py-1 text-gold-antique">
                        {tier.clientCapacityLimit ? `${tier.clientCapacityLimit} Clients/Qtr` : 'Limited'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <span className="text-xs text-gold-antique/60 uppercase tracking-wider block mb-2">Core Outcome</span>
                        <p className="text-lg font-medium text-ivory-primary">{tier.coreOutcome}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gold-antique/60 uppercase tracking-wider block mb-2">Scope</span>
                        <p className="text-lg font-medium text-ivory-primary">{tier.engagementScope}</p>
                      </div>
                    </div>
                    {tier.shortDescription && (
                      <div className="mt-6 pt-6 border-t border-gold-antique/20">
                        <p className="text-ivory-primary/70">{tier.shortDescription}</p>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                [
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
                    className="border border-gold-antique/30 p-8 md:p-12 hover:border-gold-antique hover:shadow-lg hover:shadow-gold-antique/10 transition-all duration-500 bg-navy-dark"
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
                ))
              )}
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
}
