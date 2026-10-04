import React from 'react';
import { Category } from '../types/blogger';
import { Sparkles, Cpu, Compass, Crown, Activity } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  counts: Record<Category, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Всі блогери', icon: <Sparkles className="w-4 h-4 sm:w-3.5 sm:h-3.5" /> },
    { id: 'tech', label: 'AI & Технології', icon: <Cpu className="w-4 h-4 sm:w-3.5 sm:h-3.5" /> },
    { id: 'travel', label: 'Екстрим & Подорожі', icon: <Compass className="w-4 h-4 sm:w-3.5 sm:h-3.5" /> },
    { id: 'fashion', label: 'High Fashion', icon: <Crown className="w-4 h-4 sm:w-3.5 sm:h-3.5" /> },
    { id: 'fitness', label: 'Біохакінг & Здоров\'я', icon: <Activity className="w-4 h-4 sm:w-3.5 sm:h-3.5" /> },
  ];

  return (
    <div className="w-full pb-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-3 w-full max-w-md sm:max-w-none mx-auto">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playPop();
                onSelectCategory(cat.id);
              }}
              className={`w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2.5 px-4 py-2.5 sm:px-3.5 sm:py-2 rounded-xl text-sm sm:text-sm font-normal transition-all duration-200 cursor-pointer active:scale-[0.99] sm:active:scale-95 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900 sm:scale-[1.01]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? 'text-white' : 'text-slate-500'}>{cat.icon}</span>
                <span className={isActive ? 'text-white' : 'text-slate-800'}>{cat.label}</span>
              </div>
              <span
                className={`ml-1.5 px-2 py-0.5 rounded-full text-xs sm:text-[10px] font-normal ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {counts[cat.id]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
