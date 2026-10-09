import React, { useState } from 'react';
import { Translations } from '../locales/translations';
import { Language } from '../types/campaign';
import LOCAL_BANNER_SRC from '../assets/images/banner_mplus_facade_anniversary.jpg';

const BANNER_URL = 'https://appcdn.goqii.com/storeimg/62851_1791441003.jpg';

interface HeroProps {
  t: Translations;
  currentLanguage: Language;
  onCtaClick: () => void;
  isClosed: boolean;
}

export const Hero: React.FC<HeroProps> = ({ t, currentLanguage, onCtaClick, isClosed }) => {
  const [imgSrc, setImgSrc] = useState<string>(BANNER_URL);
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const handleImageError = () => {
    if (imgSrc === BANNER_URL) {
      setImgSrc(LOCAL_BANNER_SRC);
    } else if (imgSrc !== '/assets/images/banner_mplus_facade_anniversary.jpg') {
      setImgSrc('/assets/images/banner_mplus_facade_anniversary.jpg');
    } else {
      setImageFailed(true);
    }
  };

  return (
    <section className="relative w-full max-w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex flex-col justify-end overflow-hidden border-b-2 border-black bg-black text-white">
      {/* Background Photography Container */}
      <div className="absolute inset-0 w-full h-full min-w-full overflow-hidden z-0 bg-black">
        {!imageFailed ? (
          <img
            src={imgSrc}
            alt="M+ Museum building and glowing LED facade at night facing Victoria Harbour"
            className="w-full h-full min-w-full min-h-full object-cover object-center filter brightness-[0.85] contrast-[1.15]"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center text-white/50 mplus-metadata text-xs">
            M+ Facade · Victoria Harbour, Hong Kong
          </div>
        )}

        {/* High-Contrast Scrims for Flawless Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        
        {/* Architectural LED Louvre Grid Texture */}
        <div className="absolute inset-0 mplus-facade-lines opacity-25 pointer-events-none" />
      </div>

      {/* Main Banner Copy & Button Over Background Image - Positioned in Lower Area */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8 sm:pb-12 lg:pb-14 flex flex-col justify-end overflow-hidden">
        <div className="max-w-3xl">
          
          {/* Main Campaign Headline */}
          <h1 className="mplus-display text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.98] tracking-tight mb-3 sm:mb-5 drop-shadow-lg">
            {t.hero.title}
          </h1>

          {/* Editorial Description */}
          <p className="text-base sm:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-2xl font-medium mb-6 sm:mb-8 drop-shadow">
            {t.hero.description}
          </p>

          {/* Action Button Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-md sm:max-w-none">
            {!isClosed ? (
              <button
                type="button"
                onClick={onCtaClick}
                className="min-h-[50px] sm:min-h-[56px] px-6 sm:px-10 py-3.5 sm:py-4 bg-[#FB5616] hover:bg-white hover:text-black active:scale-[0.99] text-white font-bold text-sm sm:text-base transition-all inline-flex items-center justify-center space-x-2.5 shadow-2xl border-2 border-white/80"
              >
                <span>{t.hero.ctaButton}</span>
                <span aria-hidden="true" className="text-base font-black">→</span>
              </button>
            ) : (
              <div className="min-h-[50px] px-6 py-3.5 bg-white/20 text-white font-bold text-xs text-center mplus-metadata border border-white/40">
                {currentLanguage === 'tc' ? '徵集活動已截止' : currentLanguage === 'sc' ? '征集活动已截止' : 'Submissions closed'}
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('how-it-works');
                if (el) {
                  const headerOffset = 76;
                  const pos = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                  window.scrollTo({ top: pos, behavior: 'smooth' });
                }
              }}
              className="min-h-[50px] sm:min-h-[56px] px-6 sm:px-7 py-3.5 sm:py-4 bg-black/60 hover:bg-white hover:text-black text-white font-bold text-xs sm:text-sm transition-all inline-flex items-center justify-center border-2 border-white/60 backdrop-blur-sm cursor-pointer"
            >
              {t.hero.howItWorksButton}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
