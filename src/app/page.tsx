"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Copy, ExternalLink, Clock, CheckCircle, XCircle, AlertCircle, ArrowUpDown } from 'lucide-react';
import { getDeals } from '@/lib/getDeals';
import { PropScoreBadge } from '@/components/PropScoreBadge';
import { VerificationBadge } from '@/components/VerificationBadge';
import { ValueCalculator } from '@/components/ValueCalculator';

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
  pros?: string[];
  cons?: string[];
  rules?: string[];
}

export default function Home() {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [filter, setFilter] = useState<'all' | 'verified' | 'expired'>('all');
  const [sort, setSort] = useState<'discount' | 'expiry' | 'score'>('discount');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeals() {
      try {
        const deals = await getDeals();
        setCodes(deals);
      } catch (error) {
        console.error('Error fetching deals:', error);
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
    if (sort === 'discount') return parseFloat(b.discount) - parseFloat(a.discount);
    if (sort === 'expiry') return new Date(a.expiry).getTime() - new Date(b.expiry).getTime();
    if (sort === 'score') return (b.propScore || 0) - (a.propScore || 0);
    return 0;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setToast('Code copied to clipboard!');
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <>
      <Head>
        <title>Prop Firm Discount Codes December 2025 | Verified Coupons – Prop Coupons</title>
        <meta name="description" content="Save on FTMO, FundedNext, The5ers & more with exclusive prop firm promo codes. Best deals updated daily for 2025 challenges." />
      </Head>

      <div className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#00ff9d]">
            Exclusive Prop Firm Discount Codes December 2025
          </h1>

          <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto text-lg">
            Discover the best verified prop firm promo codes for December 2025. Save up to 20% on FTMO, FundedNext, The5ers and more. Updated daily with exclusive deals you won't find anywhere else.
          </p>

          <ValueCalculator />

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${filter === 'all' ? 'bg-[#00ff9d] text-black' : 'bg-[#1a1a2e] text-white hover:bg-[#333]'}`}
            >
              All Codes
            </button>
            <button
              onClick={() => setFilter('verified')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${filter === 'verified' ? 'bg-[#00ff9d] text-black' : 'bg-[#1a1a2e] text-white hover:bg-[#333]'}`}
            >
              Verified Only
            </button>
            <button
              onClick={() => setFilter('expired')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${filter === 'expired' ? 'bg-[#00ff9d] text-black' : 'bg-[#1a1a2e] text-white hover:bg-[#333]'}`}
            >
              Expired
            </button>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setSort('discount')}
              className="flex items-center gap-2 px-6 py-3 bg-[#1a1a2e] rounded-full hover:bg-[#333] transition-all"
            >
              <ArrowUpDown className="w-5 h-5" />
              Sort by Discount
            </button>
            <button
              onClick={() => setSort('expiry')}
              className="flex items-center gap-2 px-6 py-3 bg-[#1a1a2e] rounded-full hover:bg-[#333] transition-all"
            >
              <Clock className="w-5 h-5" />
              Sort by Expiry
            </button>
            <button
              onClick={() => setSort('score')}
              className="flex items-center gap-2 px-6 py-3 bg-[#1a1a2e] rounded-full hover:bg-[#333] transition-all"
            >
              Sort by Prop Score
            </button>
          </div>

          {/* Additional SEO content */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Use Prop Firm Discount Codes?</h2>
            <p className="text-gray-300 mb-6 max-w-4xl mx-auto text-center">
              Prop firm discount codes can save you hundreds on challenge fees, making it easier to get funded in 2025. We verify every code daily to ensure they work. Popular firms like FTMO and FundedNext offer up to 20% off with our exclusive promos.
            </p>
            <p className="text-gray-300 mb-6 max-w-4xl mx-auto text-center">
              Compare firms based on prop scores, rules, and payouts to find the best fit for your trading style. Join 5,000+ traders saving big every month with Prop Coupons.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Best Prop Firms for Beginners 2025</h2>
            <p className="text-gray-300 mb-6 max-w-4xl mx-auto text-center">
              For new traders, we recommend FundedNext (20% off with PROPFIRMS) or FTMO (10% off with our code). These firms have lenient rules, high prop scores, and fast payouts. Read our reviews to learn about daily drawdown limits, profit targets, and scaling plans.
            </p>
          </section>

          {/* Discount cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCodes.map((dc) => (
              <DiscountCard key={dc.firm} discount={dc} onCopy={copyToClipboard} />
            ))}
          </div>

          {sortedCodes.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No {filter} discount codes found</p>
            </div>
          )}
        </div>

        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}