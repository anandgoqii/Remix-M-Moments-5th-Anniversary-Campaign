import React, { useState, useRef, useEffect } from 'react';
import { Translations } from '../locales/translations';
import { CampaignConfig } from '../types/campaign';

interface ImagePreviewProps {
  t: Translations;
  config: CampaignConfig;
  imageUrl: string;
  imageName: string;
  imageSize: number;
  dimensions: { width: number; height: number; aspectRatio: number };
  onReplace: () => void;
  onRemove: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  t,
  config,
  imageUrl,
  imageName,
  imageSize,
  dimensions,
  onReplace,
  onRemove,
}) => {
  // Framing and position state for drag-to-fit
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const formattedSize = (imageSize / (1024 * 1024)).toFixed(2) + ' MB';
  const isHighRes = dimensions.width >= config.optimalResolutionWidth;
  const isLowRes = dimensions.width < config.minResolutionWidth;

  let ratioDescriptor = 'Landscape';
  if (dimensions.aspectRatio > 1.8) ratioDescriptor = 'Ultrawide Panoramic';
  else if (dimensions.aspectRatio >= 1.2) ratioDescriptor = 'Standard Landscape';
  else if (dimensions.aspectRatio >= 0.9 && dimensions.aspectRatio <= 1.1) ratioDescriptor = 'Square';
  else ratioDescriptor = 'Portrait / Vertical';

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasInteracted(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Handlers for Mobile Devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setHasInteracted(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setHasInteracted(true);
    const zoomFactor = e.deltaY < 0 ? 1.05 : 0.95;
    setScale((prev) => {
      const next = Number((prev * zoomFactor).toFixed(2));
      return Math.min(Math.max(next, 0.5), 3.0);
    });
  };

  // Reset framing
  const handleReset = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  };

  // Quick zoom controls
  const handleZoomIn = () => {
    setHasInteracted(true);
    setScale((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 3.0));
  };

  const handleZoomOut = () => {
    setHasInteracted(true);
    setScale((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.5));
  };

  // Add global mouse up listener so releasing drag outside container also ends dragging
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="bg-white text-black p-4 sm:p-6 space-y-4 border-2 border-black shadow-lg">
      {/* Top File Meta & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-black">
        <div className="min-w-0">
          <div className="text-base font-black truncate max-w-xs sm:max-w-md">
            {imageName}
          </div>
          <div className="text-xs mplus-metadata text-neutral-600 flex flex-wrap items-center gap-2 mt-0.5 font-bold">
            <span>{formattedSize}</span>
            <span>·</span>
            <span>{dimensions.width} × {dimensions.height} PX</span>
            <span>·</span>
            <span>{ratioDescriptor.toUpperCase()}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={onReplace}
            className="px-3.5 py-1.5 text-xs font-bold text-black border-2 border-black hover:bg-black hover:text-white transition-colors"
          >
            {t.form.photoReplace}
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#FB5616] hover:bg-black transition-colors"
          >
            {t.form.photoRemove}
          </button>
        </div>
      </div>

      {/* Frame Container for 1256x1200px Target Section */}
      <div className="relative bg-[#0d0d0d] overflow-hidden flex flex-col items-center justify-center p-3 sm:p-6 rounded-none">
        
        {/* Floating Top Banner: Facade Section Dimension */}
        <div className="w-full max-w-[480px] mb-2 flex items-center justify-between text-[11px] mplus-metadata text-white/90">
          <span className="flex items-center space-x-1.5 font-bold">
            <span className="w-2 h-2 bg-[#FB5616] inline-block" />
            <span>M+ FACADE SECTION: 1256 × 1200 PX</span>
          </span>
          <span className="text-white/60 font-bold">
            {Math.round(scale * 100)}% ZOOM
          </span>
        </div>

        {/* 1256x1200 Frame Viewport (Aspect Ratio: 1256 / 1200 ≈ 1.047) */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className={`relative w-full max-w-[480px] aspect-[1256/1200] bg-black overflow-hidden select-none border-2 ${
            isDragging ? 'border-[#FB5616] ring-2 ring-[#FB5616]/40' : 'border-white'
          } shadow-2xl transition-shadow ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          } touch-none`}
          title={t.form.dragHint}
        >
          {/* Draggable & Scalable Image Layer */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.08s ease-out',
            }}
          >
            <img
              src={imageUrl}
              alt="Uploaded moment framing"
              draggable={false}
              className="max-w-none select-none pointer-events-none filter contrast-[1.02]"
              style={{
                width: dimensions.aspectRatio >= (1256 / 1200) ? 'auto' : '100%',
                height: dimensions.aspectRatio >= (1256 / 1200) ? '100%' : 'auto',
                minWidth: '100%',
                minHeight: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* 1256x1200 Grid Overlay */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* 3x3 Architectural Grid Lines */}
              <div className="w-full h-full grid grid-cols-3 grid-rows-3 border border-white/50">
                <div className="border-r border-b border-white/35 border-dashed" />
                <div className="border-r border-b border-white/35 border-dashed" />
                <div className="border-b border-white/35 border-dashed" />

                <div className="border-r border-b border-white/35 border-dashed" />
                <div className="border-r border-b border-white/35 border-dashed flex items-center justify-center">
                  {/* Center Crosshair Alignment */}
                  <div className="w-5 h-5 border border-white/60 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white/90" />
                  </div>
                </div>
                <div className="border-b border-white/35 border-dashed" />

                <div className="border-r border-white/35 border-dashed" />
                <div className="border-r border-white/35 border-dashed" />
                <div />
              </div>

              {/* Corner Framing Brackets */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-white" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-white" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-white" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-white" />

              {/* Grid Top Badge */}
              <div className="absolute top-2 left-2 text-[10px] mplus-metadata font-black tracking-wider text-black bg-white px-2 py-0.5 shadow">
                1256 × 1200 PX GRID
              </div>

              {/* Grid Bottom Info */}
              <div className="absolute bottom-2 right-2 text-[10px] mplus-metadata font-bold text-white bg-black/85 px-2 py-0.5 border border-white/20">
                M+ FACADE FIT
              </div>

              {/* Drag status indicator */}
              <div className="absolute bottom-2 left-2 text-[10px] mplus-metadata font-bold text-white bg-black/80 px-2 py-0.5 backdrop-blur-xs">
                X: {Math.round(position.x)} · Y: {Math.round(position.y)}
              </div>
            </div>
          )}

          {/* First-time Interaction Hint Overlay */}
          {!hasInteracted && (
            <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-opacity">
              <div className="bg-black/90 text-white border border-white/40 px-3.5 py-2 shadow-2xl flex items-center space-x-2 text-xs mplus-metadata font-bold">
                <span className="w-2 h-2 bg-[#FB5616] animate-pulse inline-block" />
                <span>{t.form.dragHint}</span>
              </div>
            </div>
          )}
        </div>

        {/* Framing Instructions Bar */}
        <div className="w-full max-w-[480px] mt-2.5 flex items-center justify-between text-xs text-white/70">
          <span className="flex items-center space-x-1.5">
            <svg className="w-3.5 h-3.5 text-[#FB5616]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
            <span className="font-medium text-[11px] sm:text-xs text-white/80">
              {t.form.dragHint}
            </span>
          </span>
          <span className="text-[11px] text-white/50 font-bold hidden sm:inline">
            1256x1200 Section
          </span>
        </div>
      </div>

      {/* Interactive Controls Bar: Zoom & Grid Options */}
      <div className="bg-neutral-100 p-4 space-y-3 border border-neutral-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Zoom controls */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black text-black shrink-0">
              {t.form.zoomLabel}:
            </span>
            <button
              type="button"
              onClick={handleZoomOut}
              className="w-7 h-7 bg-white text-black border border-black hover:bg-black hover:text-white flex items-center justify-center font-bold text-sm shadow-xs transition-colors"
              title="Zoom Out"
            >
              −
            </button>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.05"
              value={scale}
              onChange={(e) => {
                setHasInteracted(true);
                setScale(parseFloat(e.target.value));
              }}
              className="w-24 sm:w-32 accent-[#FB5616] cursor-pointer"
              aria-label="Image zoom slider"
            />
            <button
              type="button"
              onClick={handleZoomIn}
              className="w-7 h-7 bg-white text-black border border-black hover:bg-black hover:text-white flex items-center justify-center font-bold text-sm shadow-xs transition-colors"
              title="Zoom In"
            >
              +
            </button>
            <span className="text-xs font-bold text-black min-w-[42px]">
              {Math.round(scale * 100)}%
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1 text-xs font-bold bg-white text-black border border-black hover:bg-black hover:text-white transition-colors"
            >
              {t.form.resetFraming}
            </button>

            {/* Grid display toggle */}
            <label className="flex items-center space-x-1.5 cursor-pointer text-xs font-bold text-neutral-800 ml-2">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="accent-[#FB5616] w-4 h-4 cursor-pointer"
              />
              <span className="text-[11px] mplus-metadata font-bold">
                {t.form.framingSafeZone}
              </span>
            </label>
          </div>
        </div>

        {/* Guidance Notice */}
        <p className="text-xs text-neutral-700 leading-relaxed font-medium">
          {t.form.framingNotice}
        </p>

        {/* Resolution assessment */}
        <div className="pt-2 border-t border-neutral-300 flex items-center space-x-2 text-xs font-bold">
          {isLowRes ? (
            <span className="text-[#FB5616] flex items-center space-x-1.5">
              <span>▲</span>
              <span>{t.form.resolutionLow}</span>
            </span>
          ) : (
            <span className="text-emerald-700 flex items-center space-x-1.5">
              <span>✓</span>
              <span>
                {isHighRes
                  ? t.form.resolutionGood
                  : `Resolution: ${dimensions.width}px width (adequate for 1256×1200px facade screening review).`}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
