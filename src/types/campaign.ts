export type Language = 'en' | 'tc';

export interface CampaignConfig {
  campaignStartDate: string;
  campaignEndDate: string;
  eventDate: string;
  maxFileSizeBytes: number;
  allowedFileTypes: string[];
  maxMessageLength: number;
  minResolutionWidth: number;
  optimalResolutionWidth: number;
  isCampaignClosed: boolean;
}

export interface CountryCodeOption {
  code: string;
  dialCode: string;
  nameEn: string;
  nameTc: string;
}

export interface SubmissionRecord {
  submissionId: string;
  fullName: string;
  thematicSection: string;
  imageName: string;
  imageSize: number;
  imageDimensions: {
    width: number;
    height: number;
    aspectRatio: number;
  };
  imagePreviewUrl: string;
  message: string;
  countryCode: string;
  mobileNumber: string;
  phoneVerified: boolean;
  email?: string;
  ageConfirmed: boolean;
  copyrightConfirmed: boolean;
  termsAccepted: boolean;
  displayConsent: boolean;
  language: Language;
  submittedAt: string;
  status: 'pending_screening' | 'verified';
}
