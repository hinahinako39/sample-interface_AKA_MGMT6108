import React from 'react';
import { X, ZoomIn, Info } from 'lucide-react';

interface ImageLightboxProps {
  imageUrl: string;
  headline: string;
  caption: string;
  location?: string;
  date?: string;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  imageUrl,
  headline,
  caption,
  location,
  date,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Top action bar */}
      <div className="flex items-center justify-between text-white max-w-4xl w-full mx-auto">
        <div className="text-xs">
          <span className="font-bold tracking-wider uppercase font-nyt-sans">The New York Times</span>
          {location && <span className="text-neutral-400 ml-2">• {location}</span>}
        </div>
        <button
          onClick={onClose}
          className="p-2 text-white hover:text-neutral-300 rounded-full bg-white/10 hover:bg-white/20 transition"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Center Image */}
      <div
        className="flex-1 flex items-center justify-center my-4 overflow-hidden max-w-4xl mx-auto w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={headline}
          className="max-h-[75vh] w-auto max-w-full object-contain rounded shadow-2xl border border-white/10"
        />
      </div>

      {/* Caption bottom bar */}
      <div
        className="max-w-4xl w-full mx-auto bg-black/80 text-white p-3 sm:p-4 rounded border border-white/15"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="font-nyt-headline font-bold text-sm sm:text-base text-white mb-1">
          {headline}
        </h4>
        <p className="font-nyt-sans text-xs text-neutral-300 leading-relaxed">
          {caption}
        </p>
        <div className="text-[11px] text-neutral-400 mt-2 font-mono">
          Photo Desk Archive • {date || 'Oct. 2026'}
        </div>
      </div>
    </div>
  );
};
