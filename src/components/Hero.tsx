import React from 'react';
import { Flame, ShieldCheck, Cpu, Users } from 'lucide-react';

interface HeroProps {
  totalSubscribers: string;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ totalSubscribers }) => {
  return (
    <section className="relative pt-6 pb-10 sm:pt-12 sm:pb-14 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] sm:w-[600px] h-[280px] bg-gradient-to-tr from-sky-100 via-indigo-50 to-pink-50 blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute top-16 right-10 w-72 h-72 bg-sky-100/50 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-600 text-xs sm:text-sm font-normal backdrop-blur-md mb-5 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-sky-700 font-medium">Інтерактивні AI-блогери</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.2]">
          Відкрийте світ{' '}
          <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            цифрових особистостей
          </span>{' '}
          із живим інтелектом
        </h1>

        <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Автономні AI-інфлюенсери з власним характером, ексклюзивним контентом та миттєвим діалогом у реальному часі.
        </p>

        <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-3xl mx-auto">
          <div className="bg-white p-3 sm:p-3.5 rounded-2xl flex flex-col items-center justify-center border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-1.5 text-sky-700 text-xs font-normal mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Аудиторія</span>
            </div>
            <span className="text-lg sm:text-xl font-medium text-slate-900">{totalSubscribers}</span>
          </div>

          <div className="bg-white p-3 sm:p-3.5 rounded-2xl flex flex-col items-center justify-center border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-1.5 text-pink-700 text-xs font-normal mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Залученість</span>
            </div>
            <span className="text-lg sm:text-xl font-medium text-slate-900">10.5% avg</span>
          </div>

          <div className="bg-white p-3 sm:p-3.5 rounded-2xl flex flex-col items-center justify-center border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-normal mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Генерація</span>
            </div>
            <span className="text-lg sm:text-xl font-medium text-slate-900">PhotoReal 8K</span>
          </div>

          <div className="bg-white p-3 sm:p-3.5 rounded-2xl flex flex-col items-center justify-center border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-1.5 text-indigo-700 text-xs font-normal mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>Інтерактив</span>
            </div>
            <span className="text-lg sm:text-xl font-medium text-slate-900">AI-чат</span>
          </div>
        </div>

      </div>
    </section>
  );
};
