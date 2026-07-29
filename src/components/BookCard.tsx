import React, { useState } from 'react';
import { BookRecommendation } from '../types';
import { Bookmark, BookmarkCheck, Share2, ExternalLink, Check, Quote, Heart, Sparkles, UserCheck, Flame } from 'lucide-react';

interface BookCardProps {
  book: BookRecommendation;
  index: number;
  isSaved: boolean;
  onToggleSave: (book: BookRecommendation) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  index,
  isSaved,
  onToggleSave
}) => {
  const [copied, setCopied] = useState(false);

  // Difficulty badge style mapping with compact label
  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case '쉬움':
        return { label: '🌱 쉬움', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80' };
      case '보통':
        return { label: '📖 보통', bg: 'bg-teal-50 text-teal-800 border-teal-200/80' };
      case '깊이있음':
      case '깊이 있음':
        return { label: '🧠 깊이있음', bg: 'bg-indigo-50 text-indigo-800 border-indigo-200/80' };
      default:
        return { label: `⭐ ${diff}`, bg: 'bg-slate-100 text-slate-800 border-slate-200/80' };
    }
  };

  const diffBadge = getDifficultyBadge(book.difficulty);

  const handleCopySummary = () => {
    const textToCopy = `📖 [오늘의 책 추천] ${book.title} (저자: ${book.author})
💡 한 줄 소개: ${book.oneLineSummary}
🎯 이런 사람에게 좋아요: ${book.idealFor}
✨ 추천 이유: ${book.reason}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openSearch = (title: string) => {
    const query = encodeURIComponent(title);
    window.open(`https://search.shopping.naver.com/book/search?query=${query}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full w-full max-w-full">
      
      {/* Top Banner / Number badge & Actions */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-3.5 sm:px-4 py-3 text-white flex items-center justify-between gap-1.5 min-h-[56px] overflow-hidden">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-teal-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-xs shrink-0">
            {index + 1}
          </span>
          <span className="text-[11px] font-semibold tracking-wider text-slate-300 uppercase truncate font-sans">
            추천 도서 #{index + 1}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Difficulty Tag - Compact and flex-fit to avoid clipping */}
          <span className={`px-2 py-1 rounded-full text-[11px] font-bold border flex items-center justify-center shrink-0 whitespace-nowrap shadow-2xs ${diffBadge.bg}`}>
            {diffBadge.label}
          </span>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleSave(book)}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl transition-all duration-200 flex items-center justify-center text-xs font-medium shrink-0 ${
              isSaved
                ? 'bg-teal-500 text-white shadow-2xs'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
            title={isSaved ? '보관함에서 제거' : '보관함에 저장'}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          
          {/* Title & Author */}
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold mb-1.5">
              {book.category || '도서'}
            </div>
            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-snug break-keep tracking-tight">
              {book.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {book.author} 지음
            </p>
          </div>

          {/* 1. 한 줄 소개 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-teal-50/50 border border-teal-200/60 relative">
            <Quote className="w-4 h-4 text-teal-600 absolute top-3 left-3 opacity-40" />
            <div className="pl-5 text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed">
              "{book.oneLineSummary}"
            </div>
          </div>

          {/* 2. 추천 이유 */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              추천 이유
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-3 sm:p-3.5 rounded-2xl border border-slate-100">
              {book.reason}
            </p>
          </div>

          {/* 3. 이런 사람에게 좋아요 */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-teal-600" />
              이런 사람에게 좋아요
            </h4>
            <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 text-emerald-950 text-xs sm:text-sm leading-relaxed">
              {book.idealFor}
            </div>
          </div>

          {/* Tags */}
          {book.tags && book.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {book.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-0.5 sm:py-1 rounded-lg bg-slate-100/90 text-slate-600 text-[11px] sm:text-xs font-medium border border-slate-200/50">
                  #{tag}
                </span>
              ))}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={handleCopySummary}
            className={`h-10 sm:h-11 flex-1 px-2.5 sm:px-3 rounded-xl border text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 active:scale-[0.98] whitespace-nowrap shrink-0 ${
              copied
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-slate-50 border-slate-200/90 hover:bg-slate-100 text-slate-800'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="whitespace-nowrap">복사완료!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span className="whitespace-nowrap">요약 복사</span>
              </>
            )}
          </button>

          <button
            onClick={() => openSearch(book.title)}
            className="h-10 sm:h-11 flex-1 px-2.5 sm:px-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 shadow-2xs whitespace-nowrap shrink-0"
          >
            <span className="whitespace-nowrap">도서 정보 검색</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/90 shrink-0" />
          </button>
        </div>

      </div>
    </div>
  );
};
