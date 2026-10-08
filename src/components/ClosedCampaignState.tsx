import React from 'react';
import { Translations } from '../locales/translations';

interface ClosedCampaignStateProps {
  t: Translations;
}

export const ClosedCampaignState: React.FC<ClosedCampaignStateProps> = ({ t }) => {
  return (
    <section className="w-full max-w-full overflow-hidden bg-[#FB5616] text-white py-24 lg:py-32 border-b-2 border-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="bg-white text-black p-8 sm:p-16 border-4 border-black shadow-2xl relative">
          <div className="inline-block bg-[#F75388] text-white px-3 py-1 text-xs mplus-metadata font-bold mb-6">
            {t.closed.badge}
          </div>

          <h2 className="mplus-display text-4xl sm:text-6xl font-black text-black tracking-tight leading-[0.98] mb-6">
            {t.closed.headline}
          </h2>

          <p className="text-base sm:text-xl font-medium text-neutral-800 leading-relaxed max-w-xl mx-auto mb-8">
            {t.closed.body}
          </p>

          <div>
            <a
              href="https://www.mplus.org.hk/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 min-h-[48px] px-8 py-3.5 bg-black text-white hover:bg-[#11A1F0] text-xs font-bold transition-colors border-2 border-black"
            >
              <span>{t.closed.followLink}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
