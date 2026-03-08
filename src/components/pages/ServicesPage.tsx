import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';

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
    <div className="min-h-screen bg-navy-dark">
      <Header />

      <section className="w-full bg-navy-dark pt-32 pb-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center mb-24"
          >
            <h1 className="text-6xl md:text-7xl font-heading text-ivory-primary mb-8">
              Done-For-You Revenue Email Systems
            </h1>
            <p className="text-xl font-paragraph text-ivory-body max-w-3xl mx-auto">
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
                    <h2 className="text-4xl font-heading text-ivory-primary mb-6">
                      {service.serviceName}
                    </h2>
                    <p className="text-lg font-paragraph text-ivory-body mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    {service.outcomeFocus && (
                      <p className="text-base font-paragraph text-ivory-body opacity-70">
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

      {/* --- PRICING TIERS SECTION --- */}
      <section className="w-full py-32 bg-slate-deep">
        <div className="max-w-[100rem] mx-auto px-8">
          {/* Scarcity Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24 p-6 bg-gold-antique/10 border border-gold-antique/30 rounded-sm text-center"
          >
            <p className="text-lg font-paragraph text-ivory-primary">
              GEMS works with a maximum of 5 active clients at any time. Current availability: <span className="font-bold text-gold-antique">3</span> of 5 slots open.
            </p>
          </motion.div>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl font-heading text-ivory-primary mb-8">Pricing & Engagement Tiers</h2>
            <p className="text-lg font-paragraph text-ivory-body max-w-2xl mx-auto">
              Choose the engagement level that matches your growth stage and revenue goals.
            </p>
          </motion.div>

          {/* Three Tier Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Stage 1 - Launch Partner (Gold Treatment) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="relative"
            >
              <div className="bg-card-bg border-2 border-gold-antique p-12 rounded-sm h-full flex flex-col">
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gold-antique text-navy-dark font-bold px-4 py-1 rounded-full">
                    Now Open
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-heading text-ivory-primary mb-2 pt-4">Launch Partner</h3>
                <p className="text-sm text-gold-antique font-bold uppercase tracking-widest mb-8">Stage 1</p>

                {/* Details */}
                <div className="space-y-6 flex-1">
                  <div>
                    <p className="text-xs text-gold-antique/60 uppercase tracking-wider font-bold mb-2">Blueprint</p>
                    <p className="text-2xl font-heading text-ivory-primary">$497</p>
                  </div>

                  <div>
                    <p className="text-xs text-gold-antique/60 uppercase tracking-wider font-bold mb-2">Phase II Base</p>
                    <p className="text-2xl font-heading text-ivory-primary">$0<span className="text-lg text-ivory-body">/month</span></p>
                  </div>

                  <div>
                    <p className="text-xs text-gold-antique/60 uppercase tracking-wider font-bold mb-2">Revenue Share</p>
                    <p className="text-2xl font-heading text-ivory-primary">20%<span className="text-lg text-ivory-body"> of new MRR</span></p>
                  </div>

                  <div>
                    <p className="text-xs text-gold-antique/60 uppercase tracking-wider font-bold mb-2">Minimum</p>
                    <p className="text-lg font-paragraph text-ivory-body">3 months</p>
                  </div>

                  <div className="pt-4 border-t border-gold-antique/20">
                    <p className="text-xs text-ivory-body/70 italic">
                      The $497 is fully credited if you enter Phase II within 7 days. The audit costs nothing if you move forward.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stage 2 - Growth Partner (Greyed Out) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative opacity-50"
            >
              <div className="bg-card-bg border border-divider p-12 rounded-sm h-full flex flex-col">
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-slate-deep text-ivory-primary/60 font-bold px-4 py-1 rounded-full border border-ivory-primary/20">
                    Coming Soon
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-heading text-ivory-primary mb-2 pt-4">Growth Partner</h3>
                <p className="text-sm text-ivory-primary/60 font-bold uppercase tracking-widest mb-8">Stage 2</p>

                {/* Details */}
                <div className="space-y-6 flex-1">
                  <div>
                    <p className="text-xs text-ivory-primary/40 uppercase tracking-wider font-bold mb-2">Blueprint</p>
                    <p className="text-2xl font-heading text-ivory-primary">$997</p>
                  </div>

                  <div>
                    <p className="text-xs text-ivory-primary/40 uppercase tracking-wider font-bold mb-2">Phase II Base</p>
                    <p className="text-2xl font-heading text-ivory-primary">$1,500<span className="text-lg text-ivory-body">/month</span></p>
                  </div>

                  <div>
                    <p className="text-xs text-ivory-primary/40 uppercase tracking-wider font-bold mb-2">Revenue Share</p>
                    <p className="text-2xl font-heading text-ivory-primary">15%<span className="text-lg text-ivory-body"> of new MRR</span></p>
                  </div>

                  <div>
                    <p className="text-xs text-ivory-primary/40 uppercase tracking-wider font-bold mb-2">Minimum</p>
                    <p className="text-lg font-paragraph text-ivory-body">4 months</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stage 3 - Premium Partner (Greyed Out) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative opacity-50"
            >
              <div className="bg-card-bg border border-divider p-12 rounded-sm h-full flex flex-col">
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-slate-deep text-ivory-primary/60 font-bold px-4 py-1 rounded-full border border-ivory-primary/20">
                    Coming Soon
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-heading text-ivory-primary mb-2 pt-4">Premium Partner</h3>
                <p className="text-sm text-ivory-primary/60 font-bold uppercase tracking-widest mb-8">Stage 3</p>

                {/* Details */}
                <div className="space-y-6 flex-1">
                  <div>
                    <p className="text-xs text-ivory-primary/40 uppercase tracking-wider font-bold mb-2">Blueprint</p>
                    <p className="text-2xl font-heading text-ivory-primary">$2,000</p>
                  </div>

                  <div>
                    <p className="text-xs text-ivory-primary/40 uppercase tracking-wider font-bold mb-2">Phase II Base</p>
                    <p className="text-2xl font-heading text-ivory-primary">$3,000<span className="text-lg text-ivory-body">/month</span></p>
                  </div>

                  <div>
                    <p className="text-xs text-ivory-primary/40 uppercase tracking-wider font-bold mb-2">Revenue Share</p>
                    <p className="text-2xl font-heading text-ivory-primary">12%<span className="text-lg text-ivory-body"> of new MRR</span></p>
                  </div>

                  <div>
                    <p className="text-xs text-ivory-primary/40 uppercase tracking-wider font-bold mb-2">Minimum</p>
                    <p className="text-lg font-paragraph text-ivory-body">6 months</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center pt-8 border-t border-gold-antique/20"
          >
            <p className="text-lg font-paragraph text-ivory-primary">
              <span className="font-bold">Stage 1 clients lock in these rates forever.</span> Pricing only goes up from here.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
