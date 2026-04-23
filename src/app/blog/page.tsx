"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Newspaper, Clock, BookOpen, Search, ArrowRight, Flame } from 'lucide-react';

const POSTS = [
  {
    slug: 'mubite-review-2026',
    title: 'Mubite Review 2026 | Crypto Prop Firm with 750+ Pairs & No Restrictions',
    excerpt: 'Mubite offers 750+ crypto pairs, 100x leverage, and zero trading restrictions on Bybit and Cleo platforms. Use code PROPMUB for 20% off.',
    category: 'Review', firm: 'Mubite', date: 'Apr 15, 2026', readTime: '6 min',
    tag: 'Sponsored', tagColor: 'bg-indigo-100 text-indigo-700', featured: true,
  },
  {
    slug: 'ftmo-profit-split-increase-2026',
    title: 'FTMO Increases Profit Split to 90% for Top Traders',
    excerpt: 'FTMO has announced an upgrade to its profit sharing structure for consistently profitable funded traders, effective March 2026.',
    category: 'News', firm: 'FTMO', date: 'Mar 1, 2026', readTime: '4 min',
    tag: 'Breaking', tagColor: 'bg-red-100 text-red-700', featured: true,
  },
  {
    slug: 'fundednext-stellar-model-2026',
    title: 'FundedNext Launches New Stellar 1-Phase Evaluation',
    excerpt: 'FundedNext\'s streamlined evaluation model with a single 10% profit target and no time limits.',
    category: 'News', firm: 'FundedNext', date: 'Feb 28, 2026', readTime: '5 min',
    tag: 'New Model', tagColor: 'bg-purple-100 text-purple-700', featured: true,
  },
  {
    slug: 'prop-firm-regulations-2026',
    title: 'Prop Firm Regulations: What 2026 Means for Funded Traders',
    excerpt: 'New financial regulations across the EU and UK could reshape how prop firms operate.',
    category: 'Industry', firm: null, date: 'Feb 25, 2026', readTime: '8 min',
    tag: 'Analysis', tagColor: 'bg-blue-100 text-blue-700', featured: false,
  },
  {
    slug: 'best-prop-firm-discounts-2026',
    title: 'Best Prop Firm Discount Codes in 2026 (Updated Weekly)',
    excerpt: 'We track and verify every discount code across 20+ prop firms. Here\'s our full updated list.',
    category: 'Deals', firm: null, date: 'Feb 22, 2026', readTime: '6 min',
    tag: 'Updated', tagColor: 'bg-emerald-100 text-emerald-700', featured: false,
  },
  {
    slug: 'ftmo-vs-fundednext-2026',
    title: 'FTMO vs FundedNext 2026: Which Prop Firm Should You Choose?',
    excerpt: 'A detailed, data-driven comparison of the two most popular prop firms.',
    category: 'Compare', firm: null, date: 'Feb 20, 2026', readTime: '10 min',
    tag: 'Guide', tagColor: 'bg-orange-100 text-orange-700', featured: false,
  },
  {
    slug: 'passing-ftmo-challenge-tips',
    title: '7 Proven Tips to Pass the FTMO Challenge First Time',
    excerpt: 'The exact strategies that help traders pass the FTMO evaluation without busting.',
    category: 'Tips', firm: 'FTMO', date: 'Feb 18, 2026', readTime: '7 min',
    tag: 'Tips', tagColor: 'bg-yellow-100 text-yellow-700', featured: false,
  },
  {
    slug: 'goat-funded-50000-accounts',
    title: 'Goat Funded Trader Reaches 50,000 Funded Accounts Milestone',
    excerpt: 'The community favourite hit a major milestone with $10M+ total distributed to traders.',
    category: 'News', firm: 'Goat Funded', date: 'Feb 15, 2026', readTime: '4 min',
    tag: 'Milestone', tagColor: 'bg-emerald-100 text-emerald-700', featured: false,
  },
  {
    slug: 'prop-firm-payout-reliability-2026',
    title: 'Which Prop Firms Actually Pay? 2026 Payout Reliability Report',
    excerpt: 'We analysed trader feedback from 5,000+ funded accounts to rank reliability.',
    category: 'Research', firm: null, date: 'Feb 10, 2026', readTime: '12 min',
    tag: 'Research', tagColor: 'bg-indigo-100 text-indigo-700', featured: false,
  },
];

const CATEGORIES = ['All', 'News', 'Compare', 'Deals', 'Tips', 'Industry', 'Research'];

export default function BlogPage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = POSTS.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = POSTS.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <Newspaper className="w-4 h-4" /> Prop Trading News & Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">PropCoupons Blog</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">News, analysis, and guides for funded traders. Updated weekly.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none w-full bg-white" />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${category === c ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {category === 'All' && !search && (
          <div>
            <div className="flex items-center gap-2 mb-5"><Flame className="w-5 h-5 text-orange-500" /><h2 className="text-xl font-black text-gray-900">Breaking News</h2></div>
            <div className="grid md:grid-cols-2 gap-5">
              {featured.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-emerald-500" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full ${post.tagColor}`}>{post.tag}</span>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        {post.firm && <span className="font-bold text-gray-500">{post.firm}</span>}
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{post.date}</span>
                      <span className="text-xs font-black text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Read more <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div>
          {category === 'All' && !search && (
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-black text-gray-900">All Articles</h2>
              <span className="text-sm text-gray-400 font-medium">({filtered.length} articles)</span>
            </div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(category === 'All' && !search ? rest : filtered).map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-black px-2.5 py-1 rounded-full ${post.tagColor}`}>{post.tag}</span>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg">{post.category}</span>
                </div>
                <h3 className="font-black text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors flex-1">{post.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{post.date}</span><span>·</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  {post.firm && <span className="text-xs font-bold text-blue-600">{post.firm}</span>}
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-semibold">No articles found</p>
              <button onClick={() => { setSearch(''); setCategory('All'); }} className="mt-2 text-blue-600 text-sm font-bold hover:underline">Clear filters</button>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-[#060d1f] to-[#0d1f3c] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1"><h3 className="text-2xl font-black mb-1">Get Articles In Your Inbox</h3><p className="text-slate-400 text-sm">Weekly prop trading news + exclusive discount codes. Free forever.</p></div>
          <Link href="/" className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-7 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap active:scale-95">Subscribe Free <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </div>
  );
}