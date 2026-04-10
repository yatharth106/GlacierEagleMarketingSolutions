import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Services', href: '/services' },
    { label: 'Concept Study', href: '/case-studies' },
  ];

  return (
    <header className="w-full bg-[#050608] border-b border-[#1A1B20] fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center">
      <div className="w-full px-[60px] flex items-center justify-between h-full">
        {/* Logo - GEMS with Icon */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image
            src="https://static.wixstatic.com/media/5fdb91_1346d12087cf420c9fca76128bae4265~mv2.png"
            alt="GEMS Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="font-mono text-[13px] font-bold text-[#C9A84C] uppercase tracking-[0.2em] leading-tight">
            GEMS
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
          <Link
            to="/apply"
            className="font-mono text-[11px] font-bold text-[#050608] uppercase tracking-[0.15em] bg-[#C9A84C] px-6 py-2 hover:bg-[#B8963A] transition-colors"
          >
            Apply
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
          <Link
            to="/apply"
            onClick={() => setIsMenuOpen(false)}
            className="font-mono text-[11px] font-bold text-[#050608] uppercase tracking-[0.15em] bg-[#C9A84C] px-6 py-2 hover:bg-[#B8963A] transition-colors inline-block w-fit"
          >
            Apply
          </Link>
        </nav>
      )}
    </header>
  );
}
