"use client";

import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink, Clock, CheckCircle, XCircle, AlertCircle, ArrowUpDown } from 'lucide-react';
import { getDeals } from '@/lib/getDeals';
import { PropScoreBadge } from '@/components/PropScoreBadge';
import { VerificationBadge } from '@/components/VerificationBadge';
import { ValueCalculator } from '@/components/ValueCalculator';

// Your existing DiscountCode interface
export interface DiscountCode {
  firm: string;
  code: string;
  discount: string;
  expiry: string;
  link: string;
  description?: string;
  propScore?: number;
  verificationStatus?: 'verified' | 'sponsored' | 'community-favorite' | 'limited-time';
  votes?: {
    gotPaid: number;
    stillWaiting: number;
    failed: number;
  };
}

const CountdownTimer: React.FC<{ expiryDate: string }> = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(expiryDate) - +new Date();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h`);
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m`);
        } else {
          setTimeLeft(`${minutes}m ${seconds}s`);
        }
        setIsExpired(false);
      } else {
        setTimeLeft("Expired");
        setIsExpired(true);
      }
    };
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, [expiryDate]);

  return (
    <div className={`flex items-center gap-1 ${isExpired ? 'text-red-600' : 'text-blue-600'}`}>
      <Clock className="w-4 h-4" />
      <span className="font-medium">{timeLeft}</span>
    </div>
  );
};

const StatusBadge: React.FC<{ expiryDate: string }> = ({ expiryDate }) => {
  const daysLeft = Math.floor((+new Date(expiryDate) - +new Date()) / (1000 * 60 * 60 * 24));
  if (daysLeft < 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
        <XCircle className="w-3 h-3" /> Expired
      </span>
    );
  } else if (daysLeft <= 7) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
        <AlertCircle className="w-3 h-3" /> Expiring Soon
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3" /> Active
      </span>
    );
  }
};

const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
      <CheckCircle className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

const DiscountCard: React.FC<{ discount: DiscountCode; onCopy: (code: string) => void }> = ({ discount, onCopy }) => {
  const isExpired = new Date(discount.expiry) < new Date();
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border-2 transition-all hover:shadow-xl ${isExpired ? 'border-red-200 opacity-60' : 'border-blue-200 hover:border-blue-400'}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{discount.firm}</h3>
          <p className="text-sm text-gray-600 mt-1">{discount.description}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <StatusBadge expiryDate={discount.expiry} />
          {discount.verificationStatus && <VerificationBadge status={discount.verificationStatus} />}
        </div>
      </div>

      {discount.propScore && (
        <div className="mb-4">
          <PropScoreBadge score={discount.propScore} />
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600 mb-1">Discount Code</p>
            <p className="text-2xl font-bold text-blue-600 font-mono">{discount.code}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600 mb-1">Save</p>
            <p className="text-3xl font-bold text-green-600">{discount.discount}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Expires:</span>
          <span className="font-medium text-gray-900">{discount.expiry}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Time Left:</span>
          <CountdownTimer expiryDate={discount.expiry} />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => onCopy(discount.code)} disabled={isExpired} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all ${isExpired ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'}`}>
          <Copy className="w-4 h-4" />
          Copy Code
        </button>
        <a href={discount.link} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all ${isExpired ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none' : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'}`}>
          <ExternalLink className="w-4 h-4" />
          Visit Firm
        </a>
      </div>
    </div>
  );
};

export default function PropDiscountsApp() {
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'score' | 'discount'>('default');

  // Fetch deals from Supabase and map to UI format
  useEffect(() => {
    async function fetchDeals() {
      try {
        const deals = await getDeals();
        // Map database fields to UI format
        const mappedDeals: DiscountCode[] = deals.map(deal => ({
          firm: deal.firm,
          code: deal.code,
          discount: deal.discount,
          expiry: deal.expiry || '',
          link: deal.link || '',
          description: deal.description,
          propScore: deal.prop_score || undefined,
          verificationStatus: deal.verification_status,
          votes: {
            gotPaid: deal.votes_got_paid || 0,
            stillWaiting: deal.votes_still_waiting || 0,
            failed: deal.votes_failed || 0
          }
        }));
        setDiscountCodes(mappedDeals);
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDeals();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToast(`Copied "${text}" to clipboard!`);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      setToast('Failed to copy code');
    });
  };

  const filteredCodes = discountCodes.filter(code => {
    const isExpired = new Date(code.expiry) < new Date();
    if (filter === 'active') return !isExpired;
    if (filter === 'expired') return isExpired;
    return true;
  });

  const sortedCodes = [...filteredCodes].sort((a, b) => {
    if (sortBy === 'score') {
      return (b.propScore || 0) - (a.propScore || 0);
    }
    if (sortBy === 'discount') {
      const discountA = parseInt(a.discount.replace('%', ''));
      const discountB = parseInt(b.discount.replace('%', ''));
      return discountB - discountA;
    }
    return 0;
  });

  const activeCount = discountCodes.filter(code => new Date(code.expiry) >= new Date()).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Prop Firm Discount Codes</h1>
            <p className="text-lg text-gray-600">Exclusive promo codes for top prop trading firms - Updated February 2026</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">{activeCount} Active {activeCount === 1 ? 'Deal' : 'Deals'} Available</span>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <ValueCalculator />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2">
            {(['all', 'active', 'expired'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-6 py-2 rounded-lg font-semibold transition-all ${filter === f ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ArrowUpDown className="w-5 h-5 text-gray-600" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg font-semibold text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none">
              <option value="default">Sort: Default</option>
              <option value="score">Sort: Best Score</option>
              <option value="discount">Sort: Highest Discount</option>
            </select>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="hidden lg:block overflow-x-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 min-w-max">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider w-64">Prop Firm</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider w-32">Score</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider w-32">Code</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider w-24">Discount</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider w-32">Status</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider w-32">Time Left</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider w-32">Expiry</th>
                  <th className="px-4 py-4 text-right text-xs font-bold text-white uppercase tracking-wider w-56">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedCodes.map((dc) => {
                  const isExpired = new Date(dc.expiry) < new Date();
                  return (
                    <tr key={dc.firm} className={`transition-colors ${isExpired ? 'bg-gray-50' : 'hover:bg-blue-50'}`}>
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm font-bold text-gray-900">{dc.firm}</div>
                          <div className="text-xs text-gray-500 max-w-xs">{dc.description}</div>
                          {dc.verificationStatus && (
                            <div className="mt-1">
                              <VerificationBadge status={dc.verificationStatus} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {dc.propScore && <PropScoreBadge score={dc.propScore} />}
                      </td>
                      <td className="px-4 py-4">
                        <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono font-bold text-blue-600">{dc.code}</code>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xl font-bold text-green-600">{dc.discount}</span>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge expiryDate={dc.expiry} />
                      </td>
                      <td className="px-4 py-4">
                        <CountdownTimer expiryDate={dc.expiry} />
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{dc.expiry}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => copyToClipboard(dc.code)} disabled={isExpired} className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${isExpired ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow hover:shadow-md'}`}>
                            <Copy className="w-4 h-4" />
                            Copy
                          </button>
                          <a href={dc.link} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${isExpired ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none' : 'bg-green-600 hover:bg-green-700 text-white shadow hover:shadow-md'}`}>
                            <ExternalLink className="w-4 h-4" />
                            Visit
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:hidden grid gap-6">
          {sortedCodes.map((dc) => (
            <DiscountCard key={dc.firm} discount={dc} onCopy={copyToClipboard} />
          ))}
        </div>

        {sortedCodes.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No {filter} discount codes found</p>
          </div>
        )}
      </main>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}