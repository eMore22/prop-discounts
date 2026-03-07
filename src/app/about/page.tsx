import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield, Heart, TrendingUp, Users, Award, Target,
  CheckCircle, ArrowRight, Zap, Eye, Star, DollarSign
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About PropCoupons — Verified Prop Firm Discount Codes',
  description: 'PropCoupons helps traders save money on prop firm challenges with verified discount codes. 15+ firms, 50+ active deals, 10K+ traders helped.',
  keywords: 'about propcoupons, prop firm discounts, trading discounts, funded account deals',
  openGraph: {
    title: 'About PropCoupons — Trusted Prop Trading Discount Source',
    description: 'We help traders save money on prop firm challenges with verified discount codes.',
    type: 'website',
  }
};

const stats = [
  { number: '15+', label: 'Prop Firms', icon: Star },
  { number: '50+', label: 'Active Deals', icon: Zap },
  { number: '10K+', label: 'Traders Helped', icon: Users },
  { number: '$500K+', label: 'Total Saved', icon: DollarSign },
];

const values = [
  {
    icon: Shield,
    title: 'Verified Weekly',
    description: 'Every code is tested personally before listing. Expired codes are removed immediately. When you see our badge, it worked within 7 days.',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Heart,
    title: 'Built by Traders',
    description: "We've passed the evaluations, hit the drawdown limits, and felt the relief of getting funded. That experience shapes every recommendation we make.",
    accent: 'from-rose-500 to-pink-500',
  },
  {
    icon: Eye,
    title: 'Fully Transparent',
    description: 'Every link is an affiliate link — we disclose this clearly. Our prop scores are based purely on trader feedback, never on commission rates.',
    accent: 'from-blue-500 to-indigo-500',
  },
  {
    icon: TrendingUp,
    title: 'Always Improving',
    description: "We track payout reports, rule changes, and community feedback. If a firm drops its standards, our prop score reflects it — partnership or not.",
    accent: 'from-amber-500 to-orange-500',
  },
];

const timeline = [
  { year: '2023', title: 'Founded', desc: 'Started as a spreadsheet shared among 5 traders who were tired of missing discount codes.' },
  { year: '2023', title: '1,000 Traders', desc: 'Word spread through trading communities. We built the first version of the website.' },
  { year: '2024', title: 'First Partnerships', desc: 'Direct relationships with FTMO, FundedNext, and The5ers unlocked exclusive deals.' },
  { year: '2024', title: '10,000 Traders', desc: "$500K+ saved by our community. Launched the Prop Score rating system." },
  { year: '2025', title: 'Full Platform', desc: 'Compare tool, firm reviews, trader voting, and a live deal alert system launched.' },
  { year: '2026', title: 'Today', desc: '15+ verified firms, weekly code verification, and growing every day.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#060d1f] via-[#0a1628] to-[#060d1f]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative max-w-5xl mx-auto px-4 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-full text-sm font-bold mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight">
            Saving Traders<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
              Real Money
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            PropCoupons was built by prop traders who were frustrated paying full price for challenges when discount codes existed — but were impossible to find in one place.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black px-8 py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/30">
            View All Deals <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#060d1f] to-[#0d1f3c] border-t border-[#1a3a5c]">
        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ number, label, icon: Icon }) => (
            <div key={label}>
              <Icon className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-black text-white mb-1">{number}</div>
              <div className="text-slate-400 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20 space-y-20">

        {/* ── Mission ──────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-5">
              <Target className="w-3.5 h-3.5" /> Our Mission
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-5 leading-tight">
              Make prop trading<br />more affordable
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Starting your prop trading journey is expensive. A single FTMO challenge can cost $155–$1,080. Missing a 10% discount code is real money left on the table — sometimes enough for another attempt after a failed evaluation.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We built PropCoupons so no trader ever has to pay full price again. We work directly with prop firms, verify every code personally, and update our listings weekly — completely free for traders.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] rounded-2xl p-8 border border-[#1a3a5c]">
            <div className="space-y-4">
              {[
                'Codes verified within 7 days',
                'Direct partnerships with 15+ firms',
                'Exclusive codes not found elsewhere',
                'Instant removal when codes expire',
                'Honest prop scores — no pay-to-rank',
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Values ───────────────────────────────────────────────────── */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">How We Operate</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Four principles that guide every decision we make</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {values.map(({ icon: Icon, title, description, accent }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all group">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${accent} mb-5`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Timeline ─────────────────────────────────────────────────── */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">How We Got Here</h2>
            <p className="text-gray-500">From a shared spreadsheet to a platform used by 10,000+ traders</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-emerald-200 to-transparent" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 md:text-right hidden md:block">
                    {i % 2 === 0 ? (
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 inline-block text-left max-w-xs">
                        <p className="text-xs font-black text-blue-600 mb-1">{item.year}</p>
                        <p className="font-black text-gray-900 mb-1">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    ) : <div />}
                  </div>
                  <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white text-xs font-black">{item.year.slice(2)}</span>
                  </div>
                  <div className="flex-1">
                    {i % 2 !== 0 ? (
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 inline-block max-w-xs">
                        <p className="text-xs font-black text-blue-600 mb-1">{item.year}</p>
                        <p className="font-black text-gray-900 mb-1">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    ) : (
                      <div className="md:hidden bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <p className="text-xs font-black text-blue-600 mb-1">{item.year}</p>
                        <p className="font-black text-gray-900 mb-1">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Transparency ─────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] rounded-2xl p-8 md:p-12 border border-[#1a3a5c]">
          <h2 className="text-2xl font-black text-white mb-4">Our Affiliate Disclosure</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            We earn commissions when you purchase a prop firm challenge using our links. This keeps the platform free for traders. However, we never let commissions influence our Prop Scores — those are based entirely on trader feedback, payout reliability, rule fairness, and overall value.
          </p>
          <p className="text-slate-400 leading-relaxed">
            We've ended partnerships with firms that failed their traders — even when it cost us revenue. If that ever changes, we'll tell you. Our community comes first.
          </p>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <div className="text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Ready to stop overpaying?</h2>
          <p className="text-gray-500 mb-8">Browse verified discount codes for every major prop firm — updated weekly.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black px-8 py-4 rounded-xl hover:shadow-lg transition-all">
              View All Deals <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/compare" className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-8 py-4 rounded-xl hover:border-blue-300 transition-all">
              Compare Firms
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}