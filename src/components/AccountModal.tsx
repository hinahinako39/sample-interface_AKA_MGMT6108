import React from 'react';
import { X, User, Shield, Bell, BookOpen, Settings, LogOut, Check } from 'lucide-react';

interface AccountModalProps {
  isSubscribed: boolean;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenSubscribe: () => void;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isSubscribed,
  savedCount,
  onOpenSaved,
  onOpenSubscribe,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded shadow-2xl border border-neutral-300 p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4 pb-4 border-b nyt-border">
          <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-lg">
            H
          </div>
          <div>
            <h3 className="font-bold text-base text-neutral-900">Reader Account</h3>
            <span className="text-xs text-neutral-500">reader@nytimes.digital</span>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          {/* Subscription Status Card */}
          <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-800 uppercase tracking-wide text-[11px]">
                Subscription Status
              </span>
              {isSubscribed ? (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <Check className="w-3 h-3" />
                  <span>All Access Active</span>
                </span>
              ) : (
                <span className="bg-neutral-200 text-neutral-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Standard Reader
                </span>
              )}
            </div>
            {!isSubscribed && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSubscribe();
                }}
                className="mt-2 w-full py-1.5 bg-black text-white font-bold rounded text-xs hover:bg-neutral-800 transition"
              >
                Upgrade to All Access ($1/wk)
              </button>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-1 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenSaved();
              }}
              className="w-full flex items-center justify-between p-2 rounded hover:bg-neutral-100 transition text-neutral-800"
            >
              <div className="flex items-center space-x-2.5">
                <BookOpen className="w-4 h-4 text-neutral-600" />
                <span className="font-medium">Saved Reading List</span>
              </div>
              <span className="font-bold text-neutral-500">{savedCount}</span>
            </button>

            <div className="w-full flex items-center justify-between p-2 rounded hover:bg-neutral-100 transition text-neutral-800 cursor-pointer">
              <div className="flex items-center space-x-2.5">
                <Bell className="w-4 h-4 text-neutral-600" />
                <span className="font-medium">Breaking News Alerts</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold">Enabled</span>
            </div>

            <div className="w-full flex items-center justify-between p-2 rounded hover:bg-neutral-100 transition text-neutral-800 cursor-pointer">
              <div className="flex items-center space-x-2.5">
                <Shield className="w-4 h-4 text-neutral-600" />
                <span className="font-medium">Privacy & Data Choices</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t nyt-border flex items-center justify-between text-neutral-400 text-[11px]">
            <span>App Version 26.10</span>
            <span className="hover:text-black cursor-pointer">Sign out</span>
          </div>
        </div>
      </div>
    </div>
  );
};
