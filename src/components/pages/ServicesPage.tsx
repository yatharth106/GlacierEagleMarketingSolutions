import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const [services, setServices] = useState<Services[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Services>('services');
      setServices(result.items);
    } catch (error) {
      console.error('Error loading services:', error);
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
              Done-For-You Revenue Email Systems
            </h1>
            <p className="text-xl font-paragraph text-charcoal max-w-3xl mx-auto">
              We design, build, and optimize email systems that accelerate revenue outcomes.
            </p>
          </motion.div>

          <div className="space-y-24 min-h-[600px]">
            {isLoading ? null : (
              services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="grid md:grid-cols-2 gap-16 items-center"
                >
                  {service.illustrationImage && (
                    <div className={index % 2 === 0 ? 'order-1' : 'order-1 md:order-2'}>
                      <Image
                        src={service.illustrationImage}
                        alt={service.serviceName || 'Service illustration'}
                        width={600}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  <div className={index % 2 === 0 ? 'order-2' : 'order-2 md:order-1'}>
                    <h2 className="text-4xl font-heading text-charcoal mb-6">
                      {service.serviceName}
                    </h2>
                    <p className="text-lg font-paragraph text-charcoal mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    {service.outcomeFocus && (
                      <p className="text-base font-paragraph text-charcoal opacity-70">
                        <span className="font-semibold">Outcome Focus:</span> {service.outcomeFocus}
                      </p>
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
