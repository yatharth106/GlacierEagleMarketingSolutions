import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Services', href: '/services' },
    { label: 'Concept Study', href: '/case-studies' },
    { label: 'Process', href: '/services' },
    { label: 'Apply', href: '/apply' },
  ];

  return (
    <header className="w-full bg-[#050608] border-b border-[#1A1B20] fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center">
      <div className="w-full px-[60px] flex items-center justify-between h-full">
        {/* Logo - Two Lines */}
        <Link to="/" className="flex flex-col gap-0 hover:opacity-80 transition-opacity">
          <div className="font-mono text-[13px] font-bold text-[#C9A84C] uppercase tracking-[0.2em] leading-tight">
            Glacier Eagle
          </div>
          <div className="font-mono text-[9px] font-bold text-[#6B6B72] uppercase tracking-[0.3em] leading-tight">
            Marketing Solutions
          </div>
        </Link>

        {/* Desktop Navigation - Navigation and Apply buttons */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="font-mono text-[11px] font-bold text-[#F0EDE8] uppercase tracking-[0.15em] hover:text-[#C9A84C] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Apply Button */}
          <Link to="/apply">
            <button className="border border-[#C9A84C] bg-transparent text-[#C9A84C] font-mono text-[11px] font-bold uppercase tracking-[0.15em] px-6 py-[10px] rounded-none hover:bg-[#C9A84C] hover:text-black transition-all duration-200">
              Apply
            </button>
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-[#C9A84C] z-30"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden absolute top-[72px] left-0 right-0 bg-[#050608] border-b border-[#1A1B20] flex flex-col gap-4 p-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-sans text-[13px] text-[#F0EDE8] uppercase tracking-[0.05em] hover:text-[#C9A84C] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
