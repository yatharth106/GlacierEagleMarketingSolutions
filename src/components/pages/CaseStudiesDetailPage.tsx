import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { CaseStudies } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

export default function CaseStudiesDetailPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudies[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<CaseStudies>('casestudies');
      setCaseStudies(result.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error loading case studies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-dark text-ivory-primary font-paragraph selection:bg-gold-antique selection:text-navy-dark">
      <Header />

      {/* --- Hero Section --- */}
      <section className="w-full pt-32 pb-20 bg-navy-dark">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="text-center">
            <h1 className="text-6xl md:text-7xl font-heading text-ivory-primary mb-8">
              Case Studies
            </h1>
            <p className="text-xl text-ivory-primary/60 max-w-2xl mx-auto">
              Real results from founders who transformed their revenue systems.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* --- Key Metrics Section --- */}
      <section className="w-full py-24 bg-slate-deep border-y border-gold-antique/20">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-ivory-primary/10">
            {isLoading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="p-4">
                  <div className="h-12 bg-gold-antique/10 animate-pulse rounded-sm mb-2" />
                  <div className="h-4 bg-gold-antique/10 animate-pulse rounded-sm" />
                </div>
              ))
            ) : caseStudies.length > 0 ? (
              caseStudies.slice(0, 4).map((study, i) => (
                <motion.div
                  key={study._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4"
                >
                  <div className="text-4xl md:text-5xl font-heading font-bold text-ivory-primary mb-2">
                    {study.statisticValue}
                  </div>
                  <div className="text-sm text-ivory-primary/60 uppercase tracking-widest">
                    {study.metricDescription}
                  </div>
                </motion.div>
              ))
            ) : (
              [
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
                  <div className="text-4xl md:text-5xl font-heading font-bold text-ivory-primary mb-2">
                    {stat.val}
                  </div>
                  <div className="text-sm text-ivory-primary/60 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* --- Case Studies Grid --- */}
      <section className="w-full py-32 bg-navy-dark">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="mb-20">
            <h2 className="text-4xl font-heading text-ivory-primary mb-4">
              Detailed Results
            </h2>
            <p className="text-lg text-ivory-primary/60">
              Each engagement delivers measurable revenue impact. Here's what we've achieved.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {isLoading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="h-80 bg-gold-antique/10 animate-pulse rounded-sm" />
              ))
            ) : caseStudies.length > 0 ? (
              caseStudies.map((study, i) => (
                <motion.div
                  key={study._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-gold-antique/30 p-8 md:p-12 hover:border-gold-antique transition-all duration-500 bg-slate-deep group"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-heading text-ivory-primary mb-4 group-hover:text-gold-antique transition-colors">
                      {study.caseStudyTitle}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-heading font-bold text-gold-antique">
                        {study.statisticValue}
                      </span>
                      <span className="text-lg text-ivory-primary/60">
                        {study.metricDescription}
                      </span>
                    </div>
                  </div>

                  {study.resultContext && (
                    <div className="space-y-4">
                      <p className="text-ivory-primary/70 leading-relaxed">
                        {study.resultContext}
                      </p>
                    </div>
                  )}

                  <div className="mt-8 pt-8 border-t border-gold-antique/20">
                    <p className="text-sm text-gold-antique/70 italic">
                      Engagement Type: {study.metricDescription}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              [
                {
                  title: "SaaS Platform - Trial to Revenue",
                  stat: "+32%",
                  metric: "Trial Conversion",
                  context: "Implemented behavioral trigger sequences that moved free trial users toward payment decisions. Focused on onboarding completion and feature adoption signals."
                },
                {
                  title: "B2B Services - Pipeline Acceleration",
                  stat: "+41%",
                  metric: "Qualified Meetings",
                  context: "Built multi-touch nurture system aligned with sales cycle. Reduced time from lead to qualified meeting by 35% through strategic sequencing."
                },
                {
                  title: "Enterprise Software - Sales Cycle Compression",
                  stat: "-27%",
                  metric: "Sales Cycle Time",
                  context: "Designed CRM-integrated email system that kept prospects engaged during evaluation. Reduced average deal cycle from 120 to 88 days."
                },
                {
                  title: "Consulting Firm - Deal Size Growth",
                  stat: "+18%",
                  metric: "Average Deal Size",
                  context: "Created value-stacking email sequences that positioned higher-tier services. Average contract value increased from $45K to $53K."
                }
              ].map((study, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-gold-antique/30 p-8 md:p-12 hover:border-gold-antique transition-all duration-500 bg-slate-deep group"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-heading text-ivory-primary mb-4 group-hover:text-gold-antique transition-colors">
                      {study.title}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-heading font-bold text-gold-antique">
                        {study.stat}
                      </span>
                      <span className="text-lg text-ivory-primary/60">
                        {study.metric}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-ivory-primary/70 leading-relaxed">
                      {study.context}
                    </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gold-antique/20">
                    <p className="text-sm text-gold-antique/70 italic">
                      Engagement Type: {study.metric}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="w-full py-32 bg-slate-deep border-t border-gold-antique/20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-heading text-ivory-primary mb-8">
              Ready to Build Your Revenue System?
            </h2>
            <p className="text-lg text-ivory-primary/60 max-w-2xl mx-auto mb-12">
              Limited engagements accepted per quarter. Request a private revenue audit to explore if we're a fit.
            </p>
            <Link to="/application">
              <Button className="bg-bronze-burnished text-ivory-primary hover:bg-bronze-burnished/90 rounded-none px-12 py-6 text-lg font-medium tracking-wide inline-flex items-center gap-2">
                Request a Private Revenue Audit
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
