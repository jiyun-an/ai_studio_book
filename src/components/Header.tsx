import React from 'react';
import { BookOpen, Bookmark, MessageSquareText, Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  activeTab: 'form' | 'chat';
  setActiveTab: (tab: 'form' | 'chat') => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenSaved,
  activeTab,
  setActiveTab,
  onReset
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs w-full">
      <div className="max-w-4xl mx-auto px-2.5 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-1.5 sm:gap-2">
        
        {/* Logo & App Title */}
        <div 
          onClick={onReset}
          className="flex items-center gap-1.5 sm:gap-3 cursor-pointer group min-w-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1 sm:gap-1.5 truncate">
              <span className="truncate">오늘의 책 추천</span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/70 shrink-0">
                AI 큐레이터
              </span>
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block truncate">나만을 위한 맞춤 도서 큐레이션</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Mode Switcher */}
          <div className="bg-slate-100 p-0.5 sm:p-1 rounded-xl flex items-center gap-0.5 sm:gap-1 border border-slate-200/60">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                activeTab === 'form'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>맞춤 추천</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                activeTab === 'chat'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquareText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>대화 상담</span>
            </button>
          </div>

          {/* Saved Books Drawer Trigger */}
          <button
            onClick={onOpenSaved}
            className="relative p-1.5 sm:p-2 rounded-xl border border-slate-200/90 text-slate-700 hover:bg-slate-50 transition-colors duration-200 flex items-center justify-center shrink-0 bg-white shadow-2xs"
            title="보관함 보기"
          >
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-teal-600 text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white shadow-2xs">
                {savedCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
