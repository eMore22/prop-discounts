"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Copy, ExternalLink, Clock, CheckCircle, XCircle, AlertCircle, ArrowUpDown } from 'lucide-react';
import { getDeals } from '@/lib/getDeals';
import { PropScoreBadge } from '@/components/PropScoreBadge';
import { VerificationBadge } from '@/components/VerificationBadge';
import { ValueCalculator } from '@/components/ValueCalculator';

// Your original DiscountCode interface (keep as-is)
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
  // Your original state and functions (keep exactly as you had)
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('discount');
  const [toast, setToast] = useState(null);

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

  // Your original filtering and sorting (keep as-is)

  const filteredCodes = codes.filter(code => {
    if (filter === 'all') return true;
    if (filter === 'verified') return code.verificationStatus === 'verified';
    if (filter === 'expired') return code.verificationStatus === 'expired';
    return true;
  });

  const sortedCodes = filteredCodes.sort((a, b) => {
    if (sort === 'discount') return parseFloat(b.discount) - parseFloat(a.discount);
    if (sort === 'expiry') return new Date(a.expiry).getTime() - new Date(b.expiry).getTime();
    return 0;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setToast('Code copied!');
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <>
      {/* SEO Fix: Unique title & meta */}
      <Head>
        <title>Prop Firm Discount Codes December 2025 | Verified Coupons – Prop Coupons</title>
        <meta name="description" content="Exclusive verified prop firm discount codes for FTMO, FundedNext, The5ers & more. Save on 2025 challenges – updated daily." />
      </Head>

      <div className="min-h-screen bg-[#0a0a0f] text-white">
        {/* SEO Fix: Add one clear H1 */}
        <h1 className="text-4xl font-bold text-center py-8 text-[#00ff9d]">Prop Firm Discount Codes December 2025</h1>

        {/* Minimal extra text for word count (fixes low content issue without changing look) */}
        <p className="text-center text-gray-400 mb-8 px-4">Save on top prop trading firms with verified promo codes. Updated daily for December 2025 challenges.</p>

        {/* Your original content below — keep everything exactly as before */}
        <ValueCalculator />

        {/* Your original filters, sort buttons, grid, cards, toast — no changes */}

        <div className="grid gap-6">
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

        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}