import { CampaignConfig, CountryCodeOption, SubmissionRecord } from '../types/campaign';

export const DEFAULT_CAMPAIGN_CONFIG: CampaignConfig = {
  campaignStartDate: '19 Oct 2026',
  campaignEndDate: '1 Nov 2026',
  eventDate: '12 November 2026',
  maxFileSizeBytes: 15 * 1024 * 1024, // 15MB configurable
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  maxMessageLength: 150, // Configurable character limit
  minResolutionWidth: 800,
  optimalResolutionWidth: 2100,
  isCampaignClosed: false,
};

export const COUNTRY_CODES: CountryCodeOption[] = [
  { code: 'HK', dialCode: '+852', nameEn: 'Hong Kong (+852)', nameTc: '香港 (+852)' },
  { code: 'MO', dialCode: '+853', nameEn: 'Macau (+853)', nameTc: '澳門 (+853)' },
  { code: 'CN', dialCode: '+86', nameEn: 'Mainland China (+86)', nameTc: '中國內地 (+86)' },
  { code: 'TW', dialCode: '+886', nameEn: 'Taiwan (+886)', nameTc: '台灣 (+886)' },
  { code: 'GB', dialCode: '+44', nameEn: 'United Kingdom (+44)', nameTc: '英國 (+44)' },
  { code: 'US', dialCode: '+1', nameEn: 'United States / Canada (+1)', nameTc: '美國 / 加拿大 (+1)' },
  { code: 'SG', dialCode: '+65', nameEn: 'Singapore (+65)', nameTc: '新加坡 (+65)' },
  { code: 'JP', dialCode: '+81', nameEn: 'Japan (+81)', nameTc: '日本 (+81)' },
  { code: 'KR', dialCode: '+82', nameEn: 'South Korea (+82)', nameTc: '韓國 (+82)' },
  { code: 'AU', dialCode: '+61', nameEn: 'Australia (+61)', nameTc: '澳洲 (+61)' },
];

export const THEMATIC_SECTIONS = [
  {
    id: 'architecture_galleries',
    label: 'M+ Architecture & Galleries // 展廳空間記憶',
  },
  {
    id: 'anniversary_tribute',
    label: '5th Anniversary Tribute // 五周年祝願',
  },
  {
    id: 'community_connections',
    label: 'Community Connections // 文化生活記趣',
  },
];

const STORAGE_KEY = 'mplus_moments_submissions_v1';

export function getStoredSubmissions(): SubmissionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Pre-seed an existing simulated submission to allow testing duplicate phone detection
      const initial: SubmissionRecord[] = [
        {
          submissionId: 'MPLUS-2026-0852',
          fullName: 'Anson Chan',
          thematicSection: '5th Anniversary Tribute // 五周年祝願',
          imageName: 'west_kowloon_sunset.jpg',
          imageSize: 4200000,
          imageDimensions: { width: 2400, height: 1600, aspectRatio: 1.5 },
          imagePreviewUrl: '',
          message: 'Walking through the Art Park at dusk with family.',
          countryCode: '+852',
          mobileNumber: '91234567',
          phoneVerified: true,
          email: 'sample@mplus.org.hk',
          ageConfirmed: true,
          copyrightConfirmed: true,
          termsAccepted: true,
          displayConsent: true,
          language: 'en',
          submittedAt: '2026-10-19T14:22:00Z',
          status: 'verified',
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveSubmission(submission: SubmissionRecord): void {
  try {
    const records = getStoredSubmissions();
    records.push(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save submission locally', e);
  }
}

export function isMobileNumberRegistered(dialCode: string, mobileNumber: string): boolean {
  const cleanNumber = mobileNumber.replace(/\D/g, '');
  if (!cleanNumber) return false;
  const records = getStoredSubmissions();
  return records.some(
    (r) => r.countryCode === dialCode && r.mobileNumber.replace(/\D/g, '') === cleanNumber
  );
}
