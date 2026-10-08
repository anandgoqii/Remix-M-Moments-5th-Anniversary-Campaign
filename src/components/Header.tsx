import React, { useState, useEffect } from 'react';
import { Language } from '../types/campaign';
import { Translations } from '../locales/translations';
import { MPlusLogo } from './MPlusLogo';
import { MenuDrawer } from './MenuDrawer';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  t: Translations;
  isClosed: boolean;
  onScrollToForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  t,
  isClosed,
  onScrollToForm,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#FB5616]/95 backdrop-blur-md shadow-lg border-b border-black/20'
            : 'bg-[#FB5616] border-b border-white/20 shadow-none'
        } text-white`}
      >
        <div
          className={`max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-1.5 sm:gap-4 transition-all duration-200 ${
            isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'
          }`}
        >
          {/* Left: Official M+ Vector Logo Lockup */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink min-w-0">
            <a
              href="#"
              onClick={handleLogoClick}
              className="flex items-center space-x-1.5 sm:space-x-2.5 text-white hover:opacity-95 transition-opacity focus-visible:outline-none min-w-0"
              aria-label="M+ 5th Anniversary Home"
            >
              {/* Official M+ SVG Logo */}
              <MPlusLogo className={`${isScrolled ? 'h-5 sm:h-7' : 'h-6 sm:h-8'} w-auto text-white shrink-0 transition-all duration-200`} />

              <span className="h-3.5 sm:h-5 w-px bg-white/40 shrink-0" aria-hidden="true" />

              <span className="hidden min-[360px]:inline text-[11px] sm:text-xs md:text-sm mplus-metadata font-black tracking-wide text-white leading-none whitespace-nowrap">
                {currentLanguage === 'tc' ? '五周年' : '5th Anniversary'}
              </span>
            </a>
          </div>

          {/* Center: Desktop Navigation Links (Visible on >= 1024px desktop) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-xs lg:text-sm font-bold tracking-wider">
            <button
              type="button"
              onClick={() => scrollToSection('intro')}
              className="px-3 py-1.5 text-white/90 hover:text-black hover:bg-white/15 transition-colors cursor-pointer rounded-none mplus-metadata whitespace-nowrap"
            >
              {t.nav.aboutLink}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="px-3 py-1.5 text-white/90 hover:text-black hover:bg-white/15 transition-colors cursor-pointer rounded-none mplus-metadata whitespace-nowrap"
            >
              {t.nav.howItWorksLink}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('timeline')}
              className="px-3 py-1.5 text-white/90 hover:text-black hover:bg-white/15 transition-colors cursor-pointer rounded-none mplus-metadata whitespace-nowrap"
            >
              {t.nav.timelineLink}
            </button>
          </nav>

          {/* Right: Actions (Language Switcher, CTA & Mobile Hamburger) */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            {/* Language Switch: EN | 繁中 */}
            <div
              className="flex items-center border border-white/60 bg-black/10 text-[11px] sm:text-xs font-bold shrink-0"
              role="group"
              aria-label="Language selector"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`min-h-[30px] sm:min-h-[36px] px-2 sm:px-2.5 transition-colors text-[11px] sm:text-xs font-bold ${
                  currentLanguage === 'en'
                    ? 'bg-white text-black font-black'
                    : 'text-white hover:bg-white/20'
                }`}
                aria-pressed={currentLanguage === 'en'}
              >
                EN
              </button>
              <span className="text-white/40 text-[10px]" aria-hidden="true">|</span>
              <button
                type="button"
                onClick={() => onLanguageChange('tc')}
                className={`min-h-[30px] sm:min-h-[36px] px-2 sm:px-2.5 transition-colors text-[11px] sm:text-xs font-bold ${
                  currentLanguage === 'tc'
                    ? 'bg-white text-black font-black'
                    : 'text-white hover:bg-white/20'
                }`}
                aria-pressed={currentLanguage === 'tc'}
              >
                繁中
              </button>
            </div>

            {/* Primary Action Button */}
            {!isClosed ? (
              <button
                type="button"
                onClick={onScrollToForm}
                className="min-h-[30px] sm:min-h-[36px] px-2.5 sm:px-5 py-1 bg-white hover:bg-black hover:text-white text-black text-[11px] sm:text-xs font-black transition-colors whitespace-nowrap focus-visible:outline-none shrink-0 shadow-sm cursor-pointer border border-white"
              >
                <span className="hidden sm:inline">{t.nav.shareCta}</span>
                <span className="sm:hidden">{currentLanguage === 'tc' ? '分享' : 'Share'}</span>
              </button>
            ) : (
              <span className="text-[11px] sm:text-xs mplus-metadata text-white border border-white/40 px-2 sm:px-3 py-1 font-bold shrink-0">
                Closed
              </span>
            )}

            {/* Mobile Hamburger Menu Toggle Button (Visible on < 1024px) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden min-h-[30px] min-w-[32px] sm:min-h-[36px] sm:min-w-[36px] p-1.5 sm:p-2 flex items-center justify-center border border-white/60 bg-black/10 text-white hover:bg-white hover:text-black transition-colors focus-visible:outline-none cursor-pointer shrink-0"
              aria-label="Open mobile navigation menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer so page content begins directly below the fixed header */}
      <div className="h-16 sm:h-20 w-full shrink-0" aria-hidden="true" />

      {/* Mobile Drawer Menu */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        t={t}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        onScrollToForm={onScrollToForm}
      />
    </>
  );
};
