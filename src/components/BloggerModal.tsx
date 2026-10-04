import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Blogger, ChatMessage } from '../types/blogger';
import { 
  X, 
  Heart, 
  MessageSquare, 
  Send, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  CornerDownLeft, 
  Bot, 
  Share2, 
  Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface BloggerModalProps {
  blogger: Blogger | null;
  initialTab?: 'feed' | 'chat';
  onClose: () => void;
  onTelegramClick: (blogger: Blogger) => void;
}

export const BloggerModal: React.FC<BloggerModalProps> = ({
  blogger,
  initialTab = 'feed',
  onClose,
  onTelegramClick,
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'chat'>(initialTab);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blogger) {
      setIsClosing(false);
      setActiveTab(initialTab);
      
      const counts: Record<string, number> = {};
      blogger.feedPosts.forEach(post => {
        counts[post.id] = post.likes;
      });
      setLikeCounts(counts);

      setMessages([
        {
          id: 'welcome',
          sender: 'blogger',
          text: blogger.defaultChatWelcome,
          timestamp: 'Щойно'
        }
      ]);
    }
  }, [blogger, initialTab]);

  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && blogger && !isClosing) {
        handleAnimatedClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [blogger, isClosing]);

  if (!blogger) return null;

  const handleAnimatedClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  const handleLikeToggle = (postId: string) => {
    const isLiked = !!likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: !isLiked }));
    setLikeCounts(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (isLiked ? -1 : 1)
    }));

    if (!isLiked) {
      soundManager.playHeart();
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ec4899', '#f43f5e', '#fb7185']
      });
    } else {
      soundManager.playPop();
    }
  };

  const handleSendPrompt = (question: string, predefinedResponse?: string) => {
    if (!question.trim()) return;

    soundManager.playMessage();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: 'Щойно'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = predefinedResponse;
      if (!replyText) {
        if (blogger.category === 'tech') {
          replyText = `Чудове запитання! У сфері AI та нейромереж ми бачимо неймовірний прогрес. Напиши мені в Telegram ${blogger.telegramChannelName}, там я публікую свіжі закриті бенчмарки та промпти!`;
        } else if (blogger.category === 'travel') {
          replyText = `Круто, що цікавишся дикими маршрутами! Я якраз готую звіт про це у своєму Telegram ${blogger.telegramChannelName}. Обов'язково завітай за GPS-треками!`;
        } else if (blogger.category === 'fashion') {
          replyText = `Яке витончене відчуття стилю! Усі закриті лукбуки та бекстейджі з показів я публікую у своєму Telegram ${blogger.telegramChannelName}. Буду рада бачити тебе там!`;
        } else {
          replyText = `Твоє здоров'я та фокус — це основа всього. Детальні longevity-протоколи та схеми нутрицевтиків я виклала в Telegram ${blogger.telegramChannelName}. Долучайся!`;
        }
      }

      soundManager.playMessage();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'blogger',
        text: replyText,
        timestamp: 'Щойно'
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 750);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return createPortal(
    <div 
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className={`fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200 custom-scrollbar ${
        isClosing ? 'opacity-0' : 'animate-modal-backdrop-in'
      }`}
      style={{ overscrollBehavior: 'contain' }}
      onClick={handleAnimatedClose}
    >
      <div className="min-h-full w-full flex flex-col items-center justify-start pt-12 sm:pt-16 pb-28 sm:pb-36 px-3 sm:px-6 pointer-events-none">
        <div 
          className={`relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl pointer-events-auto overflow-hidden ${
            isClosing ? 'animate-modal-box-out' : 'animate-modal-box-in'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-44 sm:h-52 w-full overflow-hidden shrink-0 bg-slate-100">
            <img
              src={blogger.avatar}
              alt={blogger.name}
              className="w-full h-full object-cover object-top blur-sm scale-110 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-white/50 to-white" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-sm border border-slate-200 transition-colors cursor-pointer"
                title="Поділитися профілем"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-600" />}
              </button>

              <button
                onClick={handleAnimatedClose}
                className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-sm border border-slate-200 transition-colors cursor-pointer"
                title="Закрити"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            <div className="absolute bottom-3 left-4 sm:left-6 right-4 sm:right-6 flex items-end gap-3.5 sm:gap-4 z-10">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0 bg-slate-100">
                <img
                  src={blogger.avatar}
                  alt={blogger.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>

              <div className="flex-1 pb-1">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-xl sm:text-2xl font-medium text-slate-900 tracking-tight">{blogger.name}</h2>
                  <CheckCircle2 className="w-5 h-5 text-sky-600 fill-sky-100" />
                </div>
                <p className="text-xs sm:text-sm text-sky-700 font-normal">{blogger.handle}</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-normal">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-pink-500" />{blogger.location}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-normal">{blogger.statusText}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 pt-3 pb-3 border-b border-slate-200/80 bg-white">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">{blogger.fullBio}</p>
            
            <div className="mt-3 flex items-center justify-around py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
              <div>
                <div className="text-sm sm:text-base font-medium text-slate-900">{blogger.subscribers}</div>
                <div className="text-[10px] text-slate-500 font-normal">Аудиторія</div>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div>
                <div className="text-sm sm:text-base font-medium text-sky-700">{blogger.engagement}</div>
                <div className="text-[10px] text-slate-500 font-normal">Залученість</div>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div>
                <div className="text-sm sm:text-base font-medium text-emerald-700">Online</div>
                <div className="text-[10px] text-slate-500 font-normal">Статус AI</div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setActiveTab('feed')}
                className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-normal transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'feed'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Публікації ({blogger.feedPosts.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-normal transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bot className="w-4 h-4 text-sky-600" />
                <span>AI Діалог</span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-slate-50/50">
            {activeTab === 'feed' && (
              <div className="space-y-4">
                {blogger.feedPosts.map((post) => {
                  const isLiked = !!likedPosts[post.id];
                  const count = likeCounts[post.id] || post.likes;

                  return (
                    <div key={post.id} className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                      <div className="relative aspect-square sm:aspect-[4/3] w-full bg-slate-100">
                        <img
                          src={post.image}
                          alt="Post media"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white font-normal">
                          {post.timeAgo}
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleLikeToggle(post.id)}
                              className={`flex items-center gap-1.5 text-xs font-normal transition-all cursor-pointer ${
                                isLiked ? 'text-pink-600 scale-105' : 'text-slate-600 hover:text-slate-900'
                            }`}
                            >
                              <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-600 text-pink-600' : ''}`} />
                              <span>{count.toLocaleString()}</span>
                            </button>

                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-normal">
                              <MessageSquare className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>

                          <span className="text-[11px] text-sky-700 font-normal">AI Верифікований контент</span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          <span className="font-medium text-slate-900 mr-1.5">{blogger.handle}</span>
                          {post.caption}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="flex flex-col space-y-3">
                <div className="text-center my-0.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-200/70 text-[10px] text-slate-600 font-normal">
                    Діалог із нейромережевим аватаром {blogger.name}
                  </span>
                </div>

                <div 
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  className="h-64 sm:h-72 overflow-y-auto custom-scrollbar p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'blogger' && (
                        <img
                          src={blogger.avatar}
                          alt="Avatar"
                          className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-sky-300"
                        />
                      )}

                      <div
                        className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed font-normal ${
                          msg.sender === 'user'
                            ? 'bg-sky-600 text-white rounded-tr-none'
                            : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-2 text-slate-500 text-xs pl-9 font-normal">
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </span>
                      <span>{blogger.name} друкує відповідь...</span>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

                <div className="pt-2">
                  <div className="text-[11px] text-slate-500 font-normal mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span>Швидкі запитання для {blogger.name}:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {blogger.quickPrompts.map((qp) => (
                      <button
                        key={qp.id}
                        onClick={() => handleSendPrompt(qp.question, qp.response)}
                        disabled={isTyping}
                        className="text-left text-[11px] px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all cursor-pointer active:scale-98 disabled:opacity-50 font-normal shadow-sm"
                      >
                        {qp.question}
                      </button>
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendPrompt(inputText);
                  }}
                  className="flex items-center gap-2 pt-1"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Напишіть повідомлення ${blogger.name}...`}
                    disabled={isTyping}
                    className="flex-1 bg-white border border-slate-200 focus:border-sky-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-sm font-normal"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isTyping}
                    className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white font-normal transition-all cursor-pointer shadow-sm"
                  >
                    <CornerDownLeft className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="p-4 sm:p-5 bg-white border-t border-slate-200 shrink-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="hidden sm:block">
                <span className="text-xs text-slate-500 font-normal">Офіційний Telegram-канал:</span>
                <div className="text-sm font-medium text-slate-900 flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-sky-600" />
                  <span>{blogger.telegramChannelName}</span>
                </div>
              </div>

              <button
                onClick={() => onTelegramClick(blogger)}
                className="w-full sm:w-auto flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-normal text-sm shadow-sm transition-all transform active:scale-98 cursor-pointer"
              >
                <Send className="w-4 h-4 fill-white" />
                <span>Перейти в Telegram-канал блогера</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
