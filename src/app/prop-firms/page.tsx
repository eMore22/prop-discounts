"use client";

import React, { useState, useEffect } from 'react';
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
        const mappedFirms: FirmData[] = deals.map(deal => ({
          firm: deal.firm,
          code: deal.code,
          discount: deal.discount,
          expiry: deal.expiry || '',
          slug: deal.slug,
          description: deal.description,
          propScore: deal.prop_score || undefined
        }));
        setFirms(mappedFirms);
      } catch (error) {
        console.error('Error fetching firms:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFirms();
  }, []);

  const filteredFirms = firms.filter(firm =>
    firm.firm.toLowerCase().includes(searchQuery.toLowerCase()) ||
    firm.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeDeals = firms.filter(f => f.expiry && new Date(f.expiry) >= new Date()).length;

  const firmStats = [
    { label: "Total Firms", value: firms.length, icon: Award },
    { label: "Active Deals", value: activeDeals, icon: CheckCircle },
    { label: "Total Savings", value: "Up to 20%", icon: TrendingUp }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading firms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Prop Firm Directory</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Compare and discover the best prop trading firms with exclusive discount codes
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search firms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {firmStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
                  <Icon className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFirms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No firms found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFirms.map((firm) => {
                const isExpired = firm.expiry ? new Date(firm.expiry) < new Date() : false;
                
                return (
                  <Link key={firm.slug} href={`/prop-firms/${firm.slug}`}>
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-400 cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{firm.firm}</h3>
                        {!isExpired && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Active</span>
                        )}
                      </div>
                      
                      {firm.description && (
                        <p className="text-sm text-gray-600 mb-4">{firm.description}</p>
                      )}
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Discount:</span>
                          <span className="font-bold text-green-600">{firm.discount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Code:</span>
                          <code className="font-mono font-bold text-blue-600">{firm.code}</code>
                        </div>
                        {firm.propScore && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Prop Score:</span>
                            <span className="font-bold text-purple-600">{firm.propScore}/10</span>
                          </div>
                        )}
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                        View Details
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}