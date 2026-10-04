import React from 'react';
import { Send } from 'lucide-react';

interface StickyMobileBarProps {
  onJoinTelegram: () => void;
  onlineCount: number;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onJoinTelegram, onlineCount }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:hidden bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-xl p-2.5 rounded-2xl flex items-center justify-between gap-3 shadow-lg border border-slate-200">
          
          <div className="flex items-center gap-2 pl-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="text-left">
              <div className="text-[11px] font-medium text-slate-800">
                <span>{onlineCount} AI Блогери</span>
              </div>
              <div className="text-[9px] text-emerald-600 font-normal">У мережі просто зараз</div>
            </div>
          </div>

          <button
            onClick={onJoinTelegram}
            className="flex items-center gap-2 py-2 px-3.5 rounded-xl bg-sky-600 active:scale-95 text-white font-normal text-xs shadow-sm transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 fill-white" />
            <span>Перейти в Telegram</span>
          </button>

        </div>
      </div>
    </div>
  );
};
