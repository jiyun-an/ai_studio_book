import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, BookRecommendation } from '../types';
import { BookCard } from './BookCard';
import { Send, Bot, User, Sparkles, RefreshCw, BookOpen } from 'lucide-react';

interface ChatAssistantProps {
  savedBookIds: Set<string>;
  onToggleSave: (book: BookRecommendation) => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  savedBookIds,
  onToggleSave
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '안녕하세요! 저는 "오늘의 책 추천" AI 책방지기입니다. 📖\n\n연령대, 관심 있는 이야기, 또는 읽고 싶은 목적(재미, 휴식, 공부 등)을 편하게 말씀해 주시면 딱 맞는 책 3권을 추천해 드릴게요!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Parse quick keywords from chat string or pass query as customNote
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ageGroup: '',
          interest: query,
          purpose: '',
          customNote: query
        })
      });

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.curatorNote || `요청하신 "${query}"에 맞는 도서 3권을 엄선하여 추천해 드립니다!`,
        recommendations: data.books || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: '죄송합니다. 추천을 가져오는 중 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    '고등학생 진로에 도움 되는 책 추천해줘',
    '직장인 퇴근 후 읽기 좋은 가벼운 힐링 소설',
    '초등학생이 읽기 좋은 재미있는 과학 도서',
    '대학생을 위한 자기계발 베스트셀러'
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col h-[700px] max-h-[80vh]">
      
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white flex items-center justify-center shadow-2xs">
            <Bot className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base tracking-tight">
              대화형 AI 책방지기
            </h3>
            <p className="text-xs text-slate-500">자연스럽게 대화하며 맞춤 책을 추천받아보세요</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-slate-50/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex items-start gap-2.5 max-w-[90%] sm:max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${
                msg.sender === 'user' ? 'bg-slate-900' : 'bg-indigo-600 shadow-2xs'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-teal-300" />}
              </div>

              <div className="space-y-3">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-2xs'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[10px] mt-1.5 text-right ${
                    msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>

                {/* Embedded Recommendations if present */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 pt-2">
                    {msg.recommendations.map((book, idx) => (
                      <BookCard
                        key={book.id || idx}
                        book={book}
                        index={idx}
                        isSaved={savedBookIds.has(book.id)}
                        onToggleSave={onToggleSave}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5 text-slate-500 text-xs p-3 bg-white rounded-2xl border border-slate-200 max-w-xs animate-pulse shadow-2xs">
            <Bot className="w-4 h-4 text-teal-600" />
            <span>AI 책방지기가 책장을 넘기며 맞춤 도서를 검색하는 중...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Chips */}
      {messages.length < 3 && (
        <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-slate-400 font-semibold px-2 shrink-0">추천질문:</span>
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-full bg-teal-50 text-teal-900 hover:bg-teal-100 border border-teal-200/80 text-xs font-medium whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 sm:p-4 bg-white border-t border-slate-200/80 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="궁금한 연령대, 장르, 책 읽는 이유를 자유롭게 입력해 보세요..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 text-sm rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white font-bold transition-colors shrink-0 shadow-2xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
