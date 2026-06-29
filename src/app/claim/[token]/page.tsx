// src/app/claim/[token]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import {
  CheckCircle, XCircle, Shield, Zap, Trophy,
  Star, ArrowRight, AlertCircle, Loader2, Copy, Mail
} from 'lucide-react';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$397',
    total: '$1,191',
    period: '/month',
    min: '3-month minimum',
    color: 'border-blue-200 hover:border-blue-400',
    badge: '',
    features: [
      'PropCoupouns listing & firm profile',
      'Active discount code for traders',
      'Affiliate tracking link',
      'Basic analytics dashboard',
    ],
    cta: 'Get Started',
    ctaColor: 'bg-blue-600 hover:bg-blue-500',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$697',
    total: '$2,091',
    period: '/month',
    min: '3-month minimum',
    color: 'border-indigo-400 ring-2 ring-indigo-400',
    badge: 'Most Popular',
    features: [
      'Everything in Starter',
      'PropSentinel rules listing',
      'Priority placement & featured badge',
      'Affiliate tracking & commission reports',
      'PropSentinel dashboard placement',
    ],
    cta: 'Get Growth',
    ctaColor: 'bg-indigo-600 hover:bg-indigo-500',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$997',
    total: '$2,991',
    period: '/month',
    min: '3-month minimum',
    color: 'border-purple-200 hover:border-purple-400',
    badge: 'Max Exposure',
    features: [
      'Everything in Growth',
      'Homepage feature placement',
      'Dedicated review article',
      'Weekly newsletter inclusion',
      'Social promotion across both platforms',
    ],
    cta: 'Go Premium',
    ctaColor: 'bg-purple-600 hover:bg-purple-500',
  },
];

const WALLETS = [
  {
    network: 'USDT TRC20',
    address: 'TTyR5c7weuoFnqFHxmAzqmjx4FoKHdBzLV',
    color: 'bg-green-50 border-green-200',
    badge: 'bg-green-100 text-green-700',
  },
  {
    network: 'USDT ERC20',
    address: '0x860D56Ff5109A134424DC20C1492A08E9Fa89F3B',
    color: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
  },
];

export default function ClaimPage({ params }: { params: Promise<{ token: string }> }) {
  const [token, setToken] = useState<string>('');
  const [firm, setFirm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<'verify' | 'tiers' | 'payment'>('verify');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [selectedTier, setSelectedTier] = useState('growth');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ token: t }) => {
      setToken(t);
      const supabase = getSupabase();
      supabase
        .from('prop_firms')
        .select('*')
        .eq('claim_token', t)
        .single()
        .then(({ data }) => {
          setFirm(data);
          setLoading(false);
        });
    });
  }, [params]);

  const validateEmail = (val: string) => {
    if (!val) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Invalid email address';
    return '';
  };

  const handleVerify = () => {
    const err = validateEmail(email);
    if (err) { setEmailError(err); return; }
    setEmailError('');
    setStep('tiers');
  };

  const handleProceedToPayment = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/scanner/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, tier: selectedTier }),
      });
      if (res.ok) setStep('payment');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const copyWallet = (address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedWallet(address);
      setTimeout(() => setCopiedWallet(null), 3000);
    });
  };

  const tier = TIERS.find(t => t.id === selectedTier)!;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!firm) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h1 className="text-xl font-black text-gray-700 mb-2">Invalid Claim Link</h1>
          <p className="text-gray-500 text-sm mb-4">This link has expired or is invalid.</p>
          <Link href="/" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">
            Back to PropCoupouns
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#060d1f] via-[#0a1628] to-[#060d1f] py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Shield className="w-4 h-4" /> Claim Your Listing
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{firm.name}</h1>
          <p className="text-slate-400 text-sm">Activate your verified listing on PropCoupouns & PropSentinel</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            {[
              { id: 'verify', label: '1. Verify Identity' },
              { id: 'tiers', label: '2. Choose Tier' },
              { id: 'payment', label: '3. Payment' },
            ].map((s, i) => (
              <React.Fragment key={s.id}>
                <span className={`font-bold ${
                  step === s.id ? 'text-blue-600' :
                  (
                    (step === 'tiers' && s.id === 'verify') ||
                    (step === 'payment' && (s.id === 'verify' || s.id === 'tiers'))
                  ) ? 'text-emerald-600' : 'text-gray-400'
                }`}>
                  {(
                    (step === 'tiers' && s.id === 'verify') ||
                    (step === 'payment' && (s.id === 'verify' || s.id === 'tiers'))
                  ) ? '✓ ' : ''}{s.label}
                </span>
                {i < 2 && <ArrowRight className="w-4 h-4 text-gray-300" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Status Banner */}
        {step !== 'payment' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-yellow-800 text-sm">Current Status: Unverified</p>
              <p className="text-yellow-700 text-sm mt-0.5">
                Your listing is visible but showing as unverified with no discount codes.
                Traders searching for {firm.name} are being redirected to verified competitors.
              </p>
            </div>
          </div>
        )}

        {/* Step 1 — Verify */}
        {step === 'verify' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-md mx-auto">
            <h2 className="text-lg font-black text-gray-900 mb-1">Verify Your Identity</h2>
            <p className="text-gray-500 text-sm mb-5">
              Enter your corporate email to confirm you are the owner of {firm.name}.
            </p>
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                Corporate Email
              </label>
              <input
                type="email"
                placeholder={`admin@${firm.website?.replace('https://', '') ?? 'yourfirm.com'}`}
                value={email}
                onChange={e => { setEmail(e.target.value); setEmailError(''); }}
                className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none transition-colors ${
                  emailError ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-blue-400'
                }`}
              />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>
            <button
              onClick={handleVerify}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl text-sm transition-all active:scale-95"
            >
              Continue to Partnership Tiers
            </button>
          </div>
        )}

        {/* Step 2 — Tiers */}
        {step === 'tiers' && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-2 text-center">Choose Your Partnership Tier</h2>
            <p className="text-gray-500 text-sm text-center mb-6">All tiers include a 3-month minimum commitment paid upfront.</p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {TIERS.map(t => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTier(t.id)}
                  className={`relative bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all ${
                    selectedTier === t.id ? t.color : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {t.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-indigo-600 text-white text-xs font-black px-3 py-1 rounded-full whitespace-nowrap">
                        {t.badge}
                      </span>
                    </div>
                  )}
                  <div className="mt-2">
                    <h3 className="font-black text-gray-900 text-lg">{t.name}</h3>
                    <div className="flex items-baseline gap-0.5 my-2">
                      <span className="text-3xl font-black text-gray-900">{t.price}</span>
                      <span className="text-gray-400 text-sm">{t.period}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{t.min}</p>
                    <p className="text-xs font-bold text-emerald-600 mb-4">Total due: {t.total}</p>
                    <ul className="space-y-2">
                      {t.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {selectedTier === t.id && (
                    <div className="absolute top-3 right-3">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] rounded-2xl p-6 mb-6">
              <h3 className="text-white font-black mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" /> What happens after you claim
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: Shield, label: 'Verified Badge', desc: 'Your listing gets a verified badge immediately' },
                  { icon: Star, label: 'Priority Placement', desc: 'Moved to top of listings above unverified firms' },
                  { icon: Trophy, label: 'Trader Traffic', desc: 'Active discount codes shown to 10,000+ traders' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm">{label}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 max-w-md mx-auto">
              <button
                onClick={() => setStep('verify')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black py-3 rounded-xl text-sm transition-all"
              >
                Back
              </button>
              <button
                onClick={handleProceedToPayment}
                disabled={submitting}
                className={`flex-1 flex items-center justify-center gap-2 text-white font-black py-3 rounded-xl text-sm transition-all active:scale-95 ${
                  tier.ctaColor
                } ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                ) : (
                  <>Proceed to Payment — {tier.total}</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Payment */}
        {step === 'payment' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Almost There!</h2>
              <p className="text-gray-500 text-sm">
                Complete your payment to activate your <strong>{tier.name}</strong> listing for <strong>{firm.name}</strong>
              </p>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
              <h3 className="font-black text-gray-900 text-sm mb-3">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{tier.name} tier</span>
                  <span className="font-bold">{tier.price}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-bold">3 months</span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between">
                  <span className="font-black text-gray-900">Total Due</span>
                  <span className="font-black text-emerald-600 text-lg">{tier.total} USDT</span>
                </div>
              </div>
            </div>

            {/* Wallet Addresses */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
              <h3 className="font-black text-gray-900 text-sm mb-4">Send Payment To</h3>
              <div className="space-y-3">
                {WALLETS.map(wallet => (
                  <div key={wallet.network} className={`border rounded-xl p-4 ${wallet.color}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full ${wallet.badge}`}>
                        {wallet.network}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs text-gray-700 font-mono flex-1 break-all">
                        {wallet.address}
                      </code>
                      <button
                        onClick={() => copyWallet(wallet.address)}
                        className="flex-shrink-0 bg-white border border-gray-200 hover:border-blue-400 p-2 rounded-lg transition-colors"
                      >
                        {copiedWallet === wallet.address ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* After Payment Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-4">
              <h3 className="font-black text-blue-900 text-sm mb-3">After Payment</h3>
              <ol className="space-y-2">
                {[
                  'Send the exact amount in USDT to either wallet address above',
                  'Email your payment proof (transaction hash/screenshot) to contact@propcoupouns.com',
                  'Include your firm name and selected tier in the email subject',
                  'Your listing will be activated within 24 hours of payment confirmation',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-black text-gray-900 text-sm">Send Payment Proof To</p>
                  <a href="mailto:contact@propcoupouns.com"
                    className="text-blue-600 font-bold text-sm hover:underline">
                    contact@propcoupouns.com
                  </a>
                </div>
                <button
                  onClick={() => copyWallet('contact@propcoupouns.com')}
                  className="ml-auto border border-gray-200 hover:border-blue-400 p-2 rounded-lg transition-colors"
                >
                  {copiedWallet === 'contact@propcoupouns.com' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <Link href="/"
              className="block text-center text-sm text-gray-400 hover:text-gray-600 font-semibold transition-colors">
              Back to PropCoupouns
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}