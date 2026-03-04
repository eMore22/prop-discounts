"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { name: 'Deals', href: '/' },
    { name: 'All Firms', href: '/prop-firms' },
    { name: 'Compare', href: '/compare' },
    { name: 'Blog', href: '/blog' },
    { name: 'Books', href: '/books' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-white border-b border-gray-100'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="bg-gradient-to-br from-blue-600 to-emerald-500 p-2 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-base font-black text-gray-900">PropCoupons</span>
              <span className="text-xs text-gray-400 block leading-none -mt-0.5">Prop Firm Discounts</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.name} href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all ${
                  isActive(link.href)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/contact"
              className="text-sm font-bold text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all">
              Contact
            </Link>
            <Link href="/"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> View Deals
            </Link>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive(link.href) ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}>
                  {link.name}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                Contact
              </Link>
              <Link href="/" onClick={() => setIsOpen(false)}
                className="mt-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl font-black text-sm text-center flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" /> View All Deals
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};