import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-ivory border-b border-stone fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[120rem] mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-heading text-charcoal">
            Glacier Eagle
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/services" 
              className="text-base font-paragraph text-charcoal transition-opacity duration-300 hover:opacity-70"
            >
              Services
            </Link>
            <Link 
              to="/engagement" 
              className="text-base font-paragraph text-charcoal transition-opacity duration-300 hover:opacity-70"
            >
              Engagement
            </Link>
            <Link 
              to="/process" 
              className="text-base font-paragraph text-charcoal transition-opacity duration-300 hover:opacity-70"
            >
              Process
            </Link>
            <Link 
              to="/case-studies" 
              className="text-base font-paragraph text-charcoal transition-opacity duration-300 hover:opacity-70"
            >
              Case Studies
            </Link>
            <Link 
              to="/founder-letter" 
              className="text-base font-paragraph text-charcoal transition-opacity duration-300 hover:opacity-70"
            >
              Founder Letter
            </Link>
            <Link 
              to="/faq" 
              className="text-base font-paragraph text-charcoal transition-opacity duration-300 hover:opacity-70"
            >
              FAQ
            </Link>
            <Link 
              to="/application"
              className="bg-primary text-primary-foreground px-6 py-3 font-paragraph font-semibold transition-colors duration-300 hover:opacity-90"
            >
              Apply
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-charcoal"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 flex flex-col gap-4">
            <Link 
              to="/services" 
              className="text-base font-paragraph text-charcoal py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/engagement" 
              className="text-base font-paragraph text-charcoal py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Engagement
            </Link>
            <Link 
              to="/process" 
              className="text-base font-paragraph text-charcoal py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Process
            </Link>
            <Link 
              to="/case-studies" 
              className="text-base font-paragraph text-charcoal py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Case Studies
            </Link>
            <Link 
              to="/founder-letter" 
              className="text-base font-paragraph text-charcoal py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Founder Letter
            </Link>
            <Link 
              to="/faq" 
              className="text-base font-paragraph text-charcoal py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              to="/application"
              className="bg-primary text-primary-foreground px-6 py-3 font-paragraph font-semibold text-center"
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
