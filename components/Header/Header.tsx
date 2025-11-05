'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ToolboxModal } from '../Toolbox/ToolboxModal';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/community', label: 'Community' },
  { href: '/resources', label: 'Resources' },
  { href: '/connect', label: 'Connect' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 border-b ${
          isScrolled
            ? 'h-[var(--nav-hs)] nav-scrolled border-[var(--nav-border)]'
            : 'h-[var(--nav-h)] bg-[var(--nav-bg)] border-[var(--nav-border)]'
        }`}
        style={{
          backdropFilter: isScrolled ? 'blur(30px)' : 'blur(20px)',
          WebkitBackdropFilter: isScrolled ? 'blur(30px)' : 'blur(20px)',
        }}
        role="banner"
      >
        <div className="max-w-[var(--max-w)] h-full mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-transform hover:scale-98 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-4 rounded-lg"
            aria-label="InnerAnimal Home"
          >
            <div
              className={`transition-all duration-300 ${
                isScrolled ? 'w-[160px]' : 'w-[180px]'
              }`}
            >
              <Image
                src="https://cdn.shopify.com/s/files/1/0685/1654/4672/files/meauxbility_logo_540.webp?v=1760648661"
                alt="InnerAnimal"
                width={180}
                height={180}
                priority
                className="w-full h-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 h-full" aria-label="Main navigation">
            <ul className="flex items-center gap-1 list-none h-full">
              {navLinks.map((link) => (
                <li key={link.href} className="relative h-full flex items-center">
                  <Link
                    href={link.href}
                    className={`relative px-[18px] py-[10px] rounded-lg text-sm font-semibold transition-all min-h-[44px] flex items-center tracking-wide ${
                      pathname === link.href
                        ? 'text-[var(--nav-hover)] font-bold after:absolute after:bottom-2 after:left-[18px] after:right-[18px] after:h-[3px] after:bg-[var(--accent)] after:rounded-sm'
                        : 'text-[var(--nav-link)] hover:text-[var(--nav-hover)] hover:bg-[var(--nav-hover-bg)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/impact"
              className="ml-3 px-[26px] py-[11px] bg-[var(--btn-bg)] hover:bg-[var(--btn-hover)] text-white rounded-lg text-sm font-bold transition-all min-h-[44px] flex items-center tracking-wider hover:-translate-y-px"
            >
              Impact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 min-w-[44px] min-h-[44px] rounded-lg transition-colors hover:bg-[var(--nav-hover-bg)] relative z-[10001]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="flex flex-col gap-1 w-6">
              <span
                className={`block h-[3px] bg-[var(--nav-link)] rounded-sm transition-transform ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`block h-[3px] bg-[var(--nav-link)] rounded-sm transition-opacity ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-[3px] bg-[var(--nav-link)] rounded-sm transition-transform ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <nav
        className={`lg:hidden fixed inset-0 z-[9998] bg-[var(--mobile-bg)] backdrop-blur-[30px] flex flex-col pt-[84px] px-6 pb-6 overflow-y-auto transition-all duration-300 ${
          isMobileMenuOpen
            ? 'translate-y-0 opacity-100 visible'
            : '-translate-y-full opacity-0 invisible'
        }`}
        aria-label="Mobile navigation"
      >
        <ul className="flex flex-col gap-0.5 list-none mb-6">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className="border-b border-[var(--nav-border)] py-4 min-h-[56px]"
            >
              <Link
                href={link.href}
                className={`text-base font-semibold transition-colors tracking-tight flex items-center relative ${
                  pathname === link.href
                    ? 'text-[var(--nav-hover)] font-bold after:absolute after:left-0 after:-bottom-4 after:right-0 after:h-[3px] after:bg-[var(--accent)] after:rounded-sm'
                    : 'text-[var(--nav-link)]'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/impact"
          className="bg-[var(--btn-bg)] hover:bg-[var(--btn-hover)] text-white mt-6 text-base font-bold px-6 py-[18px] rounded-xl transition-all min-h-[60px] flex items-center justify-center tracking-widest hover:-translate-y-px"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Impact
        </Link>
      </nav>

      {/* AI Toolbox CTA Button (Floating) */}
      <div className="fixed right-5 bottom-5 z-[10000]">
        <button
          onClick={() => setIsToolboxOpen(true)}
          className="glass rounded-2xl w-16 h-16 grid place-items-center text-white transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow),0_0_24px_rgba(74,236,220,0.4)] active:translate-y-0 group"
          style={{
            background:
              'radial-gradient(120px 120px at 30% 20%, rgba(74,236,220,0.22), transparent 60%), var(--glass-bg)',
          }}
          aria-label="Open developer toolbox"
          aria-haspopup="dialog"
        >
          <svg
            viewBox="0 0 48 48"
            className="w-8 h-8 group-hover:scale-110 transition-transform"
            role="img"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4AECDC" />
                <stop offset="1" stopColor="#9B59B6" />
              </linearGradient>
            </defs>
            <rect x="4" y="4" width="40" height="40" rx="10" fill="url(#g)" />
            <text
              x="24"
              y="30"
              textAnchor="middle"
              fontSize="20"
              fontWeight="900"
              fill="#fff"
            >
              AI
            </text>
          </svg>
        </button>
      </div>

      {/* Toolbox Modal */}
      <ToolboxModal isOpen={isToolboxOpen} onClose={() => setIsToolboxOpen(false)} />
    </>
  );
}
