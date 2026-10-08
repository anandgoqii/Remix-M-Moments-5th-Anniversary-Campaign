import React from 'react';
import { Translations } from '../locales/translations';
import { Language } from '../types/campaign';
import { MPlusLogo } from './MPlusLogo';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onScrollToForm: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  t,
  currentLanguage,
  onLanguageChange,
  onScrollToForm,
}) => {
  if (!isOpen) return null;

  const handleNavigate = (id: string) => {
    onClose();
    setTimeout(() => {
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
    }, 120);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="M+ Menu"
    >
      {/* Backdrop click to close */}
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div className="relative z-10 w-full max-w-md bg-[#111111] border-l border-white/20 h-full flex flex-col justify-between p-6 sm:p-8 text-white overflow-y-auto">
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/20">
            <div className="flex items-center space-x-2">
              <MPlusLogo className="h-6 w-auto text-white" />
              <span className="h-4 w-px bg-white/40 mx-1" />
              <span className="text-xs mplus-metadata text-white/80 font-bold">
                {currentLanguage === 'tc' ? '五周年' : '5th Anniversary'}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white transition-colors focus-visible:outline-none text-lg font-bold"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Tri-color M+ Accent Bar */}
          <div className="grid grid-cols-3 h-1 w-full my-4">
            <div className="bg-[#FB5616]" />
            <div className="bg-[#F75388]" />
            <div className="bg-[#11A1F0]" />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-6 pt-4">
            <div>
              <div className="text-[11px] mplus-metadata text-[#FB5616] font-bold mb-3 tracking-wider">
                01 / {currentLanguage === 'tc' ? '活動專頁' : 'CAMPAIGN'}
              </div>
              <ul className="space-y-3 text-base text-white/90">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onScrollToForm();
                    }}
                    className="hover:text-[#FB5616] transition-colors text-left font-black text-white flex items-center space-x-2 text-lg"
                  >
                    <span>{t.nav.shareCta}</span>
                    <span className="text-[#FB5616]">→</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('intro')}
                    className="hover:text-white transition-colors text-left py-1 text-white/80 hover:text-white block w-full"
                  >
                    {t.nav.aboutLink}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('how-it-works')}
                    className="hover:text-white transition-colors text-left py-1 text-white/80 hover:text-white block w-full"
                  >
                    {t.nav.howItWorksLink}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('timeline')}
                    className="hover:text-white transition-colors text-left py-1 text-white/80 hover:text-white block w-full"
                  >
                    {t.nav.timelineLink}
                  </button>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="text-[11px] mplus-metadata text-[#11A1F0] font-bold mb-3 tracking-wider">
                02 / {t.nav.becomeMember}
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a
                    href="https://www.mplus.org.hk/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center justify-between py-1"
                  >
                    <span>M+ Official Site</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mplus.org.hk/en/membership/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center justify-between py-1"
                  >
                    <span>M+ Membership</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Drawer Bottom Actions: Language Switch & Museum Address */}
        <div className="pt-6 border-t border-white/20 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs mplus-metadata text-white/60 font-bold">
              {currentLanguage === 'tc' ? '語言' : 'LANGUAGE'}
            </span>
            <div className="flex items-center border border-white/60 bg-black/20 text-xs font-bold">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 transition-colors ${
                  currentLanguage === 'en'
                    ? 'bg-white text-black font-black'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                EN
              </button>
              <span className="text-white/40">|</span>
              <button
                type="button"
                onClick={() => onLanguageChange('tc')}
                className={`px-3 py-1.5 transition-colors ${
                  currentLanguage === 'tc'
                    ? 'bg-white text-black font-black'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                繁中
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-white/50 pt-2 border-t border-white/10">
            M+ Museum · West Kowloon Cultural District, Hong Kong
          </div>
        </div>

      </div>
    </div>
  );
};
