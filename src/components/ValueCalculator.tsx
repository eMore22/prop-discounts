"use client";

import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { discountCodes } from '@/lib/data';

export const ValueCalculator = () => {
  const [challengeSize, setChallengeSize] = useState<number>(50000);

  const calculateSavings = (discount: string, challengeSize: number) => {
    const percentage = parseInt(discount.replace('%', ''));
    const typicalCost = challengeSize * 0.01; // Assuming 1% of challenge size as typical cost
    return (typicalCost * percentage) / 100;
  };

  const sortedDeals = discountCodes
    .filter(firm => new Date(firm.expiry) >= new Date())
    .map(firm => ({
      ...firm,
      savings: calculateSavings(firm.discount, challengeSize)
    }))
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 5);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-10 h-10" />
        <div>
          <h2 className="text-3xl font-bold">Value Calculator</h2>
          <p className="text-blue-100">See how much you can save</p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
        <label className="block text-sm font-semibold mb-3">Challenge Account Size</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="5000"
            max="200000"
            step="5000"
            value={challengeSize}
            onChange={(e) => setChallengeSize(Number(e.target.value))}
            className="flex-1 h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold text-xl min-w-[140px] text-center">
            ${challengeSize.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Top 5 Savings Opportunities
        </h3>
        {sortedDeals.map((deal, index) => (
          <div key={deal.firm} className="bg-white/10 backdrop-blur rounded-lg p-4 flex items-center justify-between hover:bg-white/20 transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                index === 0 ? 'bg-yellow-400 text-yellow-900' :
                index === 1 ? 'bg-gray-300 text-gray-800' :
                index === 2 ? 'bg-orange-400 text-orange-900' :
                'bg-white/20'
              }`}>
                {index + 1}
              </div>
              <div>
                <p className="font-bold">{deal.firm}</p>
                <p className="text-sm text-blue-100">{deal.discount} discount</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-2xl font-bold">
                <DollarSign className="w-5 h-5" />
                {deal.savings.toFixed(0)}
              </div>
              <p className="text-xs text-blue-100">estimated savings</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};