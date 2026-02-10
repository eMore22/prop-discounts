"use client";

import React, { useState } from 'react';
import { Metadata } from 'next';
import { discountCodes } from '@/lib/data';
import { ArrowLeftRight, CheckCircle, XCircle, TrendingUp, Calendar, Tag, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ComparePage() {
  const [firm1, setFirm1] = useState(discountCodes[0]);
  const [firm2, setFirm2] = useState(discountCodes[1]);

  // Set metadata dynamically for client component
  React.useEffect(() => {
    document.title = 'Compare Prop Firms Side-by-Side | Best Discount Codes 2026';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Compare top prop firm discount codes side-by-side. See which prop firm offers the best deals on funded accounts. Updated February 2026.');
    }
  }, []);

  const compareItems = [
    { label: "Discount Amount", key: "discount", icon: Tag },
    { label: "Discount Code", key: "code", icon: Tag },
    { label: "Expiry Date", key: "expiry", icon: Calendar },
    { label: "Status", key: "status", icon: TrendingUp },
  ];

  const getFirmStatus = (firm: typeof firm1) => {
    const daysLeft = Math.floor((+new Date(firm.expiry) - +new Date()) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return { text: "Expired", color: "text-red-600", bg: "bg-red-100" };
    if (daysLeft <= 7) return { text: "Expiring Soon", color: "text-orange-600", bg: "bg-orange-100" };
    return { text: "Active", color: "text-green-600", bg: "bg-green-100" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ArrowLeftRight className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Compare Prop Firms</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Compare discount codes, expiry dates, and deals side-by-side
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Firm Selectors */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select First Firm
              </label>
              <select
                value={firm1.firm}
                onChange={(e) => setFirm1(discountCodes.find(f => f.firm === e.target.value) || firm1)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              >
                {discountCodes.map(firm => (
                  <option key={firm.firm} value={firm.firm}>{firm.firm}</option>
                ))}
              </select>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Second Firm
              </label>
              <select
                value={firm2.firm}
                onChange={(e) => setFirm2(discountCodes.find(f => f.firm === e.target.value) || firm2)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
              >
                {discountCodes.map(firm => (
                  <option key={firm.firm} value={firm.firm}>{firm.firm}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Firm 1 Card */}
            <div className="bg-white rounded-xl shadow-xl p-8 border-4 border-blue-500">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{firm1.firm}</h2>
                <p className="text-gray-600">{firm1.description}</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Discount</p>
                  <p className="text-5xl font-bold text-blue-600 mb-2">{firm1.discount}</p>
                  <code className="text-xl font-mono font-bold text-gray-800">{firm1.code}</code>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getFirmStatus(firm1).bg} ${getFirmStatus(firm1).color}`}>
                    {getFirmStatus(firm1).text}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Expires:</span>
                  <span className="font-semibold text-gray-900">{firm1.expiry}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link href={`/prop-firms/${firm1.firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-center transition-all">
                  View Details
                </Link>
                <a href={firm1.link} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all">
                  <ExternalLink className="w-4 h-4" />
                  Visit
                </a>
              </div>
            </div>

            {/* Firm 2 Card */}
            <div className="bg-white rounded-xl shadow-xl p-8 border-4 border-purple-500">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{firm2.firm}</h2>
                <p className="text-gray-600">{firm2.description}</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Discount</p>
                  <p className="text-5xl font-bold text-purple-600 mb-2">{firm2.discount}</p>
                  <code className="text-xl font-mono font-bold text-gray-800">{firm2.code}</code>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getFirmStatus(firm2).bg} ${getFirmStatus(firm2).color}`}>
                    {getFirmStatus(firm2).text}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Expires:</span>
                  <span className="font-semibold text-gray-900">{firm2.expiry}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link href={`/prop-firms/${firm2.firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold text-center transition-all">
                  View Details
                </Link>
                <a href={firm2.link} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all">
                  <ExternalLink className="w-4 h-4" />
                  Visit
                </a>
              </div>
            </div>
          </div>

          {/* Detailed Comparison Table */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <h3 className="text-2xl font-bold text-white text-center">Side-by-Side Comparison</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {compareItems.map((item) => {
                const Icon = item.icon;
                let value1, value2;
                
                if (item.key === "status") {
                  const status1 = getFirmStatus(firm1);
                  const status2 = getFirmStatus(firm2);
                  value1 = <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status1.bg} ${status1.color}`}>{status1.text}</span>;
                  value2 = <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status2.bg} ${status2.color}`}>{status2.text}</span>;
                } else {
                  value1 = firm1[item.key as keyof typeof firm1];
                  value2 = firm2[item.key as keyof typeof firm2];
                }

                return (
                  <div key={item.key} className="grid md:grid-cols-3 gap-4 p-6">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-400" />
                      <span className="font-semibold text-gray-700">{item.label}</span>
                    </div>
                    <div className="text-gray-900 font-medium">{value1}</div>
                    <div className="text-gray-900 font-medium">{value2}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Winner Banner */}
          <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl shadow-xl p-8 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">🏆 Best Value</h3>
            <p className="text-xl text-gray-800 mb-2">
              {parseInt(firm1.discount) > parseInt(firm2.discount) ? firm1.firm : firm2.firm}
            </p>
            <p className="text-gray-700">
              Offers the highest discount at {parseInt(firm1.discount) > parseInt(firm2.discount) ? firm1.discount : firm2.discount}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}