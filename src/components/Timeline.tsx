import React from 'react';
import { Translations } from '../locales/translations';
import { Language } from '../types/campaign';

interface TimelineProps {
  t: Translations;
  currentLanguage?: Language;
}

export const Timeline: React.FC<TimelineProps> = ({ t }) => {
  const milestones = [
    {
      date: t.timeline.milestone1Date,
      title: t.timeline.milestone1Title,
      desc: t.timeline.milestone1Desc,
      bg: 'bg-[#11A1F0]',
      badge: 'ACTIVE NOW',
    },
    {
      date: t.timeline.milestone2Date,
      title: t.timeline.milestone2Title,
      desc: t.timeline.milestone2Desc,
      bg: 'bg-[#FB5616]',
      badge: 'UPCOMING',
    },
    {
      date: t.timeline.milestone3Date,
      title: t.timeline.milestone3Title,
      desc: t.timeline.milestone3Desc,
      bg: 'bg-[#F75388]',
      badge: 'FINALE · 5TH ANNIVERSARY',
    },
  ];

  return (
    <section id="timeline" className="w-full max-w-full bg-white border-b-2 border-black overflow-hidden">
      {/* Editorial Header Strip */}
      <div className="bg-black text-white px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs mplus-metadata">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-[#F75388] inline-block" />
          <span className="font-bold">
            {t.timeline.sectionTitle}
          </span>
        </div>
        <div className="text-white/70 mt-1 sm:mt-0">
          {t.timeline.subtitle}
        </div>
      </div>

      {/* Colour-Blocked Timeline: Horizontal on Desktop, Vertical on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {milestones.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} text-white p-6 sm:p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/30 last:border-r-0`}
          >
            <div>
              {/* Stage Badge & Node */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs mplus-metadata font-bold text-white/80 bg-black/10 px-2.5 py-1">
                  Stage 0{index + 1}
                </span>

                <span className="text-[11px] mplus-metadata font-bold bg-white text-black px-2.5 py-0.5 shadow-sm">
                  {item.badge}
                </span>
              </div>

              {/* Milestone Date */}
              <div className="text-xl sm:text-2xl font-black mplus-display tracking-tight text-white mb-2">
                {item.date}
              </div>

              {/* Milestone Title in Sentence Case */}
              <h3 className="text-2xl sm:text-3xl font-black mplus-display tracking-tight mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base font-medium text-white/95 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
