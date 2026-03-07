"use client";

import React, { useState, useEffect } from 'react';
import { BookOpen, Star, ExternalLink, ShoppingCart, Award, Calendar, FileText, Zap, ArrowRight } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  description: string;
  cover_image?: string;
  amazon_link: string;
  price: string;
  pages: number;
  publish_date: string;
  rating?: number;
  reviews?: number;
  category: string;
}

const CATEGORIES = ['All', 'Trading Education', 'Psychology', 'Technical Analysis', 'Risk Management', 'Prop Trading'];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
      ))}
    </div>
  );
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/api/books')
      .then(r => r.json())
      .then(data => { setBooks(Array.isArray(data) ? data : []); })
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'All' ? books : books.filter(b => b.category === activeCategory);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  if (loading) return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm font-semibold">Loading books...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#060d1f] via-[#0a1628] to-[#060d1f]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-bold mb-8">
            <BookOpen className="w-4 h-4" /> Trading Library
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-5 leading-[1.05] tracking-tight">
            Books That Make<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-300 to-emerald-400">
              Better Traders
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto">
            Hand-picked reads on psychology, strategy, and risk management — the foundations of consistent prop trading.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">

        {/* ── Category Filter ─────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === cat ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* ── Empty State ─────────────────────────────────────────────── */}
        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-semibold text-lg">No books yet in this category</p>
            <p className="text-gray-400 text-sm mt-1">Check back soon — we add new books regularly.</p>
          </div>
        )}

        {/* ── Featured Book ───────────────────────────────────────────── */}
        {featured && (
          <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] rounded-2xl overflow-hidden border border-[#1a3a5c]">
            <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border-b border-yellow-500/20">
              <div className="flex items-center gap-2 justify-center">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-300 text-xs font-black uppercase tracking-widest">Featured Pick</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-0">
              {/* Cover */}
              <div className="p-8 flex items-center justify-center bg-white/3">
                {featured.cover_image ? (
                  <img src={featured.cover_image} alt={featured.title}
                    className="max-h-80 w-auto rounded-xl shadow-2xl shadow-black/50 object-cover" />
                ) : (
                  <div className="w-48 h-64 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl">
                    <BookOpen className="w-20 h-20 text-white/40" />
                  </div>
                )}
              </div>
              {/* Details */}
              <div className="p-8 flex flex-col justify-center">
                <span className="text-xs font-black text-purple-400 uppercase tracking-widest mb-3">{featured.category}</span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-1">{featured.title}</h2>
                {featured.subtitle && <p className="text-slate-400 text-sm mb-3">{featured.subtitle}</p>}
                <p className="text-slate-500 text-sm mb-4">by <span className="text-slate-300 font-semibold">{featured.author}</span></p>
                {featured.rating && (
                  <div className="flex items-center gap-3 mb-5">
                    <StarRating rating={featured.rating} />
                    <span className="text-slate-400 text-xs">{featured.rating} · {featured.reviews?.toLocaleString()} reviews</span>
                  </div>
                )}
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-4">{featured.description}</p>
                <div className="flex items-center gap-4 mb-6 text-xs text-slate-500">
                  {featured.pages && <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {featured.pages} pages</span>}
                  {featured.publish_date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(featured.publish_date).getFullYear()}</span>}
                </div>
                <div className="flex items-center gap-4">
                  {featured.price && <span className="text-2xl font-black text-emerald-400">{featured.price}</span>}
                  <a href={featured.amazon_link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3 rounded-xl transition-all active:scale-95 text-sm shadow-lg shadow-amber-500/20">
                    <ShoppingCart className="w-4 h-4" /> Buy on Amazon
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Rest of Books ───────────────────────────────────────────── */}
        {rest.length > 0 && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-5">More Great Reads</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map(book => (
                <div key={book.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all overflow-hidden group">
                  {/* Cover */}
                  <div className="bg-gradient-to-br from-[#0a0f1e] to-[#0d1f3c] h-48 flex items-center justify-center p-4">
                    {book.cover_image ? (
                      <img src={book.cover_image} alt={book.title}
                        className="h-full w-auto rounded-lg shadow-xl object-cover" />
                    ) : (
                      <BookOpen className="w-14 h-14 text-white/20" />
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-5">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-wider">{book.category}</span>
                    <h3 className="font-black text-gray-900 text-base mt-1 mb-0.5 line-clamp-2">{book.title}</h3>
                    <p className="text-xs text-gray-400 mb-3">by {book.author}</p>
                    {book.rating && (
                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={book.rating} />
                        <span className="text-xs text-gray-400">{book.rating}</span>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">{book.description}</p>
                    <div className="flex items-center justify-between">
                      {book.price && <span className="font-black text-emerald-600">{book.price}</span>}
                      <a href={book.amazon_link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black font-black px-4 py-2 rounded-lg text-xs transition-all active:scale-95">
                        <ShoppingCart className="w-3.5 h-3.5" /> Amazon
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Bottom CTA ──────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] rounded-2xl p-8 text-center border border-[#1a3a5c]">
          <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-xl font-black text-white mb-2">Ready to get funded?</h3>
          <p className="text-slate-400 text-sm mb-6">Use verified discount codes to save on your next challenge.</p>
          <a href="/" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black px-6 py-3 rounded-xl transition-all text-sm">
            View Deals <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}