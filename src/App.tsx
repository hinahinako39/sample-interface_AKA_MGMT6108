/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bookmark, MessageSquare, ChevronRight, Star, Volume2 } from 'lucide-react';
import { Article, SectionType } from './types';
import { INITIAL_ARTICLES } from './data/articles';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { CommentsDrawer } from './components/CommentsDrawer';
import { SubscriptionModal } from './components/SubscriptionModal';
import { ConfidentialTipModal } from './components/ConfidentialTipModal';
import { SavedArticlesModal } from './components/SavedArticlesModal';
import { GamesModal } from './components/GamesModal';
import { ImageLightbox } from './components/ImageLightbox';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';

export default function App() {
  const [articles] = useState<Article[]>(INITIAL_ARTICLES);
  const [activeSection, setActiveSection] = useState<SectionType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeAudioArticle, setActiveAudioArticle] = useState<Article | null>(null);
  const [commentsArticleId, setCommentsArticleId] = useState<string | null>(null);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isTipOpen, setIsTipOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<'wordle' | 'connections' | 'spelling-bee' | 'mini' | null>(null);

  // User state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeFilterPill, setActiveFilterPill] = useState<string>('All');

  // Lead hero story
  const heroStory = articles.find((a) => a.id === 'hero-saudi-yemen') || articles[0];
  const israeliElection = articles.find((a) => a.id === 'israeli-election') || articles[1];
  const saudiAmbitions = articles.find((a) => a.id === 'saudi-houthi-ambitions') || articles[2];
  const talaricoStory = articles.find((a) => a.id === 'texas-talarico') || articles[3];
  const senateDebateStory = articles.find((a) => a.id === 'sc-senate-debate') || articles[4];
  const greatReadStory = articles.find((a) => a.id === 'great-read-wilderness') || articles[5];
  const krugmanOpinion = articles.find((a) => a.id === 'opinion-krugman') || articles[6];
  const dowdOpinion = articles.find((a) => a.id === 'opinion-dowd') || articles[7];

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const savedArticles = articles.filter((a) => bookmarkedIds.includes(a.id));

  // Section filtered stories when not on Home
  const sectionFilteredArticles = articles.filter((a) => {
    if (activeSection === 'home') return true;
    if (activeSection === 'world') return a.section.toLowerCase().includes('world');
    if (activeSection === 'politics') return a.section.toLowerCase().includes('politics');
    if (activeSection === 'business') return a.section.toLowerCase().includes('business');
    if (activeSection === 'opinion') return a.section.toLowerCase().includes('opinion');
    if (activeSection === 'cooking') return a.section.toLowerCase().includes('cooking');
    return true;
  });

  return (
    <div className="font-nyt-sans bg-white text-[#121212] min-h-screen selection:bg-[#fff0c2] flex flex-col">
      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        activeSection={activeSection}
        onSelectSection={(sec) => {
          if (sec === 'games') {
            setActiveGame('wordle');
          } else {
            setActiveSection(sec);
          }
        }}
        onClose={() => setIsMenuOpen(false)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
      />

      {/* Main Header */}
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={bookmarkedIds.length}
        isSubscribed={isSubscribed}
      />

      {/* Section Filter Banner if not home */}
      {activeSection !== 'home' && (
        <div className="bg-neutral-100 border-b nyt-border py-2 px-4">
          <div className="max-w-md mx-auto sm:max-w-xl md:max-w-2xl flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-neutral-800">
              Section: {activeSection.toUpperCase()}
            </span>
            <button
              onClick={() => setActiveSection('home')}
              className="font-semibold text-[#326891] hover:underline"
            >
              Return to Top Stories ›
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-md mx-auto sm:max-w-xl md:max-w-2xl px-4 pt-3 pb-16 flex-1 w-full">
        {/* Notice Banner */}
        <div className="text-center py-2 border-t border-b nyt-border my-2.5">
          <p className="font-nyt-serif text-[15px] text-neutral-900">
            These top stories are <span className="font-bold">free to read.</span>
          </p>
          <div className="w-12 h-[2px] bg-[#326891] mx-auto mt-1.5" />
        </div>

        {/* If filtering by a specific section (other than home), show dedicated feed */}
        {activeSection !== 'home' ? (
          <div className="py-4 space-y-6">
            <h2 className="font-nyt-headline font-bold text-2xl border-b-2 border-black pb-2 capitalize">
              {activeSection} Coverage
            </h2>
            <div className="space-y-6">
              {sectionFilteredArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="cursor-pointer group pb-5 border-b nyt-border space-y-2"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    {art.kicker || art.section}
                  </span>
                  <h3 className="font-nyt-headline font-bold text-2xl text-neutral-900 group-hover:text-neutral-700 leading-tight">
                    {art.headline}
                  </h3>
                  <p className="font-nyt-serif text-[15px] text-neutral-700 leading-relaxed">
                    {art.deck}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-neutral-500">
                    <span className="font-bold">{art.readTime}</span>
                    <span>•</span>
                    <span>By {art.author}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          /* HOME PAGE FEED - EXACT REPLICA OF REQUESTED SCREENSHOT */
          <>
            {/* BEGIN: HeroLeadStory */}
            <article className="pt-3 pb-6 border-b nyt-border" data-purpose="lead-hero-story">
              {/* Story Headline */}
              <h1
                onClick={() => setSelectedArticle(heroStory)}
                className="font-nyt-headline font-bold text-[31px] leading-[1.12] tracking-tight text-neutral-950 mb-3 hover:text-neutral-700 transition cursor-pointer"
              >
                {heroStory.headline}
              </h1>

              {/* Story Deck / Summary */}
              <p
                onClick={() => setSelectedArticle(heroStory)}
                className="font-nyt-serif text-[17px] leading-[1.38] text-[#333333] mb-2.5 cursor-pointer"
              >
                {heroStory.deck}
              </p>

              {/* Meta Time Read */}
              <div className="flex items-center space-x-2 text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-4">
                <span>{heroStory.readTime}</span>
              </div>

              {/* Featured Visual Card */}
              <div
                className="relative w-full aspect-[4/5] sm:aspect-[16/11] overflow-hidden bg-neutral-900 shadow-xs border border-neutral-200 cursor-pointer group"
                onClick={() => setSelectedArticle(heroStory)}
              >
                {/* Background image */}
                <img
                  alt="Saudi Arabia energy summit event presentation"
                  className="w-full h-full object-cover object-top opacity-85 group-hover:scale-102 transition duration-500"
                  src={heroStory.imageUrl}
                />

                {/* Riyadh overlay tag in top left */}
                <div className="absolute top-3 left-3 text-white drop-shadow-md z-10">
                  <p className="font-bold text-sm tracking-tight leading-none text-white font-nyt-sans">
                    Riyadh, Saudi Arabia
                  </p>
                  <p className="text-xs text-neutral-200 font-medium tracking-tight mt-0.5">
                    Oct. 11
                  </p>
                </div>

                {/* NYT Logo Watermark badge top right */}
                <div className="absolute top-3 right-3 text-white drop-shadow-lg opacity-90 z-10">
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.65 14.85h-2.1v-.88l.61-.48V9.8l-.68.57-.45-.63 2.1-1.74h.52v7.57l.68.56-.68.78z"></path>
                  </svg>
                </div>

                {/* Central placeholder iconography matching screenshot */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="border-2 border-white/60 p-4 rounded-xs">
                    <svg className="w-10 h-10 text-white fill-none stroke-current stroke-1.5" viewBox="0 0 24 24">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                </div>

                {/* Lower Headline Overlay Caption Box */}
                <div className="absolute bottom-4 left-3 right-8 bg-white/95 backdrop-blur-xs p-2.5 border-l-4 border-black shadow-md z-10">
                  <p className="font-nyt-headline font-bold text-sm sm:text-base text-neutral-900 leading-snug line-clamp-2">
                    {heroStory.imageCaption}
                  </p>
                </div>

                {/* Expand Button Icon */}
                <button
                  aria-label="Expand image view"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  className="absolute bottom-3 right-3 text-white bg-black/60 hover:bg-black/90 p-1.5 rounded-xs transition z-20"
                >
                  <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>
              </div>
            </article>
            {/* END: HeroLeadStory */}

            {/* BEGIN: SecondaryWorldStories */}
            <section className="py-5 border-b nyt-border" data-purpose="secondary-stream">
              <div className="mb-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 font-nyt-sans">
                  The World • Analysis
                </span>
              </div>
              <div className="grid grid-cols-1 gap-5">
                {/* Item 1: Audio election item */}
                <article className="space-y-2">
                  <h2
                    onClick={() => setSelectedArticle(israeliElection)}
                    className="font-nyt-headline font-bold text-2xl text-neutral-900 leading-tight hover:underline cursor-pointer"
                  >
                    {israeliElection.headline}
                  </h2>
                  <p
                    onClick={() => setSelectedArticle(israeliElection)}
                    className="font-nyt-serif text-[15px] text-neutral-700 leading-relaxed cursor-pointer"
                  >
                    {israeliElection.deck}
                  </p>

                  {/* Audio player widget bar */}
                  <div className="flex items-center justify-between bg-neutral-50 border nyt-border px-3 py-2 rounded-xs text-xs">
                    <div
                      className="flex items-center space-x-2 cursor-pointer group"
                      onClick={() => setActiveAudioArticle(israeliElection)}
                    >
                      <button
                        className="w-6 h-6 rounded-full bg-neutral-900 group-hover:bg-black text-white flex items-center justify-center focus:outline-none transition active:scale-95"
                        aria-label="Listen to podcast audio"
                      >
                        <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </button>
                      <span className="font-semibold text-neutral-900 group-hover:underline">Listen</span>
                      <span className="text-neutral-500 text-[11px]">31:42</span>
                    </div>

                    <div className="flex items-center space-x-3 text-neutral-500">
                      <button
                        onClick={() => setCommentsArticleId(israeliElection.id)}
                        className="flex items-center space-x-1 hover:text-black transition"
                        title="View comments"
                      >
                        <svg className="w-4 h-4 fill-neutral-600" viewBox="0 0 24 24">
                          <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path>
                        </svg>
                        <span className="text-xs font-semibold text-neutral-700">54</span>
                      </button>

                      <button
                        onClick={() => handleToggleBookmark(israeliElection.id)}
                        className={`hover:text-black transition ${
                          bookmarkedIds.includes(israeliElection.id) ? 'text-black fill-current' : ''
                        }`}
                        title="Save article"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            bookmarkedIds.includes(israeliElection.id) ? 'fill-current' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </article>

                <hr className="nyt-border" />

                {/* Item 2: Geopolitics */}
                <article className="space-y-1.5">
                  <h2
                    onClick={() => setSelectedArticle(saudiAmbitions)}
                    className="font-nyt-headline font-bold text-xl text-neutral-900 leading-snug hover:underline cursor-pointer"
                  >
                    {saudiAmbitions.headline}
                  </h2>
                  <p
                    onClick={() => setSelectedArticle(saudiAmbitions)}
                    className="font-nyt-serif text-[15px] text-neutral-700 leading-normal cursor-pointer"
                  >
                    {saudiAmbitions.deck}
                  </p>
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-neutral-500 tracking-wider">
                    <span>{saudiAmbitions.readTime}</span>
                  </div>
                </article>
              </div>
            </section>
            {/* END: SecondaryWorldStories */}

            {/* BEGIN: FreeReadTrackers */}
            <section className="py-5 border-b nyt-border" data-purpose="curated-pills-section">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-800">
                  U.S. Midterms Coverage
                </h3>
                <span
                  onClick={() => setSelectedArticle(senateDebateStory)}
                  className="text-xs text-[#326891] font-semibold cursor-pointer hover:underline"
                >
                  Live Updates ›
                </span>
              </div>

              {/* Horizontal scrolling pills */}
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide text-xs whitespace-nowrap">
                {[
                  'Tracking the Early Vote',
                  'The Race for Congress',
                  'When to Vote in Your State',
                  'Latest Polls',
                  'Competitive Races',
                ].map((pill) => (
                  <button
                    key={pill}
                    onClick={() => setActiveFilterPill(pill)}
                    className={`px-3 py-1.5 rounded-full border transition font-semibold ${
                      activeFilterPill === pill
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-neutral-300'
                    }`}
                  >
                    {pill}
                  </button>
                ))}
              </div>

              {/* Compact Stories List */}
              <div className="mt-4 space-y-4">
                <article
                  onClick={() => setSelectedArticle(talaricoStory)}
                  className="flex justify-between items-start space-x-3 cursor-pointer group"
                >
                  <div className="space-y-1">
                    <h4 className="font-nyt-headline font-bold text-[17px] leading-tight text-neutral-900 group-hover:underline">
                      {talaricoStory.headline}
                    </h4>
                    <p className="font-nyt-serif text-sm text-neutral-600 line-clamp-2">
                      {talaricoStory.deck}
                    </p>
                  </div>
                </article>

                <article
                  onClick={() => setSelectedArticle(senateDebateStory)}
                  className="flex justify-between items-start space-x-3 pt-3 border-t border-dashed nyt-border cursor-pointer group"
                >
                  <div className="space-y-1">
                    <h4 className="font-nyt-headline font-bold text-[17px] leading-tight text-neutral-900 group-hover:underline">
                      {senateDebateStory.headline}
                    </h4>
                    <p className="font-nyt-serif text-sm text-neutral-600 line-clamp-2">
                      {senateDebateStory.deck}
                    </p>
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block pt-0.5">
                      {senateDebateStory.readTime}
                    </span>
                  </div>
                </article>
              </div>
            </section>
            {/* END: FreeReadTrackers */}

            {/* BEGIN: GreatReadFeature */}
            <section
              className="py-5 border-b nyt-border bg-[#faf9f6] -mx-4 px-4 my-2 cursor-pointer group transition"
              data-purpose="great-read-callout"
              onClick={() => setSelectedArticle(greatReadStory)}
            >
              <div className="flex items-center space-x-2 text-[#b03030] font-bold text-[11px] uppercase tracking-widest mb-1.5">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>The Great Read</span>
              </div>
              <h3 className="font-nyt-headline font-bold text-2xl text-neutral-900 leading-tight mb-2 group-hover:underline">
                {greatReadStory.headline}
              </h3>
              <p className="font-nyt-serif text-[15px] text-neutral-700 leading-relaxed mb-3">
                {greatReadStory.deck}
              </p>
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                12 MIN READ • BY DAN BILEFSKY
              </span>
            </section>
            {/* END: GreatReadFeature */}

            {/* BEGIN: ConfidentialTipBanner */}
            <div
              className="p-3 bg-neutral-100 border border-neutral-300 rounded-sm my-5 text-xs text-neutral-800 flex items-center justify-between"
              data-purpose="tip-box"
            >
              <div>
                <span className="font-bold">Got a confidential news tip?</span>
                <span className="text-neutral-600 block sm:inline sm:ml-1">
                  The Times provides secure ways to send information.
                </span>
              </div>
              <button
                onClick={() => setIsTipOpen(true)}
                className="text-[#326891] font-bold hover:underline whitespace-nowrap ml-3"
              >
                Submit Tip ›
              </button>
            </div>
            {/* END: ConfidentialTipBanner */}

            {/* BEGIN: OpinionSection */}
            <section className="py-4 border-b nyt-border" data-purpose="opinion-columns">
              <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900 border-b-2 border-black pb-1 mb-4 inline-block font-nyt-sans">
                Opinion Columnists
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setSelectedArticle(krugmanOpinion)}
                  className="space-y-1 cursor-pointer group"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Paul Krugman
                  </p>
                  <h4 className="font-nyt-headline font-bold text-base leading-snug group-hover:underline">
                    &ldquo;Why the Global Inflation Wave May Crest Faster Than We Think&rdquo;
                  </h4>
                </div>
                <div
                  onClick={() => setSelectedArticle(dowdOpinion)}
                  className="space-y-1 cursor-pointer group"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Maureen Dowd
                  </p>
                  <h4 className="font-nyt-headline font-bold text-base leading-snug group-hover:underline">
                    &ldquo;The High-Stakes Theater of American Midterms&rdquo;
                  </h4>
                </div>
              </div>
            </section>
            {/* END: OpinionSection */}

            {/* BEGIN: NYTGamesPreview */}
            <section className="py-5" data-purpose="nyt-games">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-xs uppercase tracking-wider text-neutral-900 font-nyt-sans">
                  NYT Games &amp; Puzzles
                </span>
                <button
                  onClick={() => setActiveGame('wordle')}
                  className="text-xs text-[#326891] font-semibold hover:underline"
                >
                  Play All ›
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
                <div
                  onClick={() => setActiveGame('wordle')}
                  className="p-2 border nyt-border rounded hover:border-black cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition active:scale-98"
                >
                  <div className="w-7 h-7 bg-[#6aaa64] text-white font-bold mx-auto flex items-center justify-center rounded-xs mb-1 text-sm shadow-xs">
                    W
                  </div>
                  <span>Wordle</span>
                </div>

                <div
                  onClick={() => setActiveGame('connections')}
                  className="p-2 border nyt-border rounded hover:border-black cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition active:scale-98"
                >
                  <div className="w-7 h-7 bg-[#ba8c63] text-white font-bold mx-auto flex items-center justify-center rounded-xs mb-1 text-sm shadow-xs">
                    C
                  </div>
                  <span>Connections</span>
                </div>

                <div
                  onClick={() => setActiveGame('spelling-bee')}
                  className="p-2 border nyt-border rounded hover:border-black cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition active:scale-98"
                >
                  <div className="w-7 h-7 bg-[#f7da21] text-black font-bold mx-auto flex items-center justify-center rounded-xs mb-1 text-sm shadow-xs">
                    🐝
                  </div>
                  <span>Spelling Bee</span>
                </div>

                <div
                  onClick={() => setActiveGame('mini')}
                  className="p-2 border nyt-border rounded hover:border-black cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition active:scale-98"
                >
                  <div className="w-7 h-7 bg-black text-white font-bold mx-auto flex items-center justify-center rounded-xs mb-1 text-xs shadow-xs">
                    Mini
                  </div>
                  <span>Crossword</span>
                </div>
              </div>
            </section>
            {/* END: NYTGamesPreview */}
          </>
        )}
      </main>

      {/* BEGIN: SiteFooter */}
      <footer className="border-t nyt-border bg-white text-neutral-500 text-xs py-8 px-4 text-center font-nyt-sans mt-auto">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex justify-center space-x-4 text-neutral-700 font-medium flex-wrap gap-y-2">
            <button onClick={() => setActiveSection('home')} className="hover:underline">
              NEWS
            </button>
            <button onClick={() => setActiveSection('opinion')} className="hover:underline">
              OPINION
            </button>
            <button onClick={() => setActiveSection('culture')} className="hover:underline">
              ARTS
            </button>
            <button onClick={() => setActiveSection('cooking')} className="hover:underline">
              LIVING
            </button>
            <button onClick={() => setActiveGame('wordle')} className="hover:underline">
              GAMES
            </button>
          </div>
          <div className="flex justify-center space-x-3 text-[11px] text-neutral-400 flex-wrap">
            <span>© 2026 The New York Times Company</span>
            <span>•</span>
            <a className="hover:underline" href="#">
              Privacy Policy
            </a>
            <span>•</span>
            <a className="hover:underline" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
      {/* END: SiteFooter */}

      {/* MODALS & OVERLAYS */}
      {/* 1. Article Full Reading Screen */}
      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
          onOpenComments={(id) => setCommentsArticleId(id)}
          onPlayAudio={(art) => setActiveAudioArticle(art)}
          onClose={() => setSelectedArticle(null)}
          onSelectArticle={(art) => setSelectedArticle(art)}
          relatedArticles={articles.filter((a) => a.id !== selectedArticle.id)}
        />
      )}

      {/* 2. Persistent Audio Player Bar */}
      {activeAudioArticle && (
        <AudioPlayerBar
          article={activeAudioArticle}
          onClose={() => setActiveAudioArticle(null)}
          onOpenArticle={(art) => setSelectedArticle(art)}
        />
      )}

      {/* 3. Interactive Comments Drawer */}
      {commentsArticleId && (
        <CommentsDrawer
          articleId={commentsArticleId}
          articleTitle={
            articles.find((a) => a.id === commentsArticleId)?.headline || 'Article Comments'
          }
          onClose={() => setCommentsArticleId(null)}
        />
      )}

      {/* 4. Subscription Modal */}
      {isSubscribeOpen && (
        <SubscriptionModal
          isSubscribed={isSubscribed}
          onSubscribe={() => setIsSubscribed(true)}
          onClose={() => setIsSubscribeOpen(false)}
        />
      )}

      {/* 5. Confidential News Tip Modal */}
      {isTipOpen && <ConfidentialTipModal onClose={() => setIsTipOpen(false)} />}

      {/* 6. Saved Articles List Modal */}
      {isSavedOpen && (
        <SavedArticlesModal
          savedArticles={savedArticles}
          onSelectArticle={(art) => setSelectedArticle(art)}
          onRemoveBookmark={handleToggleBookmark}
          onClose={() => setIsSavedOpen(false)}
        />
      )}

      {/* 7. NYT Games Interactive Modal (Wordle, Connections, Bee, Crossword) */}
      {activeGame && (
        <GamesModal initialGame={activeGame} onClose={() => setActiveGame(null)} />
      )}

      {/* 8. Hero Image Lightbox Expander */}
      {isLightboxOpen && (
        <ImageLightbox
          imageUrl={heroStory.imageUrl!}
          headline={heroStory.headline}
          caption={heroStory.imageCaption || ''}
          location={heroStory.imageLocation}
          date={heroStory.imageDate}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}

      {/* 9. Search Modal */}
      {isSearchOpen && (
        <SearchModal
          articles={articles}
          onSelectArticle={(art) => setSelectedArticle(art)}
          onClose={() => setIsSearchOpen(false)}
        />
      )}

      {/* 10. Account / Preferences Modal */}
      {isAccountOpen && (
        <AccountModal
          isSubscribed={isSubscribed}
          savedCount={bookmarkedIds.length}
          onOpenSaved={() => {
            setIsAccountOpen(false);
            setIsSavedOpen(true);
          }}
          onOpenSubscribe={() => {
            setIsAccountOpen(false);
            setIsSubscribeOpen(true);
          }}
          onClose={() => setIsAccountOpen(false)}
        />
      )}
    </div>
  );
}
