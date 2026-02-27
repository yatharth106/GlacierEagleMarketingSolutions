import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageLayout ensures consistent footer positioning across all pages.
 * Uses flexbox to push footer to bottom when content is short.
 */
export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-navy-dark text-ivory-primary font-paragraph selection:bg-gold-antique selection:text-navy-dark overflow-x-clip">
      <Header />
      <main className={`flex-1 w-full ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
