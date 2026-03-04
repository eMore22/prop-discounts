"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Shield, TrendingUp, Copy, ExternalLink, Search, Filter, Trophy, CheckCircle, ArrowRight, ChevronRight } from 'lucide-react';

const FIRMS_DATA = [
  {
    slug: 'ftmo', name: 'FTMO', score: 9.5, rating: 4.8, reviews: 2840,
    discount: '10%', code: 'PROPDISC', maxFunding: '$200K', profitSplit: '90%',
    phases: 2, badge: '🏆 #1 Rated', color: '#00C896',
    description: 'The most trusted prop firm globally. Industry-leading support and reliable payouts.',
    tags: ['Verified', 'High Trust', 'Scaling'],
    link: 'https://ftmo.com',
  },
  {
    slug: 'funded-next', name: 'FundedNext', score: 9.3, rating: 4.7, reviews: 1920,
    discount: '20%', code: 'FNDISC20', maxFunding: '$200K', profitSplit: '90%',
    phases: 2, badge: '🔥 Best Discount', color: '#6C63FF',
    description: 'Best discount in the industry. Stellar 1-phase option for fast funding.',
    tags: ['Best Discount', 'Instant Option', 'Fast Payouts'],
    link: 'https://fundednext.com',
  },
  {
    slug: 'the5ers', name: 'The5%ers', score: 9.1, rating: 4.6, reviews: 1540,
    discount: '15%', code: 'T5DISC', maxFunding: '$100K', profitSplit: '100%',
    phases: 1, badge: '💰 100% Split', color: '#F59E0B',
    description: '100% profit split. No time limit on bootcamp evaluation. Proven track record.',
    tags: ['100% Split', 'No Time Limit', 'Scaling'],
    link: 'https://the5ers.com',
  },
  {
    slug: 'topstep', name: 'Topstep', score: 8.9, rating: 4.5, reviews: 2100,
    discount: '20%', code: 'TOPSTEP20', maxFunding: '$150K', profitSplit: '90%',
    phases: 2, badge: '🇺🇸 Top US Firm', color: '#3B82F6',
    description: 'Best choice for futures trading. Strong US community and weekly payouts.',
    tags: ['Futures', 'Weekly Payouts', 'US-Friendly'],
    link: 'https://topstep.com',
  },
  {
    slug: 'goat-funded', name: 'Goat Funded Trader', score: 8.8, rating: 4.5, reviews: 1200,
    discount: '15%', code: 'GOAT15', maxFunding: '$200K', profitSplit: '85%',
    phases: 2, badge: '⭐ Community Fav', color: '#10B981',
    description: '$10M+ paid to traders. Community favourite with instant funding option.',
    tags: ['Community Fav', 'Instant Option', 'Crypto Payouts'],
    link: 'https://goatfundedtrader.com',
  },
  {
    slug: 'e8-funding', name: 'E8 Funding', score: 8.6, rating: 4.4, reviews: 890,
    discount: '10%', code: 'E8SAVE', maxFunding: '$250K', profitSplit: '80%',
    phases: 2, badge: '📈 $250K Max', color: '#8B5CF6',
    description: 'Highest max funding at $250K. No time limits on evaluation phases.',
    tags: ['No Time Limit', 'High Funding', 'Crypto'],
    link: 'https://e8funding.com',
  },
  {
    slug: 'blueberry-funded', name: 'Blueberry Funded', score: 8.4, rating: 4.3, reviews: 650,
    discount: '20%', code: 'BLUE20', maxFunding: '$100K', profitSplit: '85%',
    phases: 2, badge: '🫐 Rising Star', color: '#7C3AED',
    description: 'Fast-growing firm with competitive pricing and transparent rules.',
    tags: ['Competitive', 'Transparent', 'Rising'],
    link: 'https://blueberryfunded.com',
  },
  {
    slug: 'audacity-capital', name: 'Audacity Capital', score: 8.2, rating: 4.2, reviews: 720,
    discount: '10%', code: 'AUDACITY10', maxFunding: '$100K', profitSplit: '75%',
    phases: 1, badge: '🎯 1-Phase Only', color: '#EF4444',
    description: 'Simple 1-phase model with unlimited re-attempts. Good for beginners.',
    tags: ['1 Phase', 'Beginner-Friendly', 'UK-Based'],
    link: 'https://audacitycapital.co.uk',
  },
];

export default function PropFirmsPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'score' | 'discount' | 'rating'>('score');
  const [toast, setToast] = useState<string | null>(null);

  const copyCode = (code: string, firm: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setToast(`Copied ${code} for ${firm}!`);
      setTimeout(() => setToast(null), 3000);
    });
  };

  const filtered = FIRMS_DATA
    .filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => sort === 'score' ? b.score - a.score : sort === 'discount' ? parseInt(b.discount) - parseInt(a.discount) : b.rating - a.rating);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] text-white py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <Trophy className="w-4 h-4" /> Ranked & Reviewed by Traders
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">All Prop Firms</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every firm ranked by Prop Score — based on payouts, rules, community trust, and verified reviews.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search firms or tags..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none w-full bg-white" />
          </div>
          <div className="flex gap-2">
            <span className="text-sm font-semibold text-gray-500 flex items-center gap-1"><Filter className="w-4 h-4" />Sort:</span>
            {(['score', 'discount', 'rating'] as const).map(s => (
              <button key={s} onClick={() => setSort(s)}
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${sort === s ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                {s === 'score' ? '⭐ Score' : s === 'discount' ? '💰 Discount' : '👥 Rating'}
              </button>
            ))}
          </div>
        </div>

        {/* Firms Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((firm, i) => (
            <div key={firm.slug}
              className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-200 overflow-hidden group">
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${firm.color}, ${firm.color}88)` }} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm flex-shrink-0"
                      style={{ background: firm.color }}>
                      {firm.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-gray-900">{firm.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-bold text-gray-600">{firm.rating} ({firm.reviews.toLocaleString()} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <div className={`text-xs font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap`}>
                      {firm.badge}
                    </div>
                    <div className="bg-blue-600 text-white font-black text-sm w-10 h-10 rounded-xl flex items-center justify-center">
                      {firm.score}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{firm.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {firm.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">{tag}</span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-5 bg-gray-50 rounded-xl p-3">
                  {[
                    { label: 'Max Funding', val: firm.maxFunding },
                    { label: 'Profit Split', val: firm.profitSplit },
                    { label: 'Phases', val: `${firm.phases} Phase${firm.phases > 1 ? 's' : ''}` },
                  ].map(stat => (
                    <div key={stat.label} className="text-center">
                      <p className="text-xs text-gray-400 font-medium mb-0.5">{stat.label}</p>
                      <p className="text-sm font-black text-gray-800">{stat.val}</p>
                    </div>
                  ))}
                </div>

                {/* Discount highlight */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-3 mb-4 border border-blue-100/60">
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 font-medium mb-0.5">Discount Code</p>
                    <code className="text-blue-700 font-black font-mono text-sm tracking-wide">{firm.code}</code>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium mb-0.5">Save</p>
                    <p className="text-2xl font-black text-emerald-600">{firm.discount}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button onClick={() => copyCode(firm.code, firm.name)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm py-2.5 rounded-xl transition-all active:scale-95">
                    <Copy className="w-3.5 h-3.5" /> Copy Code
                  </button>
                  <a href={firm.link} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-2.5 rounded-xl transition-all active:scale-95">
                    <ExternalLink className="w-3.5 h-3.5" /> Visit
                  </a>
                  <Link href={`/prop-firms/${firm.slug}`}
                    className="px-3 py-2.5 rounded-xl font-bold text-sm border-2 border-gray-200 hover:border-blue-300 text-gray-500 hover:text-blue-600 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-semibold">No firms found for "{search}"</p>
            <button onClick={() => setSearch('')} className="mt-2 text-blue-600 text-sm font-bold hover:underline">Clear search</button>
          </div>
        )}

        {/* Compare CTA */}
        <div className="bg-gradient-to-r from-[#060d1f] to-[#0d1f3c] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-black mb-1">Can't Decide?</h3>
            <p className="text-slate-400 text-sm">Use our compare tool to view firms side-by-side with all rules and payouts.</p>
          </div>
          <Link href="/compare" className="bg-blue-500 hover:bg-blue-400 text-white font-black px-7 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap active:scale-95">
            Compare Firms <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span className="font-bold text-sm">{toast}</span>
        </div>
      )}
    </div>
  );
}