import { Metadata } from 'next';
import ForexCalendar from '@/components/ForexCalendar';
import Link from 'next/link';
import { ArrowLeft, Activity, TrendingUp, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Forex Economic Calendar 2026 | PropCoupons',
  description: 'Track high-impact forex events, central bank decisions, and economic releases that affect prop trading firms. Updated live from Forex Factory.',
  openGraph: {
    title: 'Forex Economic Calendar | PropCoupons',
    description: 'High-impact forex events that move prop firm markets. Updated live.',
  },
};

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#060d1f] via-[#0a1628] to-[#060d1f]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-14">
          {/* Back link */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm font-bold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Deals
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                Live — Updated from Forex Factory
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
                Forex Economic<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Calendar
                </span>
              </h1>
              <p className="text-slate-400 text-base max-w-xl">
                Track high-impact economic events, central bank decisions, and data releases that move prop trading markets. Filter by impact level to focus on what matters.
              </p>
            </div>

            {/* Stat cards */}
            <div className="flex gap-3 flex-shrink-0">
              {[
                { icon: Activity, label: 'Live Events', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
                { icon: TrendingUp, label: 'Market Moving', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                { icon: Zap, label: 'Auto-Updated', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
              ].map(({ icon: Icon, label, color, bg }) => (
                <div key={label} className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border ${bg}`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className="text-white text-xs font-black whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <ForexCalendar />

        {/* Bottom CTA */}
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <Link href="/"
            className="group bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-emerald-500/20 transition-all">
            <Zap className="w-8 h-8 mb-3 text-emerald-200" />
            <h3 className="text-lg font-black mb-1">View Prop Firm Deals</h3>
            <p className="text-emerald-200 text-sm mb-3">Save up to 20% on your next prop challenge</p>
            <span className="inline-flex items-center gap-1 text-sm font-black group-hover:gap-2 transition-all">
              Browse Discounts <ArrowLeft className="w-4 h-4 rotate-180" />
            </span>
          </Link>
          <Link href="/compare"
            className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-slate-500/20 transition-all">
            <TrendingUp className="w-8 h-8 mb-3 text-slate-300" />
            <h3 className="text-lg font-black mb-1">Compare Prop Firms</h3>
            <p className="text-slate-400 text-sm mb-3">Side-by-side rules, splits & drawdown limits</p>
            <span className="inline-flex items-center gap-1 text-sm font-black group-hover:gap-2 transition-all">
              Open Tool <ArrowLeft className="w-4 h-4 rotate-180" />
            </span>
          </Link>
        </div>
      </div>

    </div>
  );
}