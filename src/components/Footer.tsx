import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-charcoal-deep border-t border-gold-muted">
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-heading mb-6 tracking-tight text-secondary-foreground">Glacier Eagle</h3>
            <p className="text-base font-paragraph text-secondary-foreground">
              Private Revenue Advisory for B2B Founders
            </p>
          </div>
          
          <div>
            <h4 className="text-base font-paragraph font-semibold mb-6 text-secondary-foreground">Navigation</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-muted text-secondary-foreground">
                Home
              </Link>
              <Link to="/services" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-muted text-secondary-foreground">
                Services
              </Link>
              <Link to="/engagement" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-muted text-secondary-foreground">
                Engagement
              </Link>
              <Link to="/process" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-muted text-secondary-foreground">
                Process
              </Link>
              <Link to="/case-studies" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-muted text-secondary-foreground">
                Case Studies
              </Link>
              <Link to="/application" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-muted text-secondary-foreground">
                Apply
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-base font-paragraph font-semibold mb-6 text-secondary-foreground">Legal</h4>
            <nav className="flex flex-col gap-3 mb-8">
              <Link to="/privacy" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-muted text-secondary-foreground">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-muted text-secondary-foreground">
                Terms of Service
              </Link>
            </nav>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-stone-light transition-colors duration-200 hover:text-gold-muted"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="fill-secondary-foreground" />
            </a>
          </div>
        </div>

        <div className="border-t border-gold-muted/30 pt-8">
          <p className="text-sm font-paragraph text-center text-secondary-foreground">
            © {new Date().getFullYear()} Glacier Eagle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
