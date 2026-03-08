"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Copy, ExternalLink, Clock, CheckCircle, XCircle, AlertCircle,
  Flame, Zap, Star, Users, DollarSign, ChevronRight, Bell,
  Trophy, Shield, Search, TrendingUp, Newspaper, ArrowRight,
  BarChart2, Award, Percent, Activity
} from 'lucide-react';
import { getDeals } from '@/lib/getDeals';
import { PropScoreBadge } from '@/components/PropScoreBadge';
import { VerificationBadge } from '@/components/VerificationBadge';
import DealPopup from '@/components/DealPopup';

export interface DiscountCode {
  id?: string;
  firm: string;
  code: string;
  discount: string;
  expiry: string;
  link: string;
  description?: string;
  propScore?: number;
  verificationStatus?: 'verified' | 'sponsored' | 'community-favorite' | 'limited-time';
  votes?: { gotPaid: number; stillWaiting: number; failed: number };
}

// ─── News Data ────────────────────────────────────────────────────────────────
const propNews = [
  {
    title: "FTMO Increases Profit Split to 90% for Top Traders",
    summary: "FTMO announces upgraded profit sharing for consistently profitable funded traders, effective March 2026.",
    date: "Mar 1, 2026", tag: "FTMO", tagColor: "bg-blue-100 text-blue-700", urgent: true,
    link: "/blog"
  },
  {
    title: "FundedNext Launches New Stellar Model with 1-Phase Evaluation",
    summary: "FundedNext's latest model streamlines the path to funding with a single 10% profit target and no time limits.",
    date: "Feb 28, 2026", tag: "FundedNext", tagColor: "bg-emerald-100 text-emerald-700", urgent: false,
    link: "/blog"
  },
  {
    title: "Prop Firm Regulations: What 2026 Means for Funded Traders",
    summary: "New financial regulations could affect prop firm operations in the EU. Here's what you need to know.",
    date: "Feb 25, 2026", tag: "Industry", tagColor: "bg-purple-100 text-purple-700", urgent: false,
    link: "/blog"
  },
  {
    title: "Goat Funded Trader Reaches 50,000 Funded Accounts Milestone",
    summary: "The community favourite hits a major milestone as trader payouts cross $10M total distributed.",
    date: "Feb 22, 2026", tag: "Goat Funded", tagColor: "bg-orange-100 text-orange-700", urgent: false,
    link: "/blog"
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────
const AnimatedCounter: React.FC<{ target: number; prefix?: string; suffix?: string }> = ({ target, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - start) / 2000, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// ─── Live Ticker ──────────────────────────────────────────────────────────────
const LiveTicker: React.FC<{ deals: DiscountCode[] }> = ({ deals }) => {
  const active = deals.filter(d => new Date(d.expiry) >= new Date());
  const items = [
    ...active.slice(0, 5).map(d => `🔥 ${d.firm} — ${d.discount} off · Code: ${d.code}`),
    '✅ All codes verified within 7 days',
    '💰 $500,000+ saved by traders using PropCoupons',
    '⚡ 10,000+ traders funded using our deals',
  ];
  const [idx, setIdx] = useState(0);
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setVis(false);
      setTimeout(() => { setIdx(i => (i + 1) % items.length); setVis(true); }, 350);
    }, 3800);
    return () => clearInterval(t);
  }, [items.length]);
  return (
    <div className="bg-gradient-to-r from-[#0a0f1e] to-[#0d1f3c] text-white py-2 text-center text-sm font-semibold border-b border-[#1a3a5c]">
      <div className="flex items-center justify-center gap-2">
        <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse flex-shrink-0" />
        <span className="transition-all duration-300" style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(-6px)' }}>
          {items[idx]}
        </span>
      </div>
    </div>
  );
};

// ─── Countdown Timer ──────────────────────────────────────────────────────────
const CountdownTimer: React.FC<{ expiryDate: string; compact?: boolean }> = ({ expiryDate, compact }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [expired, setExpired] = useState(false);
  const [urgent, setUrgent] = useState(false);
  useEffect(() => {
    const calc = () => {
      const diff = +new Date(expiryDate) - +new Date();
      if (diff <= 0) { setTimeLeft('Expired'); setExpired(true); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setUrgent(d <= 3);
      setTimeLeft(compact
        ? (d > 0 ? `${d}d ${h}h` : `${h}h ${m}m`)
        : (d > 0 ? `${d}d ${h}h` : h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`)
      );
    };
    const t = setInterval(calc, 1000); calc();
    return () => clearInterval(t);
  }, [expiryDate, compact]);
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-xs font-bold ${expired ? 'text-red-500' : urgent ? 'text-orange-500' : 'text-emerald-600'}`}>
      <Clock className="w-3 h-3" />{timeLeft}
    </span>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge: React.FC<{ expiryDate: string }> = ({ expiryDate }) => {
  const days = Math.floor((+new Date(expiryDate) - +new Date()) / 86400000);
  if (days < 0) return <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full bg-red-50 text-red-600 border border-red-200"><XCircle className="w-3 h-3" />Expired</span>;
  if (days <= 7) return <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full bg-orange-50 text-orange-600 border border-orange-200 animate-pulse"><Flame className="w-3 h-3" />Ends Soon</span>;
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle className="w-3 h-3" />Active</span>;
};

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2">
      <CheckCircle className="w-5 h-5" />
      <span className="font-bold text-sm">{message}</span>
    </div>
  );
};

// ─── Value Calculator (uses live Supabase data) ───────────────────────────────
const ValueCalculator: React.FC<{ deals: DiscountCode[] }> = ({ deals }) => {
  const [size, setSize] = useState(50000);
  const active = deals.filter(d => new Date(d.expiry) >= new Date());
  const top5 = [...active]
    .map(d => ({ ...d, savings: (size * 0.01 * parseInt(d.discount)) / 100 }))
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 5);

  return (
    <div className="bg-gradient-to-br from-[#0a0f1e] to-[#0d1f3c] rounded-2xl p-6 text-white border border-[#1a3a5c]">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-emerald-500/20 rounded-xl"><BarChart2 className="w-6 h-6 text-emerald-400" /></div>
        <div>
          <h2 className="text-xl font-black">Savings Calculator</h2>
          <p className="text-slate-400 text-xs">Live data from {active.length} active deals</p>
        </div>
      </div>
      <div className="bg-white/5 rounded-xl p-4 mb-5 border border-white/10">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-slate-300">Challenge Account Size</label>
          <span className="text-emerald-400 font-black text-lg">${size.toLocaleString()}</span>
        </div>
        <input type="range" min="5000" max="200000" step="5000" value={size}
          onChange={e => setSize(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-500" />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>$5K</span><span>$200K</span>
        </div>
      </div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Top Savings Opportunities</p>
      <div className="space-y-2">
        {top5.map((d, i) => (
          <div key={d.firm} className="flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-4 py-3 border border-white/5">
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${i === 0 ? 'bg-yellow-400 text-black' : i === 1 ? 'bg-slate-300 text-black' : i === 2 ? 'bg-amber-600 text-white' : 'bg-white/10 text-white'}`}>{i + 1}</div>
              <div>
                <p className="font-bold text-sm text-white">{d.firm}</p>
                <p className="text-xs text-slate-400">{d.discount} discount · Code: <span className="font-mono text-emerald-400">{d.code}</span></p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-emerald-400">${d.savings.toFixed(0)}</p>
              <p className="text-xs text-slate-500">est. saved</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── News Section ─────────────────────────────────────────────────────────────
const NewsSection: React.FC = () => (
  <div>
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <Newspaper className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-black text-gray-900">Prop Trading News</h2>
        <span className="bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
      </div>
      <Link href="/blog" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
        All Articles <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      {propNews.map((item, i) => (
        <Link key={i} href={item.link}
          className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-black px-2.5 py-1 rounded-full ${item.tagColor}`}>{item.tag}</span>
            <div className="flex items-center gap-2">
              {item.urgent && <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full border border-red-200">Breaking</span>}
              <span className="text-xs text-gray-400">{item.date}</span>
            </div>
          </div>
          <h3 className="font-black text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.summary}</p>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
            Read more <ArrowRight className="w-3 h-3" />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

// ─── Deal Card (Mobile) ───────────────────────────────────────────────────────
const DealCard: React.FC<{ deal: DiscountCode; onCopy: (code: string, firm: string) => void; rank?: number }> = ({ deal, onCopy, rank }) => {
  const isExpired = new Date(deal.expiry) < new Date();
  const total = (deal.votes?.gotPaid || 0) + (deal.votes?.stillWaiting || 0) + (deal.votes?.failed || 0);
  const reliability = total > 0 ? Math.round(((deal.votes?.gotPaid || 0) / total) * 100) : null;
  const slug = deal.firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <div className={`relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${isExpired ? 'border-gray-100 opacity-55' : 'border-gray-100 hover:border-blue-200 shadow-sm'}`}>
      {rank && rank <= 3 && (
        <div className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-lg z-10"
          style={{ background: rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : '#CD7F32', color: '#111' }}>{rank}</div>
      )}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-base font-black text-gray-900 truncate">{deal.firm}</h3>
            {deal.description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{deal.description}</p>}
          </div>
          <StatusBadge expiryDate={deal.expiry} />
        </div>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {deal.propScore && <PropScoreBadge score={deal.propScore} />}
          {deal.verificationStatus && <VerificationBadge status={deal.verificationStatus} />}
        </div>
        {reliability !== null && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${reliability}%` }} />
            </div>
            <span className="text-xs font-black text-emerald-700 whitespace-nowrap">{reliability}% paid out</span>
          </div>
        )}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 mb-4 border border-blue-100/60">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Code</p>
              <p className="text-lg font-black text-blue-700 font-mono tracking-wider">{deal.code}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Save</p>
              <p className="text-3xl font-black text-emerald-600">{deal.discount}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
          <CountdownTimer expiryDate={deal.expiry} compact />
          <span>Exp: {deal.expiry}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onCopy(deal.code, deal.firm)} disabled={isExpired}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-black text-sm transition-all active:scale-95 ${isExpired ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'}`}>
            <Copy className="w-3.5 h-3.5" /> Copy
          </button>
          <a href={deal.link} target="_blank" rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-black text-sm transition-all active:scale-95 ${isExpired ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'}`}>
            <ExternalLink className="w-3.5 h-3.5" /> Visit
          </a>
          <Link href={`/prop-firms/${slug}`}
            className="px-3 py-2.5 rounded-xl font-bold text-sm border-2 border-gray-200 hover:border-blue-300 text-gray-500 hover:text-blue-600 transition-all">
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// ─── Newsletter Strip ─────────────────────────────────────────────────────────
const NewsletterStrip: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const submit = async () => {
    if (!email) return;
    setStatus('loading');
    try {
      await fetch("https://buttondown.email/api/emails/embed-subscribe/propcoupouns", {
        method: "POST", body: new URLSearchParams({ email }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    } finally { setStatus('done'); }
  };
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#1a3a5c] bg-gradient-to-r from-[#0a0f1e] via-[#0d1a35] to-[#0a0f1e]">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10% 50%, #10b981 0%, transparent 40%), radial-gradient(circle at 90% 50%, #3b82f6 0%, transparent 40%)' }} />
      <div className="relative px-8 py-7 flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
            <Bell className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-emerald-400 text-xs font-black uppercase tracking-wider mb-0.5">Free Weekly Deals</p>
            <h3 className="text-white font-black text-xl">Never Miss a Code</h3>
            <p className="text-slate-400 text-xs mt-0.5">Join 5,000+ traders · Every Tuesday · Zero spam</p>
          </div>
        </div>
        {status === 'done' ? (
          <div className="flex items-center gap-2 text-emerald-400 font-black ml-auto">
            <CheckCircle className="w-5 h-5" /> You're in! First deal drops Tuesday.
          </div>
        ) : (
          <div className="flex gap-2 w-full md:w-auto md:ml-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="your@email.com"
              className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm transition-colors" />
            <button onClick={submit} disabled={status === 'loading'}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl transition-all active:scale-95 text-sm whitespace-nowrap shadow-lg shadow-emerald-500/25">
              {status === 'loading' ? '...' : 'Get Deals →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PropDiscountsApp() {
  const [deals, setDeals] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [filter, setFilter] = useState<'active' | 'expiring' | 'all'>('active');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'discount' | 'expiry' | 'default'>('score');

  useEffect(() => {
    getDeals().then(raw => {
      setDeals(raw.map(d => ({
        id: d.id, firm: d.firm, code: d.code, discount: d.discount,
        expiry: d.expiry || '', link: d.link || '',
        description: d.description, propScore: d.prop_score ?? undefined,
        verificationStatus: d.verification_status,
        votes: { gotPaid: d.votes_got_paid || 0, stillWaiting: d.votes_still_waiting || 0, failed: d.votes_failed || 0 }
      })));
      setLoading(false);
    });
  }, []);

  const copyCode = (code: string, firm: string) => {
    navigator.clipboard.writeText(code).then(() => setToast(`Copied ${code} for ${firm}!`));
  };

  const now = new Date();
  const activeDeals = deals.filter(d => new Date(d.expiry) >= now);
  const expiringDeals = deals.filter(d => {
    const days = Math.floor((+new Date(d.expiry) - +now) / 86400000);
    return days >= 0 && days <= 7;
  });
  const topDeals = [...activeDeals].sort((a, b) => (b.propScore || 0) - (a.propScore || 0)).slice(0, 3);

  const filtered = deals.filter(d => {
    const isActive = new Date(d.expiry) >= now;
    const days = Math.floor((+new Date(d.expiry) - +now) / 86400000);
    const matchFilter = filter === 'all' ? true : filter === 'active' ? isActive : (days >= 0 && days <= 7);
    const matchSearch = !search || d.firm.toLowerCase().includes(search.toLowerCase()) || d.code.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'score') return (b.propScore || 0) - (a.propScore || 0);
    if (sortBy === 'discount') return parseInt(b.discount) - parseInt(a.discount);
    if (sortBy === 'expiry') return +new Date(a.expiry) - +new Date(b.expiry);
    return 0;
  });

  if (loading) return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm font-semibold">Loading live deals...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Live Ticker */}
      <LiveTicker deals={deals} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#060d1f] via-[#0a1628] to-[#060d1f]">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl" />
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative max-w-6xl mx-auto px-4 py-6 md:py-8">
          <div className="text-center">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold mb-4">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              {activeDeals.length} Live Deals — Verified Today
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-[1.05] tracking-tight">
              Save Big on<br />
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
                  Prop Challenges
                </span>
              </span>
            </h1>
            <p className="text-slate-400 text-base max-w-lg mx-auto mb-6 leading-relaxed">
              Verified discount codes for 20+ top prop firms. Updated weekly. Used by 10,000+ traders.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 justify-center mb-6">
              <a href="#deals"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-7 py-3 rounded-xl transition-all active:scale-95 text-sm shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2">
                <Flame className="w-4 h-4" /> View All Deals
              </a>
              <Link href="/compare"
                className="bg-white/8 hover:bg-white/15 border border-white/15 text-white font-bold px-7 py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                Compare Firms <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-6 text-center">
              {[
                { icon: Flame, val: activeDeals.length, suf: '', label: 'Active Deals', color: 'text-orange-400' },
                { icon: Users, val: 10000, suf: '+', label: 'Traders Helped', color: 'text-blue-400' },
                { icon: DollarSign, val: 500000, suf: '+', label: 'Total Saved', color: 'text-emerald-400' },
                { icon: Shield, val: deals.length, suf: '', label: 'Verified Firms', color: 'text-purple-400' },
              ].map(({ icon: Icon, val, suf, label, color }) => (
                <div key={label} className="text-center">
                  <Icon className={`w-4 h-4 mx-auto mb-0.5 ${color}`} />
                  <div className="text-xl font-black text-white"><AnimatedCounter target={val} suffix={suf} /></div>
                  <div className="text-xs text-slate-500 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* Top 3 Featured */}
        {topDeals.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-black text-gray-900">Top Rated Right Now</h2>
              <a href="#deals" className="ml-auto text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">All deals <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {topDeals.map((d, i) => <DealCard key={d.firm} deal={d} onCopy={copyCode} rank={i + 1} />)}
            </div>
          </div>
        )}

        {/* Forex Calendar Teaser */}
        <Link href="/calendar"
          className="group flex items-center justify-between bg-gradient-to-r from-[#060d1f] to-[#0d1f3c] border border-blue-900/50 rounded-2xl px-6 py-4 hover:border-blue-500/50 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-blue-500/15 rounded-xl border border-blue-500/20">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-black text-sm">Forex Economic Calendar</p>
              <p className="text-slate-400 text-xs mt-0.5">Track high-impact events that move prop firm markets this week</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-blue-400 font-black text-sm group-hover:gap-3 transition-all whitespace-nowrap">
            View Calendar <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* ── All Deals Table ───────────────────────────────────── */}
        <div id="deals">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between mb-5">
            <h2 className="text-xl font-black text-gray-900">
              All Discount Codes
              <span className="ml-2 text-sm font-semibold text-gray-400">({sorted.length} shown)</span>
            </h2>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search firms..." value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none bg-white w-44 transition-colors" />
              </div>
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                {(['active', 'expiring', 'all'] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all whitespace-nowrap ${filter === f ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                    {f === 'active' ? '✅ Active' : f === 'expiring' ? '🔥 Ending Soon' : '📋 All'}
                  </button>
                ))}
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none bg-white font-bold text-gray-700">
                <option value="score">⭐ Best Score</option>
                <option value="discount">💰 Highest Discount</option>
                <option value="expiry">⏱ Expiring Soon</option>
                <option value="default">📋 Default</option>
              </select>
            </div>
          </div>

          {/* Expiring Soon Banner */}
          {expiringDeals.length > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-5 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
              <h3 className="font-black text-orange-900 text-sm">⚠️ Expiring Within 7 Days — Act Now</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {expiringDeals.map(d => (
                <button key={d.firm} onClick={() => copyCode(d.code, d.firm)}
                  className="group bg-white hover:bg-orange-100 border border-orange-200 hover:border-orange-400 text-orange-800 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                  <Copy className="w-3 h-3" />
                  <span>{d.firm}</span>
                  <span className="text-emerald-600 font-black">{d.discount} off</span>
                  <CountdownTimer expiryDate={d.expiry} compact />
                </button>
              ))}
            </div>
          </div>
          )}

          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#060d1f] to-[#0d1f3c] text-white">
                  {['#', 'Prop Firm', 'Score', 'Code', 'Discount', 'Payout Rate', 'Time Left', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider first:w-10">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sorted.map((dc, i) => {
                  const isExpired = new Date(dc.expiry) < now;
                  const total = (dc.votes?.gotPaid || 0) + (dc.votes?.stillWaiting || 0) + (dc.votes?.failed || 0);
                  const reliability = total > 0 ? Math.round(((dc.votes?.gotPaid || 0) / total) * 100) : null;
                  const slug = dc.firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                  return (
                    <tr key={dc.firm} className={`transition-colors group ${isExpired ? 'opacity-50 bg-gray-50/50' : 'hover:bg-blue-50/30'}`}>
                      <td className="px-4 py-3.5 text-xs font-black text-gray-300">#{i + 1}</td>
                      <td className="px-4 py-3.5 max-w-[200px]">
                        <div className="font-black text-gray-900 text-sm truncate">{dc.firm}</div>
                        {dc.description && <div className="text-xs text-gray-400 truncate max-w-[180px] mt-0.5">{dc.description}</div>}
                        {dc.verificationStatus && <div className="mt-1"><VerificationBadge status={dc.verificationStatus} /></div>}
                      </td>
                      <td className="px-4 py-3.5">{dc.propScore ? <PropScoreBadge score={dc.propScore} /> : <span className="text-gray-300 text-xs">—</span>}</td>
                      <td className="px-4 py-3.5">
                        <code className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-black font-mono border border-blue-100">{dc.code}</code>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xl font-black text-emerald-600">{dc.discount}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        {reliability !== null ? (
                          <div className="flex items-center gap-2">
                            <div className="w-14 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${reliability}%` }} />
                            </div>
                            <span className="text-xs font-black text-emerald-700">{reliability}%</span>
                          </div>
                        ) : <span className="text-gray-300 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3.5"><CountdownTimer expiryDate={dc.expiry} compact /></td>
                      <td className="px-4 py-3.5">
                        <div className="flex gap-1.5 justify-end">
                          <button onClick={() => copyCode(dc.code, dc.firm)} disabled={isExpired}
                            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-black transition-all active:scale-95 ${isExpired ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                            <Copy className="w-3 h-3" /> Copy
                          </button>
                          <a href={dc.link} target="_blank" rel="noopener noreferrer"
                            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-black transition-all active:scale-95 ${isExpired ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}>
                            <ExternalLink className="w-3 h-3" /> Visit
                          </a>
                          <Link href={`/prop-firms/${slug}`}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold border-2 border-gray-200 hover:border-blue-300 text-gray-500 hover:text-blue-600 transition-all">
                            Review <ChevronRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden grid gap-4">
            {sorted.map((dc, i) => <DealCard key={dc.firm} deal={dc} onCopy={copyCode} rank={i < 3 ? i + 1 : undefined} />)}
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-semibold text-sm">No deals found for "{search}"</p>
              <button onClick={() => { setSearch(''); setFilter('all'); }}
                className="mt-3 text-blue-600 text-sm font-bold hover:underline">Clear filters</button>
            </div>
          )}
        </div>

        {/* 2-col: Calculator + News */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ValueCalculator deals={deals} />
          <NewsSection />
        </div>

        {/* Newsletter */}
        <NewsletterStrip />

        {/* Bottom CTA */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/compare"
            className="group bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-blue-500/20 transition-all">
            <TrendingUp className="w-8 h-8 mb-3 text-blue-200" />
            <h3 className="text-lg font-black mb-1">Compare Prop Firms</h3>
            <p className="text-blue-200 text-sm mb-3">Side-by-side rules, splits & drawdown limits</p>
            <span className="inline-flex items-center gap-1 text-sm font-black group-hover:gap-2 transition-all">Open Tool <ArrowRight className="w-4 h-4" /></span>
          </Link>
          <Link href="/prop-firms"
            className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-slate-500/20 transition-all">
            <Award className="w-8 h-8 mb-3 text-slate-300" />
            <h3 className="text-lg font-black mb-1">Firm Reviews</h3>
            <p className="text-slate-400 text-sm mb-3">Deep-dive reviews with real trader feedback</p>
            <span className="inline-flex items-center gap-1 text-sm font-black group-hover:gap-2 transition-all">Browse All <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>

      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <DealPopup />
    </div>
  );
}