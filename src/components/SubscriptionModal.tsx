import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, Newspaper } from 'lucide-react';

interface SubscriptionModalProps {
  isSubscribed: boolean;
  onSubscribe: () => void;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isSubscribed,
  onSubscribe,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubscribe();
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-md shadow-2xl border border-neutral-300 p-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow">
            <Newspaper className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
            The New York Times
          </span>
          <h2 className="font-nyt-headline font-bold text-2xl text-neutral-900 mt-1">
            All Access Subscription
          </h2>
          <p className="font-nyt-serif text-sm text-neutral-600 mt-1">
            Independent journalism, games, recipes, product reviews, and sports.
          </p>
        </div>

        {isSubscribed ? (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-center my-4">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
            <h3 className="font-bold text-neutral-900 text-sm">You are an All Access Subscriber</h3>
            <p className="text-xs text-neutral-600 mt-1">
              Thank you for supporting independent journalism. Your subscription is active.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-md mb-5">
              <div className="flex items-baseline justify-between border-b border-neutral-200 pb-3 mb-3">
                <div>
                  <span className="text-2xl font-bold font-nyt-headline text-neutral-900">$1</span>
                  <span className="text-xs text-neutral-500 font-semibold"> / week</span>
                </div>
                <span className="text-[11px] bg-neutral-900 text-white font-bold px-2 py-0.5 rounded">
                  SPECIAL INTRODUCTORY OFFER
                </span>
              </div>

              <ul className="space-y-2 text-xs text-neutral-700">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlimited News and Live Analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>The New York Times Games (Wordle, Spelling Bee, Mini)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>NYT Cooking: 20,000+ curated recipes and guides</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Wirecutter independent product testing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>The Athletic: In-depth sports storytelling</span>
                </li>
              </ul>
            </div>

            {success ? (
              <div className="bg-neutral-900 text-white p-3 rounded text-center text-xs font-bold animate-pulse">
                Welcome to The Times! Access granted.
              </div>
            ) : (
              <form onSubmit={handleSubscribeSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-black focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-neutral-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded transition flex items-center justify-center space-x-1.5 shadow"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Start All Access for $1/Week</span>
                </button>
              </form>
            )}

            <p className="text-[11px] text-neutral-400 text-center mt-3">
              Cancel anytime. Billed every 4 weeks. By continuing, you agree to the Terms of Sale.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
