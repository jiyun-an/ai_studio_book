import React from 'react';
import { BookRecommendation, RecommendationRequest } from '../types';
import { BookCard } from './BookCard';
import { Sparkles, RefreshCw, BookmarkCheck, Share2, MessageCircleHeart } from 'lucide-react';

interface BookListProps {
  books: BookRecommendation[];
  curatorNote?: string;
  request: RecommendationRequest | null;
  savedBookIds: Set<string>;
  onToggleSave: (book: BookRecommendation) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  curatorNote,
  request,
  savedBookIds,
  onToggleSave,
  onRefresh,
  isLoading
}) => {
  if (!books || books.length === 0) return null;

  return (
    <div className="space-y-8 animate-fadeIn w-full max-w-full">
      
      {/* Curator Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-md text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-white/5 pointer-events-none">
          <MessageCircleHeart className="w-32 h-32" />
        </div>
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold shadow-2xs backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              책방지기의 맞춤 큐레이션
            </div>

            {request && (
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium flex-wrap">
                {request.ageGroup && <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-xs">{request.ageGroup}</span>}
                {request.interest && <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 truncate max-w-[200px] backdrop-blur-xs">{request.interest}</span>}
                {request.purpose && <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-xs">{request.purpose}</span>}
              </div>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
            독자님을 위한 맞춤 도서 3권이 준비되었습니다!
          </h3>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium bg-white/10 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl border border-white/10">
            "{curatorNote || '선택하신 나이대와 관심사, 독서 목적을 다각도로 분석하여 최상의 만족감을 줄 수 있는 도서 3권을 엄선했습니다.'}"
          </p>
        </div>
      </div>

      {/* 3 Recommended Book Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book, idx) => (
          <BookCard
            key={book.id || idx}
            book={book}
            index={idx}
            isSaved={savedBookIds.has(book.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>

      {/* Bottom Re-roll / Back Action */}
      <div className="pt-4 flex items-center justify-center gap-4 flex-wrap">
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className={`py-3.5 px-7 rounded-2xl border text-sm font-bold shadow-xs transition-all flex items-center gap-2.5 ${
            isLoading
              ? 'bg-indigo-50 border-indigo-200 text-indigo-800 cursor-wait'
              : 'bg-white border-slate-200/90 hover:border-teal-400 hover:bg-teal-50/50 text-slate-800 hover:shadow-md active:scale-[0.98]'
          }`}
        >
          <RefreshCw className={`w-4 h-4 text-teal-600 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? '새로운 추천 도서를 찾는 중...' : '다른 책 추천받기'}</span>
        </button>
      </div>

    </div>
  );
};
