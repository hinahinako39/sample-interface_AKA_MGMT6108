import React, { useState } from 'react';
import { X, Lock, Shield, FileText, Send, CheckCircle2 } from 'lucide-react';

interface ConfidentialTipModalProps {
  onClose: () => void;
}

export const ConfidentialTipModal: React.FC<ConfidentialTipModalProps> = ({ onClose }) => {
  const [tipCategory, setTipCategory] = useState('Investigations');
  const [tipDetails, setTipDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipDetails.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded shadow-2xl border border-neutral-300 p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-neutral-900 mb-1">
          <Lock className="w-5 h-5 text-neutral-800" />
          <h2 className="font-nyt-headline font-bold text-xl">Confidential News Tips</h2>
        </div>
        <p className="font-nyt-serif text-xs text-neutral-600 mb-4">
          The Times values whistleblowers and sources. We provide encrypted, confidential avenues to submit critical documents and public interest leads.
        </p>

        {submitted ? (
          <div className="bg-neutral-50 border border-neutral-300 p-5 rounded text-center my-4 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-neutral-900 text-sm">Tip Received Securely</h3>
            <p className="text-xs text-neutral-600">
              Your submission has been securely transmitted to our investigative desk via isolated channels. We protect source identities vigorously.
            </p>
            <button
              onClick={onClose}
              className="mt-3 px-4 py-1.5 bg-neutral-900 text-white text-xs font-bold rounded"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Secure Channels List */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="p-2.5 border border-neutral-200 rounded bg-neutral-50">
                <span className="font-bold block text-neutral-900">SecureDrop (Tor)</span>
                <span className="text-[11px] text-neutral-500">Tor Browser onion routing</span>
              </div>
              <div className="p-2.5 border border-neutral-200 rounded bg-neutral-50">
                <span className="font-bold block text-neutral-900">Signal Messenger</span>
                <span className="text-[11px] text-neutral-500">+1 (202) 555-NYT1</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Topic / Desk
                </label>
                <select
                  value={tipCategory}
                  onChange={(e) => setTipCategory(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white"
                >
                  <option>Investigations & Government</option>
                  <option>Corporate Accountability & Finance</option>
                  <option>Technology & Privacy</option>
                  <option>Environment & Climate</option>
                  <option>International Affairs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Tip Details (No metadata saved)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the newsworthy documentation, who is involved, and where corroborating evidence can be located..."
                  value={tipDetails}
                  onChange={(e) => setTipDetails(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs border border-neutral-300 rounded focus:border-black focus:outline-none resize-none"
                />
              </div>

              <div className="border border-dashed border-neutral-300 p-3 rounded text-center text-xs text-neutral-500 hover:border-neutral-500 cursor-pointer bg-neutral-50">
                <FileText className="w-5 h-5 mx-auto text-neutral-400 mb-1" />
                <span>Attach encrypted document or evidence file (optional)</span>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Tip Securely</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
