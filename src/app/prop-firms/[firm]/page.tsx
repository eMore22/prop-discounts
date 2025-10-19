"use client";

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { discountCodes } from '@/lib/data';
import { ExternalLink, Copy, Calendar, Tag, TrendingUp, Shield, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { PropScoreBadge } from '@/components/PropScoreBadge';
import { VerificationBadge } from '@/components/VerificationBadge';
import { TraderFeedback } from '@/components/TraderFeedback';

export default function FirmDetailPage({ params }: { params: { firm: string } }) {
  const [copied, setCopied] = useState(false);
  
  const firm = discountCodes.find(
    f => f.firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === params.firm
  );

  if (!firm) {
    notFound();
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const isExpired = new Date(firm.expiry) < new Date();
  const daysLeft = Math.floor((+new Date(firm.expiry) - +new Date()) / (1000 * 60 * 60 * 24));

  const features = [
    { icon: Tag, label: "Discount Code", value: firm.code },
    { icon: TrendingUp, label: "Save Up To", value: firm.discount },
    { icon: Calendar, label: "Expires On", value: firm.expiry },
    { icon: Clock, label: "Time Left", value: isExpired ? "Expired" : `${daysLeft} days` }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/prop-firms" className="text-blue-100 hover:text-white mb-4 inline-block">
            ← Back to All Firms
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">{firm.firm}</h1>
              <p className="text-xl text-blue-100">{firm.description}</p>
            </div>
            <div className="flex flex-col gap-3">
              {firm.propScore && <PropScoreBadge score={firm.propScore} />}
              {firm.verificationStatus && <VerificationBadge status={firm.verificationStatus} />}
            </div>
          </div>
        </div>
      </section>

      {copied && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Copied to clipboard!</span>
        </div>
      )}

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Active Discount Code</h2>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Discount Code</p>
                      <code className="text-3xl font-bold text-blue-600 font-mono">{firm.code}</code>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Save</p>
                      <p className="text-4xl font-bold text-green-600">{firm.discount}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button onClick={() => copyToClipboard(firm.code)} disabled={isExpired} className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${isExpired ? 'bg-gray-300 text-gray-500' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                      <Copy className="w-5 h-5" />
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                    <a href={firm.link} target="_blank" rel="noopener noreferrer" className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${isExpired ? 'bg-gray-300 text-gray-500 pointer-events-none' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                      <ExternalLink className="w-5 h-5" />
                      Visit {firm.firm}
                    </a>
                  </div>
                </div>

                {isExpired && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800 font-semibold">⚠️ This discount code has expired. Check our homepage for active deals.</p>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About {firm.firm}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">{firm.description}</p>
                <p className="text-gray-700 leading-relaxed">
                  {firm.firm} is a trusted prop trading firm offering funded accounts to traders worldwide. 
                  Use our exclusive discount code to save on your evaluation challenge and start your funded trading journey.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">{feature.label}</p>
                          <p className="font-semibold text-gray-900">{feature.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <Shield className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Verified Deal</h3>
                <p className="text-blue-100 text-sm">This discount code has been verified by our team and is working as of today.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Compare With</h3>
                <div className="space-y-2">
                  {discountCodes.filter(f => f.firm !== firm.firm).slice(0, 3).map(otherFirm => {
                    const otherSlug = otherFirm.firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    return (
                      <Link key={otherFirm.firm} href={`/prop-firms/${otherSlug}`} className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                        <p className="font-semibold text-gray-900 text-sm">{otherFirm.firm}</p>
                        <p className="text-xs text-gray-600">{otherFirm.discount} discount</p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {firm.votes && (
                <TraderFeedback firmName={firm.firm} initialVotes={firm.votes} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}