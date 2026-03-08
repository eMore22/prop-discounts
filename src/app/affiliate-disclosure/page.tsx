import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | PropCoupons',
  description: 'How PropCoupons earns commissions through affiliate links to prop trading firms.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#060d1f] via-[#0a1628] to-[#060d1f] border-b border-blue-900/30">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm font-bold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Deals
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-emerald-500/15 rounded-xl border border-emerald-500/20">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-black text-white">Affiliate Disclosure</h1>
          </div>
          <p className="text-slate-400 text-sm">Last updated: March 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Summary card */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 mb-8">
          <h2 className="text-base font-black text-emerald-900 mb-2">The short version</h2>
          <p className="text-emerald-800 text-sm leading-relaxed">Some links on PropCoupons are affiliate links. If you click one and buy something, we may earn a small commission — at no extra cost to you. This helps keep the site free. It never influences our ratings or recommendations.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8 text-gray-700 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">What is an affiliate link?</h2>
            <p>An affiliate link is a special URL that contains a tracking code. When you click it and complete a purchase on the prop firm's website, that firm's affiliate program credits PropCoupons with a small commission. The price you pay is exactly the same — sometimes even lower because of the discount codes we provide.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">Which links are affiliate links?</h2>
            <p>Any "Visit" or "Get Deal" button on our deals table, firm pages, or blog posts may be an affiliate link. We do not mark every individual link with a special label, but this disclosure applies site-wide. If you have any doubts about a specific link, email us and we'll confirm.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">Does this affect our reviews or ratings?</h2>
            <p className="mb-2">No. Our PropScore ratings and editorial opinions are based on objective criteria including:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Payout reliability (based on trader votes and public reports)</li>
              <li>Profit split percentage</li>
              <li>Drawdown rules and flexibility</li>
              <li>Customer support quality</li>
              <li>Overall trader community sentiment</li>
            </ul>
            <p className="mt-2">We will never inflate a rating or recommend a firm simply because they pay a higher commission. Firms with poor trader feedback will be rated accordingly, regardless of commercial relationships.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">Which firms do we have affiliate relationships with?</h2>
            <p>We have or may have affiliate relationships with prop firms including but not limited to: FTMO, FundedNext, The5ers, Topstep, Blueberry Funded, and others listed on the site. These relationships change over time as new programs launch or end.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">Compliance</h2>
            <p>This disclosure is made in accordance with the FTC's guidelines on endorsements and testimonials (16 CFR Part 255) and similar regulations in other jurisdictions. We are committed to full transparency with our readers.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">Questions?</h2>
            <p>If you have any questions about our affiliate relationships or how we earn money, we're happy to answer them. Email us at <a href="mailto:contact@propcoupouns.com" className="text-blue-600 hover:underline">contact@propcoupouns.com</a>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}