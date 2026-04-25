"use client";

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import { Newspaper, Clock, BookOpen, Search, ArrowRight, Flame } from 'lucide-react';
import { blogPosts } from '@/lib/blog';

// ── Derive POSTS from the single source of truth in lib/blog.ts ──────────────
// This ensures slugs in the listing page ALWAYS match what [slug]/page.tsx
// looks up. Previously this file had a hardcoded duplicate array that drifted
// out of sync, causing "Article Not Found" for every post.

const FEATURED_SLUGS = new Set(['best-prop-firms-2026', 'mubite-review-2026']);

// Map each tag to a colour class so cards still look the same as before
const TAG_COLORS: Record<string, string> = {
  Guide:       'bg-blue-100 text-blue-700',
  Review:      'bg-indigo-100 text-indigo-700',
  Lessons:     'bg-yellow-100 text-yellow-700',
  Strategy:    'bg-green-100 text-green-700',
  Comparison:  'bg-purple-100 text-purple-700',
  Tips:        'bg-indigo-100 text-indigo-700',
  Warning:     'bg-red-100 text-red-700',
  Beginner:    'bg-emerald-100 text-emerald-700',
  Proof:       'bg-teal-100 text-teal-700',
  Sponsored:   'bg-indigo-100 text-indigo-700',
};

// Firms we want to highlight on cards (shown as a secondary label)
const KNOWN_FIRMS = new Set([
  'FTMO', 'FundedNext', 'Mubite', 'The5%ers', 'Topstep',
  'Goat Funded', 'E8 Markets', 'Blueberry Funded',
]);

const POSTS = blogPosts.map(p => {
  const firstTag = p.tags[0] ?? 'Article';
  const firm = p.tags.find(t => KNOWN_FIRMS.has(t)) ?? null;
  return {
    slug:      p.slug,
    title:     p.title,
    excerpt:   p.excerpt,
    category:  p.category,
    date:      p.date,
    readTime:  p.readTime,
    firm,
    tag:       firstTag,
    tagColor:  TAG_COLORS[firstTag] ?? 'bg-blue-100 text-blue-700',
    featured:  FEATURED_SLUGS.has(p.slug),
  };
});

const CATEGORIES = [
  'All',
  ...Array.from(new Set(POSTS.map(p => p.category))),
];

export default function BlogPage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch]     = useState('');

  const filtered = POSTS.filter(p => {
    const matchCat    = category === 'All' || p.category === category;
    const matchSearch = !search
      || p.title.toLowerCase().includes(search.toLowerCase())
      || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = POSTS.filter(p => p.featured);
  const rest     = filtered.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <Newspaper className="w-4 h-4" /> Prop Trading News &amp; Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">PropCoupons Blog</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            News, analysis, and guides for funded traders. Updated weekly.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none w-full bg-white"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  category === c
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Featured / Breaking News */}
        {category === 'All' && !search && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Flame className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-black text-gray-900">Breaking News</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {featured.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all"
                >
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-emerald-500" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full ${post.tagColor}`}>
                        {post.tag}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        {post.firm && <span className="font-bold text-gray-500">{post.firm}</span>}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />{post.readTime}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{post.date}</span>
                      <span className="text-xs font-black text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Articles Grid */}
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
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-black px-2.5 py-1 rounded-full ${post.tagColor}`}>
                    {post.tag}
                  </span>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-black text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors flex-1">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />{post.readTime}
                    </span>
                  </div>
                  {post.firm && (
                    <span className="text-xs font-bold text-blue-600">{post.firm}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-semibold">No articles found</p>
              <button
                onClick={() => { setSearch(''); setCategory('All'); }}
                className="mt-2 text-blue-600 text-sm font-bold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-[#060d1f] to-[#0d1f3c] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-black mb-1">Get Articles In Your Inbox</h3>
            <p className="text-slate-400 text-sm">
              Weekly prop trading news + exclusive discount codes. Free forever.
            </p>
          </div>
          <Link
            href="/"
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-7 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
          >
            Subscribe Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}