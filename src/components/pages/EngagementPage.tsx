import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { EngagementTiers } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EngagementPage() {
  const [tiers, setTiers] = useState<EngagementTiers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTiers();
  }, []);

  const loadTiers = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<EngagementTiers>('engagementtiers');
      setTiers(result.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error loading engagement tiers:', error);
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
              Engagement Model
            </h1>
            <p className="text-xl font-paragraph text-charcoal max-w-3xl mx-auto">
              Advisory retainers designed for depth, not volume.
            </p>
          </motion.div>

          <div className="space-y-16 max-w-4xl mx-auto min-h-[600px]">
            {isLoading ? null : (
              tiers.map((tier, index) => (
                <motion.div
                  key={tier._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="border border-stone bg-ivory p-12"
                >
                  <h2 className="text-4xl font-heading text-charcoal mb-6">
                    {tier.tierName}
                  </h2>
                  {tier.shortDescription && (
                    <p className="text-lg font-paragraph text-charcoal mb-8 opacity-70">
                      {tier.shortDescription}
                    </p>
                  )}
                  <div className="space-y-6">
                    {tier.coreOutcome && (
                      <div>
                        <p className="text-base font-paragraph text-charcoal font-semibold mb-2">
                          Core Outcome
                        </p>
                        <p className="text-base font-paragraph text-charcoal">
                          {tier.coreOutcome}
                        </p>
                      </div>
                    )}
                    {tier.engagementScope && (
                      <div>
                        <p className="text-base font-paragraph text-charcoal font-semibold mb-2">
                          Engagement Scope
                        </p>
                        <p className="text-base font-paragraph text-charcoal">
                          {tier.engagementScope}
                        </p>
                      </div>
                    )}
                    {tier.clientCapacityLimit && (
                      <div>
                        <p className="text-base font-paragraph text-charcoal font-semibold mb-2">
                          Client Capacity
                        </p>
                        <p className="text-base font-paragraph text-charcoal">
                          Limited to {tier.clientCapacityLimit} engagements
                        </p>
                      </div>
                    )}
                  </div>
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
