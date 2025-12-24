// Priority 2: src/app/prop-firms/page.tsx (Firms List Page)
"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getDeals } from '@/lib/getDeals';
import { Search, TrendingUp, Award, CheckCircle } from 'lucide-react';

interface FirmData {
  firm: string;
  code: string;
  discount: string;
  expiry: string;
  slug: string;
  description?: string;
  propScore?: number;
}

export default function FirmsPage() {
  const [firms, setFirms] = useState<FirmData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchFirms() {
      try {
        const deals = await getDeals();
        const firmData = deals.map(deal => ({
          firm: deal.firm,
          code: deal.code,
          discount: deal.discount,
          expiry: deal.expiry,
          slug: deal.firm.toLowerCase().replace(/\s+/g, '-'),
          description: deal.description,
          propScore: deal.propScore,
        }));
        setFirms(firmData);
      } catch (error) {
        console.error('Error fetching firms:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFirms();
  }, []);

  const filteredFirms = firms.filter(firm =>
    firm.firm.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Compare Prop Firms 2025 | Reviews & Discount Codes – Prop Coupons</title>
        <meta name="description" content="Compare top prop trading firms like FTMO, FundedNext, and The5ers. Get reviews, prop scores, rules, and exclusive discount codes for 2025." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Compare Top Prop Firms 2025</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">Discover the best prop trading firms with our detailed reviews, prop scores, rules comparisons, and exclusive discount codes.</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gray-700 mb-6">At Prop Coupons, we provide comprehensive comparisons of prop trading firms for 2025. We evaluate based on profit splits, drawdown rules, funding amounts, and more. Use our prop score system to find the best match for your trading style, whether forex, futures, or crypto. Plus, get exclusive promo codes to save on challenges. Our reviews are updated monthly to reflect the latest deals and rule changes.</p>
            
            <h2 className="text-2xl font-bold mb-4">Best Prop Firms for Beginners 2025</h2>
            <p className="text-gray-700 mb-6">For new traders, look for firms with relaxed rules and high prop scores like FundedNext (score 9/10) or FTMO (score 8.5/10). Compare profit splits (up to 90%), daily drawdown (5–6%), and overall limits (10–12%). Use our discount codes to get started cheaper.</p>

            <div className="relative max-w-xl mx-auto mb-12">
              <input
                type="text"
                placeholder="Search prop firms..."
                className="w-full py-4 px-6 rounded-full bg-white shadow-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-5 h-5 absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-xl p-6 shadow-md">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredFirms.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">No firms found matching your search</p>
                <p className="text-gray-500">Try searching for FTMO, FundedNext, or other popular firms</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFirms.map((firm) => (
                  <Link key={firm.slug} href={`/prop-firms/${firm.slug}`} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800">{firm.firm}</h3>
                        {firm.propScore && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Prop Score:</span>
                            <span className="font-bold text-purple-600">{firm.propScore}/10</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{firm.discount} discount with code {firm.code}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span>Expires {firm.expiry}</span>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-3">
                        {firm.description || 'Discover exclusive deals and detailed reviews for this top prop firm.'}
                      </p>
                      
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                        View Details
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}