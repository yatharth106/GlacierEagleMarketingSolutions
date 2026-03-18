import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-navy-dark border-t border-gold-antique/20">
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-heading mb-6 tracking-tight text-ivory-primary">Glacier Eagle</h3>
            <p className="text-base font-paragraph text-ivory-body">
              Private Revenue Advisory for B2B Founders
            </p>
          </div>
          
          <div>
            <h4 className="text-base font-paragraph font-semibold mb-6 text-ivory-primary">Navigation</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-antique text-ivory-body">
                Home
              </Link>
              <Link to="/services" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-antique text-ivory-body">
                Services
              </Link>
              <Link to="/engagement-model" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-antique text-ivory-body">
                Engagement
              </Link>
              <Link to="/process" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-antique text-ivory-body">
                Process
              </Link>
              <Link to="/case-studies" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-antique text-ivory-body">
                Concept Study
              </Link>
              <Link to="/apply" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-antique text-ivory-body">
                Apply
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-base font-paragraph font-semibold mb-6 text-ivory-primary">Legal</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/privacy" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-antique text-ivory-body">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-base font-paragraph transition-colors duration-200 hover:text-gold-antique text-ivory-body">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-gold-antique/20 pt-8">
          <p className="text-sm font-paragraph text-center text-ivory-body">
            © {new Date().getFullYear()} Glacier Eagle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
