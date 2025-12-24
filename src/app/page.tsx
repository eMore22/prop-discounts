"use client";

import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink, Clock, CheckCircle, XCircle, AlertCircle, ArrowUpDown } from 'lucide-react';
import { getDeals } from '@/lib/getDeals';
import { PropScoreBadge } from '@/components/PropScoreBadge';
import { VerificationBadge } from '@/components/VerificationBadge';
import { ValueCalculator } from '@/components/ValueCalculator';

export const metadata = {
  title: "Prop Firm Discount Codes December 2025 | Verified Coupons – Prop Coupons",
  description: "Save on FTMO, FundedNext, The5ers & more with exclusive prop firm promo codes. Best deals updated daily for 2025 challenges.",
};

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
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Minimal SEO fixes: H1 and small text */}
      <h1 className="text-4xl font-bold text-center py-8 text-[#00ff9d]">Prop Firm Discount Codes December 2025</h1>
      <p className="text-center text-gray-400 mb-8 px-4">Exclusive verified promo codes for top prop firms – updated daily.</p>

      {/* Your original content below — unchanged */}
      <ValueCalculator />

      {/* Your original filters, sort, grid, cards, toast — keep exactly as before */}
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
  );
}