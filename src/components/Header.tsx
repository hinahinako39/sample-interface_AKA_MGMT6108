import React from 'react';
import { Search, Bookmark } from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenAccount: () => void;
  onOpenSubscribe: () => void;
  onOpenSearch: () => void;
  onOpenSaved: () => void;
  savedCount: number;
  isSubscribed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenAccount,
  onOpenSubscribe,
  onOpenSearch,
  onOpenSaved,
  savedCount,
  isSubscribed,
}) => {
  return (
    <header className="sticky top-0 bg-white z-40 border-b nyt-border">
      {/* Top utility bar with menu, NYT Gothic Logo, search, user silhouette */}
      <div className="flex items-center justify-between px-4 py-2.5 max-w-4xl mx-auto">
        {/* Left: Hamburger Menu Icon */}
        <div className="flex items-center space-x-1">
          <button
            aria-label="Open Navigation"
            className="text-neutral-900 hover:opacity-75 focus:outline-none p-1 -ml-1 transition"
            onClick={onOpenMenu}
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" viewBox="0 0 24 24">
              <line x1="3" x2="21" y1="6" y2="6"></line>
              <line x1="3" x2="21" y1="12" y2="12"></line>
              <line x1="3" x2="21" y1="18" y2="18"></line>
            </svg>
          </button>

          <button
            aria-label="Search"
            onClick={onOpenSearch}
            className="p-1 text-neutral-800 hover:text-black hidden sm:inline-flex"
            title="Search articles"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Iconic NYT Gothic Masthead Logo */}
        <a
          aria-label="The New York Times Home"
          className="inline-block transform scale-95 hover:opacity-90 transition cursor-pointer"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <svg className="h-6 sm:h-7 w-auto fill-current text-black" viewBox="0 0 450 60">
            <path d="M439.4,32.4 C439.4,26.5 435.5,23.8 429.6,23.8 C422.3,23.8 416.7,28.6 416.7,34.7 C416.7,40.1 421.1,43.2 426.6,43.2 C427.6,43.2 429.3,43.1 430.7,42.4 L430.7,42.5 C430.5,47.8 426.3,51.8 419.6,51.8 C413.4,51.8 409.8,47.8 409.8,40.7 L409.8,25.1 L414.7,25.1 L414.7,19.9 L409.8,19.9 L409.8,11.5 L403.4,14.6 L403.4,19.9 L398.2,19.9 L398.2,25.1 L403.4,25.1 L403.4,41.4 C403.4,51.1 409.5,57.1 418.5,57.1 C426.3,57.1 432.2,52.4 433.8,44.7 L434.1,44.7 C436.4,48.2 440.1,50.7 444.6,50.7 C447.8,50.7 450,48.9 450,45.8 C450,43.6 448.3,42.3 446.5,41.5 C444.2,40.6 441.7,39.9 441.7,37.3 L441.7,32.4 L439.4,32.4 Z M429.3,37.7 C426.8,37.7 424.4,35.4 424.4,32.4 C424.4,29.3 426.8,27.1 429.3,27.1 C431.8,27.1 434.2,29.3 434.2,32.4 C434.2,35.4 431.8,37.7 429.3,37.7 Z M382.4,40.7 C382.4,32.7 377,23.8 368.1,23.8 C358.8,23.8 352.2,33 352.2,41.4 C352.2,50.8 359.8,57.1 368.5,57.1 C372.4,57.1 376.6,55.4 379.7,52.8 L379.7,46.9 C377.3,49.5 373.9,51.1 370.2,51.1 C365.2,51.1 360.5,47.3 360.3,41.2 L382.4,41.2 L382.4,40.7 Z M360.3,36.5 C360.9,31.7 364.5,28.2 368.6,28.2 C372.9,28.2 376.1,31.4 376.2,36.5 L360.3,36.5 Z M333.6,55.5 L340.5,55.5 L340.5,25.1 L347.1,25.1 L347.1,19.9 L340.5,19.9 L340.5,15.1 C340.5,9.6 343.3,7.4 347.2,7.4 C348.9,7.4 349.8,7.7 350.6,8 L350.9,2.6 C349.5,2.3 347.8,2 345.5,2 C338.9,2 333.6,6.2 333.6,14.6 L333.6,19.9 L329,19.9 L329,25.1 L333.6,25.1 L333.6,55.5 Z M308.2,35.8 L318.5,20.4 L318.5,19.9 L312.3,19.9 L312.3,14.6 L327.9,14.6 L327.9,19.9 L323.5,26.5 L328.7,35.8 L308.2,35.8 Z M285.9,49.8 L292.4,44.9 L292.4,25.1 L283.4,25.1 L283.4,19.9 L301.7,19.9 L301.7,44.9 L308.2,49.8 L308.2,55.5 L285.9,55.5 L285.9,49.8 Z M295.4,15.6 C298.5,15.6 301.1,13 301.1,9.9 C301.1,6.8 298.5,4.2 295.4,4.2 C292.3,4.2 289.7,6.8 289.7,9.9 C289.7,13 292.3,15.6 295.4,15.6 Z M264.4,49.8 L271,44.9 L271,25.1 L262.1,25.1 L262.1,19.9 L279.7,19.9 L279.7,44.9 L286.2,49.8 L286.2,55.5 L264.4,55.5 L264.4,49.8 Z M245.5,56.7 L237.5,41.9 L232.7,47.8 L232.7,49.8 L236.7,53.2 L236.7,55.5 L222.8,55.5 L222.8,49.8 L226.7,46.7 L226.7,28.8 L222.9,25.7 L222.9,19.9 L236.8,19.9 L236.8,25.7 L232.7,28.8 L232.7,41.7 L242.3,29.9 L237.9,25.7 L237.9,19.9 L251.7,19.9 L251.7,25.7 L247.9,28.8 L242.4,35.5 L252.1,51.8 L257.6,51.8 L257.6,56.7 L245.5,56.7 Z M192.1,51.2 L198.8,46.1 L198.8,15.1 L191.7,11.8 L191.7,7.1 L205.8,2 L208.5,2 L208.5,46.1 L215.1,51.2 L215.1,55.5 L192.1,55.5 L192.1,51.2 Z M181.6,49.8 L187.7,44.9 L187.7,19.9 L178.6,19.9 L178.6,14.6 L196.4,14.6 L196.4,44.9 L202.5,49.8 L202.5,55.5 L181.6,55.5 L181.6,49.8 Z M151.7,49.8 L157.9,44.9 L157.9,35.8 L143.4,35.8 L143.4,44.9 L149.6,49.8 L149.6,55.5 L133.5,55.5 L133.5,49.8 L139.7,44.9 L139.7,25.1 L133.5,20.2 L133.5,14.6 L149.6,14.6 L149.6,20.2 L143.4,25.1 L143.4,31.2 L157.9,31.2 L157.9,25.1 L151.7,20.2 L151.7,14.6 L167.7,14.6 L167.7,20.2 L161.6,25.1 L161.6,44.9 L167.7,49.8 L167.7,55.5 L151.7,55.5 L151.7,49.8 Z M116.7,55.8 C107.6,55.8 101.4,49.9 101.4,41.2 C101.4,32.3 108.3,23.8 117.8,23.8 C127,23.8 132.8,30.3 132.8,38.9 C132.8,40.4 132.6,41.8 132.3,42.9 L109.2,42.9 C109.8,48.7 113.8,51.8 119.3,51.8 C123.6,51.8 126.9,50 129.5,47.3 L132.8,50.7 C129.4,54.1 123.7,55.8 116.7,55.8 Z M109.4,38.2 L125.1,38.2 C124.6,33.1 121.7,28.3 117.2,28.3 C113.1,28.3 110,32.7 109.4,38.2 Z M78.1,55.5 L78.1,25.6 L66.8,49.6 L62.5,49.6 L51.2,25.6 L51.2,50.1 L56.7,53.8 L56.7,55.5 L40.2,55.5 L40.2,53.8 L45.7,50.1 L45.7,20.7 L39.5,17.2 L39.5,15.5 L57.5,15.5 L67.3,37.2 L77,15.5 L95,15.5 L95,17.2 L88.8,20.7 L88.8,50.1 L94.3,53.8 L94.3,55.5 L78.1,55.5 Z M20.5,56.2 C9.2,56.2 0.8,47 0.8,35.4 C0.8,23.5 9.7,14.3 21.6,14.3 C26.7,14.3 31.4,16.2 34.6,19.8 L34.6,15.5 L39.5,15.5 L39.5,39.6 L34.3,39.6 C33.4,31.7 28.5,19.8 20.8,19.8 C15.4,19.8 11.2,25.8 11.2,34.9 C11.2,44.7 15.6,50.7 21.7,50.7 C26.7,50.7 30.6,47.4 32.9,43.7 L36.2,46.1 C32.9,52.2 27.4,56.2 20.5,56.2 Z"></path>
          </svg>
        </a>

        {/* Right Actions: Saved Bookmark counter & User Silhouette Icon */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={onOpenSaved}
            aria-label="Saved Articles"
            className="text-neutral-800 hover:text-black p-1 relative transition"
            title="Saved reading list"
          >
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>

          <button
            aria-label="Account Settings"
            onClick={onOpenAccount}
            className="text-neutral-900 hover:opacity-75 p-1 -mr-1 transition"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Date Line & Subscribe Button Subheader */}
      <div className="border-t nyt-border bg-white text-xs">
        <div className="flex items-center justify-between px-4 py-2 max-w-4xl mx-auto">
          <span className="font-bold text-neutral-800 tracking-tight font-nyt-sans">
            Monday, October 12, 2026
          </span>
          <button
            onClick={onOpenSubscribe}
            className="px-3 py-1 font-semibold text-[11px] uppercase tracking-wider text-black border border-black hover:bg-black hover:text-white transition-colors duration-150 rounded-xs"
          >
            {isSubscribed ? 'Subscriber Edition' : 'Subscribe for $1/week'}
          </button>
        </div>
      </div>
    </header>
  );
};
