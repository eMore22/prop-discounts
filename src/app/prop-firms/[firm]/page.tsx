"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getDealBySlug, getDeals } from '@/lib/getDeals';
import { ExternalLink, Copy, Calendar, Tag, TrendingUp, Shield, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { PropScoreBadge } from '@/components/PropScoreBadge';
import { VerificationBadge } from '@/components/VerificationBadge';
import { TraderFeedback } from '@/components/TraderFeedback';

interface FirmDetail {
  id: string;
  firm: string;
  code: string;
  discount: string;
  expiry: string | null;
  slug: string;
  description?: string;
  prop_score?: number;
  verification_status?: 'verified' | 'sponsored' | 'community-favorite' | 'limited-time';
  link?: string;
  votes_got_paid?: number;
  votes_still_waiting?: number;
  votes_failed?: number;
}

export default function FirmDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [firm, setFirm] = useState<FirmDetail | null>(null);
  const [otherFirms, setOtherFirms] = useState<FirmDetail[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchFirmData() {
      try {
        const slug = params.firm as string;
        const deal = await getDealBySlug(slug);
        if (!deal) {
          router.push('/');
          return;
        }
        setFirm(deal);

        // Set metadata dynamically
        document.title = `${deal.firm} Discount Code 2025 – ${deal.discount} Off | Prop Coupon`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', `Use ${deal.firm} promo code ${deal.code} for ${deal.discount} off challenges. Verified December 2025 deals, reviews, rules, and how to apply.`);
        }

        const allDeals = await getDeals();
        const randomOthers = allDeals
          .filter(d => d.slug !== slug)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setOtherFirms(randomOthers);
      } catch (error) {
        console.error('Error fetching firm data:', error);
        router.push('/');
      }
    }
    fetchFirmData();
  }, [params.firm, router]);

  const copyCode = () => {
    if (firm?.code) {
      navigator.clipboard.writeText(firm.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!firm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const pros = [
    "High profit splits up to 90%",
    "Flexible trading rules - weekend holding allowed",
    "No time limits on challenges",
    "Fast payout processing (7-14 days)",
    "Scaling plan up to $200k+"
  ];

  const cons = [
    "Strict 5% daily drawdown limit",
    "Two-phase evaluation required",
    "Minimum trading days requirement"
  ];

  const rules = [
    "Phase 1: 8% profit target, 5% daily loss, 10% max loss",
    "Phase 2: 5% profit target, same drawdown rules",
    "Funded: No profit targets, trailing drawdown",
    "News trading and EAs permitted",
    "Minimum 4 trading days per phase"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {firm.firm} Discount Code & Complete Review 2025
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Save {firm.discount} with verified promo code {firm.code}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {firm.firm} is a leading prop trading firm in 2025, offering funded accounts up to $200,000 with flexible trading rules and competitive profit splits. Use our exclusive discount code <strong className="text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded">{firm.code}</strong> to save {firm.discount} on any challenge size. This promotion is verified and active for December 2025{firm.expiry ? `, expiring on ${firm.expiry}` : ''}.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-blue-50 p-6 rounded-xl text-center border-2 border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">{firm.discount}</div>
              <div className="text-sm text-gray-600 font-semibold">Discount Amount</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl text-center border-2 border-purple-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">{firm.prop_score || 'N/A'}/10</div>
              <div className="text-sm text-gray-600 font-semibold">Prop Score</div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center border-2 border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">Active</div>
              <div className="text-sm text-gray-600 font-semibold">Status</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Discount</h3>
                <p className="text-gray-600">Copy the code below and apply at checkout</p>
              </div>
              {firm.verification_status && <VerificationBadge status={firm.verification_status} />}
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Discount Code</p>
                  <code className="text-3xl font-bold font-mono text-blue-600">{firm.code}</code>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-2">Save</p>
                  <p className="text-4xl font-bold text-green-600">{firm.discount}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={copyCode}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg">
                {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
              
                href={firm.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg">
                <ExternalLink className="w-5 h-5" />
                Visit {firm.firm}
              </a>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6">{firm.firm} Review: Is It Worth It in 2025?</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                {firm.firm} stands out in the competitive prop trading space for several reasons. With a prop score of {firm.prop_score || 'N/A'}/10 based on trader feedback and our analysis, this firm offers a balanced approach to funded trading. Traders appreciate the high profit splits (up to 90%), reasonable drawdown limits (typically 5% daily, 10% overall), and flexible trading rules that allow strategies like scalping, news trading, and holding positions over weekends.
              </p>

              <p className="text-gray-700 leading-relaxed mb-8">
                The evaluation process is straightforward with clearly defined targets. Phase 1 typically requires an 8% profit target, while Phase 2 requires 5%. Once funded, there are no profit targets—you simply follow the drawdown rules and trade according to your strategy. Payouts are processed within 7-14 business days, which is competitive in the industry.
              </p>

              <h3 className="text-2xl font-bold mb-6">Detailed Pros and Cons Analysis</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                <CheckCircle className="w-7 h-7 text-green-600" />
                Advantages
              </h3>
              <ul className="space-y-4">
                {pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-8 border-2 border-red-200">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                <XCircle className="w-7 h-7 text-red-600" />
                Disadvantages
              </h3>
              <ul className="space-y-4">
                {cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6">{firm.firm} Complete Trading Rules & Requirements</h2>
            
            <p className="text-gray-700 mb-6 text-lg">
              Understanding the rules is crucial to passing your evaluation. Here's everything you need to know about trading with {firm.firm}:
            </p>

            <ul className="space-y-4">
              {rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6">How to Use Your {firm.firm} Discount Code</h2>
            
            <p className="text-gray-700 mb-6 text-lg">
              Getting your discount is simple. Follow these steps to save {firm.discount} on your challenge:
            </p>

            <ol className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">1</div>
                <div>
                  <strong className="text-gray-900 text-lg block mb-2">Visit {firm.firm}'s Website</strong>
                  <p className="text-gray-700">Click the "Visit {firm.firm}" button above to go directly to their challenge page.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">2</div>
                <div>
                  <strong className="text-gray-900 text-lg block mb-2">Select Your Challenge Size</strong>
                  <p className="text-gray-700">Choose from $5K, $10K, $25K, $50K, $100K, or $200K account sizes.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">3</div>
                <div>
                  <strong className="text-gray-900 text-lg block mb-2">Apply the Code at Checkout</strong>
                  <p className="text-gray-700">Enter code <code className="bg-gray-100 px-2 py-1 rounded font-mono text-blue-600">{firm.code}</code> in the discount field.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">4</div>
                <div>
                  <strong className="text-gray-900 text-lg block mb-2">Verify Your Savings</strong>
                  <p className="text-gray-700">Make sure the {firm.discount} discount is reflected before completing payment.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">5</div>
                <div>
                  <strong className="text-gray-900 text-lg block mb-2">Start Trading</strong>
                  <p className="text-gray-700">Receive your login credentials and begin your evaluation immediately.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6">Success Tips for {firm.firm} Challenges</h2>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 text-lg">Start Conservative:</strong>
                  <span className="text-gray-700"> Don't rush. You have unlimited time, so focus on quality trades over quantity.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 text-lg">Risk 0.5-1% Per Trade:</strong>
                  <span className="text-gray-700"> Keep risk low to protect against hitting the daily 5% loss limit.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 text-lg">Trade During High Liquidity:</strong>
                  <span className="text-gray-700"> London and New York sessions offer better fills and less slippage.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 text-lg">Keep a Trading Journal:</strong>
                  <span className="text-gray-700"> Document what works and what doesn't for continuous improvement.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 text-lg">Use Stop Losses Always:</strong>
                  <span className="text-gray-700"> Protect your account from unexpected volatility or news spikes.</span>
                </div>
              </li>
            </ul>
          </div>

          {firm.id && (
            <div className="mb-12">
              <TraderFeedback
                firmName={firm.firm}
                dealId={firm.id}
                initialVotes={{
                  gotPaid: firm.votes_got_paid || 0,
                  stillWaiting: firm.votes_still_waiting || 0,
                  failed: firm.votes_failed || 0
                }}
              />
            </div>
          )}

          {otherFirms.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Compare Other Prop Firms</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {otherFirms.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/prop-firms/${other.slug}`}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{other.firm}</h3>
                      {other.prop_score && <PropScoreBadge score={other.prop_score} />}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Tag className="w-4 h-4" />
                      <span>{other.discount} off with code {other.code}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{other.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
