import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FounderLetterPage() {
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
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-heading text-charcoal mb-12 text-center">
              A Note From the Founder
            </h1>

            <div className="space-y-8 text-lg font-paragraph text-charcoal leading-relaxed">
              <p>
                Glacier Eagle was built for founders who want quiet execution and measurable results.
              </p>

              <p>
                Most email marketing agencies focus on volume: more campaigns, more automation, more metrics. We focus on precision. Every sequence we design is engineered to accelerate a specific revenue outcome—whether that's converting free trials, reactivating dormant leads, or shortening sales cycles.
              </p>

              <p>
                We limit the number of engagements to ensure depth, not volume. Our clients receive strategist-level attention, not template-based execution. We integrate deeply with your CRM, your sales process, and your revenue model. We track what matters: pipeline creation, meeting bookings, and cash flow acceleration.
              </p>

              <p>
                We believe revenue systems should feel invisible—yet powerful. The best infrastructure operates quietly in the background, delivering consistent results without requiring constant attention or dramatic intervention.
              </p>

              <p>
                This is not for everyone. We work exclusively with B2B founders and revenue leaders who have an existing sales process, generate consistent leads or trials, and want measurable revenue lift—not marketing noise.
              </p>

              <p>
                If that describes you, we should speak.
              </p>

              <div className="pt-12 border-t border-stone mt-12">
                <p className="font-semibold">Founder</p>
                <p className="opacity-70">Glacier Eagle Advisory</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
