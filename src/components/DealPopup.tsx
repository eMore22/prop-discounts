"use client";

// src/components/DealPopup.tsx
// Add this to your homepage layout: <DealPopup />
// It fetches the active popup from the database and displays it automatically.
// Controlled entirely from your admin dashboard — no code changes needed.

import { useEffect, useState } from 'react';
import { X, Copy, ExternalLink, Zap, Check } from 'lucide-react';

interface Popup {
  id: string;
  title: string;
  message?: string;
  firm: string;
  code: string;
  discount: string;
  link: string;
  delay_seconds: number;
  active: boolean;
}

export default function DealPopup() {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user already dismissed this session
    const dismissedId = sessionStorage.getItem('popup_dismissed');

    fetch('/api/popups')
      .then(res => res.json())
      .then((data: Popup | null) => {
        if (!data) return;
        if (dismissedId === data.id) return; // already dismissed this session
        setPopup(data);
        // Show after the configured delay
        const timer = setTimeout(() => setVisible(true), (data.delay_seconds || 5) * 1000);
        return () => clearTimeout(timer);
      })
      .catch(() => {}); // fail silently
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    if (popup) sessionStorage.setItem('popup_dismissed', popup.id);
    // Fully unmount after animation
    setTimeout(() => setPopup(null), 400);
  };

  const handleCopy = async () => {
    if (!popup) return;
    try {
      await navigator.clipboard.writeText(popup.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = popup.code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!popup) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleDismiss}
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${visible ? 'opacity-40' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Popup */}
      <div className={`fixed bottom-6 right-6 z-50 w-full max-w-sm transition-all duration-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">

          {/* Top bar */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-white font-bold text-sm">{popup.title}</span>
            </div>
            <button
              onClick={handleDismiss}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-black text-blue-700">
                  {popup.firm.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-black text-gray-900 text-base leading-tight">{popup.firm}</p>
                <p className="text-emerald-600 font-bold text-sm">{popup.discount} off your challenge</p>
              </div>
            </div>

            {popup.message && (
              <p className="text-sm text-gray-500 mb-3">{popup.message}</p>
            )}

            {/* Code box */}
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-3 flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">Discount Code</p>
                <p className="font-black text-gray-900 text-lg tracking-wider font-mono">{popup.code}</p>
              </div>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold text-sm transition-all ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-900 text-white hover:bg-gray-700'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* CTA */}
            <a
              href={popup.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDismiss}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Claim Deal <ExternalLink className="w-4 h-4" />
            </a>

            <p className="text-center text-xs text-gray-300 mt-2">
              Verified by PropCoupons
            </p>
          </div>
        </div>
      </div>
    </>
  );
}