import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { AdvisoryProcessSteps } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProcessPage() {
  const [steps, setSteps] = useState<AdvisoryProcessSteps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSteps();
  }, []);

  const loadSteps = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<AdvisoryProcessSteps>('processsteps');
      setSteps(result.items.sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0)));
    } catch (error) {
      console.error('Error loading process steps:', error);
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
              Our Advisory Process
            </h1>
            <p className="text-xl font-paragraph text-charcoal max-w-3xl mx-auto">
              A structured approach to revenue acceleration.
            </p>
          </motion.div>

          <div className="space-y-24 min-h-[600px]">
            {isLoading ? null : (
              steps.map((step, index) => (
                <motion.div
                  key={step._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="grid md:grid-cols-2 gap-16 items-center"
                >
                  {step.illustration && (
                    <div className={index % 2 === 0 ? 'order-1' : 'order-1 md:order-2'}>
                      <Image
                        src={step.illustration}
                        alt={step.stepName || 'Process step illustration'}
                        width={600}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  <div className={index % 2 === 0 ? 'order-2' : 'order-2 md:order-1'}>
                    <p className="text-base font-paragraph text-primary font-semibold mb-4">
                      Step {step.stepNumber}
                    </p>
                    <h2 className="text-4xl font-heading text-charcoal mb-6">
                      {step.stepName}
                    </h2>
                    <p className="text-lg font-paragraph text-charcoal leading-relaxed">
                      {step.description}
                    </p>
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
