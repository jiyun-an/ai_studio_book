import React, { useState } from 'react';
import { AGE_GROUPS, INTEREST_PRESETS, READING_PURPOSES } from '../data/constants';
import { AgeGroup, ReadingPurpose, RecommendationRequest } from '../types';
import { Sparkles, HelpCircle, AlertCircle, Plus, Check, Compass, X } from 'lucide-react';

interface RecommendationFormProps {
  onSubmit: (req: RecommendationRequest) => void;
  isLoading: boolean;
}

export const RecommendationForm: React.FC<RecommendationFormProps> = ({
  onSubmit,
  isLoading
}) => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup | ''>('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customInterestInput, setCustomInterestInput] = useState<string>('');
  const [selectedPurpose, setSelectedPurpose] = useState<ReadingPurpose | ''>('');
  const [customNote, setCustomNote] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Toggle interest chip in or out of array
  const handleInterestToggle = (interestLabel: string) => {
    setValidationError(null);
    setSelectedInterests((prev) => {
      if (prev.includes(interestLabel)) {
        return prev.filter((item) => item !== interestLabel);
      } else {
        return [...prev, interestLabel];
      }
    });
  };

  // Add custom tag from input box
  const handleAddCustomInterest = () => {
    const trimmed = customInterestInput.trim();
    if (!trimmed) return;

    if (!selectedInterests.includes(trimmed)) {
      setSelectedInterests((prev) => [...prev, trimmed]);
    }
    setCustomInterestInput('');
    setValidationError(null);
  };

  const handleCustomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomInterest();
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setSelectedInterests((prev) => prev.filter((item) => item !== interestToRemove));
  };

  const handleClearAllInterests = () => {
    setSelectedInterests([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalInterests = [...selectedInterests];
    if (customInterestInput.trim() && !finalInterests.includes(customInterestInput.trim())) {
      finalInterests.push(customInterestInput.trim());
    }

    const interestJoined = finalInterests.join(', ');

    if (!selectedAge && !interestJoined && !selectedPurpose) {
      setValidationError('나이대, 관심 분야, 독서 목적 중 하나 이상을 지정해 주시면 맞춤 책을 찾아드려요! 😊');
      return;
    }

    setValidationError(null);
    onSubmit({
      ageGroup: selectedAge,
      interest: interestJoined,
      purpose: selectedPurpose,
      customNote: customNote.trim() || undefined
    });
  };

  const isFormEmpty = !selectedAge && selectedInterests.length === 0 && !customInterestInput.trim() && !selectedPurpose;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-sm space-y-8">
      
      {/* Intro Header inside Form */}
      <div className="border-b border-slate-100 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-2 border border-teal-200/60">
          <Compass className="w-3.5 h-3.5 text-teal-600" />
          3단계 쉬운 맞춤 도서 탐색
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          어떤 책을 찾고 계신가요?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          간단한 선택으로 지금 나에게 가장 필요한 책 3권을 추천해 드립니다.
        </p>
      </div>

      {/* Step 1: Age Group */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold shrink-0 shadow-2xs">1</span>
            <span>나이대를 선택해 주세요</span>
            <span className="text-xs font-normal text-slate-400 shrink-0">(필수)</span>
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {AGE_GROUPS.map((item) => {
            const isSelected = selectedAge === item.value;
            return (
              <button
                key={item.value}
                type="button"
                title={`${item.label}: ${item.desc}`}
                onClick={() => {
                  setSelectedAge(isSelected ? '' : item.value);
                  setValidationError(null);
                }}
                className={`group relative p-3 sm:p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between h-full active:scale-[0.98] ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-indigo-300 hover:shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-lg sm:text-xl">{item.icon}</span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <div className={`font-bold text-xs sm:text-sm ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                    {item.label}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-normal break-keep leading-tight">
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Interest Area (Modern Redesign) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 border border-slate-200/80 space-y-4 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold shrink-0 shadow-2xs">
              2
            </span>
            <label className="text-sm sm:text-base font-bold text-slate-900">
              관심 분야 선택
            </label>
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full shrink-0 border border-blue-200/70">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              다중 선택 가능
            </span>
          </div>

          {selectedInterests.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllInterests}
              className="text-xs font-medium text-slate-400 hover:text-slate-700 underline self-start sm:self-auto shrink-0 transition-colors"
            >
              전체 해제 ({selectedInterests.length})
            </button>
          )}
        </div>

        {/* Selected Interests Active Tray */}
        {selectedInterests.length > 0 && (
          <div className="p-3 bg-white border border-blue-200/80 rounded-2xl flex flex-wrap items-center gap-2 shadow-2xs">
            <span className="text-xs font-bold text-blue-900 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              선택한 키워드 ({selectedInterests.length}):
            </span>
            {selectedInterests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xs animate-fadeIn"
              >
                <span>{interest}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(interest)}
                  className="hover:bg-slate-700 rounded-full p-0.5 transition-colors text-slate-300 hover:text-white"
                  title="선택 취소"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Preset Chips Grid */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {INTEREST_PRESETS.map((item) => {
            const isSelected = selectedInterests.includes(item.label);
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleInterestToggle(item.label)}
                className={`py-2.5 px-3 rounded-2xl text-xs transition-all duration-200 flex items-center justify-center gap-1.5 border active:scale-95 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/50 hover:text-slate-900 font-medium shadow-2xs'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Interest Input Box */}
        <div className="pt-1">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={customInterestInput}
                onChange={(e) => {
                  setCustomInterestInput(e.target.value);
                  setValidationError(null);
                }}
                onKeyDown={handleCustomInputKeyDown}
                placeholder="관심 분야 직접 입력 (예: SF소설, 인공지능, 심리학 입력 후 추가)"
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-2xs"
              />
            </div>
            <button
              type="button"
              onClick={handleAddCustomInterest}
              disabled={!customInterestInput.trim()}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 active:scale-95 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>추가</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step 3: Reading Purpose */}
      <div className="space-y-3">
        <label className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold shrink-0 shadow-2xs">3</span>
          <span>독서 목적을 선택해 주세요</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {READING_PURPOSES.map((item) => {
            const isSelected = selectedPurpose === item.value;
            return (
              <button
                key={item.value}
                type="button"
                title={`${item.label}: ${item.desc}`}
                onClick={() => {
                  setSelectedPurpose(isSelected ? '' : item.value);
                  setValidationError(null);
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between h-full active:scale-[0.98] ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-indigo-300 hover:shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-lg">{item.icon}</span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <div className={`font-bold text-xs sm:text-sm ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                    {item.label}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-normal break-keep leading-tight">
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Note */}
      <div className="pt-2 border-t border-slate-100">
        <details className="group">
          <summary className="text-xs font-semibold text-slate-500 cursor-pointer hover:text-slate-800 flex items-center gap-1.5">
            <span>+ 특별히 희망하는 조건이 있으신가요? (선택사항)</span>
          </summary>
          <div className="mt-3">
            <textarea
              rows={2}
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="예: 너무 두꺼운 책은 피하고 싶어요, 최근 출간된 책이면 좋겠어요 등"
              className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
            />
          </div>
        </details>
      </div>

      {/* Validation Message */}
      {validationError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-shake">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Recommend Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-base text-white shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            isLoading
              ? 'bg-indigo-400 cursor-wait'
              : isFormEmpty
              ? 'bg-slate-900 hover:bg-slate-800 active:scale-[0.99] shadow-slate-900/10'
              : 'bg-gradient-to-r from-slate-900 via-indigo-950 to-teal-800 hover:opacity-95 active:scale-[0.99] shadow-indigo-900/20'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>AI 책방지기가 맞춤 도서 3권을 찾는 중...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-teal-300" />
              <span>맞춤 도서 3권 추천받기</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
};
