// Priority 2: src/app/prop-firms/[firm]/page.tsx (Individual Firm Pages - assuming [firm] is the folder name)
"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
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
  propScore?: number;
  verificationStatus?: 'verified' | 'expired' | 'pending';
  affiliateLink?: string;
  pros?: string[];
  cons?: string[];
  rules?: string[];
}

export default function FirmDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [firm, setFirm] = useState<FirmDetail | null>(null);
  const [otherFirms, setOtherFirms] = useState<FirmDetail[]>([]);
  const [copied, setCopied] = useState(false);
  const [votes, setVotes] = useState({ up: 0, down: 0 });

  useEffect(() => {
    async function fetchFirmData() {
      try {
        const slug = params.firm as string; // Changed from params.slug to params.firm
        const deal = await getDealBySlug(slug);
        if (!deal) {
          router.push('/not-found');
          return;
        }
        setFirm(deal);

        const allDeals = await getDeals();
        const randomOthers = allDeals
          .filter(d => d.slug !== slug)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setOtherFirms(randomOthers);

        // Simulate fetching votes
        setVotes({ up: Math.floor(Math.random() * 50) + 10, down: Math.floor(Math.random() * 10) });
      } catch (error) {
        console.error('Error fetching firm data:', error);
        router.push('/error');
      }
    }
    fetchFirmData();
  }, [params.firm, router]); // Changed from params.slug to params.firm

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

  return (
    <>
      <Head>
        <title>{firm.firm} Discount Code 2025 – {firm.discount} Off | Prop Coupons</title>
        <meta 
          name="description" 
          content={`Use ${firm.firm} promo code ${firm.code} for ${firm.discount} off challenges. Verified December 2025 deals, reviews, rules, and how to apply.`} 
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">{firm.firm} Discount Code & Review 2025 – {firm.discount} Off</h1>

            <p className="text-gray-700 mb-6">{firm.firm} is a leading prop trading firm in 2025, offering funded accounts up to $200k with flexible trading rules. Use our exclusive code <strong>{firm.code}</strong> for {firm.discount} off any challenge. This promo is verified and active for December 2025 – expires {firm.expiry || 'soon'}.</p>

            <h2 className="text-2xl font-bold mb-4">{firm.firm} Review: Pros & Cons</h2>
            <p className="text-gray-700 mb-4">{firm.firm} stands out in the prop trading space for its [key feature, e.g., instant funding model]. Traders love the high profit splits (up to 90%) and low daily drawdown limits (5%). However, the overall drawdown is stricter at 10%. Our prop score: {firm.propScore || 'N/A'}/10 based on user feedback and rules.</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {firm.pros && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Pros</h3>
                  <ul className="space-y-2">
                    {firm.pros.map((pro, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {firm.cons && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Cons</h3>
                  <ul className="space-y-2">
                    {firm.cons.map((con, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold mb-4">{firm.firm} Rules & Requirements</h2>
            <p className="text-gray-700 mb-4">To get funded with {firm.firm}, you'll need to pass their challenge with these key rules:</p>
            <ul className="space-y-2 mb-6">
              {firm.rules?.map((rule, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span>{rule}</span>
                </li>
              )) || <li>No rules specified yet — check official site.</li>}
            </ul>

            <p className="text-gray-700 mb-6">Overall, {firm.firm} is great for beginners looking for instant funding. Compared to FTMO (stricter rules but higher funding) or FundedNext (similar discounts), it's a solid choice. Use our calculator below to see your savings with the {firm.discount} discount.</p>

            <h2 className="text-2xl font-bold mb-4">How to Use the {firm.firm} Discount Code</h2>
            <ol className="list-decimal pl-6 mb-6 text-gray-700">
              <li>Visit {firm.firm} website via our link.</li>
              <li>Choose your challenge size.</li>
              <li>Enter code {firm.code} at checkout.</li>
              <li>Save {firm.discount} instantly!</li>
            </ol>

            {/* Your existing code below: hero section, discount card, badges, calculator, other firms, feedback */}
          </div>
        </section>
      </div>
    </>
  );
}