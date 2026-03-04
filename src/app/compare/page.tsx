"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, X, Minus, TrendingUp, Shield, DollarSign, Clock, ChevronDown, Star, ArrowLeft } from 'lucide-react';

// Static comparison data for 10 top prop firms
const FIRMS = [
  {
    slug: 'ftmo', name: 'FTMO', score: 9.5, discount: '10%', code: 'PROPDISC',
    maxFunding: '$200,000', profitSplit: '90%', dailyDrawdown: '5%', maxDrawdown: '10%',
    profitTarget: '10%', minDays: 4, timeLimit: 30, phases: 2,
    instantFunding: false, scaling: true, cryptoPayouts: true, weeklyPayouts: true,
    newsTrading: true, weekendHolding: true, eaAllowed: true,
    color: '#00C896', rating: 4.8, reviews: 2840,
    pros: ['Top payout reliability', 'Industry-leading support', 'Scaling to $2M'],
    cons: ['2-phase evaluation', 'No instant funding'],
  },
  {
    slug: 'funded-next', name: 'FundedNext', score: 9.3, discount: '20%', code: 'FNDISC20',
    maxFunding: '$200,000', profitSplit: '90%', dailyDrawdown: '5%', maxDrawdown: '10%',
    profitTarget: '10%', minDays: 5, timeLimit: 30, phases: 2,
    instantFunding: true, scaling: true, cryptoPayouts: true, weeklyPayouts: true,
    newsTrading: true, weekendHolding: true, eaAllowed: true,
    color: '#6C63FF', rating: 4.7, reviews: 1920,
    pros: ['Best discount (20%)', 'Stellar 1-phase option', 'Profit share from phase 1'],
    cons: ['Newer platform', 'Smaller community'],
  },
  {
    slug: 'the5ers', name: 'The5%ers', score: 9.1, discount: '15%', code: 'T5DISC',
    maxFunding: '$100,000', profitSplit: '100%', dailyDrawdown: '4%', maxDrawdown: '8%',
    profitTarget: '8%', minDays: 0, timeLimit: 0, phases: 1,
    instantFunding: false, scaling: true, cryptoPayouts: false, weeklyPayouts: false,
    newsTrading: false, weekendHolding: true, eaAllowed: true,
    color: '#F59E0B', rating: 4.6, reviews: 1540,
    pros: ['100% profit split', 'No time limit on bootcamp', 'Aggressive scaling'],
    cons: ['No crypto payouts', 'News trading restricted'],
  },
  {
    slug: 'topstep', name: 'Topstep', score: 8.9, discount: '20%', code: 'TOPSTEP20',
    maxFunding: '$150,000', profitSplit: '90%', dailyDrawdown: '4%', maxDrawdown: '8%',
    profitTarget: '8%', minDays: 3, timeLimit: 60, phases: 2,
    instantFunding: false, scaling: false, cryptoPayouts: false, weeklyPayouts: true,
    newsTrading: true, weekendHolding: false, eaAllowed: true,
    color: '#3B82F6', rating: 4.5, reviews: 2100,
    pros: ['Futures trading available', 'Weekly payouts', 'Strong US community'],
    cons: ['No crypto payouts', 'No weekend holding'],
  },
  {
    slug: 'goat-funded', name: 'Goat Funded', score: 8.8, discount: '15%', code: 'GOAT15',
    maxFunding: '$200,000', profitSplit: '85%', dailyDrawdown: '5%', maxDrawdown: '10%',
    profitTarget: '10%', minDays: 4, timeLimit: 30, phases: 2,
    instantFunding: true, scaling: true, cryptoPayouts: true, weeklyPayouts: true,
    newsTrading: true, weekendHolding: true, eaAllowed: true,
    color: '#10B981', rating: 4.5, reviews: 1200,
    pros: ['Instant funding option', 'Community favourite', '$10M+ paid out'],
    cons: ['Lower split than competitors', 'Newer brand'],
  },
  {
    slug: 'e8-funding', name: 'E8 Funding', score: 8.6, discount: '10%', code: 'E8SAVE',
    maxFunding: '$250,000', profitSplit: '80%', dailyDrawdown: '5%', maxDrawdown: '8%',
    profitTarget: '8%', minDays: 0, timeLimit: 0, phases: 2,
    instantFunding: false, scaling: true, cryptoPayouts: true, weeklyPayouts: false,
    newsTrading: true, weekendHolding: true, eaAllowed: true,
    color: '#8B5CF6', rating: 4.4, reviews: 890,
    pros: ['No time limits', '$250K max account', 'Crypto payouts'],
    cons: ['Lower profit split', 'Less known'],
  },
];

const BoolCell: React.FC<{ val: boolean | null }> = ({ val }) => {
  if (val === null) return <Minus className="w-4 h-4 text-gray-300 mx-auto" />;
  return val
    ? <Check className="w-4 h-4 text-emerald-500 mx-auto" />
    : <X className="w-4 h-4 text-red-400 mx-auto" />;
};

const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  const color = score >= 9 ? 'bg-emerald-500' : score >= 8 ? 'bg-blue-500' : 'bg-orange-500';
  return <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-white font-black text-sm ${color}`}>{score}</span>;
};

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>(['ftmo', 'funded-next', 'the5ers']);
  const [showAll, setShowAll] = useState(false);

  const toggle = (slug: string) => {
    setSelected(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : prev.length < 4 ? [...prev, slug] : prev
    );
  };

  const compared = FIRMS.filter(f => selected.includes(f.slug));

  const rows = [
    { label: 'Max Funding', key: 'maxFunding', type: 'text' },
    { label: 'Profit Split', key: 'profitSplit', type: 'text', highlight: true },
    { label: 'Daily Drawdown', key: 'dailyDrawdown', type: 'text' },
    { label: 'Max Drawdown', key: 'maxDrawdown', type: 'text' },
    { label: 'Profit Target', key: 'profitTarget', type: 'text' },
    { label: 'Time Limit (days)', key: 'timeLimit', type: 'num', format: (v: number) => v === 0 ? 'None' : `${v}d` },
    { label: 'Phases', key: 'phases', type: 'num' },
    { label: 'Instant Funding', key: 'instantFunding', type: 'bool' },
    { label: 'Scaling Plan', key: 'scaling', type: 'bool' },
    { label: 'Crypto Payouts', key: 'cryptoPayouts', type: 'bool' },
    { label: 'Weekly Payouts', key: 'weeklyPayouts', type: 'bool' },
    { label: 'News Trading', key: 'newsTrading', type: 'bool' },
    { label: 'Weekend Holding', key: 'weekendHolding', type: 'bool' },
    { label: 'EA/Bot Allowed', key: 'eaAllowed', type: 'bool' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] text-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Deals
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Compare Prop Firms</h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Side-by-side comparison of rules, splits, and payouts. Select up to 4 firms.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">

        {/* Firm Selector */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-black text-gray-900 mb-4 text-lg">Select Firms to Compare</h2>
          <div className="flex flex-wrap gap-3">
            {FIRMS.map(f => (
              <button key={f.slug} onClick={() => toggle(f.slug)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all border-2 ${
                  selected.includes(f.slug)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}>
                <div className="w-2 h-2 rounded-full" style={{ background: f.color }} />
                {f.name}
                {selected.includes(f.slug) && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">{selected.length}/4 selected</p>
        </div>

        {/* Comparison Table */}
        {compared.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="px-5 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider w-40">Feature</th>
                    {compared.map(f => (
                      <th key={f.slug} className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs"
                            style={{ background: f.color }}>{f.name.slice(0, 2).toUpperCase()}</div>
                          <span className="font-black text-gray-900 text-sm">{f.name}</span>
                          <ScoreBadge score={f.score} />
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs font-bold text-gray-600">{f.rating} ({f.reviews.toLocaleString()})</span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Discount row */}
                  <tr className="bg-emerald-50 border-b border-emerald-100">
                    <td className="px-5 py-3 text-xs font-black text-emerald-700 uppercase tracking-wider">💰 Discount</td>
                    {compared.map(f => (
                      <td key={f.slug} className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xl font-black text-emerald-600">{f.discount}</span>
                          <code className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-mono font-black">{f.code}</code>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {rows.map((row, i) => (
                    <tr key={row.key} className={`border-b border-gray-50 ${row.highlight ? 'bg-blue-50/50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="px-5 py-3 text-sm font-semibold text-gray-600 whitespace-nowrap">{row.label}</td>
                      {compared.map(f => {
                        const val = (f as any)[row.key];
                        return (
                          <td key={f.slug} className="px-4 py-3 text-center">
                            {row.type === 'bool'
                              ? <BoolCell val={val} />
                              : row.type === 'num' && row.format
                                ? <span className="text-sm font-bold text-gray-700">{row.format(val)}</span>
                                : <span className={`text-sm font-bold ${row.highlight ? 'text-blue-700 text-base' : 'text-gray-700'}`}>{val}</span>
                            }
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Pros */}
                  <tr className="border-b border-gray-50 bg-white">
                    <td className="px-5 py-4 text-sm font-black text-emerald-600 whitespace-nowrap">✅ Pros</td>
                    {compared.map(f => (
                      <td key={f.slug} className="px-4 py-4">
                        <ul className="space-y-1">
                          {f.pros.map((p, i) => <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5"><span className="text-emerald-500 mt-0.5 flex-shrink-0">•</span>{p}</li>)}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Cons */}
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <td className="px-5 py-4 text-sm font-black text-red-500 whitespace-nowrap">⚠️ Cons</td>
                    {compared.map(f => (
                      <td key={f.slug} className="px-4 py-4">
                        <ul className="space-y-1">
                          {f.cons.map((c, i) => <li key={i} className="text-xs text-gray-500 flex items-start gap-1.5"><span className="text-red-400 mt-0.5 flex-shrink-0">•</span>{c}</li>)}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* CTA row */}
                  <tr className="bg-white">
                    <td className="px-5 py-5 text-sm font-black text-gray-900">Get Deal</td>
                    {compared.map(f => (
                      <td key={f.slug} className="px-4 py-5 text-center">
                        <Link href="/"
                          className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all active:scale-95">
                          {f.discount} off →
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#060d1f] to-[#0d1f3c] rounded-2xl p-8 text-white text-center">
          <TrendingUp className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
          <h3 className="text-2xl font-black mb-2">Ready to Start?</h3>
          <p className="text-slate-400 mb-5">Use a verified discount code and save on your next challenge.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black px-7 py-3 rounded-xl transition-all active:scale-95">
            View All Discount Codes →
          </Link>
        </div>

      </div>
    </div>
  );
}