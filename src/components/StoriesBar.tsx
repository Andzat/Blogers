import React from 'react';
import { Blogger } from '../types/blogger';
import { Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface StoriesBarProps {
  bloggers: Blogger[];
  onOpenStory: (index: number) => void;
}

export const StoriesBar: React.FC<StoriesBarProps> = ({ bloggers, onOpenStory }) => {
  return (
    <div className="w-full pb-6 overflow-x-auto custom-scrollbar no-scrollbar-on-touch">
      <div className="flex items-center gap-4 sm:gap-6 min-w-max px-2 justify-start sm:justify-center mx-auto">
        {bloggers.map((blogger, index) => {
          return (
            <button
              key={blogger.id}
              onClick={() => {
                soundManager.playPop();
                onOpenStory(index);
              }}
              className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none transition-transform active:scale-95"
            >
              <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-pink-500 shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2px] bg-white">
                  <img
                    src={blogger.avatar}
                    alt={blogger.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-[9px] font-medium tracking-tight shadow-sm flex items-center gap-0.5 whitespace-nowrap">
                  <Sparkles className="w-2 h-2" />
                  <span>Story</span>
                </span>
              </div>

              <span className="text-xs font-normal text-slate-700 group-hover:text-sky-600 transition-colors">
                {blogger.name.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
