import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks/use-seo';

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
  // --- SEO Configuration ---
  useSEO({
    title: 'Case Studies & Sample Blueprint | Strategic Advisory',
    description: 'Explore our case studies and sample revenue architecture blueprint demonstrating our diagnostic framework and proven advisory process.',
    keywords: 'case studies, revenue architecture, business blueprint, advisory results, success stories',
    canonical: typeof window !== 'undefined' ? window.location.origin + '/case-studies' : undefined,
    ogTitle: 'Case Studies & Sample Blueprint | Strategic Advisory',
    ogDescription: 'Explore our case studies and sample revenue architecture blueprint.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Case Studies',
      description: 'Collection of case studies and success stories',
    },
  });

  const handleDownloadPDF = () => {
    const pdfUrl = 'https://69454350-dff2-47bf-8672-beafe615a8aa.usrfiles.com/ugd/5fdb91_e7d8c58f30b743c0a9eabedbdf6e1b57.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Sample-Blueprint.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <Button onClick={handleDownloadPDF} className="px-12 py-6 bg-gold-antique text-navy-dark font-mono text-xs uppercase tracking-[1.8px] hover:bg-gold-antique/90 transition-all duration-300 hover:-translate-y-0.5 border-none rounded-none">
              DOWNLOAD SAMPLE BLUEPRINT
            </Button>
          </FadeIn>
        </div>
      </section>



    </PageLayout>
  );
}
