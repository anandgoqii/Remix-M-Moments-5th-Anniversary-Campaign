import React, { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { Translations } from '../locales/translations';
import { CampaignConfig } from '../types/campaign';

interface ImageUploaderProps {
  t: Translations;
  config: CampaignConfig;
  onImageSelected: (data: {
    dataUrl: string;
    file: File;
    dimensions: { width: number; height: number; aspectRatio: number };
  }) => void;
  error?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  t,
  config,
  onImageSelected,
  error,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (file: File) => {
    setInternalError(null);

    // Validate type
    if (!config.allowedFileTypes.includes(file.type)) {
      setInternalError(t.validation.imageInvalidType);
      return;
    }

    // Validate size
    if (file.size > config.maxFileSizeBytes) {
      setInternalError(t.validation.imageTooLarge);
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setIsProcessing(false);
        onImageSelected({
          dataUrl,
          file,
          dimensions: {
            width: img.naturalWidth,
            height: img.naturalHeight,
            aspectRatio: Number((img.naturalWidth / img.naturalHeight).toFixed(3)),
          },
        });
      };
      img.onerror = () => {
        setIsProcessing(false);
        setInternalError(t.validation.imageInvalidType);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const currentError = internalError || error;

  return (
    <div className="space-y-2">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 ${
          isDragging
            ? 'border-white bg-white text-black'
            : currentError
            ? 'border-white bg-black/40 text-white'
            : 'border-white/60 hover:border-white bg-black/15 hover:bg-black/25 text-white'
        } p-8 sm:p-12 text-center cursor-pointer transition-all shadow-md`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        aria-label={t.form.photoUploadTitle}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={config.allowedFileTypes.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          aria-hidden="true"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Architectural camera symbol */}
          <div className="w-14 h-14 bg-white text-black flex items-center justify-center shadow">
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-black border-t-transparent animate-spin" />
            ) : (
              <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <circle cx="12" cy="13" r="3" strokeWidth="2" />
              </svg>
            )}
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-black mplus-display tracking-tight mb-1">
              {t.form.photoUploadTitle}
            </h4>
            <p className="text-xs sm:text-sm text-white/90 max-w-sm mx-auto font-medium">
              {t.form.photoUploadSubtitle}
            </p>
          </div>

          <div className="pt-2 text-[11px] mplus-metadata tracking-wider text-white/80 font-bold">
            {t.form.photoFormats}
          </div>
        </div>
      </div>

      {currentError && (
        <div className="bg-white text-black px-3 py-2 text-xs font-bold flex items-center space-x-2 shadow">
          <span className="w-2 h-2 bg-[#FB5616] inline-block" />
          <span>{currentError}</span>
        </div>
      )}
    </div>
  );
};
