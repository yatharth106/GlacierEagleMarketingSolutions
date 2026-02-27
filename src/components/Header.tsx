import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Philosophy', href: '/philosophy' },
    { label: 'Framework', href: '/framework' },
    { label: 'Services', href: '/services' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'FAQ', href: '/faq' },
  ];

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsMenuOpen(false);
  };

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
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-xl font-heading text-ivory-primary tracking-tight hover:text-gold-antique transition-colors duration-300">
              Glacier Eagle
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-base font-paragraph text-ivory-primary relative group transition-colors duration-300 hover:text-gold-antique px-2 py-2 bg-transparent border-none cursor-pointer"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-antique group-hover:w-full transition-all duration-300" />
                </button>
              ))}
              <Link
                to="/application"
                className="ml-6 px-6 py-3 border border-gold-antique text-ivory-primary font-paragraph font-medium transition-all duration-300 hover:bg-gold-antique hover:text-navy-dark"
              >
                Apply
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-ivory-primary"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-6 pb-4 flex flex-col gap-4 border-t border-gold-antique/20 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-base font-paragraph text-ivory-primary py-2 transition-colors duration-300 hover:text-gold-antique text-left bg-transparent border-none cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <Link
                to="/application"
                className="mt-4 px-6 py-3 border border-gold-antique text-ivory-primary font-paragraph font-medium text-center transition-all duration-300 hover:bg-gold-antique hover:text-navy-dark"
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
