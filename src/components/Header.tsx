import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-ivory-warm border-b border-stone-light fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[120rem] mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-heading text-charcoal-deep tracking-tight">
            Glacier Eagle
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/services" 
              className="text-base font-paragraph text-charcoal-deep transition-colors duration-200 hover:text-gold-muted"
            >
              Services
            </Link>
            <Link 
              to="/engagement" 
              className="text-base font-paragraph text-charcoal-deep transition-colors duration-200 hover:text-gold-muted"
            >
              Engagement
            </Link>
            <Link 
              to="/process" 
              className="text-base font-paragraph text-charcoal-deep transition-colors duration-200 hover:text-gold-muted"
            >
              Process
            </Link>
            <Link 
              to="/case-studies" 
              className="text-base font-paragraph text-charcoal-deep transition-colors duration-200 hover:text-gold-muted"
            >
              Case Studies
            </Link>
            <Link 
              to="/founder-letter" 
              className="text-base font-paragraph text-charcoal-deep transition-colors duration-200 hover:text-gold-muted"
            >
              Founder Letter
            </Link>
            <Link 
              to="/faq" 
              className="text-base font-paragraph text-charcoal-deep transition-colors duration-200 hover:text-gold-muted"
            >
              FAQ
            </Link>
            <a 
              href="#glacier-model" 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('glacier-model');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#glacier-model';
                }
              }}
              className="text-base font-paragraph text-charcoal-deep transition-colors duration-200 hover:text-gold-muted cursor-pointer"
            >
              View Our Model
            </a>
            <Link 
              to="/application"
              className="bg-charcoal-deep text-ivory-warm px-6 py-3 font-paragraph font-semibold border border-gold-muted transition-all duration-200 hover:bg-charcoal-light"
            >
              Apply
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-charcoal-deep"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 flex flex-col gap-4 border-t border-stone-light pt-4">
            <Link 
              to="/services" 
              className="text-base font-paragraph text-charcoal-deep py-2 transition-colors duration-200 hover:text-gold-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/engagement" 
              className="text-base font-paragraph text-charcoal-deep py-2 transition-colors duration-200 hover:text-gold-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Engagement
            </Link>
            <Link 
              to="/process" 
              className="text-base font-paragraph text-charcoal-deep py-2 transition-colors duration-200 hover:text-gold-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Process
            </Link>
            <Link 
              to="/case-studies" 
              className="text-base font-paragraph text-charcoal-deep py-2 transition-colors duration-200 hover:text-gold-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Case Studies
            </Link>
            <Link 
              to="/founder-letter" 
              className="text-base font-paragraph text-charcoal-deep py-2 transition-colors duration-200 hover:text-gold-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Founder Letter
            </Link>
            <Link 
              to="/faq" 
              className="text-base font-paragraph text-charcoal-deep py-2 transition-colors duration-200 hover:text-gold-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <a 
              href="#glacier-model" 
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                const element = document.getElementById('glacier-model');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#glacier-model';
                }
              }}
              className="text-base font-paragraph text-charcoal-deep py-2 transition-colors duration-200 hover:text-gold-muted cursor-pointer"
            >
              View Our Model
            </a>
            <Link 
              to="/application"
              className="bg-charcoal-deep text-ivory-warm px-6 py-3 font-paragraph font-semibold border border-gold-muted text-center transition-all duration-200 hover:bg-charcoal-light"
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
