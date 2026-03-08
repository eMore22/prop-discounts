import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | PropCoupons',
  description: 'Terms of Service for PropCoupons — the rules governing your use of our site.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#060d1f] via-[#0a1628] to-[#060d1f] border-b border-blue-900/30">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm font-bold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Deals
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-blue-500/15 rounded-xl border border-blue-500/20">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <h1 className="text-3xl font-black text-white">Terms of Service</h1>
          </div>
          <p className="text-slate-400 text-sm">Last updated: March 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8 text-gray-700 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using propcoupouns.com ("the Site"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">2. Description of Service</h2>
            <p>PropCoupons is an independent coupon aggregation website. We collect, verify, and display discount codes for proprietary trading firms. We are not affiliated with, endorsed by, or employed by any prop trading firm listed on this site unless explicitly stated.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">3. Accuracy of Information</h2>
            <p>We make reasonable efforts to verify discount codes and keep information current. However, we do not guarantee that any coupon code is valid, active, or will result in a discount at the time of use. Prop firm terms, pricing, and rules change frequently. Always verify the current terms directly with the prop firm before making a purchase.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">4. Affiliate Links</h2>
            <p>Some links on the Site are affiliate links. This means we may earn a commission if you click through and make a purchase, at no additional cost to you. Our editorial content and deal ratings are not influenced by affiliate relationships. See our <Link href="/affiliate-disclosure" className="text-blue-600 hover:underline">Affiliate Disclosure</Link> for full details.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">5. Not Financial Advice</h2>
            <p>Nothing on this Site constitutes financial, investment, or trading advice. Prop trading involves significant risk. You should conduct your own research and consult a qualified financial advisor before participating in any prop trading program. Past trader results shown on this site are not indicative of future performance.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">6. User-Submitted Content</h2>
            <p>By submitting trader feedback (e.g. payout votes), you grant PropCoupons a non-exclusive, royalty-free licence to display and use that content on the Site. You confirm that your submission is honest and based on your genuine experience. We reserve the right to remove any content we deem inaccurate, offensive, or in violation of these terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">7. Intellectual Property</h2>
            <p>All content on the Site — including text, design, code, and graphics — is owned by PropCoupons unless otherwise credited. You may not reproduce or distribute any content without prior written permission.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, PropCoupons shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Site, reliance on coupon codes, or decisions made based on information found here.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">9. Third-Party Sites</h2>
            <p>The Site contains links to third-party websites. We are not responsible for the content, policies, or practices of any third-party site. Linking to a site does not constitute endorsement.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">10. Changes to Terms</h2>
            <p>We may update these terms at any time. The updated date will be reflected at the top of this page. Continued use of the Site after changes are posted constitutes your acceptance of the revised terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">11. Contact</h2>
            <p>Questions about these terms? Email <a href="mailto:contact@propcoupouns.com" className="text-blue-600 hover:underline">contact@propcoupouns.com</a>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}