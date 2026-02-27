import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Philosophy', href: '/philosophy' },
    { label: 'Framework', href: '/framework' },
    { label: 'Services', href: '/services' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
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
              <Link
                key={item.href}
                to={item.href}
                className="text-base font-paragraph text-ivory-primary relative group transition-colors duration-300 hover:text-gold-antique px-2 py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-antique group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              to="/apply"
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
              <Link
                key={item.href}
                to={item.href}
                className="text-base font-paragraph text-ivory-primary py-2 transition-colors duration-300 hover:text-gold-antique"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/apply"
              className="mt-4 px-6 py-3 border border-gold-antique text-ivory-primary font-paragraph font-medium text-center transition-all duration-300 hover:bg-gold-antique hover:text-navy-dark"
              onClick={() => setIsMenuOpen(false)}
            >
              Apply
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
