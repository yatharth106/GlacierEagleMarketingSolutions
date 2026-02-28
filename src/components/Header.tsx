import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  const navItems = [
    { label: 'Philosophy', href: '/philosophy' },
    { label: 'Framework', href: '/framework' },
    { label: 'Services', href: '/services' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'FAQ', href: '/faq' },
    { label: "Why Choose Us ?", href: '/why-choose-us' },
  ];

  // Show sticky CTA after scrolling past hero section
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling ~600px (past hero)
      setShowStickyCTA(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="w-full bg-navy-dark border-b border-gold-antique/20 fixed top-0 left-0 right-0 z-50">
        <div class="max-w-[120rem] mx-auto px-6 md:px-12 py-6 relative z-10 lg:py-8 xl:py-10">
          <div class="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
            <Link to="/" class="text-4xl md:text-5xl font-heading text-gold-antique tracking-tight hover:text-ivory-primary transition-colors duration-300 relative z-20 order-1 lg:order-none">
              Glacier Eagle
            </Link>
            <nav class="hidden lg:flex flex-row items-center justify-center gap-x-10 gap-y-4 px-8 py-3 bg-slate-deep/50 backdrop-blur-sm rounded-full border border-gold-antique/30 shadow-lg order-2">
              <div class="flex items-center gap-x-8">
                {navItems.slice(0, 3).map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    class="text-base font-paragraph text-ivory-primary relative group transition-colors duration-300 hover:text-gold-antique px-2 py-1 uppercase tracking-wider"
                  >
                    {item.label}
                    <span class="absolute bottom-0 left-0 w-0 h-px bg-gold-antique group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </div>
              <div class="flex items-center gap-x-8">
                {navItems.slice(3).map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    class="text-base font-paragraph text-ivory-primary relative group transition-colors duration-300 hover:text-gold-antique px-2 py-1 uppercase tracking-wider"
                  >
                    {item.label}
                    <span class="absolute bottom-0 left-0 w-0 h-px bg-gold-antique group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </nav>
            <Link
              to="/application"
              class="hidden lg:block px-8 py-3 border border-gold-antique text-ivory-primary font-paragraph font-medium transition-all duration-300 hover:bg-gold-antique hover:text-navy-dark rounded-full shadow-md hover:shadow-lg order-3"
            >
              Apply
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              class="lg:hidden text-ivory-primary absolute top-6 right-6 z-30"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          {isMenuOpen && (
            <nav class="lg:hidden mt-8 pb-4 flex flex-col gap-4 border-t border-gold-antique/20 pt-4 bg-navy-dark/95 backdrop-blur-sm rounded-b-lg shadow-xl">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  class="text-lg font-paragraph text-ivory-primary py-2 px-4 transition-colors duration-300 hover:text-gold-antique hover:bg-slate-deep/50 rounded-md"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/application"
                class="mt-4 px-6 py-3 border border-gold-antique text-ivory-primary font-paragraph font-medium text-center transition-all duration-300 hover:bg-gold-antique hover:text-navy-dark rounded-md mx-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply
              </Link>
            </nav>
          )}
        </div>
      </header>
      {/* Sticky CTA Button - appears after scrolling past hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showStickyCTA ? 1 : 0, y: showStickyCTA ? 0 : -20 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-24 right-6 md:right-12 z-40 pointer-events-none ${showStickyCTA ? 'pointer-events-auto' : ''}`}
      >
        <Link to="/application">
          <button className="bg-bronze-burnished text-ivory-primary border border-gold-antique hover:bg-bronze-burnished/90 rounded-none px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-gold-antique/20 whitespace-nowrap">
            Request a Private Revenue Audit
          </button>
        </Link>
      </motion.div>
    </>
  );
}
