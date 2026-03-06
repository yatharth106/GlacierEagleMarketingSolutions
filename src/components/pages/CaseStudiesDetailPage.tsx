import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
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

export default function CaseStudiesDetailPage() {

  return (
    <PageLayout>

      {/* --- Sample Blueprint Section --- */}
      <section className="w-full py-32 bg-navy-dark">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <FadeIn className="text-center">
            <h1 className="text-5xl md:text-6xl font-heading text-ivory-primary mb-8">
              Sample Revenue Architecture Blueprint
            </h1>
            <p className="text-lg text-ivory-primary/60 max-w-3xl mx-auto mb-12 leading-relaxed">
              The following is a concept study demonstrating our diagnostic framework and process. This Blueprint was built for a fictional B2B SaaS brand to illustrate exactly what clients receive during Phase I engagement.
            </p>
            <Button className="px-12 py-6 bg-gold-antique text-navy-dark font-mono text-xs uppercase tracking-[1.8px] hover:bg-gold-antique/90 transition-all duration-300 hover:-translate-y-0.5 border-none rounded-none">
              DOWNLOAD SAMPLE BLUEPRINT
            </Button>
          </FadeIn>
        </div>
      </section>



    </PageLayout>
  );
}
