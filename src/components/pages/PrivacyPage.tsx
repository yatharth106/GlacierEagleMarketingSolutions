import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/use-seo';

export default function PrivacyPage() {
  // --- SEO Configuration ---
  useSEO({
    title: 'Privacy Policy | Strategic Advisory',
    description: 'Read our privacy policy to understand how we collect, use, and protect your personal information.',
    keywords: 'privacy policy, data protection, privacy',
    canonical: typeof window !== 'undefined' ? window.location.origin + '/privacy' : undefined,
    ogTitle: 'Privacy Policy | Strategic Advisory',
    ogDescription: 'Read our privacy policy to understand how we protect your information.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  });
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
            <h1 className="text-5xl md:text-6xl font-heading text-charcoal mb-12">
              Privacy Policy
            </h1>

            <div className="space-y-8 text-base font-paragraph text-charcoal leading-relaxed">
              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Information Collection</h2>
                <p>
                  We collect information you provide directly to us when you request a revenue audit, submit an application, or communicate with us. This may include your name, company name, email address, and business information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Use of Information</h2>
                <p>
                  We use the information we collect to evaluate engagement opportunities, communicate with you about our services, and improve our advisory offerings. We do not sell or share your personal information with third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Data Retention</h2>
                <p>
                  We retain your information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Your Rights</h2>
                <p>
                  You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us directly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Contact</h2>
                <p>
                  For questions about this privacy policy or our data practices, please contact Glacier Eagle Advisory.
                </p>
              </section>

              <p className="text-sm opacity-70 pt-8 border-t border-stone">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
