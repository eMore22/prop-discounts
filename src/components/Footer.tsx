import React from 'react';
import Link from 'next/link';
import { Tag, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About', href: '/about' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Contact', href: '/contact' }
    ],
    resources: [
      { name: 'All Deals', href: '/' },
      { name: 'All Firms', href: '/prop-firms' },
      { name: 'Compare Firms', href: '/compare' },
      { name: 'Active Codes', href: '/?filter=active' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Prop Discounts</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Your trusted source for verified prop firm discount codes. Save money on prop trading evaluations with exclusive deals from top firms.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@propcoupouns.com" className="hover:text-white transition-colors">
                contact@propcoupouns.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Prop Discounts. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-current" /> for traders worldwide
            </p>
          </div>
          <p className="text-gray-500 text-xs mt-4 text-center">
            Disclaimer: Discount codes are updated regularly. Please verify terms with each prop firm. We may earn commissions through affiliate partnerships.
          </p>
        </div>
      </div>
    </footer>
  );
};