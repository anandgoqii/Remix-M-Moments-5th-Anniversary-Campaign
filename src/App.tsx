/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, SubmissionRecord, CampaignConfig } from './types/campaign';
import { DEFAULT_CAMPAIGN_CONFIG, saveSubmission } from './config/campaignConfig';
import { translations } from './locales/translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CampaignIntro } from './components/CampaignIntro';
import { HowItWorks } from './components/HowItWorks';
import { Timeline } from './components/Timeline';
import { SubmissionForm } from './components/SubmissionForm';
import { SuccessState } from './components/SuccessState';
import { ClosedCampaignState } from './components/ClosedCampaignState';
import { TermsModal } from './components/TermsModal';
import { Footer } from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [config, setConfig] = useState<CampaignConfig>(DEFAULT_CAMPAIGN_CONFIG);
  const [latestSubmission, setLatestSubmission] = useState<SubmissionRecord | null>(null);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const t = translations[language];

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    document.documentElement.lang = newLang === 'tc' ? 'zh-Hant-HK' : 'en-HK';
  };

  const handleScrollToForm = () => {
    const el = document.getElementById('submission-section');
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

  const handleSubmitSuccess = (record: SubmissionRecord) => {
    saveSubmission(record);
    setLatestSubmission(record);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetSubmission = () => {
    setLatestSubmission(null);
  };

  const handleToggleCampaignClosed = () => {
    setConfig((prev) => ({
      ...prev,
      isCampaignClosed: !prev.isCampaignClosed,
    }));
  };

  return (
    <div
      lang={language === 'tc' ? 'zh-Hant' : 'en'}
      className={`min-h-screen w-full max-w-full overflow-x-clip bg-white text-[#111111] flex flex-col selection:bg-[#FB5616] selection:text-white ${
        language === 'tc' ? 'lang-tc' : ''
      }`}
    >
      {/* Header */}
      <Header
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
        t={t}
        isClosed={config.isCampaignClosed}
        onScrollToForm={handleScrollToForm}
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full overflow-x-clip">
        {latestSubmission ? (
          /* Post-submission confirmation receipt */
          <SuccessState
            t={t}
            record={latestSubmission}
            onReset={handleResetSubmission}
          />
        ) : (
          <>
            {/* 1. Cinematic Hero Section */}
            <Hero
              t={t}
              currentLanguage={language}
              onCtaClick={handleScrollToForm}
              isClosed={config.isCampaignClosed}
            />

            {/* 2. Editorial Campaign Introduction */}
            <CampaignIntro t={t} currentLanguage={language} />

            {/* 3. 3-Step Process: Share -> Review -> Celebrate */}
            <HowItWorks t={t} />

            {/* 4. Campaign Milestone Timeline */}
            <Timeline t={t} currentLanguage={language} />

            {/* 5. Core Conversion: Submission Form or Closed State */}
            {!config.isCampaignClosed ? (
              <SubmissionForm
                t={t}
                currentLanguage={language}
                config={config}
                onSubmitSuccess={handleSubmitSuccess}
                onOpenTerms={() => setIsTermsOpen(true)}
              />
            ) : (
              <ClosedCampaignState t={t} />
            )}
          </>
        )}
      </main>

      {/* Institutional Footer */}
      <Footer
        t={t}
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
        onOpenTerms={() => setIsTermsOpen(true)}
        isClosed={config.isCampaignClosed}
        onToggleCampaignClosed={handleToggleCampaignClosed}
      />

      {/* Campaign Terms & Legal Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        t={t}
        currentLanguage={language}
      />
    </div>
  );
}
