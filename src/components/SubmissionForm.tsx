import React, { useState, useEffect } from 'react';
import { Translations } from '../locales/translations';
import { CampaignConfig, Language, SubmissionRecord } from '../types/campaign';
import { COUNTRY_CODES, isMobileNumberRegistered } from '../config/campaignConfig';
import { ImageUploader } from './ImageUploader';
import { ImagePreview } from './ImagePreview';

export type FormThemeColor = 'orange' | 'white' | 'dark' | 'blue';

interface SubmissionFormProps {
  t: Translations;
  currentLanguage: Language;
  config: CampaignConfig;
  onSubmitSuccess: (record: SubmissionRecord) => void;
  onOpenTerms: () => void;
  defaultTheme?: FormThemeColor;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({
  t,
  currentLanguage,
  config,
  onSubmitSuccess,
  onOpenTerms,
  defaultTheme = 'orange',
}) => {
  // Theme state for form background (defaulting to M+ Signature Orange)
  const [formTheme, setFormTheme] = useState<FormThemeColor>(defaultTheme);

  // State for image
  const [selectedImage, setSelectedImage] = useState<{
    dataUrl: string;
    file: File;
    dimensions: { width: number; height: number; aspectRatio: number };
  } | null>(null);

  // Participant details
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [countryCode, setCountryCode] = useState('+852');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  // OTP Verification state
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [serverOtp, setServerOtp] = useState('52026');
  const [otpNotice, setOtpNotice] = useState<string | null>(null);

  // Consents
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [copyrightConfirmed, setCopyrightConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [displayConsent, setDisplayConsent] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer countdown effect for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpTimer > 0) {
      timer = setTimeout(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [otpTimer]);

  // Handle image selection
  const handleImageSelected = (data: {
    dataUrl: string;
    file: File;
    dimensions: { width: number; height: number; aspectRatio: number };
  }) => {
    setSelectedImage(data);
    if (errors.image) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.image;
        return next;
      });
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  // Handle sending OTP
  const handleSendOtp = () => {
    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (!cleanPhone) {
      setErrors((prev) => ({ ...prev, mobile: t.validation.mobileRequired }));
      return;
    }
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      setErrors((prev) => ({ ...prev, mobile: t.validation.mobileInvalid }));
      return;
    }
    if (isMobileNumberRegistered(countryCode, cleanPhone)) {
      setErrors((prev) => ({ ...prev, mobile: t.validation.mobileDuplicate }));
      return;
    }

    // Clear mobile error
    setErrors((prev) => {
      const next = { ...prev };
      delete next.mobile;
      delete next.otp;
      return next;
    });

    const generatedCode = '52026';
    setServerOtp(generatedCode);
    setOtpSent(true);
    setOtpTimer(60);
    setPhoneVerified(false);
    setOtpNotice(`${t.form.otpSimulatedNotice} ${generatedCode}`);
  };

  // Handle verifying OTP
  const handleVerifyOtp = () => {
    if (!otpInput.trim()) {
      setErrors((prev) => ({ ...prev, otp: t.validation.otpRequired }));
      return;
    }

    if (otpInput.trim() === serverOtp || otpInput.trim() === '52026') {
      setPhoneVerified(true);
      setOtpNotice(null);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.otp;
        return next;
      });
    } else {
      setErrors((prev) => ({ ...prev, otp: t.validation.otpInvalid }));
    }
  };

  // Form submission validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    // 1. Validate full name
    if (!fullName.trim()) {
      newErrors.fullName = t.validation.nameRequired;
    }

    // 2. Validate image
    if (!selectedImage) {
      newErrors.image = t.validation.imageRequired;
    }

    // 4. Validate message
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      newErrors.message = t.validation.messageRequired;
    } else if (trimmedMessage.length > config.maxMessageLength) {
      newErrors.message = t.validation.messageTooLong;
    }

    // 5. Validate mobile number
    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.mobile = t.validation.mobileRequired;
    } else if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      newErrors.mobile = t.validation.mobileInvalid;
    } else if (isMobileNumberRegistered(countryCode, cleanPhone)) {
      newErrors.mobile = t.validation.mobileDuplicate;
    }

    // 6. Validate Phone OTP verification (Mandatory)
    if (!phoneVerified) {
      newErrors.otp = t.validation.otpRequired;
    }

    // 7. Validate optional email
    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = t.validation.emailInvalid;
      }
    }

    // 8. Validate age 18+
    if (!ageConfirmed) {
      newErrors.age = t.validation.ageRequired;
    }

    // 9. Validate copyright
    if (!copyrightConfirmed) {
      newErrors.copyright = t.validation.copyrightRequired;
    }

    // 10. Validate terms
    if (!termsAccepted) {
      newErrors.terms = t.validation.termsRequired;
    }

    // 11. Validate display consent
    if (!displayConsent) {
      newErrors.display = t.validation.displayRequired;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const refCode = `MPLUS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const submissionRecord: SubmissionRecord = {
        submissionId: refCode,
        fullName: fullName.trim(),
        imageName: selectedImage?.file.name || 'photo.jpg',
        imageSize: selectedImage?.file.size || 0,
        imageDimensions: selectedImage?.dimensions || { width: 1920, height: 1080, aspectRatio: 1.77 },
        imagePreviewUrl: selectedImage?.dataUrl || '',
        message: trimmedMessage,
        countryCode,
        mobileNumber: cleanPhone,
        phoneVerified: true,
        email: email.trim() || undefined,
        ageConfirmed,
        copyrightConfirmed,
        termsAccepted,
        displayConsent,
        language: currentLanguage,
        submittedAt: new Date().toISOString(),
        status: 'pending_screening',
      };

      setIsSubmitting(false);
      onSubmitSuccess(submissionRecord);
    }, 1200);
  };

  const remainingChars = config.maxMessageLength - message.length;

  const themeConfig = {
    orange: {
      bg: 'bg-[#FB5616]',
      text: 'text-white',
      heading: 'text-white',
      subheading: 'text-white/95',
      label: 'text-white',
      helper: 'text-white/90',
      divider: 'border-white/30',
      accentBadge: 'bg-white text-black',
      dot: 'bg-white',
      consentCard: 'bg-black/15 border-white/30',
      otpBox: 'bg-black/20 border-white text-white',
      btnSubmit: 'bg-black text-white hover:bg-white hover:text-black border-2 border-black',
      metaStrip: 'text-white/80',
    },
    white: {
      bg: 'bg-[#F4F4F6]',
      text: 'text-[#111111]',
      heading: 'text-black',
      subheading: 'text-neutral-700',
      label: 'text-black',
      helper: 'text-neutral-600',
      divider: 'border-black/20',
      accentBadge: 'bg-black text-white',
      dot: 'bg-[#FB5616]',
      consentCard: 'bg-white border-black/20 shadow-sm',
      otpBox: 'bg-white border-black text-black',
      btnSubmit: 'bg-[#FB5616] text-white hover:bg-black hover:text-white border-2 border-black',
      metaStrip: 'text-neutral-600',
    },
    dark: {
      bg: 'bg-[#121212]',
      text: 'text-white',
      heading: 'text-white',
      subheading: 'text-white/85',
      label: 'text-white',
      helper: 'text-white/70',
      divider: 'border-white/20',
      accentBadge: 'bg-[#FB5616] text-white',
      dot: 'bg-[#FB5616]',
      consentCard: 'bg-white/5 border-white/20',
      otpBox: 'bg-neutral-900 border-white/40 text-white',
      btnSubmit: 'bg-[#FB5616] text-white hover:bg-white hover:text-black border-2 border-[#FB5616]',
      metaStrip: 'text-white/70',
    },
    blue: {
      bg: 'bg-[#11A1F0]',
      text: 'text-white',
      heading: 'text-white',
      subheading: 'text-white/95',
      label: 'text-white',
      helper: 'text-white/90',
      divider: 'border-white/30',
      accentBadge: 'bg-white text-black',
      dot: 'bg-white',
      consentCard: 'bg-black/15 border-white/30',
      otpBox: 'bg-black/20 border-white text-white',
      btnSubmit: 'bg-black text-white hover:bg-white hover:text-black border-2 border-black',
      metaStrip: 'text-white/80',
    },
  };

  const currentTheme = themeConfig[formTheme];

  return (
    <section id="submission-section" className={`w-full max-w-full ${currentTheme.bg} ${currentTheme.text} border-b-2 border-black overflow-hidden transition-colors duration-300`}>
      {/* Section Header Strip */}
      <div className="bg-black text-white px-3 sm:px-8 py-3.5 sm:py-5 flex flex-col md:flex-row justify-between items-start md:items-center text-xs mplus-metadata gap-2 overflow-hidden">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-[#FB5616] inline-block shrink-0" />
          <span className="font-bold">
            04 / Submission
          </span>
        </div>

        {/* Dynamic Canvas Color Selector */}
        <div className="flex items-center space-x-2 text-[11px]">
          <span className="text-white/60">
            {currentLanguage === 'tc' ? '表單底色' : 'Form color'}:
          </span>
          <div className="inline-flex items-center space-x-1 bg-neutral-900 border border-neutral-700 p-0.5">
            <button
              type="button"
              onClick={() => setFormTheme('orange')}
              className={`px-2 py-0.5 font-bold transition-all ${
                formTheme === 'orange' ? 'bg-[#FB5616] text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Orange
            </button>
            <button
              type="button"
              onClick={() => setFormTheme('white')}
              className={`px-2 py-0.5 font-bold transition-all ${
                formTheme === 'white' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              White
            </button>
            <button
              type="button"
              onClick={() => setFormTheme('dark')}
              className={`px-2 py-0.5 font-bold transition-all ${
                formTheme === 'dark' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Dark
            </button>
            <button
              type="button"
              onClick={() => setFormTheme('blue')}
              className={`px-2 py-0.5 font-bold transition-all ${
                formTheme === 'blue' ? 'bg-[#11A1F0] text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Blue
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-24">
        
        {/* Editorial Heading in Sentence Case */}
        <div className="mb-10 sm:mb-16 max-w-3xl">
          <h2 className={`mplus-display text-4xl sm:text-6xl font-black ${currentTheme.heading} tracking-tight leading-[0.98]`}>
            {t.form.sectionTitle}
          </h2>
          <p className={`mt-4 text-base sm:text-xl font-medium ${currentTheme.subheading} leading-relaxed`}>
            {t.form.subtitle}
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} noValidate className="space-y-12">
          
          {/* STEP 1: PHOTO UPLOAD */}
          <div id="field-image" className="space-y-3">
            <div className="flex items-center justify-between">
              <label className={`text-xs mplus-metadata font-black ${currentTheme.label} flex items-center space-x-2`}>
                <span className={`w-2 h-2 ${currentTheme.dot} inline-block`} />
                <span>{t.form.photoLabel}</span>
                <span className="font-mono text-sm">*</span>
              </label>
              <span className={`text-xs mplus-metadata ${currentTheme.metaStrip} font-bold`}>
                2100×1256px (1.67:1) · max 15MB
              </span>
            </div>

            {!selectedImage ? (
              <ImageUploader
                t={t}
                config={config}
                onImageSelected={handleImageSelected}
                error={errors.image}
              />
            ) : (
              <ImagePreview
                t={t}
                config={config}
                imageUrl={selectedImage.dataUrl}
                imageName={selectedImage.file.name}
                imageSize={selectedImage.file.size}
                dimensions={selectedImage.dimensions}
                onReplace={() => setSelectedImage(null)}
                onRemove={handleImageRemove}
              />
            )}
          </div>

          {/* STEP 2: PERSONAL MESSAGE */}
          <div id="field-message" className={`space-y-3 pt-6 border-t ${currentTheme.divider}`}>
            <div className="flex items-center justify-between">
              <label htmlFor="message-input" className={`text-xs mplus-metadata font-black ${currentTheme.label} flex items-center space-x-2`}>
                <span className={`w-2 h-2 ${currentTheme.dot} inline-block`} />
                <span>{t.form.messageLabel}</span>
                <span className="font-mono text-sm">*</span>
              </label>
              <span
                className={`text-xs mplus-metadata font-bold ${
                  remainingChars < 0 ? 'text-black bg-white px-2 py-0.5' : currentTheme.metaStrip
                }`}
              >
                {remainingChars} {t.form.charCount}
              </span>
            </div>

            <textarea
              id="message-input"
              rows={4}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.message;
                    return next;
                  });
                }
              }}
              placeholder={t.form.messagePlaceholder}
              maxLength={config.maxMessageLength + 20}
              className="w-full bg-white text-black border-2 border-black p-4 text-base placeholder-neutral-500 font-medium leading-relaxed transition-colors focus-visible:outline-none focus:ring-2 focus:ring-black shadow-md"
            />

            {errors.message && (
              <div className="bg-white text-black px-3 py-2 text-xs font-bold flex items-center space-x-2 shadow">
                <span className="w-2 h-2 bg-[#FB5616] inline-block" />
                <span>{errors.message}</span>
              </div>
            )}
          </div>

          {/* STEP 3: PARTICIPANT IDENTIFIERS (Full Name, Phone with OTP, Optional Email) */}
          <div className={`space-y-6 pt-6 border-t ${currentTheme.divider}`}>
            
            {/* Full Name Field (Mandatory) */}
            <div id="field-fullName" className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="name-input" className={`text-xs mplus-metadata font-black ${currentTheme.label} flex items-center space-x-2`}>
                  <span className={`w-2 h-2 ${currentTheme.dot} inline-block`} />
                  <span>{t.form.nameLabel}</span>
                  <span className="font-mono text-sm">*</span>
                </label>
                <span className={`text-xs mplus-metadata ${currentTheme.metaStrip} font-bold`}>
                  Mandatory
                </span>
              </div>

              <input
                id="name-input"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.fullName;
                      return next;
                    });
                  }
                }}
                placeholder={t.form.namePlaceholder}
                className="w-full bg-white text-black border-2 border-black p-3.5 text-base font-bold focus-visible:outline-none placeholder-neutral-400 shadow-md"
              />

              {errors.fullName && (
                <div className="bg-white text-black px-3 py-2 text-xs font-bold flex items-center space-x-2 shadow">
                  <span className="w-2 h-2 bg-[#FB5616] inline-block" />
                  <span>{errors.fullName}</span>
                </div>
              )}
            </div>

            {/* Mobile Number & OTP Verification (Mandatory) */}
            <div id="field-mobile" className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="mobile-input" className={`text-xs mplus-metadata font-black ${currentTheme.label} flex items-center space-x-2`}>
                  <span className={`w-2 h-2 ${currentTheme.dot} inline-block`} />
                  <span>{t.form.mobileLabel}</span>
                  <span className="font-mono text-sm">*</span>
                </label>
                {phoneVerified && (
                  <span className="text-xs mplus-metadata font-black bg-white text-black px-2.5 py-1 flex items-center space-x-1 shadow">
                    <span className="text-emerald-600 font-black">✓</span>
                    <span>{t.form.otpVerifiedBadge}</span>
                  </span>
                )}
              </div>

              {/* Mobile Input Group with Country Code & Send OTP Button */}
              <div className="flex flex-col sm:flex-row border-2 border-black bg-white shadow-md">
                <div className="flex flex-1">
                  {/* Country Code Selector */}
                  <select
                    value={countryCode}
                    disabled={phoneVerified}
                    onChange={(e) => {
                      setCountryCode(e.target.value);
                      setPhoneVerified(false);
                      setOtpSent(false);
                    }}
                    className="bg-neutral-100 text-black text-xs px-3 py-3.5 font-bold border-r-2 border-black focus-visible:outline-none cursor-pointer"
                    aria-label="Country code"
                  >
                    {COUNTRY_CODES.map((item) => (
                      <option key={item.code} value={item.dialCode} className="bg-white text-black">
                        {currentLanguage === 'tc' ? item.nameTc : item.nameEn}
                      </option>
                    ))}
                  </select>

                  {/* Mobile input */}
                  <input
                    id="mobile-input"
                    type="tel"
                    value={mobileNumber}
                    disabled={phoneVerified}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      setPhoneVerified(false);
                      setOtpSent(false);
                      if (errors.mobile) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.mobile;
                          return next;
                        });
                      }
                    }}
                    placeholder={t.form.mobilePlaceholder}
                    className="w-full bg-white text-black p-3.5 text-base font-bold tracking-wider focus-visible:outline-none placeholder-neutral-400"
                  />
                </div>

                {/* Send / Resend OTP Action Button */}
                <div className="border-t sm:border-t-0 sm:border-l-2 border-black shrink-0">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpTimer > 0 || phoneVerified}
                    className={`w-full sm:w-auto h-full px-5 py-3 text-xs font-bold transition-colors ${
                      phoneVerified
                        ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                        : otpTimer > 0
                        ? 'bg-neutral-100 text-neutral-600 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-[#FB5616]'
                    }`}
                  >
                    {otpTimer > 0
                      ? t.form.otpResendWait.replace('{s}', otpTimer.toString())
                      : t.form.otpSendButton}
                  </button>
                </div>
              </div>

              <p className={`text-xs ${currentTheme.helper} font-medium`}>
                {t.form.mobileHelper}
              </p>

              {errors.mobile && (
                <div className="bg-white text-black px-3 py-2 text-xs font-bold flex items-center space-x-2 shadow">
                  <span className="w-2 h-2 bg-[#FB5616] inline-block" />
                  <span>{errors.mobile}</span>
                </div>
              )}

              {/* Interactive OTP Verification Input Box */}
              {otpSent && !phoneVerified && (
                <div id="field-otp" className={`${currentTheme.otpBox} p-4 border-2 space-y-3 mt-3`}>
                  <div className="flex items-center justify-between">
                    <label htmlFor="otp-input" className={`text-xs mplus-metadata font-bold ${currentTheme.label}`}>
                      {t.form.otpLabel} *
                    </label>
                    <span className={`text-[11px] mplus-metadata ${currentTheme.metaStrip} font-bold`}>
                      Enter 6-digit code
                    </span>
                  </div>

                  {otpNotice && (
                    <div className="bg-white text-black p-3 text-xs font-bold flex items-center justify-between border-2 border-black">
                      <span className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-[#11A1F0] inline-block" />
                        <span>{otpNotice}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setOtpInput(serverOtp)}
                        className="text-[10px] mplus-metadata bg-black text-white px-2 py-0.5 font-bold hover:bg-[#FB5616]"
                      >
                        Auto-fill
                      </button>
                    </div>
                  )}

                  <div className="flex border-2 border-black bg-white shadow-md">
                    <input
                      id="otp-input"
                      type="text"
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                      placeholder={t.form.otpPlaceholder}
                      className="w-full bg-white text-black p-3 text-base font-black tracking-widest text-center focus-visible:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="px-6 py-3 bg-[#FB5616] hover:bg-black text-white font-bold text-xs transition-colors shrink-0"
                    >
                      {t.form.otpVerifyButton}
                    </button>
                  </div>

                  {errors.otp && (
                    <div className="bg-white text-black px-3 py-1.5 text-xs font-bold flex items-center space-x-2 shadow">
                      <span className="w-2 h-2 bg-[#FB5616] inline-block" />
                      <span>{errors.otp}</span>
                    </div>
                  )}
                </div>
              )}

              {/* If user tries to submit without sending/verifying OTP */}
              {!otpSent && errors.otp && (
                <div id="field-otp" className="bg-white text-black px-3 py-2 text-xs font-bold flex items-center space-x-2 shadow">
                  <span className="w-2 h-2 bg-[#FB5616] inline-block" />
                  <span>{errors.otp}</span>
                </div>
              )}
            </div>

            {/* Email Address (Optional) */}
            <div id="field-email" className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="email-input" className={`text-xs mplus-metadata font-black ${currentTheme.label} flex items-center space-x-2`}>
                  <span className={`w-2 h-2 ${currentTheme.dot} inline-block`} />
                  <span>{t.form.emailLabel}</span>
                </label>
                <span className={`text-xs mplus-metadata ${currentTheme.metaStrip} font-bold`}>
                  {t.form.emailOptional}
                </span>
              </div>

              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.email;
                      return next;
                    });
                  }
                }}
                placeholder={t.form.emailPlaceholder}
                className="w-full bg-white text-black border-2 border-black p-3.5 text-base font-medium focus-visible:outline-none placeholder-neutral-400 shadow-md"
              />

              <p className={`text-xs ${currentTheme.helper} font-medium`}>
                {currentLanguage === 'tc'
                  ? '如獲選或需要聯絡，我們亦可透過電郵向您發送紀念通知。'
                  : 'Used for optional campaign notifications if your moment is selected.'}
              </p>

              {errors.email && (
                <div className="bg-white text-black px-3 py-2 text-xs font-bold flex items-center space-x-2 shadow">
                  <span className="w-2 h-2 bg-[#FB5616] inline-block" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

          </div>

          {/* STEP 4: AGE & LEGAL CONSENTS */}
          <div className={`space-y-4 pt-6 border-t ${currentTheme.divider}`}>
            <div className={`text-xs mplus-metadata font-black ${currentTheme.label} mb-2 flex items-center space-x-2`}>
              <span className={`w-2 h-2 ${currentTheme.dot} inline-block`} />
              <span>
                {currentLanguage === 'tc' ? '聲明與同意事項' : 'Consents & declarations'}
              </span>
            </div>

            {/* Age 18+ confirmation */}
            <div id="field-age" className={`space-y-1.5 ${currentTheme.consentCard} p-4 border`}>
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={ageConfirmed}
                  onChange={(e) => {
                    setAgeConfirmed(e.target.checked);
                    if (errors.age) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.age;
                        return next;
                      });
                    }
                  }}
                  className="mt-0.5 w-5 h-5 accent-black shrink-0"
                />
                <span className={`text-sm sm:text-base font-bold ${currentTheme.label} group-hover:underline leading-snug`}>
                  {t.form.consentAge} *
                </span>
              </label>
              {!ageConfirmed && (
                <p className={`text-xs ${currentTheme.helper} pl-8`}>
                  {t.form.consentUnderageNotice}
                </p>
              )}
              {errors.age && (
                <div className="bg-white text-black px-3 py-1.5 text-xs font-bold flex items-center space-x-2 shadow ml-8 mt-1">
                  <span className="w-2 h-2 bg-[#FB5616] inline-block" />
                  <span>{errors.age}</span>
                </div>
              )}
            </div>

            {/* Copyright confirmation */}
            <div id="field-copyright" className={`space-y-1.5 ${currentTheme.consentCard} p-4 border`}>
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={copyrightConfirmed}
                  onChange={(e) => {
                    setCopyrightConfirmed(e.target.checked);
                    if (errors.copyright) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.copyright;
                        return next;
                      });
                    }
                  }}
                  className="mt-0.5 w-5 h-5 accent-black shrink-0"
                />
                <span className={`text-sm sm:text-base font-bold ${currentTheme.label} group-hover:underline leading-snug`}>
                  {t.form.consentCopyright} *
                </span>
              </label>
              {errors.copyright && (
                <div className="bg-white text-black px-3 py-1.5 text-xs font-bold flex items-center space-x-2 shadow ml-8 mt-1">
                  <span className="w-2 h-2 bg-[#FB5616] inline-block" />
                  <span>{errors.copyright}</span>
                </div>
              )}
            </div>

            {/* Terms and conditions */}
            <div id="field-terms" className={`space-y-1.5 ${currentTheme.consentCard} p-4 border`}>
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (errors.terms) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.terms;
                        return next;
                      });
                    }
                  }}
                  className="mt-0.5 w-5 h-5 accent-black shrink-0"
                />
                <span className={`text-sm sm:text-base font-bold ${currentTheme.label} group-hover:underline leading-snug`}>
                  {t.form.consentTerms}{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenTerms();
                    }}
                    className="underline font-black ml-1 inline-block hover:opacity-80"
                  >
                    ({t.form.consentTermsLink})
                  </button>{' '}
                  *
                </span>
              </label>
              {errors.terms && (
                <div className="bg-white text-black px-3 py-1.5 text-xs font-bold flex items-center space-x-2 shadow ml-8 mt-1">
                  <span className="w-2 h-2 bg-[#FB5616] inline-block" />
                  <span>{errors.terms}</span>
                </div>
              )}
            </div>

            {/* Display consent */}
            <div id="field-display" className={`space-y-1.5 ${currentTheme.consentCard} p-4 border`}>
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={displayConsent}
                  onChange={(e) => {
                    setDisplayConsent(e.target.checked);
                    if (errors.display) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.display;
                        return next;
                      });
                    }
                  }}
                  className="mt-0.5 w-5 h-5 accent-black shrink-0"
                />
                <span className={`text-sm sm:text-base font-bold ${currentTheme.label} group-hover:underline leading-snug`}>
                  {t.form.consentDisplay} *
                </span>
              </label>
              {errors.display && (
                <div className="bg-white text-black px-3 py-1.5 text-xs font-bold flex items-center space-x-2 shadow ml-8 mt-1">
                  <span className="w-2 h-2 bg-[#FB5616] inline-block" />
                  <span>{errors.display}</span>
                </div>
              )}
            </div>

          </div>

          {/* SUBMIT BUTTON in Sentence Case */}
          <div className={`pt-8 border-t ${currentTheme.divider}`}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full min-h-[58px] sm:min-h-[64px] py-4 px-8 text-base sm:text-lg font-black transition-all flex items-center justify-center space-x-3 ${
                isSubmitting
                  ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed'
                  : currentTheme.btnSubmit
              } focus-visible:outline-none shadow-xl`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-3 border-current border-t-transparent animate-spin" />
                  <span>{t.form.submitting}</span>
                </>
              ) : (
                <>
                  <span>{t.form.submitButton}</span>
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>

            <p className={`text-center text-xs mplus-metadata ${currentTheme.metaStrip} mt-4 font-bold`}>
              M+ Moments · 5th Anniversary official submission pipeline
            </p>
          </div>

        </form>

      </div>
    </section>
  );
};
