export type AgeGroup = '초등학생' | '중학생' | '고등학생' | '대학생' | '직장인';

export type ReadingPurpose = 
  | '재미' 
  | '공부' 
  | '진로 탐색' 
  | '위로와 회복' 
  | '발표나 독후감';

export type DifficultyLevel = '쉬움' | '보통' | '깊이있음';

export interface BookRecommendation {
  id: string;
  title: string;
  author: string;
  oneLineSummary: string; // 한 줄 소개
  reason: string;         // 추천 이유
  idealFor: string;       // 이런 사람에게 좋아요
  difficulty: DifficultyLevel | string; // 읽기 난이도
  category: string;       // 분야 (예: 판타지, 과학 등)
  tags: string[];         // 키워드 태그
  pageCountApprox?: string; // 대략 분량 (선택)
}

export interface RecommendationRequest {
  ageGroup: AgeGroup | '';
  interest: string;
  purpose: ReadingPurpose | '';
  customNote?: string;
}

export interface RecommendationResponse {
  books: BookRecommendation[];
  curatorNote: string; // 책방지기 한마디
}

export interface SavedBook extends BookRecommendation {
  savedAt: string;
  ageGroup: string;
  purpose: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendations?: BookRecommendation[];
  isThinking?: boolean;
}
