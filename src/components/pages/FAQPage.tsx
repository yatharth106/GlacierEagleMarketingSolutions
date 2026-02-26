import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { FrequentlyAskedQuestions } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const categories = Array.from(new Set(faqs.map(faq => faq.category).filter(Boolean)));

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
              Frequently Asked Questions
            </h1>
            <p className="text-xl font-paragraph text-charcoal max-w-3xl mx-auto">
              Strategic answers to common questions about our approach.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-16 min-h-[600px]">
            {isLoading ? null : (
              categories.length > 0 ? (
                categories.map((category) => (
                  <motion.div
                    key={category}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                  >
                    <h2 className="text-3xl font-heading text-charcoal mb-8">
                      {category}
                    </h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {faqs
                        .filter(faq => faq.category === category)
                        .map((faq) => (
                          <AccordionItem
                            key={faq._id}
                            value={faq._id}
                            className="border border-stone bg-ivory px-8"
                          >
                            <AccordionTrigger className="text-lg font-paragraph text-charcoal font-semibold text-left hover:no-underline py-6">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-base font-paragraph text-charcoal pb-6">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                    </Accordion>
                  </motion.div>
                ))
              ) : (
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq) => (
                    <AccordionItem
                      key={faq._id}
                      value={faq._id}
                      className="border border-stone bg-ivory px-8"
                    >
                      <AccordionTrigger className="text-lg font-paragraph text-charcoal font-semibold text-left hover:no-underline py-6">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base font-paragraph text-charcoal pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
