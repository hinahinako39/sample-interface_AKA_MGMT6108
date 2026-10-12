import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, X, Volume2, VolumeX } from 'lucide-react';
import { Article } from '../types';

interface AudioPlayerBarProps {
  article: Article;
  onClose: () => void;
  onOpenArticle: (article: Article) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  article,
  onClose,
  onOpenArticle,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(12); // seconds
  const [isMuted, setIsMuted] = useState(false);
  const totalSeconds = 31 * 60 + 42; // 31:42

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= totalSeconds ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSeconds]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const skip = (amount: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(totalSeconds, prev + amount)));
  };

  const progressPercent = (currentTime / totalSeconds) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 text-white shadow-2xl border-t border-neutral-700 animate-slide-up">
      {/* Mini Progress scrubber line */}
      <div
        className="w-full bg-neutral-700 h-1 cursor-pointer relative"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = clickX / rect.width;
          setCurrentTime(Math.floor(ratio * totalSeconds));
        }}
      >
        <div
          className="bg-amber-400 h-full transition-all duration-150"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Left: Article title & audio info */}
        <div
          className="flex-1 min-w-0 pr-3 cursor-pointer group"
          onClick={() => onOpenArticle(article)}
        >
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold">
              The Daily • Audio Edition
            </span>
          </div>
          <h4 className="text-xs sm:text-sm font-semibold truncate group-hover:text-amber-300 transition">
            {article.headline}
          </h4>
        </div>

        {/* Center: Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => skip(-15)}
            aria-label="Skip backward 15 seconds"
            className="p-1.5 text-neutral-400 hover:text-white transition"
            title="15s backward"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="w-9 h-9 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center transition active:scale-95 shadow"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          <button
            onClick={() => skip(15)}
            aria-label="Skip forward 15 seconds"
            className="p-1.5 text-neutral-400 hover:text-white transition"
            title="15s forward"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Timer & Mute & Close */}
        <div className="flex items-center space-x-3 pl-3">
          <span className="text-xs font-mono text-neutral-300 hidden sm:inline">
            {formatTime(currentTime)} / {formatTime(totalSeconds)}
          </span>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 text-neutral-400 hover:text-white hidden sm:inline"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            aria-label="Close audio player"
            className="p-1 text-neutral-400 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
