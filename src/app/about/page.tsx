// ============================================================
// FILE: src/app/about/page.tsx
// ============================================================

import Link from 'next/link';
import { Metadata } from 'next';
import {
  Shield, Heart, TrendingUp, Eye, ArrowRight,
  Zap, Users, DollarSign, Star, CheckCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Prop Firm Discounts — Built by a Trader, for Traders',
  description: 'Meet Eugene Uguomore, the DevOps engineer and trader who built Prop Firm Discounts from scratch after losing a prop firm account. Verified discount codes for 20+ prop firms.',
  keywords: 'about prop firm discounts, eugene uguomore, prop firm discount codes, funded trader platform',
  openGraph: {
    title: 'About Prop Firm Discounts — Built by a Trader, for Traders',
    description: 'Meet the founder who lost a prop account, rebuilt from scratch, and created tools to help traders save money and stay compliant.',
    type: 'website',
  }
};

const stats = [
  { number: '5+', label: 'Years in Tech', icon: Star },
  { number: '20+', label: 'Prop Firms', icon: Zap },
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
    title: 'Built by a Trader',
    description: "I've passed evaluations, hit drawdown limits, and felt the relief of getting funded — and the pain of losing an account. That experience shapes every recommendation here.",
    accent: 'from-rose-500 to-pink-500',
  },
  {
    icon: Eye,
    title: 'Fully Transparent',
    description: 'Every link is an affiliate link — disclosed clearly. Prop scores are based purely on trader feedback, never on commission rates.',
    accent: 'from-blue-500 to-indigo-500',
  },
  {
    icon: TrendingUp,
    title: 'Always Improving',
    description: "I track payout reports, rule changes, and community feedback. If a firm drops its standards, the prop score reflects it — partnership or not.",
    accent: 'from-amber-500 to-orange-500',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#060d1f]">

      {/* ── Hero / Founder ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">

            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="relative w-40 h-40 md:w-52 md:h-52">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/30 to-blue-500/30 blur-xl" />
                <img
                  src="/eugene.jpg"
                  alt="Eugene Uguomore — Founder of Prop Firm Discounts"
                  className="relative w-full h-full object-cover rounded-2xl border border-white/10 shadow-2xl"
                />
              </div>
            </div>

            {/* Intro */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold mb-4">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Founder & Developer
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight tracking-tight">
                Eugene Uguomore
              </h1>
              <p className="text-emerald-400 font-bold text-base md:text-lg mb-4">
                DevOps Engineer · Trader · Builder
              </p>
              <p className="text-slate-400 text-base leading-relaxed max-w-xl">
                I built Prop Firm Discounts because I know what it feels like to lose a prop account when money is already tight. This platform exists so traders don't have to pay full price to get back in the game.
              </p>

              <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                <a href="https://www.propsentinel.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all">
                  🛡 PropSentinel
                </a>
                <a href="https://www.linkedin.com/in/eugene-uguomore-0165a2127" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-bold px-4 py-2 rounded-xl transition-all">
                  in LinkedIn
                </a>
                <a href="https://twitter.com/jully_son" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-bold px-4 py-2 rounded-xl transition-all">
                  𝕏 @jully_son
                </a>
                <a href="https://github.com/eMore22" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-bold px-4 py-2 rounded-xl transition-all">
                  ⌥ GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#060d1f] to-[#0d1f3c] border-b border-white/8">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ number, label, icon: Icon }) => (
            <div key={label}>
              <Icon className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-black text-white mb-1">{number}</div>
              <div className="text-slate-400 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Story ─────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-14 md:py-20">

        <blockquote className="border-l-4 border-emerald-400 pl-6 mb-12">
          <p className="text-xl md:text-2xl font-bold text-white leading-snug italic">
            "If I don't rebuild myself, nobody will do it for me."
          </p>
        </blockquote>

        <div className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed">

          <p>
            Growing up in Nigeria taught me two things early: life can get hard fast, and nobody is coming to save you. For a long time I felt stuck between wanting more and not knowing where to even start. I lost time, money, opportunities, and confidence. I made mistakes in trading, business, and life.
          </p>

          <p>
            One of the hardest moments came when I lost a prop firm account at a time when things were already tough. Not just the money — the confidence that went with it. But every single time I fell, I built something that reminded me I wasn't done yet.
          </p>

          <p>
            My journey into tech wasn't something I planned. It started from curiosity, then survival, then passion. I learned cybersecurity, automation, trading systems, and DevOps. I learned how to take an idea and turn it into a real working product. Little by little, everything I learned became something I built.
          </p>

          <p>
            The turning point came when I decided to take every skill I had — tech, cybersecurity, automation, trading knowledge — and use them to build real products that help people. Instead of trying to survive, I started creating.
          </p>

          <p>
            I built <strong className="text-white">Prop Firm Discounts</strong> because I watched traders struggle to afford challenges while trying to break into the industry. The idea was simple: one place where traders could find verified discount codes for every major prop firm, updated regularly, with no BS. I built it because I know how that feels.
          </p>

          <p>
            Then came <strong className="text-white">PropSentinel</strong> — a real-time risk and compliance monitoring platform built on microservices, integrated directly with MT4/MT5. It tracks performance, flags rule violations before they happen, and gives traders a clear view of what's happening in their accounts in real time. I built it because I saw how much stress traders go through, and how easy it is to fail even when you're skilled.
          </p>

          {/* Platform cards */}
          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
              <div className="text-2xl mb-2">🏷</div>
              <h3 className="text-white font-black text-base mb-1">Prop Firm Discounts</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">Verified discount codes for 20+ prop firms. Updated weekly. Used by thousands of traders to save on challenge fees.</p>
              <a href="https://propcoupouns.com" className="text-emerald-400 text-sm font-bold hover:underline">propcoupouns.com →</a>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl p-5">
              <div className="text-2xl mb-2">🛡</div>
              <h3 className="text-white font-black text-base mb-1">PropSentinel</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">Real-time risk monitoring and compliance platform for prop traders. MT4/MT5 integrated. Built on 8 independent microservices.</p>
              <a href="https://propsentinel.com" className="text-blue-400 text-sm font-bold hover:underline">propsentinel.com →</a>
            </div>
          </div>

          <p>
            Today I'm still learning, still building, still growing. My goal is simple: to keep creating tools that solve real problems and help people take control of their financial future. If my story becomes a light for somebody else, then everything I went through was worth it.
          </p>

        </div>
      </section>

      {/* ── How I Operate (Values) ────────────────────────────────────── */}
      <section className="border-t border-white/8 bg-[#070e20]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">How I Operate</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Four principles that guide every decision on this platform</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {values.map(({ icon: Icon, title, description, accent }) => (
              <div key={title} className="bg-white/4 rounded-2xl p-7 border border-white/8 hover:border-white/15 transition-all">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${accent} mb-5`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ───────────────────────────────────────────── */}
      <section className="border-t border-white/8">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/15 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-5">
                What You Get
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
                Always free.<br />Always verified.
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Starting your prop trading journey is expensive. A single FTMO challenge can cost $155–$1,080. Missing a 10% discount code is real money left on the table — sometimes enough for another attempt after a failed evaluation.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Every code on this platform is personally verified before listing and removed the moment it expires. No stale codes. No wasted clicks.
              </p>
            </div>
            <div className="bg-white/4 rounded-2xl p-8 border border-white/8">
              <div className="space-y-4">
                {[
                  'Codes verified within 7 days',
                  'Direct partnerships with 20+ firms',
                  'Exclusive codes not found elsewhere',
                  'Instant removal when codes expire',
                  'Honest prop scores — no pay-to-rank',
                  'Trader voting and feedback system',
                  'Weekly newsletter with best deals',
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
        </div>
      </section>

      {/* ── Affiliate Disclosure ──────────────────────────────────────── */}
      <section className="border-t border-white/8 bg-[#070e20]">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-black text-white mb-4">Affiliate Disclosure</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            I earn commissions when you purchase a prop firm challenge using links on this site. This keeps the platform free for traders. However, commissions never influence Prop Scores — those are based entirely on trader feedback, payout reliability, rule fairness, and overall value.
          </p>
          <p className="text-slate-400 leading-relaxed">
            I've ended partnerships with firms that failed their traders — even when it cost revenue. If that ever changes, I'll tell you. The community comes first.
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="border-t border-white/8">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to stop overpaying?</h2>
          <p className="text-slate-500 mb-8">Browse verified discount codes for every major prop firm — updated weekly.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black px-8 py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20">
              View All Deals <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/compare"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-8 py-4 rounded-xl transition-all">
              Compare Firms
            </Link>
          </div>
          <p className="text-slate-600 text-sm mt-8">
            Questions? <a href="mailto:hello@propcoupouns.com" className="text-slate-400 hover:text-white transition-colors">hello@propcoupouns.com</a>
          </p>
        </div>
      </section>

    </div>
  );
}