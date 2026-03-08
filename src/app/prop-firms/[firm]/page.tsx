"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Star, Shield, Copy, ExternalLink, CheckCircle, XCircle, Clock,
  TrendingUp, Users, DollarSign, ArrowLeft, ChevronRight, ThumbsUp,
  ThumbsDown, Minus, Award, Zap, AlertCircle, BarChart2, Check, X
} from 'lucide-react';
import { getDeals } from '@/lib/getDeals';
import { PropScoreBadge } from '@/components/PropScoreBadge';
import { VerificationBadge } from '@/components/VerificationBadge';

// ── Static firm data (augment with Supabase deal data at runtime) ─────────────
const FIRM_DATA: Record<string, any> = {
  ftmo: {
    name: 'FTMO', color: '#00C896', founded: 2015, hq: 'Prague, Czech Republic',
    website: 'https://ftmo.com', score: 9.5, rating: 4.8, totalReviews: 2840,
    maxFunding: '$200,000', profitSplit: '90%', dailyDrawdown: '5%', maxDrawdown: '10%',
    profitTarget: '10% (Phase 1) / 5% (Phase 2)', minTradingDays: 4, timeLimit: '30 days per phase',
    phases: 2, payoutFrequency: 'Monthly (bi-weekly after 3 payouts)', scalingPlan: true,
    instantFunding: false, cryptoPayouts: true, weeklyPayouts: false,
    newsTrading: true, weekendHolding: true, eaAllowed: true, copyTrading: true,
    description: `FTMO is the world's most trusted prop trading firm, founded in Prague in 2015. With over $100M paid out to traders and a proven track record, FTMO sets the gold standard for evaluation-based prop trading. Their two-phase evaluation tests traders under real market conditions before granting access to funded accounts up to $200,000.`,
    longDescription: `What makes FTMO stand out is their trader-first approach. The FTMO Account comes with a 90% profit split, industry-leading customer support available 24/5, and a scaling plan that can take your account up to $2,000,000. FTMO also provides free trading tools including a performance coach, equity simulator, and trade analyser.`,
    pros: [
      'Most trusted brand in prop trading',
      '90% profit split from day one',
      'Scaling plan up to $2,000,000',
      'Excellent 24/5 customer support',
      'Free trading tools included',
      'Crypto payouts available',
    ],
    cons: [
      '2-phase evaluation required',
      'No instant funding option',
      'Monthly payouts (not weekly)',
      'Strict daily loss limit of 5%',
    ],
    payoutReliability: 96,
    tradersVoted: 2840,
    plans: [
      { name: 'FTMO Challenge $10K', price: '$155', refundable: true, target: '10%/$1,000' },
      { name: 'FTMO Challenge $25K', price: '$250', refundable: true, target: '10%/$2,500' },
      { name: 'FTMO Challenge $50K', price: '$345', refundable: true, target: '10%/$5,000' },
      { name: 'FTMO Challenge $100K', price: '$540', refundable: true, target: '10%/$10,000' },
      { name: 'FTMO Challenge $200K', price: '$1,080', refundable: true, target: '10%/$20,000' },
    ],
    recentReviews: [
      { author: 'Ahmad K.', rating: 5, text: 'Got my first payout in 6 weeks. Fast and professional.', date: 'Feb 2026' },
      { author: 'Sarah M.', rating: 5, text: 'Best prop firm hands down. Support team is incredible.', date: 'Jan 2026' },
      { author: 'James O.', rating: 4, text: 'Passed on second attempt. The rules are strict but fair.', date: 'Jan 2026' },
    ],
  },
  'funded-next': {
    name: 'FundedNext', color: '#6C63FF', founded: 2022, hq: 'Dubai, UAE',
    website: 'https://fundednext.com', score: 9.3, rating: 4.7, totalReviews: 1920,
    maxFunding: '$200,000', profitSplit: '90%', dailyDrawdown: '5%', maxDrawdown: '10%',
    profitTarget: '10% (Express) / 15% (Stellar)', minTradingDays: 5, timeLimit: '30 days',
    phases: 2, payoutFrequency: 'Bi-weekly', scalingPlan: true,
    instantFunding: true, cryptoPayouts: true, weeklyPayouts: true,
    newsTrading: true, weekendHolding: true, eaAllowed: true, copyTrading: false,
    description: `FundedNext burst onto the scene in 2022 and quickly became one of the top choices for funded traders globally. Known for having the highest discount codes in the industry (up to 20%), FundedNext offers two main models — Express (2-phase) and Stellar (1-phase) — giving traders flexibility.`,
    longDescription: `FundedNext's Stellar model is a game-changer for traders who want fast funding. With a single 10% profit target and no time limit, it's one of the most accessible evaluation models available. Traders also receive 15% profit share even during the evaluation phase, which is unique in the industry.`,
    pros: [
      'Best discount codes (up to 20%)',
      '1-phase Stellar model available',
      'Profit share during evaluation',
      'Bi-weekly and weekly payouts',
      'Instant funding option',
      'Crypto payouts supported',
    ],
    cons: [
      'Newer platform (founded 2022)',
      'No copy trading allowed',
      'Smaller community than FTMO',
    ],
    payoutReliability: 93,
    tradersVoted: 1920,
    plans: [
      { name: 'Express $15K', price: '$99', refundable: true, target: '10%/$1,500' },
      { name: 'Express $25K', price: '$159', refundable: true, target: '10%/$2,500' },
      { name: 'Express $50K', price: '$299', refundable: true, target: '10%/$5,000' },
      { name: 'Stellar $25K', price: '$199', refundable: true, target: '15%/$3,750 (1 phase)' },
      { name: 'Stellar $100K', price: '$599', refundable: true, target: '15%/$15,000 (1 phase)' },
    ],
    recentReviews: [
      { author: 'Chidi E.', rating: 5, text: 'Passed Stellar in 12 days. Payout arrived in 3 business days.', date: 'Feb 2026' },
      { author: 'Priya S.', rating: 5, text: '20% discount code saved me $60. Best value in prop trading.', date: 'Feb 2026' },
      { author: 'Tom B.', rating: 4, text: 'Solid firm. Support could be faster but overall very good.', date: 'Jan 2026' },
    ],
  },
  'the5ers': {
    name: 'The5%ers', color: '#F59E0B', founded: 2016, hq: 'Tel Aviv, Israel',
    website: 'https://the5ers.com', score: 9.1, rating: 4.6, totalReviews: 1540,
    maxFunding: '$100,000', profitSplit: '100%', dailyDrawdown: '4%', maxDrawdown: '8%',
    profitTarget: '8% (Bootcamp)', minTradingDays: 0, timeLimit: 'None (Bootcamp)',
    phases: 1, payoutFrequency: 'Monthly', scalingPlan: true,
    instantFunding: false, cryptoPayouts: false, weeklyPayouts: false,
    newsTrading: false, weekendHolding: true, eaAllowed: true, copyTrading: false,
    description: `The5%ers is one of the most respected prop firms for serious forex traders. Founded in 2016, they offer a 100% profit split — the best in the industry — and a unique Bootcamp model with no time limit. Their aggressive scaling plan can take traders to $4,000,000.`,
    longDescription: `The5%ers focuses on developing long-term funded traders rather than quick evaluation passes. Their High Stakes model starts you at $100K and scales aggressively. The 100% profit split model means traders keep every dollar of profit, which is unmatched anywhere in the industry.`,
    pros: [
      '100% profit split — best in industry',
      'No time limit on Bootcamp',
      'Scaling plan to $4,000,000',
      'Strong trader development focus',
      'EA/Bot trading allowed',
    ],
    cons: [
      'News trading restricted',
      'No crypto payouts',
      'Monthly payouts only',
      'Lower max funding than competitors',
    ],
    payoutReliability: 91,
    tradersVoted: 1540,
    plans: [
      { name: 'Bootcamp $6K', price: '$39', refundable: false, target: '8%/$480' },
      { name: 'Bootcamp $20K', price: '$119', refundable: false, target: '8%/$1,600' },
      { name: 'High Stakes $100K', price: '$299', refundable: true, target: '10%/$10,000' },
    ],
    recentReviews: [
      { author: 'Mike A.', rating: 5, text: '100% profit split is real. Received my first payout last month.', date: 'Feb 2026' },
      { author: 'Fatima L.', rating: 4, text: 'No time limit on bootcamp was perfect for me. Took 45 days.', date: 'Jan 2026' },
      { author: 'David R.', rating: 5, text: 'Scaling plan is incredible. From $6K to $40K in 8 months.', date: 'Jan 2026' },
    ],
  },
};

// Fallback for unknown slugs
const DEFAULT_FIRM = {
  name: 'Prop Firm', color: '#3B82F6', founded: 2020, hq: 'Unknown',
  website: '#', score: 8.0, rating: 4.0, totalReviews: 100,
  maxFunding: '$100,000', profitSplit: '80%', dailyDrawdown: '5%', maxDrawdown: '10%',
  profitTarget: '10%', minTradingDays: 5, timeLimit: '30 days',
  phases: 2, payoutFrequency: 'Monthly', scalingPlan: false,
  instantFunding: false, cryptoPayouts: false, weeklyPayouts: false,
  newsTrading: false, weekendHolding: false, eaAllowed: true, copyTrading: false,
  description: 'Detailed review coming soon.', longDescription: '',
  pros: [], cons: [], payoutReliability: 80, tradersVoted: 0, plans: [], recentReviews: [],
};

const BoolRow: React.FC<{ label: string; val: boolean }> = ({ label, val }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
    <span className="text-sm text-gray-600 font-medium">{label}</span>
    {val
      ? <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs"><Check className="w-3.5 h-3.5" />Yes</span>
      : <span className="flex items-center gap-1 text-red-400 font-bold text-xs"><X className="w-3.5 h-3.5" />No</span>
    }
  </div>
);

const StatCard: React.FC<{ label: string; value: string; sub?: string; highlight?: boolean }> = ({ label, value, sub, highlight }) => (
  <div className={`rounded-xl p-4 text-center ${highlight ? 'bg-emerald-50 border-2 border-emerald-200' : 'bg-gray-50 border border-gray-100'}`}>
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
    <p className={`text-xl font-black ${highlight ? 'text-emerald-700' : 'text-gray-900'}`}>{value}</p>
    {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
  </div>
);

// ── Page Component ────────────────────────────────────────────────────────────
export default function FirmDetailPage({ params }: { params: Promise<{ firm: string }> }) {
  const resolvedParams = React.use(params);
  const [deal, setDeal] = useState<any>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'plans' | 'reviews'>('overview');

  const firm = FIRM_DATA[resolvedParams.firm] ?? { ...DEFAULT_FIRM, name: resolvedParams.firm.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) };

  useEffect(() => {
    getDeals().then(deals => {
      const match = deals.find(d =>
        d.firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === resolvedParams.firm
      );
      if (match) setDeal(match);
    });
  }, [resolvedParams.firm]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setToast(`✅ Copied ${code}!`);
      setTimeout(() => setToast(null), 3000);
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'rules', label: 'Rules & Conditions' },
    { id: 'plans', label: 'Pricing Plans' },
    { id: 'reviews', label: `Reviews (${firm.totalReviews.toLocaleString()})` },
  ] as const;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Link href="/prop-firms" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold mb-7 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Prop Firms
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left: brand */}
            <div className="flex items-start gap-5 flex-1">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl flex-shrink-0"
                style={{ background: firm.color }}>{firm.name.slice(0, 2).toUpperCase()}</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black mb-1">{firm.name}</h1>
                <p className="text-slate-400 text-sm mb-3">Founded {firm.founded} · {firm.hq}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-4 h-4 ${s <= Math.floor(firm.rating) ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} />
                    ))}
                    <span className="text-sm font-bold text-white ml-1">{firm.rating}</span>
                    <span className="text-slate-400 text-sm">({firm.totalReviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
                    PropScore: {firm.score}/10
                  </div>
                </div>
              </div>
            </div>

            {/* Right: discount card */}
            {deal && (
              <div className="bg-white/5 border border-white/15 rounded-2xl p-5 min-w-64 backdrop-blur-sm">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Current Best Discount</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Code</p>
                    <code className="text-blue-300 font-black font-mono text-lg tracking-wider">{deal.code}</code>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-0.5">Save</p>
                    <p className="text-3xl font-black text-emerald-400">{deal.discount}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => copyCode(deal.code)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-400 text-white font-black text-sm py-2.5 rounded-xl transition-all active:scale-95">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </button>
                  <a href={deal.link || firm.website} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm py-2.5 rounded-xl transition-all active:scale-95">
                    <ExternalLink className="w-3.5 h-3.5" /> Visit
                  </a>
                </div>
                {deal.expiry && (
                  <p className="text-center text-xs text-slate-500 mt-2 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" /> Expires {deal.expiry}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCard label="Max Funding" value={firm.maxFunding} />
                  <StatCard label="Profit Split" value={firm.profitSplit} highlight />
                  <StatCard label="Max Drawdown" value={firm.maxDrawdown} />
                  <StatCard label="Payout Rate" value={`${firm.payoutReliability}%`} sub={`${firm.tradersVoted.toLocaleString()} votes`} highlight />
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-lg font-black text-gray-900 mb-3">About {firm.name}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{firm.description}</p>
                  {firm.longDescription && <p className="text-gray-500 text-sm leading-relaxed">{firm.longDescription}</p>}
                </div>

                {/* Pros & Cons */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                    <h3 className="font-black text-emerald-800 mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5" />Pros</h3>
                    <ul className="space-y-2.5">
                      {firm.pros.map((p: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-emerald-700">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                    <h3 className="font-black text-red-800 mb-4 flex items-center gap-2"><XCircle className="w-5 h-5" />Cons</h3>
                    <ul className="space-y-2.5">
                      {firm.cons.map((c: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-red-700">
                          <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Payout Reliability */}
                {deal?.votes && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                      <BarChart2 className="w-5 h-5 text-blue-600" /> Trader Payout Votes
                    </h2>
                    {[
                      { label: '✅ Got Paid', val: deal.votes_got_paid || 0, color: 'bg-emerald-500' },
                      { label: '⏳ Still Waiting', val: deal.votes_still_waiting || 0, color: 'bg-yellow-400' },
                      { label: '❌ Issues', val: deal.votes_failed || 0, color: 'bg-red-400' },
                    ].map(item => {
                      const total = (deal.votes_got_paid || 0) + (deal.votes_still_waiting || 0) + (deal.votes_failed || 0);
                      const pct = total > 0 ? Math.round((item.val / total) * 100) : 0;
                      return (
                        <div key={item.label} className="flex items-center gap-3 mb-3">
                          <span className="text-sm font-semibold text-gray-600 w-32 flex-shrink-0">{item.label}</span>
                          <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                            <div className={`h-full rounded-full ${item.color} transition-all`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-sm font-black text-gray-700 w-12 text-right">{pct}%</span>
                          <span className="text-xs text-gray-400 w-14 text-right">{item.val.toLocaleString()} votes</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* Rules Tab */}
            {activeTab === 'rules' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-1">
                <h2 className="text-lg font-black text-gray-900 mb-5">Trading Rules & Conditions</h2>
                {[
                  { label: 'Profit Target', value: firm.profitTarget },
                  { label: 'Daily Drawdown Limit', value: firm.dailyDrawdown },
                  { label: 'Max Overall Drawdown', value: firm.maxDrawdown },
                  { label: 'Minimum Trading Days', value: firm.minTradingDays === 0 ? 'None' : `${firm.minTradingDays} days` },
                  { label: 'Time Limit', value: firm.timeLimit },
                  { label: 'Evaluation Phases', value: `${firm.phases} phase${firm.phases > 1 ? 's' : ''}` },
                  { label: 'Payout Frequency', value: firm.payoutFrequency },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-600 font-medium">{row.label}</span>
                    <span className="text-sm font-black text-gray-900">{row.value}</span>
                  </div>
                ))}
                <div className="pt-4 space-y-1">
                  <BoolRow label="News Trading Allowed" val={firm.newsTrading} />
                  <BoolRow label="Weekend Holding Allowed" val={firm.weekendHolding} />
                  <BoolRow label="EA / Bot Trading Allowed" val={firm.eaAllowed} />
                  <BoolRow label="Copy Trading Allowed" val={firm.copyTrading} />
                  <BoolRow label="Instant Funding Available" val={firm.instantFunding} />
                  <BoolRow label="Scaling Plan Available" val={firm.scalingPlan} />
                  <BoolRow label="Crypto Payouts" val={firm.cryptoPayouts} />
                  <BoolRow label="Weekly Payouts" val={firm.weeklyPayouts} />
                </div>
              </div>
            )}

            {/* Plans Tab */}
            {activeTab === 'plans' && (
              <div className="space-y-4">
                <h2 className="text-lg font-black text-gray-900">Pricing Plans</h2>
                {firm.plans.length > 0 ? firm.plans.map((plan: any, i: number) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-black text-gray-900 text-sm">{plan.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Profit Target: {plan.target}</p>
                      {plan.refundable && (
                        <span className="inline-block mt-1.5 text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Fee Refundable</span>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-black text-gray-900">{plan.price}</p>
                      {deal && (
                        <p className="text-xs text-emerald-600 font-bold mt-0.5">
                          Save {deal.discount} with <span className="font-mono">{deal.code}</span>
                        </p>
                      )}
                    </div>
                    {deal && (
                      <a href={deal.link || firm.website} target="_blank" rel="noopener noreferrer"
                        className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all active:scale-95 flex items-center gap-1">
                        Get Deal <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )) : (
                  <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-200" />
                    <p className="font-semibold text-sm">Pricing details coming soon</p>
                    <a href={firm.website} target="_blank" rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-blue-600 text-sm font-bold hover:underline">
                      Visit {firm.name} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-black text-gray-900">Trader Reviews</h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-black text-gray-900 text-lg">{firm.rating}</span>
                    <span className="text-gray-400 text-sm">/ 5.0</span>
                  </div>
                </div>
                {firm.recentReviews.map((r: any, i: number) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                          {r.author.slice(0, 1)}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm">{r.author}</p>
                          <p className="text-xs text-gray-400">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                  </div>
                ))}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
                  <p className="text-sm font-bold text-blue-700 mb-1">Have you traded with {firm.name}?</p>
                  <p className="text-xs text-blue-500 mb-3">Help other traders by sharing your payout experience.</p>
                  <Link href="/" className="inline-flex items-center gap-1.5 bg-blue-600 text-white font-black text-sm px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all">
                    Leave Feedback
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Discount CTA */}
            {deal ? (
              <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] rounded-2xl p-5 text-white border border-[#1a3a5c]">
                <p className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-3">🔥 Current Discount</p>
                <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Code</p>
                      <code className="text-blue-300 font-black font-mono text-lg">{deal.code}</code>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 mb-1">Save</p>
                      <p className="text-3xl font-black text-emerald-400">{deal.discount}</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => copyCode(deal.code)}
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white font-black py-3 rounded-xl transition-all active:scale-95 mb-2 flex items-center justify-center gap-2">
                  <Copy className="w-4 h-4" /> Copy Code
                </button>
                <a href={deal.link || firm.website} target="_blank" rel="noopener noreferrer"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Visit {firm.name}
                </a>
              </div>
            ) : (
              <a href={firm.website} target="_blank" rel="noopener noreferrer"
                className="block bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-center transition-all">
                Visit {firm.name} →
              </a>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4 text-sm">Quick Facts</h3>
              {[
                { label: 'Founded', val: firm.founded },
                { label: 'Headquarters', val: firm.hq },
                { label: 'Max Account', val: firm.maxFunding },
                { label: 'Profit Split', val: firm.profitSplit },
                { label: 'Payout Frequency', val: firm.payoutFrequency },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-500">{row.label}</span>
                  <span className="text-xs font-black text-gray-900">{row.val}</span>
                </div>
              ))}
            </div>

            {/* Compare CTA */}
            <Link href="/compare"
              className="block bg-white border-2 border-blue-200 hover:border-blue-400 rounded-2xl p-5 transition-all group">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="font-black text-gray-900 text-sm">Compare {firm.name}</p>
                  <p className="text-xs text-gray-400">vs other top firms</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 ml-auto transition-colors" />
              </div>
            </Link>

            {/* Other firms */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4 text-sm">Other Top Firms</h3>
              {['ftmo', 'funded-next', 'the5ers'].filter(s => s !== resolvedParams.firm).map(s => {
                const f = FIRM_DATA[s];
                return (
                  <Link key={s} href={`/prop-firms/${s}`}
                    className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors group">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-xs flex-shrink-0"
                      style={{ background: f.color }}>{f.name.slice(0, 2).toUpperCase()}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{f.name}</p>
                      <p className="text-xs text-gray-400">Score: {f.score}/10</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
                  </Link>
                );
              })}
              <Link href="/prop-firms" className="block text-center text-xs font-bold text-blue-600 hover:underline mt-3">
                View All Firms →
              </Link>
            </div>
          </div>
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