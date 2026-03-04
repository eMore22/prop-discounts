"use client";

import React, { useState, useEffect } from 'react';
import { BarChart2, DollarSign } from 'lucide-react';
import { getDeals } from '@/lib/getDeals';

interface Deal {
  firm: string;
  code: string;
  discount: string;
  expiry: string | null;
}

export const ValueCalculator = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [challengeSize, setChallengeSize] = useState(50000);

  useEffect(() => {
    getDeals().then(raw => setDeals(
      raw.map(d => ({ firm: d.firm, code: d.code, discount: d.discount, expiry: d.expiry }))
    ));
  }, []);

  const activeDeals = deals.filter(d => !d.expiry || new Date(d.expiry) >= new Date());

  const top5 = [...activeDeals]
    .map(d => ({
      ...d,
      savings: (challengeSize * 0.01 * parseInt(d.discount.replace('%', ''))) / 100
    }))
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 5);

  return (
    <div className="bg-gradient-to-br from-[#0a0f1e] to-[#0d1f3c] rounded-2xl p-6 text-white border border-[#1a3a5c]">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-emerald-500/20 rounded-xl">
          <BarChart2 className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-black">Savings Calculator</h2>
          <p className="text-slate-400 text-xs">Live data · {activeDeals.length} active deals</p>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 mb-5 border border-white/10">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-slate-300">Challenge Account Size</label>
          <span className="text-emerald-400 font-black text-lg">${challengeSize.toLocaleString()}</span>
        </div>
        <input
          type="range" min="5000" max="200000" step="5000"
          value={challengeSize} onChange={e => setChallengeSize(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1.5">
          <span>$5K</span><span>$50K</span><span>$100K</span><span>$200K</span>
        </div>
      </div>

      <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
        Top 5 Savings Right Now
      </p>

      <div className="space-y-2">
        {top5.map((d, i) => (
          <div key={d.firm}
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-4 py-3 border border-white/5">
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                i === 0 ? 'bg-yellow-400 text-black' :
                i === 1 ? 'bg-slate-300 text-black' :
                i === 2 ? 'bg-amber-600 text-white' :
                'bg-white/10 text-white'
              }`}>{i + 1}</div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-white truncate">{d.firm}</p>
                <p className="text-xs text-slate-400">
                  {d.discount} off · <span className="font-mono text-emerald-400">{d.code}</span>
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-3">
              <p className="text-lg font-black text-emerald-400">${d.savings.toFixed(0)}</p>
              <p className="text-xs text-slate-500">saved</p>
            </div>
          </div>
        ))}

        {top5.length === 0 && (
          <div className="text-center py-4 text-slate-500 text-sm">Loading deals...</div>
        )}
      </div>
    </div>
  );
};