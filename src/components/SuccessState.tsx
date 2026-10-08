import React, { useState } from 'react';
import { Translations } from '../locales/translations';
import { SubmissionRecord } from '../types/campaign';

interface SuccessStateProps {
  t: Translations;
  record: SubmissionRecord;
  onReset: () => void;
}

export const SuccessState: React.FC<SuccessStateProps> = ({ t, record, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(record.submissionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formattedDate = new Date(record.submittedAt).toLocaleDateString(
    record.language === 'tc' ? 'zh-HK' : 'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  return (
    <section className="min-h-[85vh] w-full max-w-full overflow-hidden bg-[#11A1F0] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center border-b-2 border-black">
      <div className="max-w-3xl w-full">
        
        {/* Poster Style Success Card */}
        <div className="bg-[#FB5616] border-4 border-black p-6 sm:p-12 text-white shadow-2xl relative">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center space-x-2 text-xs mplus-metadata text-black bg-white px-3 py-1 font-bold mb-6">
            <span className="w-2 h-2 bg-[#FB5616]" />
            <span>{t.success.badge}</span>
          </div>

          {/* Main Headline */}
          <h2 className="mplus-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-[0.98] mb-4">
            {t.success.headline}
          </h2>

          <p className="text-lg sm:text-xl font-medium text-white/95 leading-relaxed mb-6">
            {t.success.lead}
          </p>

          <div className="p-4 bg-black/20 border-l-4 border-white text-sm sm:text-base font-bold text-white mb-8">
            {t.success.notice}
          </div>

          {/* Record Details in crisp white box */}
          <div className="bg-white text-black p-6 sm:p-8 space-y-5 border-2 border-black mb-8 shadow-md">
            {/* Submitter details row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b-2 border-neutral-200">
              <div>
                <span className="block text-[11px] mplus-metadata text-neutral-600 font-bold">
                  {t.success.submitterName}
                </span>
                <span className="text-base font-black mplus-display mt-0.5 block">
                  {record.fullName}
                </span>
              </div>

              <div>
                <span className="block text-[11px] mplus-metadata text-neutral-600 font-bold">
                  {t.success.thematicSection}
                </span>
                <span className="text-sm font-bold text-neutral-900 mt-0.5 block">
                  {record.thematicSection}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b-2 border-neutral-200">
              <div>
                <span className="block text-[11px] mplus-metadata text-neutral-600 font-bold">
                  {t.success.refNumber}
                </span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xl font-black mplus-display tracking-wider">
                    {record.submissionId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyRef}
                    className="text-xs mplus-metadata border-2 border-black px-2.5 py-0.5 hover:bg-black hover:text-white transition-colors font-bold"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-[11px] mplus-metadata text-neutral-600 font-bold">
                  {t.success.registeredMobile}
                </span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-lg font-black mplus-display tracking-wider block">
                    {record.countryCode} {record.mobileNumber}
                  </span>
                  <span className="text-[10px] mplus-metadata bg-black text-white px-2 py-0.5 font-bold">
                    Verified ✓
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b-2 border-neutral-200">
              <div>
                <span className="block text-[11px] mplus-metadata text-neutral-600 font-bold">
                  {t.success.timestamp}
                </span>
                <span className="text-xs font-bold text-neutral-800 mt-1 block">
                  {formattedDate}
                </span>
              </div>

              <div>
                <span className="block text-[11px] mplus-metadata text-neutral-600 font-bold">
                  Status
                </span>
                <span className="text-xs font-bold text-black mt-1 flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-[#11A1F0] inline-block" />
                  <span>Verified & queued for review</span>
                </span>
              </div>
            </div>

            {/* Submitted Photo & Memory Preview */}
            <div className="pt-2">
              <span className="block text-[11px] mplus-metadata text-neutral-600 font-bold mb-2">
                {t.success.messagePreview}
              </span>
              <div className="flex flex-col sm:flex-row gap-4 items-start bg-neutral-100 p-4 border border-neutral-300">
                {record.imagePreviewUrl && (
                  <img
                    src={record.imagePreviewUrl}
                    alt="Submitted moment thumbnail"
                    className="w-24 h-24 object-cover shrink-0 border-2 border-black"
                  />
                )}
                <div className="space-y-1">
                  <p className="text-xs mplus-metadata text-neutral-600 font-bold">{record.imageName}</p>
                  <p className="text-sm text-black font-medium italic">"{record.message}"</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/90 font-medium mb-8">
            {t.success.savedConfirmation}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={onReset}
              className="min-h-[48px] px-6 py-3 bg-white text-black text-xs font-bold hover:bg-black hover:text-white transition-colors border-2 border-black"
            >
              {t.success.shareAnother}
            </button>
            <a
              href="https://www.mplus.org.hk/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-6 py-3 bg-black text-white text-xs font-bold hover:bg-white hover:text-black transition-colors border-2 border-black flex items-center justify-center space-x-1.5"
            >
              <span>{t.success.visitMuseum}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
