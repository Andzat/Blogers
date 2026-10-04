import React from 'react';
import { Blogger } from '../types/blogger';
import { MessageCircle, Send, Users, Sparkles, MapPin, ArrowUpRight } from 'lucide-react';

interface BloggerCardProps {
  blogger: Blogger;
  onOpenProfile: (blogger: Blogger) => void;
  onOpenChat: (blogger: Blogger) => void;
  onTelegramClick: (blogger: Blogger) => void;
}

export const BloggerCard: React.FC<BloggerCardProps> = ({
  blogger,
  onOpenProfile,
  onOpenChat,
  onTelegramClick,
}) => {
  return (
    <article className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-md flex flex-col justify-between h-full transition-all duration-300">
      <div 
        className="relative aspect-[4/5] sm:aspect-[3/4] w-full shrink-0 overflow-hidden bg-slate-100 cursor-pointer" 
        onClick={() => onOpenProfile(blogger)}
      >
        <img
          src={blogger.avatar}
          alt={blogger.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-emerald-400 text-xs font-normal border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>В мережі</span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/80 backdrop-blur-md text-white text-xs font-normal shadow-sm">
            <Sparkles className="w-3 h-3 text-white" />
            <span>AI Верифіковано</span>
          </div>
        </div>

        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-normal">
            <Users className="w-3.5 h-3.5 text-sky-300" />
            <span className="font-medium text-white">{blogger.subscribers}</span>
            <span className="text-[10px] text-slate-300">підписників</span>
          </div>

          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] text-slate-200 font-normal">
            <MapPin className="w-3 h-3 text-pink-300" />
            <span>{blogger.location.split(',')[0]}</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-2 min-h-[2.75rem]">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-medium text-lg sm:text-xl text-slate-900 group-hover:text-sky-600 transition-colors">
                  {blogger.name}
                </h3>
              </div>
              <span className="text-xs text-sky-600 font-normal">{blogger.handle}</span>
            </div>

            <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/60 text-[11px] font-normal text-slate-600 shrink-0">
              {blogger.categoryLabel}
            </span>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal h-10 overflow-hidden">
            {blogger.shortBio}
          </p>

          <div className="mt-2.5 flex items-center flex-wrap gap-1.5 h-6 overflow-hidden">
            {blogger.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-200/60 font-normal whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenProfile(blogger);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-normal transition-all cursor-pointer active:scale-98 shadow-sm"
          >
            <span>Дивитися профіль</span>
            <ArrowUpRight className="w-4 h-4 text-slate-300" />
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenChat(blogger);
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 text-xs font-normal border border-indigo-200/60 transition-all cursor-pointer active:scale-98"
              title="Поставити запитання AI блогеру"
            >
              <MessageCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="whitespace-nowrap">AI Чат</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onTelegramClick(blogger);
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-normal border border-sky-200/80 transition-all cursor-pointer active:scale-98"
              title="Перейти в Telegram-канал"
            >
              <Send className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span className="whitespace-nowrap">Telegram</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
