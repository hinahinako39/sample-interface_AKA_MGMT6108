import React, { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  MessageSquare,
  Type,
  Check,
  Clock,
  Sparkles
} from 'lucide-react';
import { Article } from '../types';

interface ArticleDetailModalProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onOpenComments: (articleId: string) => void;
  onPlayAudio: (article: Article) => void;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  relatedArticles: Article[];
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
  onOpenComments,
  onPlayAudio,
  onClose,
  onSelectArticle,
  relatedArticles,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.headline,
          text: article.deck,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(`${article.headline} - The New York Times\n${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBodySizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-[19px] leading-[1.65]';
      case 'xlarge':
        return 'text-[22px] leading-[1.7]';
      default:
        return 'text-[17px] leading-[1.6]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto antialiased">
      {/* Sticky Reader Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-xs border-b nyt-border z-20 px-4 py-2.5 flex items-center justify-between max-w-2xl mx-auto">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            aria-label="Back to stories"
            className="p-1 -ml-1 text-neutral-800 hover:text-black flex items-center space-x-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">Back</span>
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-nyt-sans">
            {article.section}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-neutral-700">
          {/* Font Size Selector */}
          <div className="flex items-center bg-neutral-100 rounded-sm p-0.5 text-xs font-semibold">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-1.5 py-0.5 rounded-xs ${fontSize === 'normal' ? 'bg-white shadow-xs font-bold text-black' : 'text-neutral-500'}`}
              title="Default text"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-1.5 py-0.5 rounded-xs ${fontSize === 'large' ? 'bg-white shadow-xs font-bold text-black' : 'text-neutral-500'}`}
              title="Large text"
            >
              A+
            </button>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => onToggleBookmark(article.id)}
            aria-label="Bookmark"
            className={`p-1.5 rounded-full hover:bg-neutral-100 transition ${isBookmarked ? 'text-black fill-current' : 'text-neutral-600'}`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            aria-label="Share story"
            className="p-1.5 rounded-full hover:bg-neutral-100 transition text-neutral-600 relative"
          >
            <Share2 className="w-5 h-5" />
            {copied && (
              <span className="absolute -bottom-7 right-0 bg-neutral-900 text-white text-[11px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                Link copied
              </span>
            )}
          </button>

          {/* Comments button */}
          <button
            onClick={() => onOpenComments(article.id)}
            aria-label="Comments"
            className="flex items-center space-x-1 p-1.5 hover:bg-neutral-100 rounded text-neutral-600"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-bold">{article.commentCount || 24}</span>
          </button>
        </div>
      </div>

      {/* Reader Body Container */}
      <article className="max-w-xl mx-auto px-4 pt-6 pb-20">
        {article.kicker && (
          <div className="text-[12px] font-bold tracking-widest uppercase text-neutral-500 font-nyt-sans mb-2">
            {article.kicker}
          </div>
        )}

        <h1 className="font-nyt-headline font-bold text-3xl sm:text-4xl leading-[1.12] text-neutral-950 mb-3 tracking-tight">
          {article.headline}
        </h1>

        <p className="font-nyt-serif text-lg sm:text-xl leading-relaxed text-[#333333] mb-4">
          {article.deck}
        </p>

        {/* Audio Player Strip */}
        <div className="bg-neutral-50 border nyt-border p-3 rounded-xs mb-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onPlayAudio(article)}
              className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-black text-white flex items-center justify-center transition active:scale-95"
            >
              <Volume2 className="w-4 h-4 ml-0.5" />
            </button>
            <div>
              <div className="text-xs font-bold text-neutral-900">Listen to this article</div>
              <div className="text-[11px] text-neutral-500 flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{article.audioDuration || article.readTime} narrated</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onPlayAudio(article)}
            className="text-xs font-bold text-[#326891] hover:underline"
          >
            Play audio
          </button>
        </div>

        {/* Byline & Date */}
        <div className="border-t border-b nyt-border py-2.5 mb-6 text-xs text-neutral-600 flex flex-wrap items-center justify-between gap-y-1">
          <div>
            <span className="font-bold text-neutral-900 uppercase tracking-wider block sm:inline">
              By {article.author}
            </span>
            <span className="sm:ml-2 text-neutral-500">{article.date}</span>
          </div>
          <span className="font-bold uppercase tracking-wider text-neutral-500 text-[11px]">
            {article.readTime}
          </span>
        </div>

        {/* Featured Image */}
        {article.imageUrl && (
          <figure className="mb-6">
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 border border-neutral-200">
              <img
                src={article.imageUrl}
                alt={article.headline}
                className="w-full h-full object-cover"
              />
              {article.imageLocation && (
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-xs">
                  <span className="font-bold">{article.imageLocation}</span>
                  {article.imageDate && <span className="text-neutral-300 ml-1.5">• {article.imageDate}</span>}
                </div>
              )}
            </div>
            {article.imageCaption && (
              <figcaption className="text-xs text-neutral-600 mt-2 font-nyt-sans leading-normal">
                {article.imageCaption} <span className="text-neutral-400">— The New York Times</span>
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Text Paragraphs */}
        <div className={`font-nyt-serif text-[#1e1e1e] space-y-5 ${getBodySizeClass()}`}>
          {article.bodyParagraphs.map((para, idx) => {
            if (idx === 0) {
              // First paragraph with elegant drop cap styling
              return (
                <p key={idx} className="first-letter:font-nyt-headline first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:leading-none first-letter:text-neutral-950">
                  {para}
                </p>
              );
            }
            if (idx === 2) {
              return (
                <React.Fragment key={idx}>
                  <p>{para}</p>
                  {/* Mid-article pull quote */}
                  <blockquote className="my-6 pl-4 border-l-3 border-neutral-900 italic font-nyt-headline text-lg sm:text-xl text-neutral-800">
                    “{article.deck}”
                  </blockquote>
                </React.Fragment>
              );
            }
            return <p key={idx}>{para}</p>;
          })}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-4 border-t nyt-border">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
              Explore Topics
            </span>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs rounded-full cursor-pointer transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comments CTA */}
        <div className="mt-8 p-4 bg-neutral-50 border nyt-border rounded flex items-center justify-between">
          <div>
            <div className="font-bold text-sm text-neutral-900">Have a thought to share?</div>
            <div className="text-xs text-neutral-600 mt-0.5">
              Join {article.commentCount || 24} verified readers discussing this article.
            </div>
          </div>
          <button
            onClick={() => onOpenComments(article.id)}
            className="px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xs transition"
          >
            View Comments
          </button>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 pt-6 border-t-2 border-black">
            <h3 className="font-nyt-headline font-bold text-lg text-neutral-900 mb-4 uppercase tracking-wide">
              More in {article.section}
            </h3>
            <div className="space-y-4">
              {relatedArticles.slice(0, 3).map(rel => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectArticle(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer pb-3 border-b nyt-border"
                >
                  <h4 className="font-nyt-headline font-bold text-base text-neutral-900 group-hover:underline">
                    {rel.headline}
                  </h4>
                  <p className="font-nyt-serif text-xs text-neutral-600 line-clamp-2 mt-1">
                    {rel.deck}
                  </p>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mt-1">
                    {rel.readTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
