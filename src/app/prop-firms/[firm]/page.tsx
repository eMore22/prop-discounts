"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Star, Shield, Copy, ExternalLink, CheckCircle, XCircle, Clock,
  TrendingUp, Users, DollarSign, ArrowLeft, ChevronRight,
  ThumbsUp, ThumbsDown, Zap, AlertCircle, BarChart2, Check, X
} from 'lucide-react';
import { getDeals } from '@/lib/getDeals';
import { PropScoreBadge } from '@/components/PropScoreBadge';
import { VerificationBadge } from '@/components/VerificationBadge';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const BoolRow: React.FC<{ label: string; val: boolean }> = ({ label, val }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
    <span className="text-sm text-gray-600">{label}</span>
    {val
      ? <span className="flex items-center gap-1 text-emerald-600 text-xs font-black"><Check className="w-3.5 h-3.5" /> Yes</span>
      : <span className="flex items-center gap-1 text-red-400 text-xs font-black"><X className="w-3.5 h-3.5" /> No</span>}
  </div>
);

const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' }> = ({ rating, size = 'md' }) => {
  const w = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`${w} ${i <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
      ))}
    </div>
  );
};

function FirmDetailClient({ firmSlug }: { firmSlug: string }) {
  const [firm, setFirm] = useState<any>(null);
  const [deal, setDeal] = useState<any>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'plans' | 'reviews'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    Promise.all([
      supabase.from('prop_firms').select('*').eq('slug', firmSlug).single(),
      getDeals(),
    ]).then(([{ data: firmData }, deals]) => {
      if (firmData) setFirm(firmData);
      const match = deals.find((d: any) =>
        d.firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === firmSlug
      );
      if (match) setDeal(match);
      setLoading(false);
    });
  }, [firmSlug]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setToast(`✅ Copied ${code}!`);
      setTimeout(() => setToast(null), 3000);
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Loading firm data...</p>
      </div>
    </div>
  );

  if (!firm) return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h1 className="text-xl font-black text-gray-700 mb-2">Firm Not Found</h1>
        <p className="text-gray-500 text-sm mb-4">We don't have a page for this firm yet.</p>
        <Link href="/" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">
          Back to All Deals
        </Link>
      </div>
    </div>
  );

  const discountCode = deal?.code ?? null;
  const discountAmount = deal?.discount ?? null;
  const dealLink = deal?.link ?? firm.website;
  const propScore = deal?.prop_score ?? null;
  const plans: any[] = firm.plans ?? [];
  const recentReviews: any[] = firm.recent_reviews ?? [];
  const pros: string[] = firm.pros ?? [];
  const cons: string[] = firm.cons ?? [];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'rules', label: 'Trading Rules' },
    { id: 'plans', label: `Plans (${plans.length})` },
    { id: 'reviews', label: `Reviews (${(firm.tp_reviews ?? 0).toLocaleString()})` },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#060d1f] via-[#0a1628] to-[#060d1f]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl"
            style={{ background: `${firm.color ?? '#3B82F6'}25` }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm font-bold mb-5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Deals
          </Link>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${firm.color ?? '#3B82F6'}, ${firm.color ?? '#3B82F6'}88)` }}>
                  {firm.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-white">{firm.name}</h1>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {firm.hq}{firm.founded ? ` · Est. ${firm.founded}` : ''}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {firm.tp_rating && (
                  <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
                    <StarRating rating={firm.tp_rating} size="sm" />
                    <span className="text-white font-black text-sm">{firm.tp_rating}</span>
                    <span className="text-slate-400 text-xs">({(firm.tp_reviews ?? 0).toLocaleString()} Trustpilot)</span>
                  </div>
                )}
                {propScore && <PropScoreBadge score={propScore} />}
                {deal?.verificationStatus && <VerificationBadge status={deal.verificationStatus} />}
              </div>
            </div>

            {discountCode && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 min-w-[260px]">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wide mb-2">Exclusive Discount</p>
                <div className="flex items-center justify-between mb-3">
                  <code className="text-blue-300 font-black font-mono text-lg">{discountCode}</code>
                  <span className="text-3xl font-black text-emerald-400">{discountAmount}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => copyCode(discountCode)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-black py-2.5 rounded-xl text-sm transition-all active:scale-95">
                    <Copy className="w-4 h-4" /> Copy Code
                  </button>
                  <a href={dealLink} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 rounded-xl text-sm transition-all active:scale-95">
                    <ExternalLink className="w-4 h-4" /> Visit
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3.5 text-sm font-black whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Main */}
          <div className="lg:col-span-2 space-y-6">

            {activeTab === 'overview' && (
              <>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h2 className="text-lg font-black text-gray-900 mb-3">About {firm.name}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{firm.description}</p>
                  {firm.long_description && (
                    <p className="text-gray-500 text-sm leading-relaxed">{firm.long_description}</p>
                  )}
                </div>

                {(pros.length > 0 || cons.length > 0) && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5">
                      <h3 className="font-black text-emerald-900 text-sm mb-3 flex items-center gap-1.5">
                        <ThumbsUp className="w-4 h-4" /> Pros
                      </h3>
                      <ul className="space-y-2">
                        {pros.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-emerald-800">
                            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-2xl border border-red-100 p-5">
                      <h3 className="font-black text-red-900 text-sm mb-3 flex items-center gap-1.5">
                        <ThumbsDown className="w-4 h-4" /> Cons
                      </h3>
                      <ul className="space-y-2">
                        {cons.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {deal && (() => {
                  const total = (deal.votes?.gotPaid || 0) + (deal.votes?.stillWaiting || 0) + (deal.votes?.failed || 0);
                  return total > 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                      <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" /> Trader Payout Votes
                      </h3>
                      <div className="space-y-3">
                        {[
                          { label: 'Got Paid', val: deal.votes.gotPaid || 0, color: 'bg-emerald-500', text: 'text-emerald-700' },
                          { label: 'Still Waiting', val: deal.votes.stillWaiting || 0, color: 'bg-yellow-400', text: 'text-yellow-700' },
                          { label: 'Failed / Denied', val: deal.votes.failed || 0, color: 'bg-red-400', text: 'text-red-700' },
                        ].map(({ label, val, color, text }) => (
                          <div key={label}>
                            <div className="flex justify-between text-xs font-bold mb-1">
                              <span className={text}>{label}</span>
                              <span className="text-gray-500">{val} votes ({Math.round((val / total) * 100)}%)</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className={`h-full ${color} rounded-full`} style={{ width: `${Math.round((val / total) * 100)}%` }} />
                            </div>
                          </div>
                        ))}
                        <p className="text-xs text-gray-400">{total} total votes from PropCoupons community</p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </>
            )}

            {activeTab === 'rules' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-black text-gray-900 mb-5">Trading Rules</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-wide mb-3">Evaluation</h3>
                    {[
                      { label: 'Phases', val: firm.phases ? `${firm.phases}-Step` : '—' },
                      { label: 'Profit Target', val: firm.profit_target || '—' },
                      { label: 'Min Trading Days', val: firm.min_trading_days ? `${firm.min_trading_days} days` : '—' },
                      { label: 'Time Limit', val: firm.time_limit || '—' },
                    ].map(({ label, val }) => (
                      <div key={label} className="flex justify-between py-2 border-b border-gray-50 text-sm">
                        <span className="text-gray-500">{label}</span>
                        <span className="font-bold text-gray-900 text-right max-w-[55%]">{val}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-wide mb-3">Funded Account</h3>
                    {[
                      { label: 'Daily Drawdown', val: firm.daily_drawdown || '—' },
                      { label: 'Max Drawdown', val: firm.max_drawdown || '—' },
                      { label: 'Max Funding', val: firm.max_funding || '—' },
                      { label: 'Profit Split', val: firm.profit_split || '—' },
                      { label: 'Payouts', val: firm.payout_frequency || '—' },
                    ].map(({ label, val }) => (
                      <div key={label} className="flex justify-between py-2 border-b border-gray-50 text-sm">
                        <span className="text-gray-500">{label}</span>
                        <span className="font-bold text-gray-900 text-right max-w-[55%]">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-wide mb-3">Permissions</h3>
                <div className="grid md:grid-cols-2 gap-x-8">
                  <div>
                    <BoolRow label="Scaling Plan" val={firm.scaling_plan} />
                    <BoolRow label="Instant Funding" val={firm.instant_funding} />
                    <BoolRow label="News Trading" val={firm.news_trading} />
                    <BoolRow label="Weekend Holding" val={firm.weekend_holding} />
                  </div>
                  <div>
                    <BoolRow label="EA / Bots Allowed" val={firm.ea_allowed} />
                    <BoolRow label="Copy Trading" val={firm.copy_trading} />
                    <BoolRow label="Crypto Payouts" val={firm.crypto_payouts} />
                    <BoolRow label="Weekly Payouts" val={firm.weekly_payouts} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'plans' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-black text-gray-900 mb-4">Account Plans</h2>
                {plans.length > 0 ? (
                  <div className="space-y-3">
                    {plans.map((plan, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-colors">
                        <div>
                          <p className="font-black text-gray-900 text-sm">{plan.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Target: {plan.target}</p>
                          {plan.refundable && <span className="text-xs text-emerald-600 font-bold">Fee refundable ✓</span>}
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black text-blue-600">{plan.price}</p>
                          <a href={dealLink} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-0.5 justify-end mt-1">
                            Get Started <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Plan details coming soon. Visit the firm's website for current pricing.</p>
                )}
                {discountCode && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-0.5">Save {discountAmount}</p>
                      <p className="text-sm text-blue-800">Use code <code className="font-black">{discountCode}</code> at checkout</p>
                    </div>
                    <button onClick={() => copyCode(discountCode)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-blue-700 transition-colors flex items-center gap-1.5">
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {firm.tp_rating && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-5xl font-black text-gray-900">{firm.tp_rating}</div>
                        <StarRating rating={firm.tp_rating} />
                        <p className="text-xs text-gray-400 mt-1">{(firm.tp_reviews ?? 0).toLocaleString()} reviews</p>
                      </div>
                      <div className="flex-1 pl-4 border-l border-gray-100">
                        <p className="font-black text-gray-700 mb-1">Trustpilot Rating</p>
                        <p className="text-sm text-gray-500">Independently verified trader reviews from Trustpilot.com</p>
                        <a href={`https://www.trustpilot.com/review/${firm.website?.replace('https://', '')}`}
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 text-sm font-bold hover:underline mt-2">
                          See all reviews <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {recentReviews.map((r, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black text-xs">
                          {r.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm">{r.author}</p>
                          <p className="text-xs text-gray-400">{r.date}</p>
                        </div>
                      </div>
                      <StarRating rating={r.rating} size="sm" />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-black text-gray-900 text-sm mb-4">Quick Stats</h3>
              {[
                { icon: DollarSign, label: 'Max Funding', val: firm.max_funding || '—', color: 'text-emerald-600' },
                { icon: TrendingUp, label: 'Profit Split', val: firm.profit_split || '—', color: 'text-blue-600' },
                { icon: Shield, label: 'Max Drawdown', val: firm.max_drawdown || '—', color: 'text-orange-500' },
                { icon: Clock, label: 'Payouts', val: firm.payout_frequency || '—', color: 'text-purple-500' },
                { icon: BarChart2, label: 'Phases', val: firm.phases ? `${firm.phases}-Step` : '—', color: 'text-slate-600' },
              ].map(({ icon: Icon, label, val, color }) => (
                <div key={label} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-sm font-black text-gray-900 truncate">{val}</p>
                  </div>
                </div>
              ))}
            </div>

            {firm.payout_reliability && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-black text-gray-900 text-sm mb-3">Payout Reliability</h3>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-black text-emerald-600">{firm.payout_reliability}%</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${firm.payout_reliability}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Based on community votes</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] rounded-2xl p-5">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wide mb-1">Ready to start?</p>
              <p className="text-white font-black mb-3">{firm.name}</p>
              {discountCode && (
                <div className="bg-white/10 rounded-xl p-3 mb-3">
                  <p className="text-emerald-400 text-xs font-bold">Use code for {discountAmount} off</p>
                  <code className="text-white font-black font-mono">{discountCode}</code>
                </div>
              )}
              <a href={dealLink} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3 rounded-xl text-sm transition-all active:scale-95">
                <Zap className="w-4 h-4" /> Get Funded Now
              </a>
            </div>

            <Link href="/compare" className="block bg-white rounded-2xl border border-gray-100 p-5 hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-3">
                <BarChart2 className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-black text-gray-900 text-sm">Compare Firms</p>
                  <p className="text-xs text-gray-400">Side-by-side comparison tool</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </div>
            </Link>
          </div>
        </div>
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

export default async function FirmDetailPage({ params }: { params: Promise<{ firm: string }> }) {
  const { firm } = await params;
  return <FirmDetailClient firmSlug={firm} />;
}