"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Clock, Calendar, Tag, Copy, ExternalLink, CheckCircle,
  ChevronRight, Share2, BookOpen, Flame, Bell, ArrowRight, Twitter,
  Linkedin, Link2
} from 'lucide-react';

// ── Static article content (in production, fetch from CMS/Supabase) ──────────
const ARTICLES: Record<string, any> = {
  'ftmo-profit-split-increase-2026': {
    title: 'FTMO Increases Profit Split to 90% for Top Traders',
    category: 'News', firm: 'FTMO', date: 'March 1, 2026', readTime: '4 min',
    tag: 'Breaking', tagColor: 'bg-red-100 text-red-700',
    excerpt: 'FTMO has announced an upgrade to its profit sharing structure for consistently profitable funded traders, effective March 2026.',
    content: [
      { type: 'lead', text: 'FTMO, the world\'s most trusted prop trading firm, announced an increase in profit split to 90% for all funded traders effective March 1, 2026. This change applies to all existing and new FTMO accounts.' },
      { type: 'h2', text: 'What Changed?' },
      { type: 'p', text: 'Previously, traders started at an 80% profit split and could negotiate up to 90% after a track record of consistent profitability. Now, all traders receive the 90% split from day one of their funded account.' },
      { type: 'callout', text: '💡 This means for every $10,000 in profit, traders keep $9,000 — an extra $1,000 compared to the old 80% default split.' },
      { type: 'h2', text: 'Why Did FTMO Make This Change?' },
      { type: 'p', text: 'In a statement on their official blog, FTMO cited increased competition in the prop trading space and a commitment to rewarding traders fairly. "We believe funded traders deserve the best possible conditions," the statement read.' },
      { type: 'p', text: 'The change also comes amid increased scrutiny of prop firm fee structures from the wider financial community. FTMO appears to be proactively positioning itself as the most trader-friendly option on the market.' },
      { type: 'h2', text: 'Does This Affect the Evaluation?' },
      { type: 'p', text: 'No — the evaluation rules remain identical. You still need to pass the two-phase FTMO Challenge with a 10% profit target in Phase 1 and 5% in Phase 2, while respecting daily and maximum drawdown limits.' },
      { type: 'h2', text: 'How to Get Started With FTMO' },
      { type: 'p', text: 'If you\'re considering starting an FTMO Challenge, PropCoupons has a verified discount code that saves you up to 10% off the challenge fee. Simply use code PROPDISC at checkout.' },
      { type: 'cta', firm: 'FTMO', code: 'PROPDISC', discount: '10%', link: 'https://ftmo.com' },
    ],
    relatedSlugs: ['ftmo-vs-fundednext-2026', 'passing-ftmo-challenge-tips', 'prop-firm-payout-reliability-2026'],
  },
  'fundednext-stellar-model-2026': {
    title: 'FundedNext Launches New Stellar 1-Phase Evaluation',
    category: 'News', firm: 'FundedNext', date: 'February 28, 2026', readTime: '5 min',
    tag: 'New Model', tagColor: 'bg-purple-100 text-purple-700',
    excerpt: 'FundedNext\'s streamlined evaluation model with a single 10% profit target and no time limits.',
    content: [
      { type: 'lead', text: 'FundedNext has officially launched its Stellar model — a single-phase evaluation that requires only a 10% profit target with no minimum trading days and no time limit. It\'s one of the most accessible prop firm models available in 2026.' },
      { type: 'h2', text: 'What Is the Stellar Model?' },
      { type: 'p', text: 'The Stellar model replaces the traditional 2-phase evaluation with a single phase. Traders need to hit a 10% profit target while keeping daily drawdown under 5% and overall drawdown under 10%. There is no time limit.' },
      { type: 'callout', text: '🚀 What makes it unique: Traders earn 15% profit share even during the evaluation phase — before they\'re even funded.' },
      { type: 'h2', text: 'Stellar vs Express: Which Should You Choose?' },
      { type: 'p', text: 'FundedNext\'s Express model is the classic 2-phase evaluation at a lower entry price. The Stellar model costs more upfront but offers faster funding with just one phase. For experienced traders, Stellar is often worth the premium.' },
      { type: 'h2', text: 'Current FundedNext Discount Code' },
      { type: 'p', text: 'FundedNext is currently offering a 20% discount — the highest in the industry. Use the code below before purchasing any challenge.' },
      { type: 'cta', firm: 'FundedNext', code: 'FNDISC20', discount: '20%', link: 'https://fundednext.com' },
    ],
    relatedSlugs: ['ftmo-vs-fundednext-2026', 'best-prop-firm-discounts-2026', 'prop-firm-regulations-2026'],
  },
  'best-prop-firm-discounts-2026': {
    title: 'Best Prop Firm Discount Codes in 2026 (Updated Weekly)',
    category: 'Deals', firm: null, date: 'February 22, 2026', readTime: '6 min',
    tag: 'Updated', tagColor: 'bg-emerald-100 text-emerald-700',
    excerpt: 'The full updated list of verified prop firm discount codes for March 2026, ranked by savings potential.',
    content: [
      { type: 'lead', text: 'We track and verify every discount code across 20+ prop trading firms. Below is our complete, updated list for March 2026, ranked by the percentage discount offered.' },
      { type: 'h2', text: 'Top Discount Codes This Month' },
      { type: 'p', text: 'The best discounts this month come from FundedNext (20%), Topstep (20%), and Blueberry Funded (20%). The5%ers and Goat Funded Trader both offer 15% off.' },
      { type: 'callout', text: '✅ All codes below are verified and tested within the last 7 days. Expired codes are removed immediately.' },
      { type: 'h2', text: 'How We Verify Codes' },
      { type: 'p', text: 'Our team tests each code by going through the checkout process of every prop firm on our list. We check codes every Tuesday and update the site in real time. We also accept community submissions via our contact page.' },
      { type: 'h2', text: 'How Much Can You Save?' },
      { type: 'p', text: 'On a $100K FTMO Challenge ($540), a 10% discount saves you $54. On a $100K FundedNext Express (~$600), a 20% code saves $120. These savings add up quickly if you need to re-attempt challenges.' },
      { type: 'h2', text: 'Browse All Live Deals' },
      { type: 'cta', firm: null, code: null, discount: null, link: '/' },
    ],
    relatedSlugs: ['ftmo-profit-split-increase-2026', 'fundednext-stellar-model-2026', 'ftmo-vs-fundednext-2026'],
  },
  'ftmo-vs-fundednext-2026': {
    title: 'FTMO vs FundedNext 2026: Which Should You Choose?',
    category: 'Compare', firm: null, date: 'February 20, 2026', readTime: '10 min',
    tag: 'Guide', tagColor: 'bg-orange-100 text-orange-700',
    excerpt: 'A detailed, data-driven comparison of the two most popular prop firms.',
    content: [
      { type: 'lead', text: 'FTMO and FundedNext are the two most popular prop firms among retail traders in 2026. Both offer competitive conditions, verified payouts, and discount codes. But which one is right for you?' },
      { type: 'h2', text: 'Brand Trust & Track Record' },
      { type: 'p', text: 'FTMO wins here. Founded in 2015, FTMO has over a decade of track record and has paid out hundreds of millions of dollars to traders globally. FundedNext, founded in 2022, is newer but has grown rapidly with a strong community following.' },
      { type: 'h2', text: 'Profit Split' },
      { type: 'p', text: 'Both offer 90% profit split as of 2026. FundedNext goes further — it pays 15% profit share even during the evaluation phase, which FTMO does not offer.' },
      { type: 'callout', text: '🏆 Winner: FundedNext (evaluation profit share is unique)' },
      { type: 'h2', text: 'Evaluation Model' },
      { type: 'p', text: 'FTMO offers a classic 2-phase evaluation. FundedNext offers both 2-phase (Express) and 1-phase (Stellar). If you want a faster path to funding, FundedNext\'s Stellar model wins.' },
      { type: 'h2', text: 'Discount Codes' },
      { type: 'p', text: 'FundedNext currently offers 20% off — the highest discount in the industry. FTMO offers 10% off via PropCoupons. If saving on your evaluation is a priority, FundedNext wins.' },
      { type: 'h2', text: 'Our Verdict' },
      { type: 'p', text: 'Choose FTMO if you want the most trusted brand, the best support, and a proven track record. Choose FundedNext if you want a bigger discount, faster funding path, or profit share during evaluation.' },
      { type: 'cta', firm: 'Both', code: null, discount: null, link: '/compare' },
    ],
    relatedSlugs: ['ftmo-profit-split-increase-2026', 'fundednext-stellar-model-2026', 'passing-ftmo-challenge-tips'],
  },
  'passing-ftmo-challenge-tips': {
    title: '7 Proven Tips to Pass the FTMO Challenge First Time',
    category: 'Tips', firm: 'FTMO', date: 'February 18, 2026', readTime: '7 min',
    tag: 'Tips', tagColor: 'bg-yellow-100 text-yellow-700',
    excerpt: 'The exact strategies that help traders pass the FTMO evaluation without busting.',
    content: [
      { type: 'lead', text: 'The FTMO Challenge has a pass rate of around 10% first attempt — but experienced traders who apply structured risk management do much better. Here are 7 tips that make the difference.' },
      { type: 'h2', text: '1. Risk No More Than 0.5% Per Trade' },
      { type: 'p', text: 'The biggest challenge killer is over-leveraging. With a 5% daily drawdown limit, you can only afford 5-10 bad trades at 0.5% risk before you breach. Keep your per-trade risk small and consistent.' },
      { type: 'h2', text: '2. Skip the First 3 Days' },
      { type: 'p', text: 'The minimum trading days requirement is 4. Many traders get wiped out in the first few days trying to get ahead. Wait for confirmed setups — there\'s no rush.' },
      { type: 'h2', text: '3. Treat It Like a Real Account' },
      { type: 'p', text: 'Psychological pressure causes traders to over-trade in a challenge. Treat every session as if it\'s your own capital at stake. The mindset shift is critical.' },
      { type: 'callout', text: '💡 Pro tip: Journal every trade. FTMO\'s trader analyser shows patterns in your losers that you might not notice otherwise.' },
      { type: 'h2', text: '4. Avoid Trading Around High-Impact News' },
      { type: 'p', text: 'While FTMO allows news trading, spreads widen dramatically around major announcements like NFP and FOMC. Unless you have a specific news trading strategy, avoid these windows.' },
      { type: 'h2', text: '5. Stop Trading Once You Hit 50% of Your Daily Loss Limit' },
      { type: 'p', text: 'If you\'re down 2.5% on the day (half of the 5% daily limit), stop. Come back tomorrow. Revenge trading after losses is the fastest way to breach.' },
      { type: 'h2', text: '6. Front-Load Your Target in Week 1' },
      { type: 'p', text: 'If you can get to 6-7% profit in the first two weeks, you can coast through the second half of the challenge with minimal risk. Momentum matters.' },
      { type: 'h2', text: '7. Use a Discount Code to Reduce Your Break-Even Point' },
      { type: 'p', text: 'Using a 10% off code reduces your challenge fee. Fewer dollars at risk means less psychological pressure and a lower break-even point for your first funded account payout.' },
      { type: 'cta', firm: 'FTMO', code: 'PROPDISC', discount: '10%', link: 'https://ftmo.com' },
    ],
    relatedSlugs: ['ftmo-profit-split-increase-2026', 'ftmo-vs-fundednext-2026', 'prop-firm-payout-reliability-2026'],
  },
  'mubite-review-2026': {
    title: 'Mubite Review 2026 | Crypto Prop Firm with 750+ Pairs & No Restrictions',
    category: 'Review', firm: 'Mubite', date: 'April 15, 2026', readTime: '6 min',
    tag: 'Sponsored', tagColor: 'bg-indigo-100 text-indigo-700',
    excerpt: 'Mubite is a crypto-focused prop firm offering 750+ pairs, 100x leverage, and zero trading restrictions on Bybit and Cleo platforms. Use code PROPMUB for 20% off.',
    content: [
      { type: 'lead', text: 'Mubite is one of the few prop firms built exclusively for crypto traders. With access to 750+ crypto pairs, 100x leverage, and zero trading restrictions across Bybit and Cleo platforms, it\'s a compelling option for serious crypto traders looking to scale with funded capital.' },
      { type: 'h2', text: 'What is Mubite?' },
      { type: 'p', text: 'Mubite is a cryptocurrency-focused proprietary trading firm that provides funded accounts to traders who can demonstrate consistent performance. Unlike most prop firms that focus on forex and indices, Mubite specialises entirely in crypto markets — giving traders access to over 750 pairs across both Bybit and Cleo trading platforms.' },
      { type: 'h2', text: 'Key Features' },
      { type: 'p', text: '750+ crypto pairs including Bitcoin, Ethereum and hundreds of altcoins. Two platform options — Bybit and Cleo. Leverage up to 100x. Instant Funding available with no evaluation required.' },
      { type: 'callout', text: '✅ Zero restrictions — news trading, weekend holding, scalping, EAs, and copy trading are all permitted at Mubite.' },
      { type: 'h2', text: 'Challenge Types' },
      { type: 'p', text: '1-Step Challenge: Single phase evaluation — hit your profit target once and move to funded. Fastest path for confident traders.' },
      { type: 'p', text: '2-Step Challenge: Two phase evaluation with standard drawdown rules. Good for traders who prefer a structured approach.' },
      { type: 'p', text: 'Instant Funding: Skip the evaluation entirely. Start trading with funded capital from day one — no waiting, no phases.' },
      { type: 'h2', text: 'Who is Mubite For?' },
      { type: 'p', text: 'Mubite is built for crypto traders. If forex or indices are your primary markets, firms like FTMO or FundedNext are a better fit. But if you trade Bitcoin, altcoins, or any of the 750+ pairs on Bybit or Cleo, Mubite gives you funded capital with the flexibility to trade exactly how you want.' },
      { type: 'callout', text: '💡 Algorithmic traders and EA users are fully welcome at Mubite — no strategy bans of any kind.' },
      { type: 'h2', text: 'Pros & Cons' },
      { type: 'p', text: 'Pros: 750+ crypto pairs, zero trading restrictions, 100x leverage, Bybit and Cleo platforms supported, Instant Funding available, crypto payouts, EAs and copy trading allowed.' },
      { type: 'p', text: 'Cons: Crypto only — no forex or indices. Newer firm with fewer community reviews than established players.' },
      { type: 'h2', text: 'Get 20% Off Your Mubite Challenge' },
      { type: 'p', text: 'Use our exclusive code PROPMUB at checkout to get 20% off any Mubite challenge or Instant Funding account. Verified and active as of April 2026.' },
      { type: 'cta', firm: 'Mubite', code: 'PROPMUB', discount: '20%', link: 'https://mubite.com' },
    ],
    relatedSlugs: ['best-prop-firm-discounts-2026', 'ftmo-vs-fundednext-2026', 'prop-firm-payout-reliability-2026'],
  },
};

const RELATED_META: Record<string, { title: string; category: string; date: string; readTime: string }> = {
  'ftmo-profit-split-increase-2026': { title: 'FTMO Increases Profit Split to 90%', category: 'News', date: 'Mar 1, 2026', readTime: '4 min' },
  'fundednext-stellar-model-2026': { title: 'FundedNext Launches Stellar 1-Phase Model', category: 'News', date: 'Feb 28, 2026', readTime: '5 min' },
  'best-prop-firm-discounts-2026': { title: 'Best Prop Firm Discount Codes in 2026', category: 'Deals', date: 'Feb 22, 2026', readTime: '6 min' },
  'ftmo-vs-fundednext-2026': { title: 'FTMO vs FundedNext 2026 Comparison', category: 'Compare', date: 'Feb 20, 2026', readTime: '10 min' },
  'passing-ftmo-challenge-tips': { title: '7 Tips to Pass FTMO First Time', category: 'Tips', date: 'Feb 18, 2026', readTime: '7 min' },
  'prop-firm-payout-reliability-2026': { title: 'Which Prop Firms Actually Pay? 2026 Report', category: 'Research', date: 'Feb 10, 2026', readTime: '12 min' },
  'prop-firm-regulations-2026': { title: 'Prop Firm Regulations: 2026 Guide', category: 'Industry', date: 'Feb 25, 2026', readTime: '8 min' },
  'mubite-review-2026': { title: 'Mubite Review 2026 | Crypto Prop Firm', category: 'Review', date: 'Apr 15, 2026', readTime: '6 min' },
};

// ── Content block renderer ────────────────────────────────────────────────────
const ContentBlock: React.FC<{ block: any; onCopy: (code: string) => void }> = ({ block, onCopy }) => {
  switch (block.type) {
    case 'lead':
      return <p className="text-lg text-gray-700 leading-relaxed font-medium border-l-4 border-blue-500 pl-5 bg-blue-50/40 py-3 rounded-r-xl mb-6">{block.text}</p>;
    case 'h2':
      return <h2 className="text-xl font-black text-gray-900 mt-8 mb-3">{block.text}</h2>;
    case 'p':
      return <p className="text-gray-600 leading-relaxed mb-4 text-sm">{block.text}</p>;
    case 'callout':
      return (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 my-5">
          <p className="text-sm font-bold text-amber-800">{block.text}</p>
        </div>
      );
    case 'cta':
      return (
        <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] rounded-2xl p-6 my-6 text-white">
          {block.firm && block.code ? (
            <>
              <p className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-2">🔥 Best {block.firm} Discount</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <p className="text-xs text-slate-400 mb-1">Discount Code</p>
                  <code className="text-blue-300 font-black font-mono text-xl tracking-wider">{block.code}</code>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Save</p>
                  <p className="text-4xl font-black text-emerald-400">{block.discount}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onCopy(block.code)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-black py-3 rounded-xl transition-all active:scale-95">
                  <Copy className="w-4 h-4" /> Copy Code
                </button>
                <a href={block.link} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3 rounded-xl transition-all active:scale-95">
                  <ExternalLink className="w-4 h-4" /> Visit {block.firm}
                </a>
              </div>
            </>
          ) : (
            <>
              <p className="font-black text-lg mb-1">See All Live Discount Codes</p>
              <p className="text-slate-400 text-sm mb-4">Verified codes for 20+ prop firms, updated weekly.</p>
              <Link href={block.link}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black px-6 py-3 rounded-xl transition-all active:scale-95">
                View All Deals <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>
      );
    default:
      return null;
  }
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BlogPostPage({ params }: { params: any }) {
  const [toast, setToast] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'done'>('idle');
  const article = ARTICLES[params.slug] ?? {
    title: 'Article Not Found',
    category: 'Blog', firm: null, date: '', readTime: '',
    tag: 'Article', tagColor: 'bg-gray-100 text-gray-600',
    excerpt: '',
    content: [{ type: 'p', text: 'This article could not be found. Please check back soon.' }],
    relatedSlugs: [],
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setToast(`✅ Copied ${code}!`);
      setTimeout(() => setToast(null), 3000);
    });
  };

  const subscribe = async () => {
    if (!email) return;
    try {
      await fetch("https://buttondown.email/api/emails/embed-subscribe/propcoupouns", {
        method: "POST", body: new URLSearchParams({ email }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    } finally { setSubStatus('done'); }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`text-xs font-black px-3 py-1.5 rounded-full ${article.tagColor}`}>{article.tag}</span>
            <span className="text-xs font-bold text-slate-400 bg-white/5 px-3 py-1.5 rounded-full">{article.category}</span>
            {article.firm && (
              <Link href={`/prop-firms/${article.firm.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs font-bold text-blue-300 hover:text-blue-200 bg-blue-500/10 px-3 py-1.5 rounded-full transition-colors">
                {article.firm} →
              </Link>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{article.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime} read</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />PropCoupons Editorial</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Article Body */}
          <article className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
              {article.content.map((block: any, i: number) => (
                <ContentBlock key={i} block={block} onCopy={copyCode} />
              ))}
            </div>

            {/* Share */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="font-black text-gray-900 text-sm mb-3">Share this article</p>
              <div className="flex gap-2">
                {[
                  { icon: Twitter, label: 'Twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`, color: 'bg-sky-500' },
                  { icon: Linkedin, label: 'LinkedIn', href: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, color: 'bg-blue-700' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-2 ${s.color} hover:opacity-90 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all`}>
                    <s.icon className="w-3.5 h-3.5" /> {s.label}
                  </a>
                ))}
                <button onClick={() => { navigator.clipboard.writeText(shareUrl); setToast('Link copied!'); setTimeout(() => setToast(null), 2000); }}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all">
                  <Link2 className="w-3.5 h-3.5" /> Copy Link
                </button>
              </div>
            </div>

            {/* Related Posts */}
            {article.relatedSlugs?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-black text-gray-900 mb-4">Related Articles</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {article.relatedSlugs.map((slug: string) => {
                    const meta = RELATED_META[slug];
                    if (!meta) return null;
                    return (
                      <Link key={slug} href={`/blog/${slug}`}
                        className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-blue-200 transition-all">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{meta.category}</span>
                        <p className="mt-2 text-sm font-black text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">{meta.title}</p>
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Clock className="w-3 h-3" />{meta.readTime}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] rounded-2xl p-5 text-white border border-[#1a3a5c]">
              <Bell className="w-8 h-8 text-emerald-400 mb-3" />
              <h3 className="font-black text-lg mb-1">Get Weekly Deals</h3>
              <p className="text-slate-400 text-xs mb-4">5,000+ traders get new codes every Tuesday. Free.</p>
              {subStatus === 'done' ? (
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle className="w-4 h-4" /> You're subscribed!
                </div>
              ) : (
                <>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && subscribe()}
                    placeholder="your@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm mb-2 transition-colors" />
                  <button onClick={subscribe}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-2.5 rounded-xl transition-all active:scale-95 text-sm">
                    Subscribe Free →
                  </button>
                </>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4 text-sm">Quick Links</h3>
              {[
                { label: '🔥 View All Deals', href: '/' },
                { label: '⚖️ Compare Firms', href: '/compare' },
                { label: '🏢 All Prop Firms', href: '/prop-firms' },
                { label: '📚 Trading Books', href: '/books' },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 hover:text-blue-600 transition-colors group">
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">{l.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </Link>
              ))}
            </div>

            {/* Top Deals */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4 text-sm flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" /> Hot Deals Right Now
              </h3>
              {[
                { firm: 'FundedNext', code: 'FNDISC20', discount: '20%', slug: 'funded-next' },
                { firm: 'FTMO', code: 'PROPDISC', discount: '10%', slug: 'ftmo' },
                { firm: 'The5%ers', code: 'T5DISC', discount: '15%', slug: 'the5ers' },
              ].map(d => (
                <div key={d.firm} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-xs font-black text-gray-800">{d.firm}</p>
                    <code className="text-xs font-mono text-blue-600 font-bold">{d.code}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-emerald-600">{d.discount}</span>
                    <button onClick={() => copyCode(d.code)}
                      className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                      <Copy className="w-3 h-3 text-blue-600" />
                    </button>
                  </div>
                </div>
              ))}
              <Link href="/" className="block text-center text-xs font-black text-blue-600 hover:underline mt-3">
                View All 20+ Deals →
              </Link>
            </div>
          </aside>
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