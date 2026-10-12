import React, { useState } from 'react';
import { X, ThumbsUp, CheckCircle, Send, MessageSquare } from 'lucide-react';
import { CommentItem } from '../types';
import { SAMPLE_COMMENTS } from '../data/articles';

interface CommentsDrawerProps {
  articleId: string;
  articleTitle: string;
  onClose: () => void;
}

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  articleId,
  articleTitle,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'editor' | 'readers'>('all');
  const [comments, setComments] = useState<CommentItem[]>(
    SAMPLE_COMMENTS[articleId] || [
      {
        id: 'default-1',
        author: 'Eleanor Vance',
        location: 'Boston, MA',
        timeAgo: '1h ago',
        content: 'This coverage provides critical context that cable television often skips over. Looking forward to following the developments closely.',
        likes: 38,
        isEditorPick: true,
      },
      {
        id: 'default-2',
        author: 'Julian M.',
        location: 'Seattle, WA',
        timeAgo: '3h ago',
        content: 'Crucial perspective. Thank you for the measured reporting on such an intricate topic.',
        likes: 19,
      },
    ]
  );

  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newText, setNewText] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    if (likedMap[id]) return;
    setLikedMap((prev) => ({ ...prev, [id]: true }));
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newComment: CommentItem = {
      id: `user-${Date.now()}`,
      author: newAuthor.trim() || 'Reader',
      location: newLocation.trim() || 'New York, NY',
      timeAgo: 'Just now',
      content: newText.trim(),
      likes: 1,
    };

    setComments([newComment, ...comments]);
    setNewText('');
  };

  const filteredComments = comments.filter((c) => {
    if (activeTab === 'editor') return c.isEditorPick;
    if (activeTab === 'readers') return c.likes >= 20;
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b nyt-border flex items-center justify-between bg-neutral-50">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm font-nyt-headline uppercase tracking-wide text-neutral-900">
                Comments
              </span>
              <span className="text-xs font-semibold bg-neutral-200 px-2 py-0.5 rounded text-neutral-700">
                {comments.length}
              </span>
            </div>
            <p className="text-xs text-neutral-500 truncate max-w-[280px] mt-0.5">
              {articleTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-600 hover:text-black rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="grid grid-cols-3 border-b border-neutral-200 text-xs font-semibold text-center bg-white">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-2 border-b-2 ${
              activeTab === 'all'
                ? 'border-black text-black font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            All ({comments.length})
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`py-2 border-b-2 flex items-center justify-center space-x-1 ${
              activeTab === 'editor'
                ? 'border-black text-black font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5 text-neutral-800" />
            <span>NYT Picks</span>
          </button>
          <button
            onClick={() => setActiveTab('readers')}
            className={`py-2 border-b-2 ${
              activeTab === 'readers'
                ? 'border-black text-black font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Reader Picks
          </button>
        </div>

        {/* Comments Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredComments.map((c) => (
            <div key={c.id} className="border-b border-neutral-200 pb-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-neutral-900">{c.author}</span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-neutral-500">{c.location}</span>
                </div>
                <span className="text-neutral-400 text-[11px]">{c.timeAgo}</span>
              </div>

              {c.isEditorPick && (
                <div className="inline-flex items-center space-x-1 bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wide">
                  <span>NYT Pick</span>
                </div>
              )}

              <p className="font-nyt-serif text-[14px] text-neutral-800 leading-relaxed">
                {c.content}
              </p>

              <div className="flex items-center justify-end space-x-1 pt-1">
                <button
                  onClick={() => handleLike(c.id)}
                  disabled={likedMap[c.id]}
                  className={`flex items-center space-x-1 text-xs px-2 py-0.5 rounded transition ${
                    likedMap[c.id]
                      ? 'text-neutral-900 font-bold bg-neutral-100'
                      : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${likedMap[c.id] ? 'fill-current' : ''}`} />
                  <span>{c.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Post Comment Form */}
        <div className="border-t nyt-border p-3 bg-neutral-50">
          <form onSubmit={handlePost} className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Your Name"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="City, State / Country"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-black"
              />
            </div>
            <textarea
              rows={2}
              placeholder="What are your thoughts on this story?"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-black resize-none"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-neutral-400">
                Comments are moderated in accordance with our guidelines.
              </span>
              <button
                type="submit"
                disabled={!newText.trim()}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold flex items-center space-x-1 transition ${
                  newText.trim()
                    ? 'bg-neutral-900 text-white hover:bg-black'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                <span>Submit</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
