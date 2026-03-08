import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { FrequentlyAskedQuestions } from '@/entities';
import PageLayout from '@/components/PageLayout';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
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

export default function FAQDetailPage() {
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(true);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const location = useLocation();

  // --- SEO Configuration ---
  useSEO({
    title: 'Frequently Asked Questions | Strategic Advisory',
    description: 'Find answers to common questions about our advisory services, engagement models, and how we help businesses achieve measurable results.',
    keywords: 'FAQ, frequently asked questions, advisory services, engagement, business consulting',
    canonical: typeof window !== 'undefined' ? window.location.origin + '/faq' : undefined,
    ogTitle: 'Frequently Asked Questions | Strategic Advisory',
    ogDescription: 'Find answers to common questions about our advisory services.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [],
    },
  });

  useEffect(() => {
    loadData();
  }, [location.pathname]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<FrequentlyAskedQuestions>('faqs');
      setFaqs(result.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultFaqs = [
    {
      question: "Who is this for?",
      answer: "B2B founders and revenue leaders with established product-market fit, consistent lead flow, and a desire for measurable revenue lift. We work with companies generating $1M-$100M+ ARR."
    },
    {
      question: "What ARR range do you work with?",
      answer: "We typically work with companies between $1M and $100M+ ARR. The engagement model scales based on revenue complexity and system scope, not company size."
    },
    {
      question: "Do you guarantee revenue?",
      answer: "We guarantee the implementation of a system designed for revenue. Outcomes depend on your product quality, market fit, and sales execution. We measure success in pipeline velocity and conversion, not promises."
    },
    {
      question: "Do you require a specific platform?",
      answer: "We integrate with any major email platform (HubSpot, Klaviyo, Marketo, etc.) and CRM (Salesforce, Pipedrive, etc.). Platform choice doesn't limit our approach."
    },
    {
      question: "How is this different from hiring internally?",
      answer: "You get a complete revenue systems team (Strategy + Technical + Copy) for less than the cost of one senior hire. Plus, we bring cross-industry expertise and proven frameworks. No ramp-up time."
    },
    {
      question: "What's the engagement timeline?",
      answer: "Engagements typically run 3-6 months depending on tier. We front-load strategy and implementation, then transition to optimization and monitoring. You own the system after we build it."
    }
  ];

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <PageLayout>

      {/* --- Hero Section --- */}
      <section className="w-full pt-32 pb-20 bg-navy-dark">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="text-center">
            <h1 className="text-6xl md:text-7xl font-heading text-ivory-primary mb-8">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-ivory-primary/60 max-w-2xl mx-auto">
              Clear answers to common questions about our advisory model and approach.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* --- FAQ Accordion Section --- */}
      <section className="w-full py-32 bg-slate-deep">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="space-y-4">
            {isLoading ? (
              [1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-24 bg-gold-antique/10 animate-pulse rounded-sm" />
              ))
            ) : (
              displayFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gold-antique/30 overflow-hidden hover:border-gold-antique transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between bg-navy-dark hover:bg-slate-deep/50 transition-colors duration-300 group"
                  >
                    <h3 className="text-lg md:text-xl font-heading text-ivory-primary text-left group-hover:text-gold-antique transition-colors">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 ml-4"
                    >
                      <ChevronDown className="w-5 h-5 text-gold-antique" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedIndex === index ? 'auto' : 0,
                      opacity: expandedIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 py-6 bg-slate-deep border-t border-gold-antique/20">
                      <p className="text-ivory-primary/80 leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            )}
          </div>

          {/* Additional Info */}
          <FadeIn delay={0.3} className="mt-20 pt-20 border-t border-gold-antique/20 text-center">
            <h3 className="text-2xl font-heading text-ivory-primary mb-6">
              Still have questions?
            </h3>
            <p className="text-lg text-ivory-primary/60 mb-8">
              Reach out directly. We're happy to discuss your specific situation and whether we're the right fit.
            </p>
            <a
              href="mailto:hello@glaciereagles.com"
              className="inline-flex items-center gap-2 text-gold-antique hover:text-gold-antique/80 transition-colors font-medium"
            >
              hello@glaciereagles.com
              <span>→</span>
            </a>
          </FadeIn>
        </div>
      </section>

    </PageLayout>
  );
}
