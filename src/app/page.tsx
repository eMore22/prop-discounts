"use client";

import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink, Clock, CheckCircle, XCircle, AlertCircle, ArrowUpDown } from 'lucide-react';
import { getDeals } from '@/lib/getDeals';
import { PropScoreBadge } from '@/components/PropScoreBadge';
import { VerificationBadge } from '@/components/VerificationBadge';
import { ValueCalculator } from '@/components/ValueCalculator';

// REMOVED: export const metadata - cannot use in client components

export interface DiscountCode {
  firm: string;
  code: string;
  discount: string;
  expiry: string;
  slug: string;
  description?: string;
  propScore?: number;
  verificationStatus?: 'verified' | 'expired' | 'pending';
  affiliateLink?: string;
}

export default function Home() {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('discount');
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDeals() {
      try {
        const deals = await getDeals();
        setCodes(deals as any);
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDeals();
  }, []);

  const filteredCodes = codes.filter(code => {
    if (filter === 'all') return true;
    if (filter === 'verified') return code.verificationStatus === 'verified';
    if (filter === 'expired') return code.verificationStatus === 'expired';
    return true;
  });

  const sortedCodes = [...filteredCodes].sort((a, b) => {
    if (sort === 'discount') {
      const aNum = parseFloat(a.discount?.replace('%', '') || '0');
      const bNum = parseFloat(b.discount?.replace('%', '') || '0');
      return bNum - aNum;
    }
    if (sort === 'expiry' && a.expiry && b.expiry) {
      return new Date(a.expiry).getTime() - new Date(b.expiry).getTime();
    }
    return 0;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setToast('Code copied!');
    setTimeout(() => setToast(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00ff9d] mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO-optimized heading */}
        <h1 className="text-4xl font-bold text-center py-8 text-[#00ff9d]">
          Prop Firm Discount Codes December 2025
        </h1>
        <p className="text-center text-gray-400 mb-8 px-4">
          Exclusive verified promo codes for top prop firms – updated daily.
        </p>

        <ValueCalculator />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-between items-center my-8">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-[#00ff9d] text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              All Codes
            </button>
            <button
              onClick={() => setFilter('verified')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'verified'
                  ? 'bg-[#00ff9d] text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Verified Only
            </button>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-[#00ff9d] outline-none"
          >
            <option value="discount">Sort by Discount</option>
            <option value="expiry">Sort by Expiry</option>
          </select>
        </div>

        {/* Deals Grid */}
        <div className="grid gap-6">
          {sortedCodes.map((code) => (
            <div
              key={code.slug}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-[#00ff9d] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{code.firm}</h2>
                  {code.description && (
                    <p className="text-gray-400 text-sm">{code.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {code.propScore && <PropScoreBadge score={code.propScore} />}
                  {code.verificationStatus && (
                    <VerificationBadge status={code.verificationStatus} />
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <div className="bg-[#00ff9d] text-black px-6 py-3 rounded-lg font-bold text-2xl">
                  {code.discount}
                </div>

                <button
                  onClick={() => copyToClipboard(code.code)}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg transition-all"
                >
                  <Copy className="w-4 h-4" />
                  <code className="font-mono">{code.code}</code>
                </button>

                <a
                  href={code.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg transition-all ml-auto"
                >
                  Visit Firm
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {code.expiry && (
                <div className="flex items-center gap-2 text-gray-400 text-sm mt-4">
                  <Clock className="w-4 h-4" />
                  Expires: {code.expiry}
                </div>
              )}
            </div>
          ))}
        </div>

        {sortedCodes.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No discount codes found</p>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 bg-[#00ff9d] text-black px-6 py-3 rounded-lg font-semibold shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}