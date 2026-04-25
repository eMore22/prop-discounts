"use client";

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft, Clock, Calendar, Copy, CheckCircle,
  ChevronRight, BookOpen, Flame, Bell, ArrowRight, Twitter,
  Linkedin, Link2
} from 'lucide-react';
import { blogPosts } from '@/lib/blog';

export default function BlogPostPage() {
  const params = useParams();

  let rawSlug = '';
  if (typeof params?.slug === 'string') {
    rawSlug = params.slug.trim();
  } else if (Array.isArray(params?.slug) && params.slug.length > 0) {
    rawSlug = params.slug[0].trim();
  }

  const slug = decodeURIComponent(rawSlug).toLowerCase();
  const post = blogPosts.find(p => p.slug.toLowerCase() === slug);

  const [toast, setToast] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'done'>('idle');

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f8fafc] py-20 text-center px-4">
        <h1 className="text-2xl font-black text-gray-800 mb-2">Article Not Found</h1>
        <p className="text-gray-500 text-sm mb-1">
          Slug received: <code className="bg-gray-100 px-1 rounded">{slug || '(empty)'}</code>
        </p>
        <p className="text-gray-400 text-xs mb-6">
          Available: {blogPosts.map(p => p.slug).join(', ')}
        </p>
        <Link href="/blog" className="text-blue-600 font-bold hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setToast('Copied ' + code + '!');
    setTimeout(() => setToast(null), 3000);
  };

  const subscribe = async () => {
    if (!email) return;
    try {
      await fetch('https://buttondown.email/api/emails/embed-subscribe/propcoupouns', {
        method: 'POST',
        body: new URLSearchParams({ email }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
    } finally {
      setSubStatus('done');
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const paragraphs = post.content.split(/\n\n+/).map(p => p.trim()).filter(p => p.length > 0);

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-xs font-black px-3 py-1.5 rounded-full bg-blue-100 text-blue-700">{post.category}</span>
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs font-bold text-slate-400 bg-white/5 px-3 py-1.5 rounded-full">{tag}</span>
            ))}
            {post.author && (
              <span className="text-xs font-bold text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-full">{post.author}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />PropCoupons Editorial</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">

          <article className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="text-gray-600 leading-relaxed mb-4 text-sm whitespace-pre-wrap">{para}</p>
              ))}
            </div>
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="font-black text-gray-900 text-sm mb-3">Share this article</p>
              <div className="flex gap-2 flex-wrap">
                <a href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(post.title) + '&url=' + encodeURIComponent(shareUrl)}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-sky-500 hover:opacity-90 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2">
                  <Twitter className="w-3.5 h-3.5" /> Twitter
                </a>
                <a href={'https://linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(shareUrl)}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-blue-700 hover:opacity-90 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <button onClick={() => { navigator.clipboard.writeText(shareUrl); setToast('Link copied!'); setTimeout(() => setToast(null), 2000); }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2">
                  <Link2 className="w-3.5 h-3.5" /> Copy Link
                </button>
              </div>
            </div>
          </article>

          <aside className="space-y-5">
            <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] rounded-2xl p-5 text-white border border-[#1a3a5c]">
              <Bell className="w-8 h-8 text-emerald-400 mb-3" />
              <h3 className="font-black text-lg mb-1">Get Weekly Deals</h3>
              <p className="text-slate-400 text-xs mb-4">5,000+ traders get new codes every Tuesday. Free.</p>
              {subStatus === 'done' ? (
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle className="w-4 h-4" /> You are subscribed!
                </div>
              ) : (
                <>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && subscribe()}
                    placeholder="your@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm mb-2" />
                  <button onClick={subscribe}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-2.5 rounded-xl text-sm">
                    Subscribe Free
                  </button>
                </>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4 text-sm">Quick Links</h3>
              {[
                { label: 'View All Deals', href: '/' },
                { label: 'Compare Firms', href: '/compare' },
                { label: 'All Prop Firms', href: '/prop-firms' },
                { label: 'Trading Books', href: '/books' },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 hover:text-blue-600 group">
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">{l.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500" />
                </Link>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4 text-sm flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" /> Hot Deals Right Now
              </h3>
              {[
                { firm: 'FundedNext', code: 'FNDISC20', discount: '20%' },
                { firm: 'FTMO', code: 'PROPDISC', discount: '10%' },
                { firm: 'The5ers', code: 'T5DISC', discount: '15%' },
              ].map(d => (
                <div key={d.firm} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-xs font-black text-gray-800">{d.firm}</p>
                    <code className="text-xs font-mono text-blue-600 font-bold">{d.code}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-emerald-600">{d.discount}</span>
                    <button onClick={() => copyCode(d.code)} className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg">
                      <Copy className="w-3 h-3 text-blue-600" />
                    </button>
                  </div>
                </div>
              ))}
              <Link href="/" className="block text-center text-xs font-black text-blue-600 hover:underline mt-3">
                View All 20+ Deals
              </Link>
            </div>
          </aside>

        </div>
      </div>

      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span className="font-bold text-sm">{toast}</span>
        </div>
      )}
    </div>
  );
}
