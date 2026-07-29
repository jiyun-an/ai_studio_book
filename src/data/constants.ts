import { AgeGroup, ReadingPurpose, BookRecommendation } from '../types';

export const AGE_GROUPS: { value: AgeGroup; label: string; desc: string; icon: string }[] = [
  { value: '초등학생', label: '초등학생', desc: '상상력과 상식이 쑥쑥 커가는 시기', icon: '🎒' },
  { value: '중학생', label: '중학생', desc: '새로운 세상을 넓게 바라보는 시기', icon: '✏️' },
  { value: '고등학생', label: '고등학생', desc: '사고력을 넓히고 미래를 준비하는 시기', icon: '📚' },
  { value: '대학생', label: '대학생', desc: '깊이 있는 탐구와 자아를 확립하는 시기', icon: '🎓' },
  { value: '직장인', label: '직장인', desc: '통찰력과 인사이트, 마음의 휴식이 필요한 시기', icon: '💼' },
];

export const INTEREST_PRESETS = [
  { label: '판타지', icon: '🪄' },
  { label: '자기계발', icon: '🚀' },
  { label: '과학', icon: '🔬' },
  { label: '역사', icon: '🏛️' },
  { label: '경제', icon: '📈' },
  { label: '글쓰기', icon: '✍️' },
  { label: '진로', icon: '🧭' },
  { label: '마음 건강', icon: '🌿' },
  { label: '소설', icon: '📖' },
  { label: '인문학', icon: '🧠' },
  { label: '예술', icon: '🎨' },
  { label: '기술/IT', icon: '💻' },
];

export const READING_PURPOSES: { value: ReadingPurpose; label: string; desc: string; icon: string }[] = [
  { value: '재미', label: '재미', desc: '시간 가는 줄 모르는 몰입감을 원해요', icon: '🎉' },
  { value: '공부', label: '공부', desc: '새로운 지식과 폭넓은 정보를 얻고 싶어요', icon: '💡' },
  { value: '진로 탐색', label: '진로 탐색', desc: '꿈과 적성을 발견하고 구체화하고 싶어요', icon: '🌟' },
  { value: '위로와 회복', label: '위로와 회복', desc: '지친 마음을 보듬고 휴식을 느끼고 싶어요', icon: '🧸' },
  { value: '발표나 독후감', label: '발표나 독후감', desc: '생각거리와 좋은 정리 소재가 필요해요', icon: '📝' },
];

// High quality fallback dataset for offline or backup mode
export const FALLBACK_BOOKS: Record<string, BookRecommendation[]> = {
  'default': [
    {
      id: 'fb-1',
      title: '불편한 편의점',
      author: '김호연',
      oneLineSummary: '청파동 골목 편의점에서 일어나는 따뜻하고 유쾌한 힐링 이야기',
      reason: '일상의 작은 공간에서 주고받는 다정한 온기와 인간미가 지친 일상에 깊은 위로를 줍니다.',
      idealFor: '마음이 피곤해서 가볍게 읽으면서도 따뜻한 울림을 느끼고 싶은 분',
      difficulty: '쉬움',
      category: '소설',
      tags: ['베스트셀러', '힐링소설', '따뜻한위로']
    },
    {
      id: 'fb-2',
      title: '아몬드',
      author: '손원평',
      oneLineSummary: '감정을 느끼지 못하는 소년의 특별하고 뭉클한 성장 소설',
      reason: '타인의 감정에 공감한다는 것의 의미를 되새기게 하며 빠른 전개로 큰 몰입감을 줍니다.',
      idealFor: '감정과 공감에 대해 깊이 생각해보고 재미있는 스토리 몰입을 원하시는 분',
      difficulty: '보통',
      category: '소설',
      tags: ['청소년소설', '성장', '공감']
    },
    {
      id: 'fb-3',
      title: '사피엔스',
      author: '유발 하라리',
      oneLineSummary: '변방의 유인원에서 지구의 주인이 되기까지 인류의 대서사시',
      reason: '인류 역사의 거대한 흐름을 통찰력 있게 짚어내며 지적 호기심을 완벽히 충족해 줍니다.',
      idealFor: '세상을 바라보는 거시적인 안목과 지적 교양을 키우고 싶으신 분',
      difficulty: '깊이있음',
      category: '역사/인문',
      tags: ['지식', '인문학', '교양성서']
    }
  ],
  '초등학생': [
    {
      id: 'elem-1',
      title: '만복이네 떡집',
      author: '김리리',
      oneLineSummary: '마음이 스르륵 풀어지는 신비롭고 맛있는 떡집 이야기',
      reason: '친구와 마음을 나누고 착한 말의 힘을 재미있는 떡 소동으로 알려줍니다.',
      idealFor: '독서의 재미를 처음 시작하는 초등학생 어린이',
      difficulty: '쉬움',
      category: '동화/어린이',
      tags: ['초등추천', '상상력', '친구관계']
    },
    {
      id: 'elem-2',
      title: '이상한 과자점 전우치',
      author: '히로시마 레이코',
      oneLineSummary: '행운을 파는 과자점에서 펼쳐지는 흥미진진한 일상 판타지',
      reason: '매회 새로운 과자와 신비한 선택이 등장해 책 읽는 즐거움을 선사합니다.',
      idealFor: '판타지와 모험 이야기를 좋아하는 어린이',
      difficulty: '쉬움',
      category: '판타지동화',
      tags: ['인기시리즈', '모험', '재미']
    },
    {
      id: 'elem-3',
      title: '어린이를 위한 용기 이야기',
      author: '어린이교양연구회',
      oneLineSummary: '어려움을 극복한 위인들의 용기 있는 첫걸음',
      reason: '스스로 도전하고 신념을 지키는 용기의 소중함을 가슴 짚게 일깨워 줍니다.',
      idealFor: '자신감을 키우고 멋진 꿈을 키우고 싶은 어린이',
      difficulty: '보통',
      category: '위인/자기계발',
      tags: ['교양', '용기', '초등교과']
    }
  ],
  '직장인': [
    {
      id: 'work-1',
      title: '원씽 (The One Thing)',
      author: '게리 켈러',
      oneLineSummary: '복잡한 일상에서 단 하나의 목표에 집중하여 최대 성과를 내는 법',
      reason: '과도한 업무와 산만함 속에서 진짜 중요한 우선순위를 가려내는 힘을 키워줍니다.',
      idealFor: '바쁜 일상 속 선택과 집중으로 나만의 성과를 끌어올리고 싶은 직장인',
      difficulty: '보통',
      category: '자기계발',
      tags: ['생산성', '우선순위', '커리어']
    },
    {
      id: 'work-2',
      title: '돈의 속성',
      author: '김승호',
      oneLineSummary: '자산가가 전하는 돈을 다루는 태도와 자산 관리의 철학',
      reason: '단순한 재테크 기술을 넘어 돈과 노동, 경제적 자유에 대한 깊은 가치관을 세워줍니다.',
      idealFor: '경제적 자립과 든든한 미래 설계를 준비하는 분',
      difficulty: '보통',
      category: '경제/경영',
      tags: ['재테크', '금융지식', '인사이트']
    },
    {
      id: 'work-3',
      title: '마흔에 읽는 쇼펜하우어',
      author: '강용수',
      oneLineSummary: '남의 시선에서 벗어나 내 삶의 주인이 되는 철학의 지혜',
      reason: '번아웃과 삶의 허무감이 느껴질 때 나 자신을 지키는 단단한 마음 근육을 선물합니다.',
      idealFor: '타인과의 비교로 지쳐 마음의 진정한 평온을 찾고 싶은 일상의 번아웃 직장인',
      difficulty: '깊이있음',
      category: '인문/철학',
      tags: ['마음건강', '인문학', '휴식']
    }
  ]
};
