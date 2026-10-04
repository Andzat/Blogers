import React from 'react';
import { Sparkles, Send } from 'lucide-react';

interface FooterProps {
  onJoinTelegram: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onJoinTelegram }) => {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 sm:py-14 pb-20 sm:pb-14 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              </div>
              <span className="font-medium text-slate-900 text-base">
                NEXUS<span className="text-sky-600">.AI</span>
              </span>
            </div>
            <p className="text-slate-500 text-center sm:text-left text-xs max-w-sm font-normal">
              Інтерактивна вітрина віртуальних AI-блогерів.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-2">
            <button
              onClick={onJoinTelegram}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-normal transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-sky-600" />
              <span>Telegram Канал Проєкту</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-normal">
          <div>© {new Date().getFullYear()} NEXUS AI Creators. Усі права захищено.</div>
        </div>

      </div>
    </footer>
  );
};
