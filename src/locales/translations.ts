import { Language } from '../types/campaign';

export interface Translations {
  nav: {
    title: string;
    anniversaryBadge: string;
    shareCta: string;
    aboutLink: string;
    howItWorksLink: string;
    timelineLink: string;
    planYourVisit: string;
    seeWhatsOn: string;
    becomeMember: string;
  };
  hero: {
    supertitle: string;
    title: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    description: string;
    ctaButton: string;
    howItWorksButton: string;
    anniversaryDate: string;
  };
  intro: {
    kicker: string;
    headline: string;
    body1: string;
    body2: string;
    facadeCaption: string;
    facadeSpec: string;
  };
  howItWorks: {
    sectionTitle: string;
    subtitle: string;
    step1Number: string;
    step1Title: string;
    step1Desc: string;
    step2Number: string;
    step2Title: string;
    step2Desc: string;
    step3Number: string;
    step3Title: string;
    step3Desc: string;
  };
  timeline: {
    sectionTitle: string;
    subtitle: string;
    milestone1Date: string;
    milestone1Title: string;
    milestone1Desc: string;
    milestone2Date: string;
    milestone2Title: string;
    milestone2Desc: string;
    milestone3Date: string;
    milestone3Title: string;
    milestone3Desc: string;
  };
  form: {
    sectionTitle: string;
    subtitle: string;
    photoLabel: string;
    photoUploadTitle: string;
    photoUploadSubtitle: string;
    photoFormats: string;
    photoReplace: string;
    photoRemove: string;
    framingHeading: string;
    framingNotice: string;
    framingSafeZone: string;
    dragHint: string;
    zoomLabel: string;
    resetFraming: string;
    fitToGrid: string;
    resolutionGood: string;
    resolutionLow: string;
    messageLabel: string;
    messagePlaceholder: string;
    charCount: string;
    nameLabel: string;
    namePlaceholder: string;
    thematicLabel: string;
    thematicPlaceholder: string;
    thematicHelper: string;
    mobileLabel: string;
    mobileHelper: string;
    mobilePlaceholder: string;
    otpLabel: string;
    otpPlaceholder: string;
    otpSendButton: string;
    otpResendWait: string;
    otpVerifyButton: string;
    otpVerifiedBadge: string;
    otpHelper: string;
    otpSimulatedNotice: string;
    emailLabel: string;
    emailOptional: string;
    emailPlaceholder: string;
    consentAge: string;
    consentUnderageNotice: string;
    consentCopyright: string;
    consentTerms: string;
    consentTermsLink: string;
    consentDisplay: string;
    submitButton: string;
    submitting: string;
  };
  validation: {
    imageRequired: string;
    imageInvalidType: string;
    imageTooLarge: string;
    messageRequired: string;
    messageTooLong: string;
    nameRequired: string;
    thematicRequired: string;
    mobileRequired: string;
    mobileInvalid: string;
    mobileDuplicate: string;
    otpRequired: string;
    otpInvalid: string;
    emailInvalid: string;
    ageRequired: string;
    copyrightRequired: string;
    termsRequired: string;
    displayRequired: string;
  };
  success: {
    badge: string;
    headline: string;
    lead: string;
    notice: string;
    refNumber: string;
    submitterName: string;
    thematicSection: string;
    registeredMobile: string;
    timestamp: string;
    messagePreview: string;
    savedConfirmation: string;
    shareAnother: string;
    visitMuseum: string;
  };
  closed: {
    badge: string;
    headline: string;
    body: string;
    followLink: string;
  };
  termsModal: {
    title: string;
    close: string;
    intro: string;
    section1Title: string;
    section1Text: string;
    section2Title: string;
    section2Text: string;
    section3Title: string;
    section3Text: string;
    section4Title: string;
    section4Text: string;
  };
  footer: {
    tagline: string;
    museumName: string;
    district: string;
    address: string;
    rights: string;
    termsLink: string;
    privacyLink: string;
    contactLink: string;
    adminToggleCampaign: string;
    statusOpen: string;
    statusClosed: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      title: 'M+ 5th Anniversary',
      anniversaryBadge: '5th Anniversary · 12 Nov 2026',
      shareCta: 'Share your moment',
      aboutLink: 'About',
      howItWorksLink: 'Process',
      timelineLink: 'Schedule',
      planYourVisit: 'Plan your visit',
      seeWhatsOn: 'See what’s on',
      becomeMember: 'Become a member',
    },
    hero: {
      supertitle: 'M+ Moments',
      title: 'Your M+ Moments',
      titleLine1: 'Your M+',
      titleLine2: 'Moments',
      subtitle: '',
      description: 'Celebrate M+’s 5th anniversary by sharing a photograph and memory from M+.',
      ctaButton: 'Share Your Moment',
      howItWorksButton: 'How It Works',
      anniversaryDate: '5th Anniversary · 12 November 2026',
    },
    intro: {
      kicker: 'The M+ Facade canvas',
      headline: 'Relive your moment on the M+ Facade.',
      body1: 'We’re celebrating five years of M+ with the people who have made memories here. Since opening in November 2021, M+ has welcomed millions of visitors to experience contemporary visual culture on the shores of Victoria Harbour.',
      body2: 'Share a photograph from M+ and tell us what it means to you. It could be a moment of inspiration, joy, connection, discovery or togetherness—every story is welcome.\n\nSelected photographs and stories may be featured as part of M+’s 5th Anniversary celebration on the M+ Facade.',
      facadeCaption: 'The M+ Facade facing Victoria Harbour — embedded with thousands of LEDs, creating one of the world’s premier public visual culture media canvas.',
      facadeSpec: '65.8m × 110m LED media canvas · Victoria Harbour, Hong Kong',
    },
    howItWorks: {
      sectionTitle: 'How it works',
      subtitle: 'Three steps to sharing your memory on the M+ Facade.',
      step1Number: '01',
      step1Title: 'Share',
      step1Desc: 'Upload a photograph of your M+ moment alongside a personal message.',
      step2Number: '02',
      step2Title: 'Review',
      step2Desc: 'Your submission will be reviewed as part of the campaign’s screening and curation process.',
      step3Number: '03',
      step3Title: 'Celebrate',
      step3Desc: 'Selected photographs may be displayed on the M+ Facade during the anniversary celebration.',
    },
    timeline: {
      sectionTitle: 'Schedule',
      subtitle: 'Key dates for the M+ 5th Anniversary campaign and celebratory facade screening.',
      milestone1Date: '19 Oct — 1 Nov 2026',
      milestone1Title: 'Submissions',
      milestone1Desc: 'Open call for public photo and memory submissions via this microsite.',
      milestone2Date: '2 — 5 Nov 2026',
      milestone2Title: 'Submission Selection',
      milestone2Desc: 'M+ will conduct a compliance review, image-quality check, and curatorial selection of all submissions.',
      milestone3Date: '12 November 2026',
      milestone3Title: 'Celebrate',
      milestone3Desc: 'Selected photographs may be displayed on the M+ Facade during the anniversary celebration.',
    },
    form: {
      sectionTitle: 'Share your M+ Moment',
      subtitle: 'Upload a photograph, add a short message and tell us about your favourite memory.',
      photoLabel: 'Photograph',
      photoUploadTitle: 'Upload your photo',
      photoUploadSubtitle: 'Drag and drop or click to browse (JPG, PNG up to 15MB)',
      photoFormats: 'Recommended dimensions: 2100×1256px (1.67:1) · Max 15MB',
      photoReplace: 'Replace image',
      photoRemove: 'Remove',
      framingHeading: 'Check your framing & grid (1256×1200px)',
      framingNotice: 'Drag your image to fit and position within the 1256×1200px facade section. Use the zoom slider or scroll wheel to adjust scale.',
      framingSafeZone: '1256×1200px facade grid',
      dragHint: 'Drag image to fit section · Scroll to zoom',
      zoomLabel: 'Scale & Zoom',
      resetFraming: 'Reset position',
      fitToGrid: 'Center & Fit',
      resolutionGood: 'Image resolution is suitable for high-definition facade screening.',
      resolutionLow: 'Image resolution is relatively low. Higher resolution (min. 1200px width) produces best visual clarity on the LED canvas.',
      messageLabel: 'Tell us about your moment',
      messagePlaceholder: 'Share a short message about this memory (e.g. what you were doing, who you were with, or how M+ made you feel)…',
      charCount: 'characters remaining',
      nameLabel: 'Full name',
      namePlaceholder: 'e.g. Alex Wong',
      thematicLabel: 'Thematic section',
      thematicPlaceholder: 'Select a thematic section…',
      thematicHelper: 'Choose the theme that best resonates with your photograph and memory.',
      mobileLabel: 'Mobile number',
      mobileHelper: 'Used as your unique submission ID. One submission allowed per mobile number.',
      mobilePlaceholder: '9123 4567',
      otpLabel: 'Mobile verification (OTP)',
      otpPlaceholder: 'Enter 6-digit OTP',
      otpSendButton: 'Send OTP',
      otpResendWait: 'Resend in {s}s',
      otpVerifyButton: 'Verify',
      otpVerifiedBadge: 'Phone verified ✓',
      otpHelper: 'Verification code will be sent to your mobile number via SMS.',
      otpSimulatedNotice: 'SMS sent! Demo OTP code: ',
      emailLabel: 'Email address',
      emailOptional: 'Optional',
      emailPlaceholder: 'name@example.com',
      consentAge: 'I confirm that I am 18 years old or above.',
      consentUnderageNotice: 'Participants must be 18 years of age or older to submit directly. If you are under 18, parental or guardian consent requirements apply under campaign rules.',
      consentCopyright: 'I confirm that I own the rights to the photograph or have permission to submit it.',
      consentTerms: 'I agree to the campaign Terms and Conditions.',
      consentTermsLink: 'View Terms & Conditions',
      consentDisplay: 'I consent to the use and display of my submission for the M+ 5th Anniversary campaign.',
      submitButton: 'Submit your moment',
      submitting: 'Submitting…',
    },
    validation: {
      imageRequired: 'Please upload a photograph.',
      imageInvalidType: 'Please upload an image in JPG or PNG format.',
      imageTooLarge: 'The selected file exceeds the maximum allowed file size (15MB).',
      messageRequired: 'Please share a brief message about your memory.',
      messageTooLong: 'Your message exceeds the maximum allowed character limit.',
      nameRequired: 'Full name is required.',
      thematicRequired: 'Please select a thematic section.',
      mobileRequired: 'Mobile number is required.',
      mobileInvalid: 'Please enter a valid mobile number format.',
      mobileDuplicate: 'This mobile number has already been used for a submission.',
      otpRequired: 'Please complete SMS OTP verification for your mobile number.',
      otpInvalid: 'Invalid verification code. Please check and try again.',
      emailInvalid: 'Please enter a valid email address.',
      ageRequired: 'You must confirm that you are 18 years old or above to proceed.',
      copyrightRequired: 'Please confirm that you own the rights or have permission to submit the photograph.',
      termsRequired: 'Please agree to the campaign Terms and Conditions.',
      displayRequired: 'Please consent to the campaign display authorization.',
    },
    success: {
      badge: 'Submission received',
      headline: 'Thank you for sharing your moment.',
      lead: 'Your submission has been received and will go through the campaign’s review and screening process.',
      notice: 'Selected moments may be featured as part of the M+ 5th Anniversary celebration.',
      refNumber: 'Submission Reference',
      submitterName: 'Submitter Name',
      thematicSection: 'Thematic Section',
      registeredMobile: 'Registered Mobile',
      timestamp: 'Timestamp',
      messagePreview: 'Your Memory',
      savedConfirmation: 'Your submission has been registered using your mobile number.',
      shareAnother: 'Back to Campaign',
      visitMuseum: 'Visit M+ Website',
    },
    closed: {
      badge: 'Submissions Closed',
      headline: 'Campaign Concluded',
      body: 'Thank you for being part of M+’s 5th Anniversary celebration. Submissions are now closed as our curatorial team prepares the commemorative screening for 12 November 2026.',
      followLink: 'Discover Exhibitions at M+',
    },
    termsModal: {
      title: 'Campaign Terms & Conditions',
      close: 'Close',
      intro: 'Please review the official participation rules and Personal Data Collection Statement for the M+ Moments 5th Anniversary Campaign.',
      section1Title: '1. Eligibility & Submissions',
      section1Text: 'The M+ Moments campaign is organized by M Plus Museum Limited ("M+"). Participants must be aged 18 or above at the time of submission. Submissions are limited to one entry per registered mobile phone number. All submitted photographs must be original works taken at M+ or the West Kowloon Art Park.',
      section2Title: '2. Copyright & Intellectual Property',
      section2Text: 'By submitting, you represent and warrant that you are the sole author and owner of the copyright, or possess all necessary rights and clearances from depicted individuals. You grant M+ a non-exclusive, worldwide, royalty-free license to reproduce, adapt, edit, and publicly display the submitted photograph and text on the M+ Facade, official websites, and social media channels for the purpose of the 5th Anniversary campaign.',
      section3Title: '3. Selection & Display on M+ Facade',
      section3Text: 'Submission does not guarantee selection or display on the M+ Facade. All submissions undergo technical quality, curatorial, and compliance review. M+ reserves the sole discretion to determine which works are exhibited, as well as the timing, duration, and format of display.',
      section4Title: '4. Personal Data Collection Statement',
      section4Text: 'Personal data collected (including mobile number and optional email) will be used solely for the administration, verification, and communication regarding the M+ Moments campaign in accordance with the Hong Kong Personal Data (Privacy) Ordinance (Cap. 486). Data will not be sold or transferred to unauthorized third parties.',
    },
    footer: {
      tagline: 'M+ is Hong Kong’s global museum of visual culture.',
      museumName: 'M Plus Museum Limited',
      district: 'West Kowloon Cultural District, Hong Kong',
      address: '38 Museum Drive, West Kowloon Cultural District, Kowloon, Hong Kong',
      rights: '© 2026 M Plus Museum Limited. All rights reserved.',
      termsLink: 'Terms & Conditions',
      privacyLink: 'Personal Data Policy',
      contactLink: 'Contact Us',
      adminToggleCampaign: 'Curatorial Preview State',
      statusOpen: 'Microsite Open (Submissions Active)',
      statusClosed: 'Microsite Closed (Campaign Concluded)',
    },
  },
  tc: {
    nav: {
      title: 'M+ 五周年',
      anniversaryBadge: '開館五周年 · 2026年11月12日',
      shareCta: '分享您的回憶',
      aboutLink: '活動簡介',
      howItWorksLink: '參與流程',
      timelineLink: '日程',
      planYourVisit: '參觀指南',
      seeWhatsOn: '現正展出',
      becomeMember: '加入會籍',
    },
    hero: {
      supertitle: 'M+ 精彩瞬間',
      title: '你的M+瞬間',
      titleLine1: '你的',
      titleLine2: 'M+瞬間',
      subtitle: '',
      description: '適逢M+開館五周年，誠邀你分享於M+拍下的珍貴照片與回憶。',
      ctaButton: '分享你的瞬間',
      howItWorksButton: '參與方式',
      anniversaryDate: '開館五周年 · 2026年11月12日',
    },
    intro: {
      kicker: 'M+ 幕牆光影畫布',
      headline: '讓你的精彩時刻登上M+幕牆',
      body1: '我們與所有曾在M+留下珍貴回憶的朋友，一同慶祝M+開館五周年。自2021年11月開幕以來，M+坐落於維多利亞港畔，已迎來數以百萬計的觀眾，探索當代視覺文化。',
      body2: '分享一張你在M+拍攝的照片，並告訴我們這張照片對你的意義。它可以記錄一個帶來靈感、喜悅、聯繫、發現或共聚的時刻——每個故事都值得分享。\n\n部分精選照片及故事有機會於 M+ 五周年誌慶期間，在 M+幕牆上展示。',
      facadeCaption: '面向維多利亞港的 M+ 幕牆——鑲嵌數以萬計的 LED 燈管，是全球最具代表性的公共視覺文化媒體畫布之一。',
      facadeSpec: '65.8米 × 110米 巨型 LED 媒體畫布 · 香港維多利亞港',
    },
    howItWorks: {
      sectionTitle: '參與流程',
      subtitle: '三個簡單步驟，讓你的珍貴記憶點亮M+幕牆。',
      step1Number: '01',
      step1Title: '分享',
      step1Desc: '上載於M+拍下的照片，並附上一段個人感想或回憶。',
      step2Number: '02',
      step2Title: '遴選',
      step2Desc: '所有提交作品將進入大會的篩選、技術檢核及策展評審程序。',
      step3Number: '03',
      step3Title: '慶祝',
      step3Desc: '獲選之作品將有機會於開館五周年慶祝活動期間在M+幕牆上展出。',
    },
    timeline: {
      sectionTitle: '日程',
      subtitle: 'M+ 五周年誌慶活動及幕牆展演之關鍵日期。',
      milestone1Date: '2026年10月19日 — 11月1日',
      milestone1Title: '公開徵集作品',
      milestone1Desc: '公眾可透過本活動專頁提交照片及個人回憶文字。',
      milestone2Date: '2026年11月2日 — 5日',
      milestone2Title: '投稿遴選',
      milestone2Desc: '由M+進行合規審核、影像畫質檢測及策展遴選。',
      milestone3Date: '2026年11月12日',
      milestone3Title: '慶祝',
      milestone3Desc: '精選公眾回憶將於M+幕牆特別展出，與全城共慶五周年。',
    },
    form: {
      sectionTitle: '分享你的 M+ 瞬間',
      subtitle: '上載照片，留下簡短文字，與我們分享你的難忘回憶。',
      photoLabel: '作品照片',
      photoUploadTitle: '上載您的照片',
      photoUploadSubtitle: '拖放照片至此或點擊選取（支援 JPG、PNG，檔案大小上限 15MB）',
      photoFormats: '建議尺寸：2100×1256px (1.67:1) · 檔案上限 15MB',
      photoReplace: '更換照片',
      photoRemove: '移除',
      framingHeading: '檢視照片構圖及網格 (1256×1200px)',
      framingNotice: '請點擊並拖曳照片以對齊 1256×1200px 幕牆展示網格，並可使用縮放工具或滑鼠滾輪調整比例。',
      framingSafeZone: '1256×1200px 幕牆網格',
      dragHint: '拖曳照片以對齊網格 · 滾輪縮放',
      zoomLabel: '縮放比例',
      resetFraming: '重設位置',
      fitToGrid: '置中符合',
      resolutionGood: '照片解像度合乎高規格標準，適合幕牆展示。',
      resolutionLow: '照片解像度較低。建議使用闊度達 1200 像素以上之高畫質影像，以在 LED 畫布呈現最佳視覺效果。',
      messageLabel: '分享您的瞬間回憶',
      messagePlaceholder: '請簡述這段回憶（例如拍照時的心情、同行的好友，或 M+ 帶給您的啟發）…',
      charCount: '字數尚餘',
      nameLabel: '參加者全名',
      namePlaceholder: '例如：陳大文 Alex Chan',
      thematicLabel: 'THEMATIC SECTION // 主題分類',
      thematicPlaceholder: '請選取作品主題分類…',
      thematicHelper: '請選擇最契合您的照片與回憶之主題範疇。',
      mobileLabel: '流動電話號碼',
      mobileHelper: '此號碼將用作您的唯一識別碼。每個流動電話號碼只限提交一次。',
      mobilePlaceholder: '9123 4567',
      otpLabel: '短訊驗證碼 (OTP)',
      otpPlaceholder: '輸入6位數驗證碼',
      otpSendButton: '獲取驗證碼',
      otpResendWait: '{s}秒後可重新發送',
      otpVerifyButton: '確認驗證',
      otpVerifiedBadge: '電話已通過驗證 ✓',
      otpHelper: '驗證碼將以短訊形式發送至您輸入的流動電話號碼。',
      otpSimulatedNotice: '短訊已發送！測試驗證碼：',
      emailLabel: '電郵地址',
      emailOptional: '選填',
      emailPlaceholder: 'name@example.com',
      consentAge: '我確認已年滿 18 歲。',
      consentUnderageNotice: '參與者須年滿 18 歲。如未滿 18 歲，依活動章程須由家長或法定監護人同意辦理。',
      consentCopyright: '我確認擁有此照片的完整版權或已獲得合法授權提交。',
      consentTerms: '我同意本活動之條款及細則。',
      consentTermsLink: '閱讀條款及細則',
      consentDisplay: '我同意授權大會於 M+ 五周年慶祝活動中使用及展示所提交的內容。',
      submitButton: '提交作品',
      submitting: '正在提交…',
    },
    validation: {
      imageRequired: '請上載一張照片。',
      imageInvalidType: '請上載 JPG 或 PNG 格式的圖片。',
      imageTooLarge: '上載之檔案超出大小限制（15MB）。',
      messageRequired: '請簡短分享您的回憶或感受。',
      messageTooLong: '文字內容超出字數上限。',
      nameRequired: '請輸入參加者全名。',
      thematicRequired: '請選取作品主題分類。',
      mobileRequired: '請輸入流動電話號碼。',
      mobileInvalid: '請輸入有效的流動電話號碼格式。',
      mobileDuplicate: '此流動電話號碼已提交過作品。',
      otpRequired: '請先完成電話短訊驗證碼驗證。',
      otpInvalid: '驗證碼不正確，請重新輸入。',
      emailInvalid: '請輸入有效的電郵地址。',
      ageRequired: '您必須確認已年滿 18 歲方可提交。',
      copyrightRequired: '請確認您擁有版權或獲合法授權。',
      termsRequired: '請確認同意活動條款及細則。',
      displayRequired: '請同意活動展示與使用授權。',
    },
    success: {
      badge: '已收到您的提交',
      headline: '感謝您分享珍貴的 M+ 時光。',
      lead: '我們已成功接收您的作品，作品將進入大會的評審及遴選程序。',
      notice: '經甄選之作品將有機會於 M+ 五周年慶祝活動期間在 M+ 幕牆展出。',
      refNumber: '提交參考編號',
      submitterName: '提交者全名',
      thematicSection: '作品主題分類',
      registeredMobile: '登記流動電話',
      timestamp: '提交時間',
      messagePreview: '您的回憶文字',
      savedConfirmation: '您的提交已透過登記的流動電話號碼完成記錄。',
      shareAnother: '返回活動首頁',
      visitMuseum: '瀏覽 M+ 官方網站',
    },
    closed: {
      badge: '活動已圓滿截止',
      headline: '徵集活動已圓滿結束',
      body: '衷心感謝大家踴躍參與 M+ 開館五周年誌慶活動。作品徵集現已截止，策展團隊現正積極籌備 2026 年 11 月 12 日的幕牆特別展演。',
      followLink: '探索 M+ 當季展覽',
    },
    termsModal: {
      title: '活動條款及細則',
      close: '關閉',
      intro: '參與「M+ Moments」開館五周年徵集活動前，請詳閱以下官方條款及收集個人資料聲明。',
      section1Title: '1. 參加資格及提交限制',
      section1Text: '本活動由 M Plus Museum Limited（下稱「M+」）主辦。參加者於提交時必須年滿 18 歲。每個流動電話號碼只限提交一份作品。所有照片必須為在 M+ 或西九文化區藝術公園拍攝的原創作品。',
      section2Title: '2. 版權與知識產權授權',
      section2Text: '參加者聲明並保證為所提交照片之唯一創作者及版權擁有人，或已獲得照片中出現之所有人士的合法授權。參加者特此授予 M+ 全球性、非獨家、免版稅之權利，於 M+ 幕牆、官方網頁及社交媒體等渠道複製、修改、展示及宣傳該作品，以作五周年誌慶活動之用。',
      section3Title: '3. 幕牆展出之遴選機制',
      section3Text: '提交作品並不保證獲選於 M+ 幕牆展出。所有作品須通過技術檢測、畫質評估、法規及策展遴選。M+ 保留最終決定展示名單、展出時間、次數及方式的權利。',
      section4Title: '4. 收集個人資料聲明',
      section4Text: '大會所收集之個人資料（包括流動電話號碼及電郵地址）將僅用於本活動之聯絡、作品核實及行政用途，並嚴格遵循香港法例第 486 章《個人資料（私隱）條例》。大會絕不會將資料轉讓或出售予任何未經授權之第三方。',
    },
    footer: {
      tagline: 'M+ 是坐落於香港的全球當代視覺文化博物館。',
      museumName: 'M Plus Museum Limited',
      district: '香港西九文化區',
      address: '香港九龍西九文化區博物館道 38 號',
      rights: '© 2026 M Plus Museum Limited. 版權所有。',
      termsLink: '條款及細則',
      privacyLink: '個人資料私隱政策',
      contactLink: '聯絡我們',
      adminToggleCampaign: '策展測試預覽模式',
      statusOpen: '徵集進行中（表單開放）',
      statusClosed: '徵集已截止（展示結束狀態）',
    },
  },
  sc: {
    nav: {
      title: 'M+ 五周年',
      anniversaryBadge: '开馆五周年 · 2026年11月12日',
      shareCta: '分享您的回忆',
      aboutLink: '活动简介',
      howItWorksLink: '参与流程',
      timelineLink: '日程',
      planYourVisit: '参观指南',
      seeWhatsOn: '现正展出',
      becomeMember: '加入会籍',
    },
    hero: {
      supertitle: 'M+ 精彩瞬间',
      title: '你的M+瞬间',
      titleLine1: '你的',
      titleLine2: 'M+瞬间',
      subtitle: '',
      description: '适逢M+开馆五周年，诚邀你分享于M+拍下的珍贵照片与回忆。',
      ctaButton: '分享你的瞬间',
      howItWorksButton: '参与方式',
      anniversaryDate: '开馆五周年 · 2026年11月12日',
    },
    intro: {
      kicker: 'M+ 幕墙光影画布',
      headline: '让你的精彩时刻登上M+幕墙',
      body1: '我们与所有曾在M+留下珍贵回忆的朋友，一同庆祝M+开馆五周年。自2021年11月开幕以来，M+坐落于维多利亚港畔，已迎来数以百万计的观众，探索当代视觉文化。',
      body2: '分享一张你在M+拍摄的照片，并告诉我们这张照片对你的意义。它可以记录一个带来灵感、喜悦、联系、发现或共聚的时刻——每个故事都值得分享。\n\n部分精选照片及故事有机会于 M+ 五周年志庆期间，在 M+幕墙上展示。',
      facadeCaption: '面向维多利亚港的 M+ 幕墙——镶嵌数以万计的 LED 灯管，是全球最具代表性的公共视觉文化媒体画布之一。',
      facadeSpec: '65.8米 × 110米 巨型 LED 媒体画布 · 香港维多利亚港',
    },
    howItWorks: {
      sectionTitle: '参与流程',
      subtitle: '三个简单步骤，让你的珍贵记忆点亮M+幕墙。',
      step1Number: '01',
      step1Title: '分享',
      step1Desc: '上传于M+拍下的照片，并附上一段个人感想或回忆。',
      step2Number: '02',
      step2Title: '遴选',
      step2Desc: '所有提交作品将进入大会的筛选、技术检核及策展评审程序。',
      step3Number: '03',
      step3Title: '庆祝',
      step3Desc: '获选之作品将有机会于开馆五周年庆祝活动期间在M+幕墙上展出。',
    },
    timeline: {
      sectionTitle: '日程',
      subtitle: 'M+ 五周年志庆活动及幕墙展演之关键日期。',
      milestone1Date: '2026年10月19日 — 11月1日',
      milestone1Title: '公开征集作品',
      milestone1Desc: '公众可通过本活动专页提交照片及个人回忆文字。',
      milestone2Date: '2026年11月2日 — 5日',
      milestone2Title: '投稿遴选',
      milestone2Desc: '由M+进行合规审核、影像画质检测及策展遴选。',
      milestone3Date: '2026年11月12日',
      milestone3Title: '庆祝',
      milestone3Desc: '精选公众回忆将于M+幕墙特别展出，与全城共庆五周年。',
    },
    form: {
      sectionTitle: '分享你的 M+ 瞬间',
      subtitle: '上传照片，留下简短文字，与我们分享你的难忘回忆。',
      photoLabel: '作品照片',
      photoUploadTitle: '上传您的照片',
      photoUploadSubtitle: '拖放照片至此或点击选取（支持 JPG、PNG，文件大小上限 15MB）',
      photoFormats: '建议尺寸：2100×1256px (1.67:1) · 文件上限 15MB',
      photoReplace: '更换照片',
      photoRemove: '移除',
      framingHeading: '检视照片构图及网格 (1256×1200px)',
      framingNotice: '请点击并拖拽照片以对齐 1256×1200px 幕墙展示网格，并可使用缩放工具或鼠标滚轮调整比例。',
      framingSafeZone: '1256×1200px 幕墙网格',
      dragHint: '拖拽照片以对齐网格 · 滚轮缩放',
      zoomLabel: '缩放比例',
      resetFraming: '重设位置',
      fitToGrid: '居中适配',
      resolutionGood: '照片分辨率合乎高规格标准，适合幕墙展示。',
      resolutionLow: '照片分辨率较低。建议使用宽度达 1200 像素以上之高画质图像，以在 LED 画布呈现最佳视觉效果。',
      messageLabel: '分享您的瞬间回忆',
      messagePlaceholder: '请简述这段回忆（例如拍照时的心情、同行的好友，或 M+ 带给您的启发）…',
      charCount: '字数尚余',
      nameLabel: '参加者全名',
      namePlaceholder: '例如：陈大文 Alex Chan',
      thematicLabel: '主题分类',
      thematicPlaceholder: '请选取作品主题分类…',
      thematicHelper: '请选择最契合您的照片与回忆之主题范畴。',
      mobileLabel: '手机号码',
      mobileHelper: '此号码将用作您的唯一识别码。每个手机号码只限提交一次。',
      mobilePlaceholder: '9123 4567',
      otpLabel: '短信验证码 (OTP)',
      otpPlaceholder: '输入6位数验证码',
      otpSendButton: '获取验证码',
      otpResendWait: '{s}秒后可重新发送',
      otpVerifyButton: '确认验证',
      otpVerifiedBadge: '电话已通过验证 ✓',
      otpHelper: '验证码将以短信形式发送至您输入的手机号码。',
      otpSimulatedNotice: '短信已发送！测试验证码：',
      emailLabel: '电子邮箱',
      emailOptional: '选填',
      emailPlaceholder: 'name@example.com',
      consentAge: '我确认已年满 18 岁。',
      consentUnderageNotice: '参与者须年满 18 岁。如未满 18 岁，依活动章程须由家长或法定监护人同意办理。',
      consentCopyright: '我确认拥有此照片的完整版权或已获得合法授权提交。',
      consentTerms: '我同意本活动之条款及细则。',
      consentTermsLink: '阅读条款及细则',
      consentDisplay: '我同意授权大会于 M+ 五周年庆祝活动中使用及展示所提交的内容。',
      submitButton: '提交作品',
      submitting: '正在提交…',
    },
    validation: {
      imageRequired: '请上传一张照片。',
      imageInvalidType: '请上传 JPG 或 PNG 格式的图片。',
      imageTooLarge: '上传之文件超出大小限制（15MB）。',
      messageRequired: '请简短分享您的回忆或感受。',
      messageTooLong: '文字内容超出字数上限。',
      nameRequired: '请输入参加者全名。',
      thematicRequired: '请选取作品主题分类。',
      mobileRequired: '请输入手机号码。',
      mobileInvalid: '请输入有效的手机号码格式。',
      mobileDuplicate: '此手机号码已提交过作品。',
      otpRequired: '请先完成电话短信验证码验证。',
      otpInvalid: '验证码不正确，请重新输入。',
      emailInvalid: '请输入有效的电子邮箱。',
      ageRequired: '您必须确认已年满 18 岁方可提交。',
      copyrightRequired: '请确认您拥有版权或获合法授权。',
      termsRequired: '请确认同意活动条款及细则。',
      displayRequired: '请同意活动展示与使用授权。',
    },
    success: {
      badge: '已收到您的提交',
      headline: '感谢您分享珍贵的 M+ 时光。',
      lead: '我们已成功接收您的作品，作品将进入大会的评审及遴选程序。',
      notice: '经甄选之作品将有机会于 M+ 五周年庆祝活动期间在 M+ 幕墙展出。',
      refNumber: '提交参考编号',
      submitterName: '提交者全名',
      thematicSection: '作品主题分类',
      registeredMobile: '登记手机号码',
      timestamp: '提交时间',
      messagePreview: '您的回忆文字',
      savedConfirmation: '您的提交已通过登记的手机号码完成记录。',
      shareAnother: '返回活动首页',
      visitMuseum: '浏览 M+ 官方网站',
    },
    closed: {
      badge: '活动已圆满截止',
      headline: '征集活动已圆满结束',
      body: '衷心感谢大家踊跃参与 M+ 开馆五周年志庆活动。作品征集现已截止，策展团队现正积极筹备 2026 年 11 月 12 日的幕墙特别展演。',
      followLink: '探索 M+ 当季展览',
    },
    termsModal: {
      title: '活动条款及细则',
      close: '关闭',
      intro: '参与“M+ Moments”开馆五周年征集活动前，请详阅以下官方条款及收集个人资料声明。',
      section1Title: '1. 参加资格及提交限制',
      section1Text: '本活动由 M Plus Museum Limited（下称“M+”）主办。参加者于提交时必须年满 18 岁。每个手机号码只限提交一份作品。所有照片必须为在 M+ 或西九文化区艺术公园拍摄的原创作品。',
      section2Title: '2. 版权与知识产权授权',
      section2Text: '参加者声明并保证为所提交照片之唯一创作者及版权拥有人，或已获得照片中出现之所有人士的合法授权。参加者特此授予 M+ 全球性、非独占、免版税之权利，于 M+ 幕墙、官方网页及社交媒体等渠道复制、修改、展示及宣传该作品，以作五周年志庆活动之用。',
      section3Title: '3. 幕墙展出之遴选机制',
      section3Text: '提交作品并不保证获选于 M+ 幕墙展出。所有作品须通过技术检测、画质评估、法规及策展遴选。M+ 保留最终决定展示名单、展出时间、次数及方式的权利。',
      section4Title: '4. 收集个人资料声明',
      section4Text: '大会所收集之个人资料（包括手机号码及电子邮箱）将仅用于本活动之联络、作品核实及行政用途，并严格遵循香港法例第 486 章《个人资料（私隐）条例》。大会绝不会将资料转让或出售予任何未经授权之第三方。',
    },
    footer: {
      tagline: 'M+ 是坐落于香港的全球当代视觉文化博物馆。',
      museumName: 'M Plus Museum Limited',
      district: '香港西九文化区',
      address: '香港九龙西九文化区博物馆道 38 号',
      rights: '© 2026 M Plus Museum Limited. 版权所有。',
      termsLink: '条款及细则',
      privacyLink: '个人资料私隐政策',
      contactLink: '联系我们',
      adminToggleCampaign: '策展测试预览模式',
      statusOpen: '征集进行中（表单开放）',
      statusClosed: '征集已截止（展示结束状态）',
    },
  },
};
