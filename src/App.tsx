import React, { useState, useEffect } from "react";
import { BookRecommendation, RecommendationRequest, SavedBook } from "./types";
import { Header } from "./components/Header";
import { RecommendationForm } from "./components/RecommendationForm";
import { BookList } from "./components/BookList";
import { ChatAssistant } from "./components/ChatAssistant";
import { SavedBooksModal } from "./components/SavedBooksModal";
import { EmptyState } from "./components/EmptyState";
import {
  BookOpen,
  Sparkles,
  Heart,
  RefreshCw,
  BookmarkCheck,
  ChevronRight,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"form" | "chat">("form");
  const [recommendations, setRecommendations] = useState<BookRecommendation[]>(
    [],
  );
  const [curatorNote, setCuratorNote] = useState<string>("");
  const [currentRequest, setCurrentRequest] =
    useState<RecommendationRequest | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved books from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("today_book_saved");
      if (stored) {
        setSavedBooks(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load saved books from localStorage:", e);
    }
  }, []);

  // Save to localStorage whenever savedBooks changes
  const saveToStorage = (updated: SavedBook[]) => {
    setSavedBooks(updated);
    try {
      localStorage.setItem("today_book_saved", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleSave = (book: BookRecommendation) => {
    const exists = savedBooks.some(
      (b) => b.id === book.id || b.title === book.title,
    );
    if (exists) {
      const updated = savedBooks.filter(
        (b) => b.id !== book.id && b.title !== book.title,
      );
      saveToStorage(updated);
      showToast(`'${book.title}' 보관함에서 삭제되었습니다.`);
    } else {
      const newSaved: SavedBook = {
        ...book,
        savedAt: new Date().toLocaleDateString("ko-KR"),
        ageGroup: currentRequest?.ageGroup || "전체",
        purpose: currentRequest?.purpose || "전체",
      };
      const updated = [newSaved, ...savedBooks];
      saveToStorage(updated);
      showToast(`'${book.title}' 보관함에 저장되었습니다! 📚`);
    }
  };

  const handleRemoveSaved = (id: string) => {
    const updated = savedBooks.filter((b) => b.id !== id);
    saveToStorage(updated);
    showToast("보관함에서 삭제되었습니다.");
  };

  const handleClearAllSaved = () => {
    saveToStorage([]);
    showToast("보관함이 비워졌습니다.");
  };

  const savedBookIds = new Set(savedBooks.map((b) => b.id));

  const handleFetchRecommendations = async (req: RecommendationRequest) => {
    setIsLoading(true);
    setCurrentRequest(req);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });

      const data = await res.json();
      if (data.books && data.books.length > 0) {
        setRecommendations(data.books);
        setCuratorNote(data.curatorNote || "");
        // Scroll smoothly to results
        setTimeout(() => {
          window.scrollTo({ top: 400, behavior: "smooth" });
        }, 100);
      } else {
        showToast("추천 도서를 불러오지 못했습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("Fetch recommendation error:", err);
      showToast("추천 도서를 불러오는 중 문제가 발생하였습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecommendations([]);
    setCurrentRequest(null);
    setCuratorNote("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-200 selection:text-teal-900 flex flex-col">
      {/* Header Bar */}
      <Header
        savedCount={savedBooks.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReset={handleReset}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-8 overflow-x-hidden">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-slate-800 animate-slideUp">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === "form" ? (
          <div className="space-y-8 w-full max-w-full">
            {/* Input Form */}
            <RecommendationForm
              onSubmit={handleFetchRecommendations}
              isLoading={isLoading}
            />

            {/* Recommendations Display or Empty State */}
            {recommendations.length > 0 ? (
              <BookList
                books={recommendations}
                curatorNote={curatorNote}
                request={currentRequest}
                savedBookIds={savedBookIds}
                onToggleSave={handleToggleSave}
                onRefresh={() =>
                  currentRequest && handleFetchRecommendations(currentRequest)
                }
                isLoading={isLoading}
              />
            ) : (
              !isLoading && <EmptyState />
            )}
          </div>
        ) : (
          /* Chat Assistant View */
          <ChatAssistant
            savedBookIds={savedBookIds}
            onToggleSave={handleToggleSave}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <BookOpen className="w-4 h-4 text-teal-600" />
            오늘의 책 추천
          </div>
          <p>
            © {new Date().getFullYear()} 오늘의 책 추천 — 독자를 위한 품격 있는
            AI 도서 큐레이터
          </p>
        </div>
      </footer>

      {/* Saved Books Modal */}
      <SavedBooksModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedBooks={savedBooks}
        onRemove={handleRemoveSaved}
        onClearAll={handleClearAllSaved}
      />
    </div>
  );
}
