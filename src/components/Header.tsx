import React, { useState } from 'react';
import { Sparkles, Send, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  onJoinTelegram: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onJoinTelegram }) => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  const handleToggleSound = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg text-slate-900 tracking-tight font-medium">
                NEXUS<span className="text-sky-600">.AI</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block font-normal">Вітрина віртуальних креаторів</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">

          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isMuted
                ? 'bg-slate-100 text-slate-400 border-slate-200 hover:text-slate-600'
                : 'bg-sky-50 text-sky-600 border-sky-200 hover:bg-sky-100'
            }`}
            title={isMuted ? 'Увімкнути звукові ефекти' : 'Вимкнути звукові ефекти'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onJoinTelegram}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-medium shadow-sm transition-all transform active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4 fill-white" />
            <span className="hidden xs:inline">Канал у</span>
            <span>Telegram</span>
          </button>
        </div>
      </div>
    </header>
  );
};
