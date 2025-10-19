import React from 'react';
import Link from 'next/link';
import { discountCodes } from '@/lib/data';
import { Search, TrendingUp, Award, CheckCircle } from 'lucide-react';

export default function FirmsPage() {
  const firmStats = [
    { label: "Total Firms", value: discountCodes.length, icon: Award },
    { label: "Active Deals", value: discountCodes.filter(f => new Date(f.expiry) >= new Date()).length, icon: CheckCircle },
    { label: "Total Savings", value: "Up to 20%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Prop Firm Directory</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">Compare and discover the best prop trading firms with exclusive discount codes</p>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discountCodes.map((firm) => {
              const isExpired = new Date(firm.expiry) < new Date();
              const firmSlug = firm.firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              
              return (
                <Link key={firm.firm} href={`/prop-firms/${firmSlug}`}>
                  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-400 cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{firm.firm}</h3>
                      {!isExpired && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Active</span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{firm.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount:</span>
                        <span className="font-bold text-green-600">{firm.discount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Code:</span>
                        <code className="font-mono font-bold text-blue-600">{firm.code}</code>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                      View Details
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}