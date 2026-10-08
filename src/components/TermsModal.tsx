import React, { useState, useEffect } from 'react';
import { Translations } from '../locales/translations';
import { Language } from '../types/campaign';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
  currentLanguage?: Language;
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  t,
  currentLanguage = 'en',
}) => {
  const [modalLang, setModalLang] = useState<'en' | 'tc'>(currentLanguage === 'tc' ? 'tc' : 'en');

  // Keep modal language in sync with app language when opened
  useEffect(() => {
    if (isOpen) {
      setModalLang(currentLanguage === 'tc' ? 'tc' : 'en');
    }
  }, [isOpen, currentLanguage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-white border-2 border-black shadow-2xl flex flex-col overflow-hidden text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b-2 border-black flex items-center justify-between bg-[#FB5616] text-white shrink-0">
          <div className="flex items-center space-x-2.5 min-w-0 pr-3">
            <span className="w-2.5 h-2.5 bg-white shrink-0 inline-block" />
            <h3 id="terms-modal-title" className="text-sm sm:text-base font-black mplus-display tracking-tight text-white truncate">
              {modalLang === 'tc'
                ? 'M+ 五周年幕牆活動 — 條款及細則'
                : 'M+ 5th Anniversary "Be In The Frame" Facade Campaign — Terms & Conditions'}
            </h3>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Language Switcher inside Modal */}
            <div className="flex items-center border border-white/60 bg-black/20 text-xs font-bold">
              <button
                type="button"
                onClick={() => setModalLang('en')}
                className={`px-2.5 py-1 transition-colors ${
                  modalLang === 'en'
                    ? 'bg-white text-black font-black'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                EN
              </button>
              <span className="text-white/40">|</span>
              <button
                type="button"
                onClick={() => setModalLang('tc')}
                className={`px-2.5 py-1 transition-colors ${
                  modalLang === 'tc'
                    ? 'bg-white text-black font-black'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                繁中
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center bg-black text-white hover:bg-white hover:text-black font-black transition-colors focus-visible:outline-none"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body - Verbatim Legal Copy */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-sm text-neutral-900 leading-relaxed font-sans">
          {modalLang === 'tc' ? (
            /* ================= TRADITIONAL CHINESE VERSION ================= */
            <div className="space-y-6 text-neutral-800">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-black pb-2 border-b-2 border-black mb-4">
                  M+ 五周年幕牆活動 — 條款及細則
                </h2>
              </div>

              {/* Section 1 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">1. 概述及主辦機構</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  1.1 「M+ 五周年幕牆活動」（簡稱「本活動」）由 M Plus 博物館有限公司（簡稱「M+」或「主辦機構」）主辦。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  1.2 參與本活動即代表參加者（簡稱「參加者」）同意受本條款及細則（簡稱「條款及細則」）以及本文載明的私隱聲明／收集個人資料聲明所約束。
                </p>
              </section>

              {/* Section 2 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">2. 活動期間及遞交機制</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  2.1 遞交期由 2026 年 10 月 19 日上午 10 時 00 分（香港時間）開始，至 2026 年 11 月 1日下午 6 時 00 分（香港時間）結束（簡稱「遞交期」）。逾期或不完整的遞交將不獲受理。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  2.2 參加者須於遞交期內透過指定活動網站（[插入網站網址]）遞交作品以作參賽，步驟如下：
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-neutral-700">
                  <li>上載一（1）張捕捉其過去五年內在 M+ 最喜愛回憶的照片（簡稱「照片」）；</li>
                  <li>遞交一段簡短描述或感言以解釋該回憶（簡稱「感言」）；及</li>
                  <li>提供有效的聯絡資料（電郵地址及／或 WhatsApp 電話號碼）。</li>
                </ul>
                <p className="text-xs sm:text-sm leading-relaxed">
                  2.3 每位參加者可遞交多份作品，惟每份作品必須為獨特之作。每位參加者最多僅可獲選／獲獎一次。
                </p>
              </section>

              {/* Section 3 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">3. 參加資格</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  3.1 本活動開放予任何年齡人士參加；未成年人須取得父母或監護人同意。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  3.2 M+、西九文化區管理局（簡稱「管理局」）及其各自的子公司、附屬公司、廣告及推廣代理機構之員工、幹事及承包商均合資格參加。
                </p>
              </section>

              {/* Section 4 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">4. 內容指引、第三者權利及同意</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  4.1 參加者遞交照片及感言（合稱「遞交作品」），即保證及聲明：
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-700">
                  <li>遞交作品為其本人之原創作品，且並無侵犯任何人士或實體之版權、商標權、私隱權、公開權或任何其他專有權利；</li>
                  <li>遞交作品不含任何違法、誹謗、猥褻、冒犯、歧視、政治、商業或以其他方式不適合公開展示的內容；</li>
                  <li>
                    第三方同意： 若照片中出現任何可識別身份的人士，或感言中提及任何人士，參加者已取得該等人士（如年未滿 18 歲，則為其父母或法定監護人）的全部所需事先書面同意及許可，同意將其肖像、形象或提及內容遞交、使用及公開展示於 M+ 大樓幕牆及 M+ 各宣傳渠道，且不設任何報酬。
                  </li>
                </ul>
                <p className="text-xs sm:text-sm leading-relaxed">
                  4.2 M+ 保留絕對權利，可自行決定取消資格及刪除任何違反本指引或被視為不恰當的遞交作品，毋須事先通知或解釋。
                </p>
              </section>

              {/* Section 5 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">5. 知識產權及授權</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  5.1 參加者保留其遞交作品的版權。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  5.2 參加本活動即代表每位參加者授予 M+、管理局及其獲授權夥伴一項永久、全球性、非排他性、免特許權使用費、可轉授權及可轉讓的特許許可，以：
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-700">
                  <li>
                    重製、編輯、裁剪、調整尺寸、改編、格式化、翻譯、出版、展示及分發遞交作品（整體或部分）於 M+幕牆、網站、社交媒體渠道、宣傳短片、展覽、新聞稿，以及現有或日後開發的任何其他媒體，用於與 M+ 五周年及持續推行的文化項目相關的活動、教育、宣傳或存檔用途；
                  </li>
                  <li>
                    隨遞交作品一同使用參加者的姓名、社交帳號名稱或偏好的署名方式（惟若受技術限制，M+ 並無義務於大樓幕牆上顯示署名）。
                  </li>
                </ul>
                <p className="text-xs sm:text-sm leading-relaxed">
                  5.3 參加者放棄對其遞交作品擁有的一切精神權利，並以 M+ 及其獲特許人為受益人。
                </p>
              </section>

              {/* Section 6 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">6. 得獎者選出及展示機制</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  6.1 M+ 將根據創意、與主題的關聯性、情感共鳴度以及是否適合於幕牆視覺展示，選出約五十（50）名得獎者（或由 M+ 決定的其他數量）。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  6.2 M+ 對於選拔及展示的決定為最終、具決定性及約束力。主辦機構將不處理任何查詢或上訴。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  6.3 入選作品預計將於 2026 年 11 月 12 日指定時間（簡稱「展示活動」）於 M+ 大樓幕牆上展出。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  6.4 因應技術故障、惡劣天氣狀況、緊急維修或行政原因，M+ 保留隨時調整、重排、縮短、修改或取消幕牆展示的權利，毋須承擔任何法律責任或事先通知。
                </p>
              </section>

              {/* Section 7 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">7. 得獎通知</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  7.1 入選參加者將於 2026 年 11 月 10 日或之前透過所提供的聯絡資料（電郵或 WhatsApp）獲得通知。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  7.2 若入選參加者無法取得聯絡、未有於 24 小時內回覆，或被發現不符合資格或違反本條款及細則，M+ 保留取消其入選資格並另選得獎者的權利。
                </p>
              </section>

              {/* Section 8 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">8. 責任限制及賠償</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  8.1 對於因網絡故障、技術故障或網站運作失靈而導致的任何遺失、延誤、誤投、損壞或損毀的遞交作品，M+ 概不承擔任何責任。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  8.2 參加者同意就以下各項所引起或相關的一切索償、法律責任、損害、損失、費用及法律費用，向 M+、管理局及其幹事、董事、僱員及代理人作出賠償並使其免受損害：
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-neutral-700">
                  <li>參加者違反本條款及細則中的任何聲明或保證；</li>
                  <li>第三方指控遞交作品侵犯其知識產權、私隱權或精神權利之任何索償。</li>
                </ul>
              </section>

              {/* Section 9 */}
              <section id="modal-pics" className="space-y-2 bg-neutral-50 p-4 border border-neutral-300">
                <h4 className="font-black text-base text-black">9. 收集個人資料聲明（PICS）／私隱聲明</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  9.1 收集資料的目的： 參加者提供的個人資料（包括電郵地址、WhatsApp 電話號碼及姓名／社交帳號名稱）將由 M+ 收集及處理，用於以下用途：
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-neutral-700">
                  <li>管理及營運本活動；</li>
                  <li>核實資格，以及就作品入選及展示事宜聯絡參加者；</li>
                  <li>公開標示作品署名（如適用）；</li>
                  <li>直接推廣日後的活動、展覽及宣傳活動（僅限於已獲得明確同意的情況下）</li>
                </ul>
                <p className="text-xs sm:text-sm leading-relaxed">
                  9.2 資料披露及轉移： 個人資料可能會與 M+ 委聘的第三方服務供應商（如 IT 服務商、網站託管商或通訊平台）共享，純粹用以協助運行本活動。個人資料絕不會出售或披露予未獲授權的第三方。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  9.3 資料保留： 個人資料的保留時間僅以達致上述目的或遵守法定法律要求所需的時間為限。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  9.4 參加者權利： 參加者有權要求查閱、更正或刪除 M+ 所持有的個人資料。有關要求應傳送至 M+ 資料私隱主任：[插入私隱聯絡電郵]。
                </p>
              </section>

              {/* Section 10 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">10. 一般條款</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  10.1 M+ 保留隨時取消、暫停或修訂本活動或本條款及細則的權利，毋須事先通知。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  10.2 如就本活動或本條款及細則有任何爭議，M+ 保留最終決定權。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  10.3 如本條款及細則的英文版本與任何翻譯版本有任何不一致之處，概以英文版本為準。
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  10.4 本條款及細則受中華人民共和國香港特別行政區法律管轄並按其解釋。
                </p>
              </section>
            </div>
          ) : (
            /* ================= ENGLISH VERSION ================= */
            <div className="space-y-6 text-neutral-800">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-black pb-2 border-b-2 border-black mb-4">
                  M+ 5th Anniversary "Be In The Frame" Facade Campaign — Terms & Conditions
                </h2>
              </div>

              {/* Section 1 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">1. Overview and Organizer</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  1.1 The "M+ 5th Anniversary Facade Campaign" (the "Campaign") is organized by M Plus Museum Limited ("M+" or "the Organizer").
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  1.2 By participating in the Campaign, participants ("Participants") agree to be bound by these Terms and Conditions ("T&Cs") and the Privacy Notice / Personal Information Collection Statement set out herein.
                </p>
              </section>

              {/* Section 2 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">2. Campaign Period & Submission Mechanics</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  2.1 The submission period begins on 19 October 2026, 10:00 am HKT and ends on 1 November 2026, 6:00 pm HKT (the "Submission Period"). Late or incomplete submissions will not be accepted.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  2.2 To enter, Participants must submit their entry via the designated Campaign website ([Insert Website URL]) during the Submission Period by:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-neutral-700">
                  <li>Uploading one (1) photograph capturing their favorite memory at M+ over the past five years (the "Photo");</li>
                  <li>Submitting a brief description or quote explaining the memory (the "Quote"); and</li>
                  <li>Providing valid contact details (email address and/or WhatsApp phone number).</li>
                </ul>
                <p className="text-xs sm:text-sm leading-relaxed">
                  2.3 Each Participant may submit multiple entries, but each entry must be unique. Only one prize/selection will be awarded per Participant.
                </p>
              </section>

              {/* Section 3 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">3. Eligibility</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  3.1 The Campaign is open to individuals of all ages, provided minors have parental consent.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  3.2 Employees, officers, and contractors of M+, West Kowloon Cultural District Authority (WKCDA), and their respective subsidiaries, affiliates, advertising, and promotional agencies are eligible participating.
                </p>
              </section>

              {/* Section 4 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">4. Content Guidelines, Third-Party Rights & Consents</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  4.1 By submitting a Photo and Quote (collectively, the "Submission"), the Participant warrants and represents that:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-700">
                  <li>The Submission is their own original work and does not infringe upon any copyright, trademark, privacy, publicity, or other proprietary rights of any person or entity;</li>
                  <li>The Submission does not contain any content that is unlawful, defamatory, obscene, offensive, discriminatory, political, commercial, or otherwise inappropriate for public display;</li>
                  <li>
                    Third-Party Consents: Where any identifiable person(s) appear in the Photo or are referenced in the Quote, the Participant has obtained all necessary prior written consents and permissions from such individual(s) (or their parent/legal guardian if under 18 years of age) for their image, likeness, or reference to be submitted, used, and publicly displayed on the M+ façade and across M+ marketing channels without compensation.
                  </li>
                </ul>
                <p className="text-xs sm:text-sm leading-relaxed">
                  4.2 M+ reserves the absolute right to disqualify and remove any Submission that violates these guidelines or is deemed inappropriate at M+’s sole discretion, without prior notice or explanation.
                </p>
              </section>

              {/* Section 5 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">5. Intellectual Property Rights & License</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  5.1 Participants retain ownership of the copyright in their Submissions.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  5.2 By entering the Campaign, each Participant grants M+, WKCDA, and their authorized partners a perpetual, worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-700">
                  <li>
                    Reproduce, edit, crop, resize, adapt, format, translate, publish, display, and distribute the Submission (in whole or in part) on the M+ building façade, website, social media channels, promotional videos, exhibitions, press releases, and any other media now known or hereafter created for campaign, educational, promotional, or archival purposes related to M+’s 5th Anniversary and ongoing cultural initiatives;
                  </li>
                  <li>
                    Use the Participant’s name, handle, or preferred attribution alongside the Submission (though M+ is under no obligation to display attribution on the façade if technical constraints apply).
                  </li>
                </ul>
                <p className="text-xs sm:text-sm leading-relaxed">
                  5.3 Participants waive all moral rights in and to their Submissions in favor of M+ and its licensees.
                </p>
              </section>

              {/* Section 6 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">6. Selection of Winners & Display Mechanics</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  6.1 Around fifty (50) winners (or such other number as determined by M+) will be selected by M+ based on creativity, relevance to the theme, emotional resonance, and suitability for visual display on the façade.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  6.2 The decision of M+ regarding selection and display shall be final, conclusive, and binding. No correspondence or appeal will be entertained.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  6.3 Selected Submissions are planned to be featured on the M+ building facade at designated times on 12 November 2026 (the "Display Event").
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  6.4 M+ reserves the right to adjust, reschedule, shorten, modify, or cancel the display on the façade at any time due to technical glitches, adverse weather conditions, emergency maintenance, or administrative reasons without liability or prior notice.
                </p>
              </section>

              {/* Section 7 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">7. Winner Notification</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  7.1 Selected Participants will be notified on or before 10 November 2026 via the contact details provided (email or WhatsApp).
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  7.2 If a selected Participant cannot be contacted, fails to respond within 24 hours, or is found to be ineligible or in breach of these T&Cs, M+ reserves the right to forfeit their selection and select an alternative winner.
                </p>
              </section>

              {/* Section 8 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">8. Limitation of Liability & Indemnity</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  8.1 M+ accepts no responsibility or liability for any lost, late, misdirected, damaged, or corrupted entries resulting from network failures, technical glitches, or website malfunctions.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  8.2 Participants agree to indemnify and hold harmless M+, WKCDA, and their officers, directors, employees, and agents against all claims, liabilities, damages, losses, costs, and legal fees arising out of or in connection with:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-neutral-700">
                  <li>A breach of any representation or warranty made by the Participant in these T&Cs;</li>
                  <li>Any claim by a third party that the Submission infringes their intellectual property, privacy, or moral rights.</li>
                </ul>
              </section>

              {/* Section 9 */}
              <section id="modal-pics-en" className="space-y-2 bg-neutral-50 p-4 border border-neutral-300">
                <h4 className="font-black text-base text-black">9. Personal Information Collection Statement (PICS) / Privacy Notice</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  9.1 Purpose of Data Collection: The personal data provided by Participants (including email address, WhatsApp number, and name/handle) will be collected and processed by M+ for the following purposes:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-neutral-700">
                  <li>Administering and managing the Campaign;</li>
                  <li>Verifying eligibility and contacting Participants regarding entry selection and display logistics;</li>
                  <li>Attribute the Submission publicly (if applicable);</li>
                  <li>Direct marketing of future events, exhibitions, and promotional activities (only where explicit consent has been provided).</li>
                </ul>
                <p className="text-xs sm:text-sm leading-relaxed">
                  9.2 Data Disclosure & Transfer: Personal data may be shared with third-party service providers (such as IT vendors, website hosts, or communications platforms) engaged by M+ solely to assist in running the Campaign. Personal data will not be sold or disclosed to unauthorized third parties.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  9.3 Data Retention: Personal data will be retained only for as long as necessary to fulfill the purposes set out above or to comply with statutory legal requirements.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  9.4 Participant Rights: Participants have the right to request access to, correction of, or deletion of their personal data held by M+. Requests should be directed to the M+ Data Protection Officer at [Insert Privacy Email Contact].
                </p>
              </section>

              {/* Section 10 */}
              <section className="space-y-2">
                <h4 className="font-black text-base text-black">10. General Terms</h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  10.1 M+ reserves the right to cancel, suspend, or amend the Campaign or these T&Cs at any time without prior notice.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  10.2 In the event of any dispute regarding the Campaign or these T&Cs, the decision of M+ shall be final and binding.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  10.3 In the event of any inconsistency between the English version and any translated version of these T&Cs, the English version shall prevail.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  10.4 These T&Cs shall be governed by and construed in accordance with the laws of the Hong Kong Special Administrative Region.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer Action */}
        <div className="p-4 sm:p-5 border-t-2 border-black bg-neutral-100 flex items-center justify-between shrink-0">
          <span className="text-xs mplus-metadata text-neutral-500 font-bold">
            M+ Museum · West Kowloon Cultural District
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-black text-white text-xs font-black tracking-wider hover:bg-[#FB5616] transition-colors focus-visible:outline-none cursor-pointer"
          >
            {modalLang === 'tc' ? '關閉' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
