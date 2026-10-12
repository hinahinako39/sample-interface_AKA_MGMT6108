import React from 'react';
import { X, Trash2, BookOpen, Clock } from 'lucide-react';
import { Article } from '../types';

interface SavedArticlesModalProps {
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClose: () => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded shadow-2xl border border-neutral-300 p-5 relative max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b nyt-border">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-neutral-800" />
            <h2 className="font-nyt-headline font-bold text-lg text-neutral-900">
              Saved for Later
            </h2>
            <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-bold">
              {savedArticles.length}
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 divide-y divide-neutral-200">
          {savedArticles.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <BookOpen className="w-10 h-10 mx-auto text-neutral-300 mb-2" />
              <p className="font-bold text-sm text-neutral-700">No saved articles yet</p>
              <p className="text-xs text-neutral-500 mt-1">
                Tap the bookmark icon on any story to save it for reading on the go.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div key={article.id} className="py-3 flex items-start justify-between space-x-3 group">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                    {article.section}
                  </span>
                  <h4 className="font-nyt-headline font-bold text-sm text-neutral-900 group-hover:underline leading-snug mt-0.5">
                    {article.headline}
                  </h4>
                  <div className="flex items-center space-x-2 text-[11px] text-neutral-500 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveBookmark(article.id)}
                  className="p-1 text-neutral-400 hover:text-red-600 transition"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
