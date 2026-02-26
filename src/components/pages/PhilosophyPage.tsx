import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PhilosophyPage() {
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="bg-charcoal-deep text-ivory-warm">
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-24 md:py-32 lg:py-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="space-y-6"
        >
          <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl leading-tight">
            The Philosophy
          </h1>
          <div className="w-16 h-px bg-gold-muted"></div>
          <p className="font-paragraph text-2xl md:text-3xl text-stone-light max-w-3xl leading-relaxed">
            Revenue is not luck. It is architecture.
          </p>
        </motion.div>
      </section>

      {/* Core Philosophy Statement */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20 md:py-28 border-t border-stone-light border-opacity-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12 md:space-y-16"
        >
          <motion.div variants={fadeInVariants} className="space-y-8">
            <p className="font-paragraph text-lg md:text-xl leading-relaxed text-ivory-off max-w-4xl">
              Most companies do not have a traffic problem. They have a conversion architecture problem. The funnel leaks at every stage because no one has engineered the journey deliberately. Visitors arrive, but the path to purchase is unclear. The messaging contradicts itself. The offer arrives too late or too early. The result is predictable: wasted spend and missed revenue.
            </p>

            <p className="font-paragraph text-lg md:text-xl leading-relaxed text-ivory-off max-w-4xl">
              Free trials leak revenue because they are not designed. They are hoped for. No one maps the onboarding sequence. No one engineers the moment of truth when the user decides to stay or leave. Email is not marketing. It is a controlled revenue channel when designed correctly—when every message serves a purpose, when sequences are built like systems, not scattered like confetti.
            </p>

            <p className="font-paragraph text-lg md:text-xl leading-relaxed text-ivory-off max-w-4xl">
              Automation without strategy is noise. It scales the wrong things. AI without human judgment is chaos. It optimizes for metrics, not meaning. Human creativity without systems is inconsistent. It produces brilliance one day and mediocrity the next. Revenue growth requires all three working in concert.
            </p>

            <p className="font-paragraph text-lg md:text-xl leading-relaxed text-ivory-off max-w-4xl">
              Glacier Eagle operates at the intersection of these three forces. We use AI frameworks for precision. We apply human strategy for direction. We enforce discipline for long-term compounding. Revenue growth is not a marketing problem. It is an engineering problem. And it is solved like engineering: with rigor, measurement, and relentless iteration.
            </p>

            <p className="font-paragraph text-lg md:text-xl leading-relaxed text-ivory-off max-w-4xl">
              The companies that win are not the loudest. They are the most disciplined. They do not chase every trend. They build systems that compound. They do not optimize for vanity metrics. They optimize for revenue per customer, retention, and lifetime value. This is the work of architects, not promoters.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Core Beliefs Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20 md:py-28 border-t border-stone-light border-opacity-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-ivory-warm">Core Beliefs</h2>
          <div className="w-12 h-px bg-gold-muted mt-4"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {[
            'Discipline beats intensity.',
            'Data without context is dangerous.',
            'Simplicity scales. Complexity collapses.',
            'Revenue is built in systems, not campaigns.',
            'Silence and execution outperform noise.',
          ].map((belief, index) => (
            <motion.div
              key={index}
              variants={fadeInVariants}
              className="border border-stone-light border-opacity-30 p-8 md:p-10 bg-charcoal-light bg-opacity-50 hover:bg-opacity-70 transition-colors duration-300"
            >
              <p className="font-heading text-xl md:text-2xl leading-relaxed text-ivory-warm">
                {belief}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Closing Statement */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-24 md:py-32 border-t border-stone-light border-opacity-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="max-w-3xl"
        >
          <p className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight text-ivory-warm">
            We do not chase attention.
          </p>
          <div className="w-16 h-px bg-gold-muted my-8"></div>
          <p className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight text-gold-muted">
            We build controlled revenue ecosystems.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
