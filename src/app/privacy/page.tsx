import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | PropCoupons',
  description: 'Privacy Policy for PropCoupons — how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
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
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
          </div>
          <p className="text-slate-400 text-sm">Last updated: March 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8 text-gray-700 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">1. Who We Are</h2>
            <p>PropCoupons ("we", "us", "our") operates propcoupouns.com, a website that aggregates verified discount codes for proprietary trading firms. Our contact email is <a href="mailto:contact@propcoupouns.com" className="text-blue-600 hover:underline">contact@propcoupouns.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="mb-2">We collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Email address</strong> — when you subscribe to our newsletter via Buttondown.</li>
              <li><strong>Usage data</strong> — pages visited, time on site, clicks, and general interaction patterns via Google Analytics and Simple Analytics.</li>
              <li><strong>Voting data</strong> — when you submit trader feedback (Got Paid / Still Waiting / Failed) on a prop firm deal.</li>
              <li><strong>Contact form data</strong> — name, email, and message when you reach out to us.</li>
            </ul>
            <p className="mt-2">We do not collect payment information. We do not require account registration.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To send you our weekly deals newsletter (only if you opted in).</li>
              <li>To improve site content and user experience based on analytics data.</li>
              <li>To respond to your enquiries submitted via our contact form.</li>
              <li>To display aggregated trader feedback on prop firm deals.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">4. Cookies & Analytics</h2>
            <p>We use Google Analytics and Simple Analytics to understand how visitors use our site. Google Analytics may set cookies on your device. Simple Analytics is privacy-first and does not use cookies. You can opt out of Google Analytics by using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics Opt-out Browser Add-on</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">5. Third-Party Services</h2>
            <p className="mb-2">We use the following third-party services that may process your data:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Buttondown</strong> — newsletter delivery. <a href="https://buttondown.email/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy policy</a>.</li>
              <li><strong>Supabase</strong> — database hosting. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy policy</a>.</li>
              <li><strong>Vercel</strong> — website hosting. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy policy</a>.</li>
              <li><strong>Google Analytics</strong> — usage analytics. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy policy</a>.</li>
            </ul>
            <p className="mt-2">We also include affiliate links to prop trading firms. When you click these links and make a purchase, we may earn a commission. These firms have their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">6. Data Retention</h2>
            <p>Newsletter subscribers' email addresses are retained until you unsubscribe. Contact form submissions are retained for up to 12 months. Analytics data is retained per Google Analytics' default retention settings.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">7. Your Rights</h2>
            <p>Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise any of these rights, email us at <a href="mailto:contact@propcoupouns.com" className="text-blue-600 hover:underline">contact@propcoupouns.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">8. Children's Privacy</h2>
            <p>Our site is not directed at children under 18. We do not knowingly collect data from minors.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">9. Changes to This Policy</h2>
            <p>We may update this policy from time to time. We will post the updated date at the top of this page. Continued use of the site constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">10. Contact</h2>
            <p>Questions about this policy? Email us at <a href="mailto:contact@propcoupouns.com" className="text-blue-600 hover:underline">contact@propcoupouns.com</a>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}