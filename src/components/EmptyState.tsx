import React from 'react';
import { BookOpen, Sparkles, Heart, Compass, Star } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-8 text-center space-y-6 shadow-2xs">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-teal-400 flex items-center justify-center mx-auto shadow-md">
        <BookOpen className="w-8 h-8" />
      </div>

      <div className="max-w-md mx-auto space-y-2">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          오늘 당신을 기다리는 특별한 책 한 권
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          나이대, 관심사, 독서 목적을 선택하고 추천 버튼을 누르면
          AI 책방지기가 엄선한 <strong className="text-slate-900 font-semibold">맞춤 도서 3권</strong>을 소개해 드립니다.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left max-w-xl mx-auto">
        <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-1">
          <div className="text-teal-700 text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" /> 1. 연령대 맞춤
          </div>
          <p className="text-xs text-slate-600">
            초등학생부터 직장인까지 눈높이에 딱 맞는 도서 난이도
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-1">
          <div className="text-indigo-700 text-xs font-bold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-indigo-600" /> 2. 관심사 저격
          </div>
          <p className="text-xs text-slate-600">
            소설, 과학, 자기계발, 경제 등 취향에 맞는 다양한 테마
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-1">
          <div className="text-slate-900 text-xs font-bold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-teal-600" /> 3. 명확한 이유
          </div>
          <p className="text-xs text-slate-600">
            책 제목, 한 줄 소개, 추천 이유, 난이도까지 한눈에!
          </p>
        </div>
      </div>
    </div>
  );
};
