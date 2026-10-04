import React, { useState, useMemo, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { BLOGGERS_DATA } from './data/bloggers';
import { Blogger, Category } from './types/blogger';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StoriesBar } from './components/StoriesBar';
import { StoryModal } from './components/StoryModal';
import { CategoryFilter } from './components/CategoryFilter';
import { BloggerCard } from './components/BloggerCard';
import { BloggerModal } from './components/BloggerModal';
import { TelegramBanner } from './components/TelegramBanner';
import { StickyMobileBar } from './components/StickyMobileBar';
import { Footer } from './components/Footer';
import { Search, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from './utils/audio';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBlogger, setActiveBlogger] = useState<Blogger | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'feed' | 'chat'>('feed');
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      prevent: (node) => !!node.closest?.('[data-lenis-prevent]'),
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (activeBlogger || activeStoryIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeBlogger, activeStoryIndex]);

  const filteredBloggers = useMemo(() => {
    let result = BLOGGERS_DATA;

    if (selectedCategory !== 'all') {
      result = result.filter((b) => b.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((b) =>
        b.name.toLowerCase().includes(q) ||
        b.handle.toLowerCase().includes(q) ||
        b.categoryLabel.toLowerCase().includes(q) ||
        b.shortBio.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    return {
      all: BLOGGERS_DATA.length,
      tech: BLOGGERS_DATA.filter(b => b.category === 'tech').length,
      travel: BLOGGERS_DATA.filter(b => b.category === 'travel').length,
      fashion: BLOGGERS_DATA.filter(b => b.category === 'fashion').length,
      fitness: BLOGGERS_DATA.filter(b => b.category === 'fitness').length,
    };
  }, []);

  const handleOpenProfile = (blogger: Blogger) => {
    soundManager.playPop();
    setActiveBlogger(blogger);
    setModalInitialTab('feed');
  };

  const handleOpenChat = (blogger: Blogger) => {
    soundManager.playPop();
    setActiveBlogger(blogger);
    setModalInitialTab('chat');
  };

  const handleTelegramClick = (blogger?: Blogger) => {
    soundManager.playHeart();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#0284c7', '#38bdf8', '#818cf8', '#a855f7']
    });

    const defaultUrl = import.meta.env.VITE_DEFAULT_TELEGRAM_URL || 'https://t.me/telegram';
    const targetUrl = blogger ? blogger.telegramLink : defaultUrl;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleResetSearch = () => {
    soundManager.playPop();
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between selection:bg-sky-500/20 selection:text-sky-900 font-normal animate-page-enter">
      <Header onJoinTelegram={() => handleTelegramClick()} />

      <main className="flex-1">
        <div className="animate-hero-enter">
          <Hero
            totalSubscribers="866K+"
            onExploreClick={() => {
              const el = document.getElementById('catalog-section');
              if (el && lenisRef.current) {
                lenisRef.current.scrollTo(el, { offset: -80, duration: 1.2 });
              } else {
                el?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </div>

        <section id="catalog-section" className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-catalog-enter">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-sky-700 text-xs font-medium uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>Каталог резидентів</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight">
                Віртуальні AI-блогери
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-500 max-w-md font-normal">
              Натисніть на картку будь-якого блогера для перегляду ексклюзивних публікацій або запуску живого AI-діалогу.
            </p>
          </div>

          <div className="mb-4">
            <StoriesBar
              bloggers={BLOGGERS_DATA}
              onOpenStory={(index) => setActiveStoryIndex(index)}
            />
          </div>

          <div className="mb-8 flex flex-col gap-4">
            <div className="w-full max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Пошук за іменем, тегом (#AI, #Travel) або описом..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-sm font-normal"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
                  title="Очистити пошук"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              counts={categoryCounts}
            />
          </div>

          {filteredBloggers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
              {filteredBloggers.map((blogger, index) => (
                <div 
                  key={blogger.id}
                  style={{ animationDelay: `${0.1 + index * 0.08}s` }}
                  className="animate-catalog-enter h-full flex flex-col"
                >
                  <BloggerCard
                    blogger={blogger}
                    onOpenProfile={handleOpenProfile}
                    onOpenChat={handleOpenChat}
                    onTelegramClick={handleTelegramClick}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-white rounded-3xl border border-slate-200/80 max-w-md mx-auto shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-medium text-slate-800">Нічого не знайдено</h3>
              <p className="mt-1 text-xs text-slate-500 font-normal">
                За запитом «{searchQuery}» блогерів не виявлено.
              </p>
              <button
                onClick={handleResetSearch}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-normal hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Скинути пошук
              </button>
            </div>
          )}
        </section>

        <div className="animate-banner-enter">
          <TelegramBanner onJoinTelegram={() => handleTelegramClick()} />
        </div>
      </main>

      <StickyMobileBar
        onJoinTelegram={() => handleTelegramClick()}
        onlineCount={BLOGGERS_DATA.length}
      />

      <Footer onJoinTelegram={() => handleTelegramClick()} />

      <BloggerModal
        blogger={activeBlogger}
        initialTab={modalInitialTab}
        onClose={() => setActiveBlogger(null)}
        onTelegramClick={handleTelegramClick}
      />

      <StoryModal
        bloggers={BLOGGERS_DATA}
        initialIndex={activeStoryIndex ?? 0}
        isOpen={activeStoryIndex !== null}
        onClose={() => setActiveStoryIndex(null)}
        onTelegramClick={handleTelegramClick}
      />
    </div>
  );
}
export default App;
