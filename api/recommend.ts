import { GoogleGenAI, Type } from "@google/genai";

// Lazy-initialized Gemini client generator
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// System prompt to curate top 3 book recommendations in Korean
const SYSTEM_PROMPT = `당신은 대한민국 최고의 전문 독서 큐레이터 "오늘의 책 추천" AI입니다.
사용자의 나이대(연령층), 관심 분야, 독서 목적, 추가 요망사항에 맞춰 정확히 3권의 훌륭한 실제 도서를 추천해주세요.

추천 규칙:
1. 반드시 3권의 책을 추천해야 합니다.
2. 실제 존재하는 저명하고 호평받는 책 위주로 선정하세요.
3. 각 책에 대해 요구된 필드를 충실하게 작성하세요:
   - title: 책 제목
   - author: 저자 이름
   - oneLineSummary: 한 줄 소개 (책의 핵심 매력을 한 문장으로)
   - reason: 추천 이유 (왜 이 연령대와 독서 목적에 딱 맞는지 구체적이고 설득력 있게 설명)
   - idealFor: 이런 사람에게 좋아요 (어떤 고민이나 상황에 있는 독자에게 알맞은지)
   - difficulty: 읽기 난이도 ("쉬움", "보통", "깊이있음" 중 하나)
   - category: 도서 장르/분야
   - tags: 관련 핵심 키워드 2~3개 배열

큐레이터 한마디(curatorNote)도 따뜻하고 다정하게 2~3문장으로 작성해주세요.`;

// Smart fallback generator based on selected criteria
function generateSmartFallback(ageGroup: string, interest: string, purpose: string) {
  const targetAge = ageGroup || '직장인';
  const targetInterest = interest || '자기계발';
  const targetPurpose = purpose || '재미';

  const curatorNote = `${targetAge} 독자님이 찾으시는 '${targetInterest}' 분야와 '${targetPurpose}' 목적에 맞춘 명작 도서 3권을 엄선하였습니다. 책 속에 담긴 지혜와 즐거움을 느껴보세요!`;

  let books = [];

  if (targetAge === '초등학생') {
    books = [
      {
        id: `fb-${Date.now()}-1`,
        title: '만복이네 떡집',
        author: '김리리',
        oneLineSummary: '마음이 스르륵 풀어지는 신비롭고 맛있는 떡집 이야기',
        reason: `${targetAge} 시기에 친구와 마음을 나누고 따뜻한 말의 중요성을 깨닫기에 가장 이상적입니다.`,
        idealFor: '독서의 즐거움과 따뜻한 친구 관계를 배우고 싶은 어린이',
        difficulty: '쉬움',
        category: targetInterest || '동화',
        tags: ['초등추천', '친구관계', '상상력']
      },
      {
        id: `fb-${Date.now()}-2`,
        title: '이상한 과자점 전우치',
        author: '히로시마 레이코',
        oneLineSummary: '신비한 소원이 이루어지는 과자점의 판타지 모험 이야기',
        reason: `${targetPurpose}를 원하는 어린이에게 최고의 몰입감과 상상력을 선물해 줍니다.`,
        idealFor: '재미있는 이야기로 책과 친해지고 싶은 초등학생',
        difficulty: '쉬움',
        category: '판타지',
        tags: ['베스트셀러', '모험', '재미']
      },
      {
        id: `fb-${Date.now()}-3`,
        title: '어린이를 위한 생각하는 과학',
        author: '김성은',
        oneLineSummary: '호기심 가득한 세상의 원리를 재미있게 풀어낸 교양서',
        reason: '어려운 원리도 쉬운 비유로 설명해 스스로 탐구하는 기쁨을 느끼게 합니다.',
        idealFor: '세상에 궁금한 것이 많고 새로운 지식을 배우고 싶은 학생',
        difficulty: '보통',
        category: '과학/교양',
        tags: ['호기심', '탐구력', '지식']
      }
    ];
  } else if (targetAge === '중학생' || targetAge === '고등학생') {
    books = [
      {
        id: `fb-${Date.now()}-1`,
        title: '아몬드',
        author: '손원평',
        oneLineSummary: '감정을 느끼지 못하는 소년의 가슴 뭉클한 성장 스토리',
        reason: `${targetAge} 청소년들에게 타인의 감정에 공감하고 스스로의 마음을 다스리는 깊은 여운을 전합니다.`,
        idealFor: '진정한 공감의 의미를 탐구하고 감동적인 이야기를 경험하고 싶은 청소년',
        difficulty: '보통',
        category: '청소년 소설',
        tags: ['성장소설', '공감', '베스트셀러']
      },
      {
        id: `fb-${Date.now()}-2`,
        title: '왜 세계의 절반은 굶주리는가?',
        author: '장 지글러',
        oneLineSummary: '세계 기아와 불평등의 구조를 쉽고 진솔하게 밝혀내는 명저',
        reason: `${targetPurpose} 및 독후감 소재로 뛰어난 시야 확장의 계기를 마련해 줍니다.`,
        idealFor: '세계와 사회 이슈에 눈뜨고 폭넓은 사고를 키우고 싶은 학생',
        difficulty: '보통',
        category: '인문/사회',
        tags: ['사회탐구', '세계관', '독후감강추']
      },
      {
        id: `fb-${Date.now()}-3`,
        title: '10대를 위한 진로와 미래 지도',
        author: '이동진',
        oneLineSummary: '다양한 직업 세계와 나만의 강점을 찾아가는 가이드',
        reason: '미래의 진로를 고민하는 청소년에게 구체적이고 현실적인 진로 탐색의 길잡이가 됩니다.',
        idealFor: '앞으로의 꿈과 적성을 어떻게 찾아가야 할지 고민되는 학생',
        difficulty: '쉬움',
        category: '진로/자기계발',
        tags: ['진로탐색', '적성', '비전']
      }
    ];
  } else {
    // 대학생 & 직장인
    books = [
      {
        id: `fb-${Date.now()}-1`,
        title: '불편한 편의점',
        author: '김호연',
        oneLineSummary: '청파동 골목 편의점에서 만난 다정한 이웃들의 위로와 힐링',
        reason: `지친 ${targetAge}의 일상에 가슴 따뜻한 다정함과 소소한 일상의 기쁨을 선사합니다.`,
        idealFor: '마음의 휴식이 필요하고 가볍게 읽으며 힐링하고 싶은 독자',
        difficulty: '쉬움',
        category: '소설',
        tags: ['힐링', '위로', '베스트셀러']
      },
      {
        id: `fb-${Date.now()}-2`,
        title: '원씽 (The One Thing)',
        author: '게리 켈러',
        oneLineSummary: '복잡함을 덜어내고 가장 중요한 단 하나에 집중하여 성과를 높이는 지혜',
        reason: `${targetInterest} 및 자기계발 관점에서 인생의 우선순위를 명확히 설정해 줍니다.`,
        idealFor: '선택과 집중으로 더 높은 생산성과 삶의 여유를 얻고 싶은 직장인 및 대학생',
        difficulty: '보통',
        category: '자기계발',
        tags: ['생산성', '우선순위', '성장']
      },
      {
        id: `fb-${Date.now()}-3`,
        title: '사피엔스',
        author: '유발 하라리',
        oneLineSummary: '인류의 거대한 과거와 현재, 미래를 관통하는 압도적 통찰',
        reason: `${targetPurpose} 관점에서 깊이 있는 지적 자극과 거시적인 안목을 키워줍니다.`,
        idealFor: '세상의 거대한 흐름과 인간에 대한 폭넓은 이해를 갈망하는 지적 탐구자',
        difficulty: '깊이있음',
        category: '역사/인문',
        tags: ['인문학', '지식', '스테디셀러']
      }
    ];
  }

  return { curatorNote, books };
}

export default async function handler(req: any, res: any) {
  // CORS 처리 (Vercel Serverless Function)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { ageGroup, interest, purpose, customNote } = req.body || {};

    if (!ageGroup && !interest && !purpose) {
      return res.status(400).json({ 
        error: "나이대, 관심 분야, 독서 목적 중 최소 하나 이상을 선택해주세요." 
      });
    }

    const ai = getGeminiClient();

    if (ai) {
      const userPrompt = `
[사용자 정보]
- 나이대: ${ageGroup || '미지정'}
- 관심 분야: ${interest || '일반 독서'}
- 독서 목적: ${purpose || '흥미/교양'}
${customNote ? `- 추가 요청사항: ${customNote}` : ''}
[요청 ID / 타임스탬프]: ${Date.now()}-${Math.random().toString(36).substring(2, 7)}

위 정보를 바탕으로 독자에게 새로운 영감과 만족을 선사할 신선하고 다양한 책 3권과 큐레이터 한마디를 추천해 주세요. (이전에 자주 추천하던 유명 도서 외에도 신선하고 가치 있는 흥미로운 도서를 자유롭게 골라주세요.)
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              curatorNote: {
                type: Type.STRING,
                description: "독자를 향한 다정한 큐레이터의 메시지"
              },
              books: {
                type: Type.ARRAY,
                description: "추천 도서 3권의 상세 목록",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    author: { type: Type.STRING },
                    oneLineSummary: { type: Type.STRING },
                    reason: { type: Type.STRING },
                    idealFor: { type: Type.STRING },
                    difficulty: { type: Type.STRING },
                    category: { type: Type.STRING },
                    tags: { 
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ["title", "author", "oneLineSummary", "reason", "idealFor", "difficulty", "category", "tags"]
                }
              }
            },
            required: ["curatorNote", "books"]
          }
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        const booksWithIds = (parsed.books || []).map((b: any, idx: number) => ({
          ...b,
          id: `ai-${Date.now()}-${idx}`
        }));
        return res.status(200).json({
          curatorNote: parsed.curatorNote || `${ageGroup || '독자'}님을 위해 엄선한 책 3권입니다. 즐거운 독서 여정이 되시길 바랍니다!`,
          books: booksWithIds
        });
      }
    }

    // Fallback if Gemini key is not set or response failed
    const fallbackResponse = generateSmartFallback(ageGroup, interest, purpose);
    return res.status(200).json(fallbackResponse);

  } catch (err: any) {
    console.error("Gemini Recommendation Error:", err?.message || err);
    // Return friendly smart fallback on error so user gets great recommendations regardless
    const { ageGroup, interest, purpose } = req.body || {};
    const fallbackResponse = generateSmartFallback(ageGroup, interest, purpose);
    return res.status(200).json(fallbackResponse);
  }
}
