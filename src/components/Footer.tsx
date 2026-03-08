import React from 'react';
import Link from 'next/link';
import { Zap, Twitter, Linkedin, Mail, Shield, ExternalLink } from 'lucide-react';

export const Footer = () => {
  const year = new Date().getFullYear();

  const links = {
    Deals: [
      { label: 'All Discount Codes', href: '/' },
      { label: 'FTMO Coupon', href: '/prop-firms/ftmo' },
      { label: 'FundedNext Coupon', href: '/prop-firms/funded-next' },
      { label: 'The5ers Coupon', href: '/prop-firms/the5ers' },
      { label: 'Topstep Coupon', href: '/prop-firms/topstep' },
    ],
    Tools: [
      { label: 'Compare Firms', href: '/compare' },
      { label: 'Savings Calculator', href: '/#calculator' },
      { label: 'Prop Scores', href: '/prop-firms' },
      { label: 'Trading Books', href: '/books' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'Submit a Deal', href: '/contact' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
    ],
  };

  return (
    <footer className="bg-[#060d1f] text-white border-t border-[#1a3a5c]">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-emerald-500 p-2 rounded-xl">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-base font-black">PropCoupons</span>
                <p className="text-slate-500 text-xs leading-none mt-0.5">Prop Firm Discounts</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              Verified discount codes for 20+ top prop trading firms. Helping traders save since 2023.
            </p>
            <div className="flex items-center gap-3 mb-5">
              <a href="https://twitter.com/propcoupouns" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <Twitter className="w-4 h-4 text-slate-400 hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/company/prop-firm-discount/" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <Linkedin className="w-4 h-4 text-slate-400 hover:text-white" />
              </a>
              <a href="mailto:hello@propcoupouns.com"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <Mail className="w-4 h-4 text-slate-400 hover:text-white" />
              </a>
            </div>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-bold">
              <Shield className="w-3.5 h-3.5" /> Codes Verified Weekly
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href}
                      className="text-sm text-slate-500 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1a3a5c]">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {year} PropCoupons. All rights reserved.</p>
          <p className="text-center max-w-md">
            Affiliate Disclosure: We may earn commissions from prop firms when you use our links. This does not affect our reviews. <Link href="/affiliate-disclosure" className="underline hover:text-slate-300">Learn more.</Link>
          </p>
          <p>Not financial advice. Trade responsibly.</p>
        </div>
      </div>
    </footer>
  );
};