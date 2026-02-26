import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { CaseStudies } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudies[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async () => {
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      <section className="w-full bg-ivory pt-32 pb-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center mb-24"
          >
            <h1 className="text-6xl md:text-7xl font-heading text-charcoal mb-8">
              Measured Outcomes
            </h1>
            <p className="text-xl font-paragraph text-charcoal max-w-3xl mx-auto">
              Results that matter to revenue leaders.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto min-h-[600px]">
            {isLoading ? null : (
              caseStudies.map((study, index) => (
                <motion.div
                  key={study._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="border border-stone bg-ivory p-12 text-center"
                >
                  <div className="mb-6">
                    <p className="text-6xl font-heading text-primary mb-4">
                      {study.statisticValue}
                    </p>
                    <p className="text-xl font-paragraph text-charcoal font-semibold">
                      {study.metricDescription}
                    </p>
                  </div>
                  {study.resultContext && (
                    <p className="text-base font-paragraph text-charcoal opacity-70">
                      {study.resultContext}
                    </p>
                  )}
                  {study.caseStudyTitle && (
                    <p className="text-sm font-paragraph text-charcoal opacity-50 mt-6">
                      {study.caseStudyTitle}
                    </p>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
