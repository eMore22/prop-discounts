"use client";

import React, { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getDeals } from '@/lib/getDeals';
import { Search, TrendingUp, Award, CheckCircle } from 'lucide-react';

// Note: Since this is a client component, metadata must be set in a parent layout
// or we need to make this a server component with a separate client component for interactivity

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
    // Set page metadata dynamically
    document.title = 'Compare Prop Firms 2025 | Reviews & Discount Codes – Prop Coupons';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Compare top prop trading firms like FTMO, FundedNext, and The5ers. Get reviews, prop scores, rules, and exclusive discount codes for 2025.');
    }

    async function fetchFirms() {
      try {
        const deals = await getDeals();
        const firmData = deals.map(deal => ({
          firm: deal.firm,
          code: deal.code,
          discount: deal.discount,
          expiry: deal.expiry || '',
          slug: deal.slug,
          description: deal.description,
          propScore: deal.prop_score || undefined,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Compare Top Prop Firms 2025</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">Discover the best prop trading firms with our detailed reviews, prop scores, rules comparisons, and exclusive discount codes updated for December 2025.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Prop Firm Comparison Guide 2025</h2>
            
            <p className="text-gray-700 mb-6">
              At Prop Coupon, we provide the most comprehensive comparisons of prop trading firms for 2025. We evaluate each firm based on critical factors including profit splits (ranging from 70% to 95%), drawdown rules, funding amounts (from $5,000 to $200,000), payout speed, and overall trading conditions. Our prop score system (rated out of 10) helps you quickly identify the best match for your trading style, whether you trade forex, futures, stocks, or crypto.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Prop Firms for Beginners in 2025</h2>
            <p className="text-gray-700 mb-6">
              For new traders, we recommend firms with relaxed rules and high prop scores. FundedNext (score 9/10) and FTMO (score 8.5/10) lead the pack with beginner-friendly policies. When comparing prop firms, focus on these key metrics: profit splits (typically 70-90%), daily drawdown limits (usually 5-6%), overall drawdown (10-12%), and minimum trading days required. Use our exclusive discount codes to reduce your entry costs by up to 50%.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">What to Look for When Comparing Prop Firms</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Profit Split:</strong> Higher is better - look for 80-90% splits</li>
              <li><strong>Account Size:</strong> Start small ($5k-$25k) if you're a beginner</li>
              <li><strong>Drawdown Rules:</strong> More lenient rules mean easier passing rates</li>
              <li><strong>Payout Speed:</strong> Best firms pay within 1-7 business days</li>
              <li><strong>Trading Rules:</strong> Check if weekend holding, news trading, and EAs are allowed</li>
              <li><strong>Scaling Plan:</strong> Can you grow your account to $200k+?</li>
              <li><strong>Challenge Cost:</strong> Use our codes to save 10-50% on evaluation fees</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-4">How Our Prop Score System Works</h3>
            <p className="text-gray-700 mb-6">
              Our prop score (out of 10) is calculated based on trader feedback, payout reliability, rule fairness, customer support quality, and overall value. Firms with scores above 9.0 represent the best options in the industry. Scores between 8.0-8.9 are excellent choices, while 7.0-7.9 are good but may have some limitations. We update these scores monthly based on the latest trader reviews and rule changes.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Top Prop Firm Categories</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Best for Forex Traders</h4>
                <p className="text-gray-700 text-sm">FTMO, FundedNext, and The5ers offer the most flexible forex trading rules with competitive spreads and high leverage options.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Best for Futures Traders</h4>
                <p className="text-gray-700 text-sm">Topstep and Apex Trader Funding specialize in futures with instant funding options and no daily loss limits.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Best Instant Funding</h4>
                <p className="text-gray-700 text-sm">InstantFunding and The5ers provide immediate capital without evaluation phases if you meet certain criteria.</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Best for Scalpers</h4>
                <p className="text-gray-700 text-sm">Take Profit Trader and E8 Markets allow unrestricted scalping strategies with no minimum trade duration.</p>
              </div>
            </div>
          </div>

          {/* Search and filtering UI - rest of component stays the same */}
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
                          <span className="text-gray-600 text-sm">Score:</span>
                          <span className="font-bold text-purple-600">{firm.propScore}/10</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{firm.discount} off with code {firm.code}</span>
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
  );
}