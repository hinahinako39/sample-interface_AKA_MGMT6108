import React from 'react';
import { X, ChevronRight, Sparkles } from 'lucide-react';
import { SectionType } from '../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  activeSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  onClose: () => void;
  onOpenSubscribe: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  activeSection,
  onSelectSection,
  onClose,
  onOpenSubscribe,
}) => {
  if (!isOpen) return null;

  const sections: { id: SectionType; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home Page' },
    { id: 'world', label: 'World News' },
    { id: 'politics', label: 'U.S. Politics' },
    { id: 'business', label: 'Business & Tech' },
    { id: 'opinion', label: 'Opinion' },
    { id: 'culture', label: 'Culture & Arts' },
    { id: 'cooking', label: 'NYT Cooking' },
    { id: 'games', label: 'Wordle & Games', badge: 'Play' },
    { id: 'athletic', label: 'The Athletic' },
    { id: 'wirecutter', label: 'Wirecutter' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 transition-opacity duration-300"
      onClick={onClose}
    >
      <nav
        className="w-[82%] max-w-[340px] h-full bg-white text-black p-5 shadow-2xl flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <span className="font-bold uppercase tracking-wider text-xs text-gray-500 font-nyt-sans">
              Sections
            </span>
            <button
              aria-label="Close Menu"
              className="p-1 text-gray-600 hover:text-black rounded"
              onClick={onClose}
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <ul className="py-3 divide-y divide-gray-100 font-nyt-sans text-sm font-medium">
            {sections.map((sec) => {
              const isSelected = activeSection === sec.id;
              return (
                <li
                  key={sec.id}
                  onClick={() => {
                    onSelectSection(sec.id);
                    onClose();
                  }}
                  className={`py-2.5 flex items-center justify-between cursor-pointer transition ${
                    isSelected
                      ? 'text-black font-bold pl-2 border-l-2 border-black bg-neutral-50'
                      : 'hover:text-neutral-600 hover:translate-x-0.5'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{sec.label}</span>
                    {sec.badge && (
                      <span className="text-[10px] bg-neutral-900 text-white font-bold px-1.5 py-0.2 rounded-xs">
                        {sec.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="pt-4 border-t border-gray-200 text-xs text-gray-500 space-y-2">
          <button
            onClick={() => {
              onClose();
              onOpenSubscribe();
            }}
            className="w-full text-left font-semibold text-black hover:underline flex items-center justify-between py-1"
          >
            <span>Subscribe for $1/week</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </button>
          <p>© 2026 The New York Times Company</p>
        </div>
      </nav>
    </div>
  );
};
