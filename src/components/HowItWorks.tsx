import React from 'react';
import { Translations } from '../locales/translations';

interface HowItWorksProps {
  t: Translations;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ t }) => {
  const steps = [
    {
      num: t.howItWorks.step1Number,
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      bg: 'bg-[#FB5616]',
      border: 'border-white/30',
    },
    {
      num: t.howItWorks.step2Number,
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      bg: 'bg-[#F75388]',
      border: 'border-white/30',
    },
    {
      num: t.howItWorks.step3Number,
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      bg: 'bg-[#11A1F0]',
      border: 'border-white/30',
    },
  ];

  return (
    <section id="how-it-works" className="w-full max-w-full bg-white border-b-2 border-black overflow-hidden">
      {/* Editorial Header Strip */}
      <div className="bg-black text-white px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs mplus-metadata">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-[#FB5616] inline-block" />
          <span className="font-bold">
            {t.howItWorks.sectionTitle}
          </span>
        </div>
        <div className="text-white/70 mt-1 sm:mt-0">
          {t.howItWorks.subtitle}
        </div>
      </div>

      {/* 3-Part Architectural Colour Grid: Orange | Pink | Blue */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`${step.bg} text-white p-6 sm:p-12 lg:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r ${step.border} last:border-r-0 min-h-[280px] sm:min-h-[360px]`}
          >
            <div>
              {/* Massive Bold White Numeral */}
              <div className="flex items-baseline justify-between mb-8 sm:mb-12">
                <span className="mplus-display text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter">
                  {step.num}
                </span>
                <span className="text-xs mplus-metadata font-bold text-white/80 bg-black/10 px-2.5 py-1">
                  Phase 0{idx + 1}
                </span>
              </div>

              {/* Step Title in Sentence Case */}
              <h3 className="mplus-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg font-medium text-white/95 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
