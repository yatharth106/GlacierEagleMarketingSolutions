import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-ivory border-t border-stone">
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-heading text-charcoal mb-6">Glacier Eagle</h3>
            <p className="text-base font-paragraph text-charcoal opacity-70">
              Private Revenue Advisory for B2B Founders
            </p>
          </div>
          
          <div>
            <h4 className="text-base font-paragraph text-charcoal font-semibold mb-6">Navigation</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-base font-paragraph text-charcoal opacity-70 transition-opacity duration-300 hover:opacity-100">
                Home
              </Link>
              <Link to="/services" className="text-base font-paragraph text-charcoal opacity-70 transition-opacity duration-300 hover:opacity-100">
                Services
              </Link>
              <Link to="/engagement" className="text-base font-paragraph text-charcoal opacity-70 transition-opacity duration-300 hover:opacity-100">
                Engagement
              </Link>
              <Link to="/process" className="text-base font-paragraph text-charcoal opacity-70 transition-opacity duration-300 hover:opacity-100">
                Process
              </Link>
              <Link to="/case-studies" className="text-base font-paragraph text-charcoal opacity-70 transition-opacity duration-300 hover:opacity-100">
                Case Studies
              </Link>
              <Link to="/application" className="text-base font-paragraph text-charcoal opacity-70 transition-opacity duration-300 hover:opacity-100">
                Apply
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-base font-paragraph text-charcoal font-semibold mb-6">Legal</h4>
            <nav className="flex flex-col gap-3 mb-8">
              <Link to="/privacy" className="text-base font-paragraph text-charcoal opacity-70 transition-opacity duration-300 hover:opacity-100">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-base font-paragraph text-charcoal opacity-70 transition-opacity duration-300 hover:opacity-100">
                Terms of Service
              </Link>
            </nav>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-charcoal transition-opacity duration-300 hover:opacity-70"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-stone pt-8">
          <p className="text-sm font-paragraph text-charcoal opacity-70 text-center">
            © {new Date().getFullYear()} Glacier Eagle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
