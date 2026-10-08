import React, { useState } from 'react';
import { Translations } from '../locales/translations';
import { Language } from '../types/campaign';
import ARTPARK_IMAGE_SRC from '../assets/images/mplus_artpark_dusk_1791284532724.jpg';

const INTRO_IMAGE_URL = 'https://appcdn.goqii.com/storeimg/54673_1791371822.jpg';

interface CampaignIntroProps {
  t: Translations;
  currentLanguage: Language;
}

export const CampaignIntro: React.FC<CampaignIntroProps> = ({ t, currentLanguage }) => {
  const [imgSrc, setImgSrc] = useState<string>(INTRO_IMAGE_URL);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (imgSrc === INTRO_IMAGE_URL) {
      setImgSrc(ARTPARK_IMAGE_SRC);
    } else {
      setImageError(true);
    }
  };

  return (
    <section id="intro" className="w-full bg-[#F75388] text-white border-b-2 border-black overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        
        {/* Graphic Poster Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Massive Editorial Typography */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center space-x-2 text-xs mplus-metadata tracking-widest text-white/90 font-black border border-white/40 px-3 py-1 bg-black/10">
              <span className="w-2 h-2 bg-white" />
              <span>{t.intro.kicker}</span>
            </div>

            <h2 className="mplus-display text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight whitespace-pre-line">
              {t.intro.headline}
            </h2>

            <div className="space-y-4 text-base sm:text-xl text-white/95 leading-relaxed font-normal max-w-2xl">
              <p>{t.intro.body1}</p>
              <div className="font-bold text-white text-lg sm:text-2xl pt-3 border-t border-white/30 whitespace-pre-line leading-relaxed">
                {t.intro.body2}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Photography in Clean White Border */}
          <div className="lg:col-span-5">
            <div className="bg-white p-3 sm:p-4 text-black shadow-2xl">
              <div className="aspect-[4/3] w-full overflow-hidden bg-black relative">
                {!imageError ? (
                  <img
                    src={imgSrc}
                    alt="M+ Museum and West Kowloon Art Park promenade"
                    className="w-full h-full object-cover filter contrast-[1.05]"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full bg-[#111111] flex items-center justify-center text-white/50 text-xs mplus-metadata">
                    M+ Architecture & Art Park
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
