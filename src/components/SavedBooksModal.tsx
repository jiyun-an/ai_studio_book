import React from 'react';
import { SavedBook, BookRecommendation } from '../types';
import { X, Trash2, ExternalLink, BookmarkCheck, BookOpen, Quote } from 'lucide-react';

interface SavedBooksModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedBooks: SavedBook[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export const SavedBooksModal: React.FC<SavedBooksModalProps> = ({
  isOpen,
  onClose,
  savedBooks,
  onRemove,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white flex items-center justify-center shadow-2xs">
              <BookmarkCheck className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                내 보관함 ({savedBooks.length})
              </h3>
              <p className="text-xs text-slate-500">저장해둔 추천 도서 목록입니다</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedBooks.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-slate-400 hover:text-rose-600 px-2 py-1 transition-colors"
              >
                전체 삭제
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {savedBooks.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 mx-auto flex items-center justify-center border border-teal-100">
                <BookOpen className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800">보관함이 비어있습니다</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                추천받은 책 카드의 오른쪽 위 북마크 아이콘을 누르면 이곳에 보관할 수 있습니다.
              </p>
            </div>
          ) : (
            savedBooks.map((book) => (
              <div 
                key={book.id} 
                className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/40 hover:bg-white hover:border-teal-300 transition-all space-y-3 relative group shadow-2xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold mb-1">
                      {book.category} • {book.difficulty}
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      {book.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {book.author} 지음
                    </p>
                  </div>

                  <button
                    onClick={() => onRemove(book.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="보관함에서 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-800 bg-teal-50/50 p-2.5 rounded-xl border border-teal-100 italic">
                  "{book.oneLineSummary}"
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>추천 대상: {book.idealFor}</span>
                  <a
                    href={`https://search.shopping.naver.com/book/search?query=${encodeURIComponent(book.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    검색하기 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
