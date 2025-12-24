"use client";

import React, { useState, useEffect } from 'react';
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
    setToast('Code copied to clipboard!');
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <h1 className="text-4xl font-bold text-center py-8 text-[#00ff9d]">Prop Firm Discount Codes December 2025</h1>
      <p className="text-center text-gray-400 mb-8 px-4">Exclusive verified promo codes for top prop firms – updated daily.</p>

      <ValueCalculator />

      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button 
          onClick={() => setFilter('all')} 
          className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-[#00ff9d] text-black' : 'bg-[#1a1a2e] text-white'}`}
        >
          All Codes
        </button>
        <button 
          onClick={() => setFilter('verified')} 
          className={`px-4 py-2 rounded-full ${filter === 'verified' ? 'bg-[#00ff9d] text-black' : 'bg-[#1a1a2e] text-white'}`}
        >
          Verified
        </button>
        <button 
          onClick={() => setFilter('expired')} 
          className={`px-4 py-2 rounded-full ${filter === 'expired' ? 'bg-[#00ff9d] text-black' : 'bg-[#1a1a2e] text-white'}`}
        >
          Expired
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button onClick={() => setSort('discount')} className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] rounded-full">
          <ArrowUpDown className="w-4 h-4" /> Sort by Discount
        </button>
        <button onClick={() => setSort('expiry')} className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] rounded-full">
          <Clock className="w-4 h-4" /> Sort by Expiry
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCodes.map((dc) => (
          <div key={dc.firm} className="bg-[#1a1a2e] rounded-xl p-6 border border-[#333] hover:border-[#00ff9d] transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{dc.firm}</h3>
              {dc.propScore && <PropScoreBadge score={dc.propScore} />}
            </div>
            <p className="text-gray-400 mb-4">{dc.description}</p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#00ff9d]" />
                <span className="font-mono text-[#00ff9d]">{dc.code}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(dc.code)} 
                className="text-gray-400 hover:text-white"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Expires {dc.expiry}</span>
              </div>
              <VerificationBadge status={dc.verificationStatus} />
            </div>
            <a 
              href={dc.affiliateLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#00ff9d] text-black font-bold py-2 px-4 rounded-lg hover:bg-[#00e68a] transition-colors flex items-center justify-center gap-2"
            >
              Get {dc.discount} Off
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
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