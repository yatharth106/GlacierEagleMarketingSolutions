import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/use-seo';

export default function TermsPage() {
  // --- SEO Configuration ---
  useSEO({
    title: 'Terms of Service | Strategic Advisory',
    description: 'Read our terms of service to understand the conditions and agreements for using our advisory services.',
    keywords: 'terms of service, terms and conditions, legal',
    canonical: typeof window !== 'undefined' ? window.location.origin + '/terms' : undefined,
    ogTitle: 'Terms of Service | Strategic Advisory',
    ogDescription: 'Read our terms of service.',
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
              Terms of Service
            </h1>

            <div className="space-y-8 text-base font-paragraph text-charcoal leading-relaxed">
              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Engagement Terms</h2>
                <p>
                  Glacier Eagle Advisory provides strategic revenue acceleration services to qualified B2B companies. All engagements are subject to mutual agreement and capacity availability. We limit the number of concurrent engagements to ensure quality and depth of service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Application Process</h2>
                <p>
                  Submission of an application does not guarantee acceptance into an engagement. We review all applications and respond within 3-5 business days. Acceptance is based on strategic fit, capacity, and alignment with our advisory model.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Service Delivery</h2>
                <p>
                  Our services are delivered according to the specific engagement tier and scope agreed upon. We focus on measurable revenue outcomes and strategic execution. Timelines and deliverables are established at the beginning of each engagement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Confidentiality</h2>
                <p>
                  We maintain strict confidentiality regarding all client information, business processes, and strategic initiatives. All engagements are governed by mutual non-disclosure agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Intellectual Property</h2>
                <p>
                  All systems, frameworks, and methodologies developed during an engagement become the property of the client upon completion and full payment. Our proprietary advisory frameworks and processes remain the intellectual property of Glacier Eagle Advisory.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Limitation of Liability</h2>
                <p>
                  While we design systems to optimize revenue outcomes, we do not guarantee specific revenue results. Our liability is limited to the fees paid for services rendered.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Termination</h2>
                <p>
                  Either party may terminate an engagement with written notice according to the terms specified in the engagement agreement. Fees for work completed are non-refundable.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-charcoal mb-4">Modifications</h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be communicated to active clients and posted on this page.
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
