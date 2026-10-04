import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Blogger } from '../types/blogger';
import { X, Send, Play, Pause, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface StoryModalProps {
  bloggers: Blogger[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onTelegramClick: (blogger: Blogger) => void;
}

const STORY_DURATION_MS = 5000;

export const StoryModal: React.FC<StoryModalProps> = ({
  bloggers,
  initialIndex,
  isOpen,
  onClose,
  onTelegramClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setProgress(0);
    setIsPaused(false);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    if (isPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / STORY_DURATION_MS) * 100;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < bloggers.length - 1) {
            setCurrentIndex((idx) => idx + 1);
            soundManager.playPop();
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isOpen, currentIndex, isPaused, bloggers.length, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen || bloggers.length === 0) return null;

  const currentBlogger = bloggers[currentIndex];
  const currentPost = currentBlogger.feedPosts[0];

  const handleNext = () => {
    soundManager.playPop();
    if (currentIndex < bloggers.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    soundManager.playPop();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      setProgress(0);
    }
  };

  const handleCta = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0284c7', '#38bdf8', '#818cf8']
    });
    soundManager.playHeart();
    onTelegramClick(currentBlogger);
  };

  return createPortal(
    <div
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-200 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full sm:h-[88vh] sm:max-w-md sm:rounded-3xl overflow-hidden bg-slate-900 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={currentPost.image}
            alt={currentBlogger.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
        </div>

        <div className="relative z-20 p-3 sm:p-4 pt-4 flex flex-col gap-3">
          <div className="flex items-center gap-1.5 w-full">
            {bloggers.map((_, idx) => {
              let width = '0%';
              if (idx < currentIndex) width = '100%';
              else if (idx === currentIndex) width = `${progress}%`;

              return (
                <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-75 ease-linear"
                    style={{ width }}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full ring-2 ring-sky-400 p-0.5 overflow-hidden">
                <img
                  src={currentBlogger.avatar}
                  alt={currentBlogger.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-white text-sm font-medium">{currentBlogger.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-300 font-normal">
                  <span>{currentBlogger.handle}</span>
                  <span>•</span>
                  <span>{currentPost.timeAgo}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused((p) => !p)}
                className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                title={isPaused ? 'Продовжити' : 'Пауза'}
              >
                {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4 fill-white" />}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                title="Закрити"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex">
          <div className="w-1/3 h-full cursor-pointer" onClick={handlePrev} title="Назад" />
          <div className="w-1/3 h-full" onClick={() => setIsPaused((p) => !p)} />
          <div className="w-1/3 h-full cursor-pointer" onClick={handleNext} title="Далі" />
        </div>

        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute -left-14 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {currentIndex < bloggers.length - 1 && (
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute -right-14 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <div className="relative z-20 p-4 sm:p-5 flex flex-col gap-3.5">
          <div className="p-3.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs sm:text-sm leading-relaxed font-normal">
            {currentPost.caption}
          </div>

          <button
            onClick={handleCta}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4 fill-white" />
            <span>Перейти в Telegram-канал</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
