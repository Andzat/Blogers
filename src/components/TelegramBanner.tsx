import React from 'react';
import { Send, Sparkles, ShieldCheck, Zap, Users } from 'lucide-react';

interface TelegramBannerProps {
  onJoinTelegram: () => void;
}

export const TelegramBanner: React.FC<TelegramBannerProps> = ({ onJoinTelegram }) => {
  return (
    <section className="relative my-12 sm:my-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl p-6 sm:p-10 md:p-12 bg-gradient-to-br from-sky-50 via-white to-blue-50/60 border border-sky-200/80 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-normal mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Ексклюзивне AI-ком'юніті в Telegram</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-medium text-slate-900 tracking-tight leading-tight">
              Слідкуйте за всіма блогерами в єдиному Telegram-каналі
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Публікуємо закриті матеріали, бекстейджі генерації фотосесій, прямі ефіри з AI-персонажами та ранній доступ до нових цифрових блогерів платформи.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-500 font-normal">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-sky-600" />
                <span className="text-slate-800 font-medium">18,500+</span> учасників
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Щоденні пости</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Без спаму</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={onJoinTelegram}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-normal text-base sm:text-lg shadow-sm transition-all transform hover:scale-102 active:scale-95 cursor-pointer"
            >
              <Send className="w-5 h-5 fill-white" />
              <span>Перейти в Telegram</span>
            </button>
            <span className="text-[11px] text-slate-400 font-normal">Миттєвий доступ без реєстрації</span>
          </div>
        </div>
      </div>
    </section>
  );
};
