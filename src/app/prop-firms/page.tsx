"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Star, Copy, ExternalLink, Search,
  Filter, Trophy, ChevronRight, CheckCircle
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { getDeals } from '@/lib/getDeals';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
    ))}
  </div>
);

export default function PropFirmsPage() {
  const [firms, setFirms] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'score' | 'discount' | 'rating'>('score');
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    Promise.all([
      supabase.from('prop_firms').select('*').order('prop_score', { ascending: false }),
      getDeals(),
    ]).then(([{ data: firmsData }, dealsData]) => {
      if (firmsData) setFirms(firmsData);
      setDeals(dealsData || []);
      setLoading(false);
    });
  }, []);

  const getDeal = (slug: string) =>
    deals.find((d: any) =>
      d.firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === slug ||
      d.slug === slug
    );

  const copyCode = (code: string, firm: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setToast(`Copied ${code} for ${firm}!`);
      setTimeout(() => setToast(null), 3000);
    });
  };

  const filtered = firms
    .filter(f =>
      !search ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      (f.hq ?? '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'score') return (b.prop_score ?? 0) - (a.prop_score ?? 0);
      if (sort === 'rating') return (b.tp_rating ?? 0) - (a.tp_rating ?? 0);
      if (sort === 'discount') {
        const da = getDeal(a.slug);
        const db = getDeal(b.slug);
        return parseInt(db?.discount ?? '0') - parseInt(da?.discount ?? '0');
      }
      return 0;
    });

  const getBadge = (firm: any, index: number) => {
    const deal = getDeal(firm.slug);
    const discount = parseInt(deal?.discount ?? '0');
    if (index === 0) return { label: '🏆 #1 Rated', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    if (discount >= 25) return { label: '🔥 Best Discount', color: 'bg-orange-100 text-orange-700 border-orange-200' };
    if (firm.instant_funding) return { label: '⚡ Instant Funding', color: 'bg-purple-100 text-purple-700 border-purple-200' };
    if (firm.profit_split?.includes('100')) return { label: '💰 100% Split', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    if (firm.scaling_plan) return { label: '📈 Scaling Plan', color: 'bg-blue-100 text-blue-700 border-blue-200' };
    if (firm.weekly_payouts) return { label: '📅 Weekly Payouts', color: 'bg-teal-100 text-teal-700 border-teal-200' };
    return null;
  };

  const getTags = (firm: any) => {
    const tags: string[] = [];
    if (firm.scaling_plan) tags.push('Scaling');
    if (firm.instant_funding) tags.push('Instant Funding');
    if (firm.news_trading) tags.push('News Trading');
    if (firm.weekend_holding) tags.push('Weekend Holding');
    if (firm.weekly_payouts) tags.push('Weekly Payouts');
    if (firm.crypto_payouts) tags.push('Crypto Payouts');
    if (firm.copy_trading) tags.push('Copy Trading');
    if ((firm.time_limit ?? '').toLowerCase().includes('no time')) tags.push('No Time Limit');
    return tags.slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Hero */}
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
            <input type="text" placeholder="Search firms..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none w-full bg-white" />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm font-semibold text-gray-500 flex items-center gap-1">
              <Filter className="w-4 h-4" /> Sort:
            </span>
            {([
              { id: 'score', label: '⭐ Score' },
              { id: 'discount', label: '💰 Discount' },
              { id: 'rating', label: '👥 Rating' },
            ] as const).map(s => (
              <button key={s.id} onClick={() => setSort(s.id)}
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                  sort === s.id ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
                }`}>
                {s.label}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-400 ml-auto">
            {loading ? 'Loading...' : `${filtered.length} firms`}
          </span>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid md:grid-cols-2 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-24" />
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
            ))}
          </div>
        )}

        {/* Firms grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((firm, index) => {
              const deal = getDeal(firm.slug);
              const badge = getBadge(firm, index);
              const tags = getTags(firm);
              const discountCode = deal?.code;
              const discountAmount = deal?.discount;
              const dealLink = deal?.link ?? firm.website;

              return (
                <div key={firm.id}
                  className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">

                  <div className="h-1 w-full" style={{ background: firm.color ?? '#3B82F6' }} />

                  <div className="p-6 flex flex-col flex-1">

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-base shadow-sm flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${firm.color ?? '#3B82F6'}, ${firm.color ?? '#3B82F6'}88)` }}>
                          {firm.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-black text-gray-900 text-base">{firm.name}</h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {firm.tp_rating && <StarRating rating={firm.tp_rating} />}
                            {firm.tp_rating && (
                              <span className="text-xs text-gray-500">
                                {firm.tp_rating} ({(firm.tp_reviews ?? 0).toLocaleString()} reviews)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {badge && (
                          <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${badge.color}`}>
                            {badge.label}
                          </span>
                        )}
                        {firm.prop_score && (
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md bg-gradient-to-br from-indigo-600 to-purple-600">
                            {firm.prop_score}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {firm.description && (
                      <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">{firm.description}</p>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tags.map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 font-semibold px-2.5 py-1 rounded-lg">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { label: 'Max Funding', val: firm.max_funding ?? '—' },
                        { label: 'Profit Split', val: firm.profit_split?.includes('–') ? firm.profit_split.split('–')[1] : (firm.profit_split ?? '—') },
                        { label: 'Phases', val: firm.phases ? `${firm.phases} Phase${firm.phases > 1 ? 's' : ''}` : '—' },
                      ].map(({ label, val }) => (
                        <div key={label} className="bg-gray-50 rounded-xl p-2.5 text-center">
                          <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                          <p className="text-sm font-black text-gray-900 truncate">{val}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex-1" />

                    {/* Discount / CTA */}
                    <div className="border-t border-gray-100 pt-4 mt-2">
                      {discountCode ? (
                        <>
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Discount Code</p>
                              <code className="text-blue-600 font-black font-mono text-sm">{discountCode}</code>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400 mb-0.5">Save</p>
                              <span className="text-2xl font-black text-emerald-500">{discountAmount}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => copyCode(discountCode, firm.name)}
                              className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black py-2.5 rounded-xl text-sm transition-all active:scale-95">
                              <Copy className="w-4 h-4" /> Copy Code
                            </button>
                            <a href={dealLink} target="_blank" rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 rounded-xl text-sm transition-all active:scale-95">
                              <ExternalLink className="w-4 h-4" /> Get Deal
                            </a>
                          </div>
                        </>
                      ) : (
                        <a href={firm.website ?? '#'} target="_blank" rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-black py-2.5 rounded-xl text-sm transition-all">
                          <ExternalLink className="w-4 h-4" /> Visit {firm.name}
                        </a>
                      )}
                      <Link href={`/prop-firms/${firm.slug}`}
                        className="flex items-center justify-center gap-1 text-xs text-gray-400 hover:text-blue-600 font-semibold mt-3 transition-colors">
                        Full Review & Details <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 font-semibold text-lg">No firms match your search.</p>
            <button onClick={() => setSearch('')} className="mt-3 text-blue-600 text-sm font-bold hover:underline">
              Clear search
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && firms.length > 0 && (
          <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-black text-white mb-2">Not sure which firm to choose?</h2>
            <p className="text-slate-400 mb-5">Compare firms side by side — rules, fees, payouts, and more.</p>
            <Link href="/compare"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black px-6 py-3 rounded-xl transition-all">
              Open Compare Tool <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span className="font-bold text-sm">{toast}</span>
        </div>
      )}
    </div>
  );
}