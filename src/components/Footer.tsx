import React from 'react';
import { Translations } from '../locales/translations';
import { Language } from '../types/campaign';
import { MPlusLogo } from './MPlusLogo';

interface FooterProps {
  t: Translations;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenTerms: () => void;
  isClosed: boolean;
  onToggleCampaignClosed: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  t,
  currentLanguage,
  onLanguageChange,
  onOpenTerms,
  isClosed,
  onToggleCampaignClosed,
}) => {
  return (
    <footer className="w-full max-w-full bg-black text-white border-t-2 border-black text-xs overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/20">
          
          {/* Col 1: M+ Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <MPlusLogo className="h-8 w-auto text-white" />
              <span className="h-6 w-px bg-white/40 mx-2" aria-hidden="true" />
              <span className="text-xs mplus-metadata font-bold text-white">
                {currentLanguage === 'tc' ? '五周年誌慶' : currentLanguage === 'sc' ? '五周年志庆' : '5th Anniversary'}
              </span>
            </div>

            <p className="text-sm font-medium text-white/90 leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            <div className="pt-2 text-xs mplus-metadata text-white/70 space-y-1">
              <div>{t.footer.museumName}</div>
              <div>{t.footer.address}</div>
            </div>
          </div>

          {/* Col 2: Legal & Institutional Navigation */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs mplus-metadata font-bold text-white mb-4">
              {currentLanguage === 'tc' ? '活動章程與政策' : currentLanguage === 'sc' ? '活动章程与政策' : 'Campaign policies'}
            </div>
            <ul className="space-y-2.5 text-white/80 font-medium">
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-white transition-colors focus-visible:outline-none hover:underline cursor-pointer"
                >
                  {t.footer.termsLink}
                </button>
              </li>
              <li>
                <a
                  href="mailto:Marcom@mplus.org.hk"
                  className="hover:text-white transition-colors focus-visible:outline-none hover:underline"
                >
                  {t.footer.contactLink} (Marcom@mplus.org.hk)
                </a>
              </li>
              <li>
                <a
                  href="https://www.mplus.org.hk/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center space-x-1 focus-visible:outline-none font-bold text-white hover:underline"
                >
                  <span>{currentLanguage === 'tc' ? 'M+ 官方網站' : currentLanguage === 'sc' ? 'M+ 官方网站' : 'M+ Official website'}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Language & Administrative Preview Switch */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs mplus-metadata font-bold text-white mb-4">
              {currentLanguage === 'tc' ? '語言選擇' : currentLanguage === 'sc' ? '语言选择' : 'Language'}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 text-xs font-bold border-2 ${
                  currentLanguage === 'en'
                    ? 'border-white bg-white text-black'
                    : 'border-white/40 text-white hover:border-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('tc')}
                className={`px-3 py-1.5 text-xs font-bold border-2 ${
                  currentLanguage === 'tc'
                    ? 'border-white bg-white text-black'
                    : 'border-white/40 text-white hover:border-white'
                }`}
              >
                繁體中文
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('sc')}
                className={`px-3 py-1.5 text-xs font-bold border-2 ${
                  currentLanguage === 'sc'
                    ? 'border-white bg-white text-black'
                    : 'border-white/40 text-white hover:border-white'
                }`}
              >
                简体中文
              </button>
            </div>

            {/* Campaign State Simulation Toggle */}
            <div className="pt-4 border-t border-white/20">
              <div className="text-[11px] mplus-metadata text-white/70 mb-2 font-bold">
                {t.footer.adminToggleCampaign}
              </div>
              <button
                type="button"
                onClick={onToggleCampaignClosed}
                className="text-xs mplus-metadata text-white hover:text-white flex items-center space-x-2 border border-white/40 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors font-bold"
                title="Toggle between Campaign Open and Campaign Closed preview"
              >
                <span
                  className={`w-2.5 h-2.5 ${
                    !isClosed ? 'bg-[#11A1F0]' : 'bg-[#FB5616]'
                  }`}
                />
                <span>{!isClosed ? t.footer.statusOpen : t.footer.statusClosed}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Institutional Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs mplus-metadata text-white/70 font-medium gap-4">
          <div>{t.footer.rights}</div>
        </div>

      </div>
    </footer>
  );
};
