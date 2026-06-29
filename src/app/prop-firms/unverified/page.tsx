// src/app/prop-firms/unverified/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import {
  AlertCircle, Search, ExternalLink, Shield, ChevronRight
} from 'lucide-react';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default function UnverifiedFirmsPage() {
  const [firms, setFirms] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    supabase
      .from('prop_firms')
      .select('id, name, slug, website, description, color, detected_at, claim_token')
      .in('status', ['draft', 'unverified'])
      .order('detected_at', { ascending: false })
      .then(({ data }) => {
        setFirms(data || []);
        setLoading(false);
      });
  }, []);

  const filtered = firms.filter(f =>
    !search || f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <AlertCircle className="w-4 h-4" /> Unverified Listings
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3">Unverified Prop Firms</h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            These firms have been detected on our network but have not yet claimed their listing.
            No verified discount codes are available for these firms.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="relative max-w-xs mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search unverified firms..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none w-full bg-white"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6 flex items-start gap-4">
          <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-black text-blue-900 text-sm">Are you a prop firm owner?</p>
            <p className="text-blue-700 text-sm mt-0.5">
              If your firm appears below, claim your listing to add verified discount codes,
              get priority placement, and access 10,000+ active traders.
            </p>
          </div>
          <Link href="/prop-firms"
            className="flex-shrink-0 bg-blue-600 text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap">
            View Verified Firms
          </Link>
        </div>

        {loading && (
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-gray-200 rounded-xl" />
                  <div className="h-4 bg-gray-200 rounded w-32" />
                </div>
                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <>
            <p className="text-sm text-gray-400 mb-4">{filtered.length} unverified firms</p>
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map(firm => (
                <div key={firm.id}
                  className="bg-white rounded-2xl border-2 border-gray-100 p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400" />
                  <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2 mb-4">
                    <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                    <p className="text-yellow-700 text-xs font-bold">
                      Unverified — No active discount codes
                    </p>
                  </div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${firm.color ?? '#94a3b8'}, ${firm.color ?? '#94a3b8'}88)` }}>
                        {firm.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 text-sm">{firm.name}</h3>
                        {firm.website && (
                          <a href={firm.website} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-0.5 transition-colors">
                            {firm.website.replace('https://', '')}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  {firm.description && (
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{firm.description}</p>
                  )}
                  <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-dashed border-gray-200">
                    <p className="text-xs text-gray-400 font-semibold text-center">
                      No verified discount codes for this firm.{' '}
                      <Link href="/prop-firms" className="text-blue-600 hover:underline font-bold">
                        View verified firms instead
                      </Link>
                    </p>
                  </div>
                  {firm.claim_token && (
                    <Link href={`/claim/${firm.claim_token}`}
                      className="w-full flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white font-black py-2.5 rounded-xl text-xs transition-all">
                      <Shield className="w-3.5 h-3.5" /> Claim This Listing
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 font-semibold">No unverified firms found.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
