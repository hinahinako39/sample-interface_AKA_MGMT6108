import React, { useState } from 'react';
import { X, Search, Clock } from 'lucide-react';
import { Article } from '../types';

interface SearchModalProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  articles,
  onSelectArticle,
  onClose,
}) => {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? articles.filter(
        (a) =>
          a.headline.toLowerCase().includes(query.toLowerCase()) ||
          a.deck.toLowerCase().includes(query.toLowerCase()) ||
          a.author.toLowerCase().includes(query.toLowerCase()) ||
          a.section.toLowerCase().includes(query.toLowerCase()) ||
          (a.tags && a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-12 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded shadow-2xl border border-neutral-300 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3 border-b nyt-border flex items-center space-x-2 bg-neutral-50">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search news, authors, topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm focus:outline-none font-nyt-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-black p-1"
            >
              Clear
            </button>
          )}
          <button onClick={onClose} className="p-1 text-neutral-500 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {!query.trim() ? (
            <div className="text-xs text-neutral-500 space-y-3">
              <span className="font-bold uppercase tracking-wider block text-neutral-400">
                Trending Topics
              </span>
              <div className="flex flex-wrap gap-2">
                {['Midterms 2026', 'Middle East', 'Global Economy', 'Boreal Mystery', 'AI Chips', 'French Onion Soup'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-full font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-neutral-500 text-xs">
              No articles found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <div className="divide-y divide-neutral-200">
              {filtered.map((article) => (
                <div
                  key={article.id}
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="py-3 cursor-pointer group"
                >
                  <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    <span>{article.section}</span>
                    <span>•</span>
                    <span>By {article.author}</span>
                  </div>
                  <h4 className="font-nyt-headline font-bold text-sm text-neutral-900 group-hover:underline mt-0.5">
                    {article.headline}
                  </h4>
                  <p className="font-nyt-serif text-xs text-neutral-600 line-clamp-2 mt-1">
                    {article.deck}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
