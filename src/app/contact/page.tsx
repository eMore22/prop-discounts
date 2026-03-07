"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail, MessageSquare, Send, CheckCircle, AlertCircle,
  Zap, ArrowRight, Users, Shield, Clock
} from 'lucide-react';

const REASONS = [
  { value: '', label: 'Select a reason...' },
  { value: 'code-not-working', label: '🔴 Code Not Working' },
  { value: 'new-code', label: '💡 Submit New Code' },
  { value: 'partnership', label: '🤝 Partnership Inquiry' },
  { value: 'feedback', label: '💬 Feedback' },
  { value: 'other', label: '📌 Other' },
];

const CONTACT_CARDS = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'For support, code reports, or general questions',
    action: 'contact@propcoupouns.com',
    href: 'mailto:contact@propcoupouns.com',
    accent: 'from-blue-500 to-blue-600',
    label: 'Send Email',
  },
  {
    icon: MessageSquare,
    title: 'Discord Community',
    description: 'Chat with traders and get real-time help',
    action: 'Join our server',
    href: 'https://discord.gg/n2fXVD6CJ',
    accent: 'from-indigo-500 to-purple-600',
    label: 'Join Discord',
  },
  {
    icon: Users,
    title: 'Partnerships',
    description: 'Prop firms — offer exclusive deals to 10K+ traders',
    action: 'contact@propcoupouns.com',
    href: 'mailto:contact@propcoupouns.com?subject=Partnership Inquiry',
    accent: 'from-emerald-500 to-teal-600',
    label: 'Get in Touch',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#060d1f] via-[#0a1628] to-[#060d1f]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-bold mb-8">
            <Clock className="w-4 h-4" /> We reply within 24 hours
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-5 leading-[1.05] tracking-tight">
            Get In<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-emerald-400">
              Touch
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto">
            Found a broken code? Want to partner with us? Have feedback? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-12">

        {/* ── Contact Cards ───────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-5">
          {CONTACT_CARDS.map(({ icon: Icon, title, description, action, href, accent, label }) => (
            <a key={title} href={href} target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 p-6 transition-all">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${accent} mb-5`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-black text-gray-900 text-base mb-1">{title}</h3>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{description}</p>
              <span className="text-xs font-black text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                {label} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          ))}
        </div>

        {/* ── Contact Form ─────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Send a Message</h2>

            {status === 'success' && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p className="text-sm font-semibold text-emerald-800">Message sent! We'll reply to {formData.email || 'your email'} within 24 hours.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm font-semibold text-red-800">Something went wrong. Email us directly at <a href="mailto:contact@propcoupouns.com" className="underline">contact@propcoupouns.com</a></p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Name *</label>
                  <input type="text" required value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Email *</label>
                  <input type="email" required value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Reason *</label>
                <select required value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm bg-white">
                  {REASONS.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Message *</label>
                <textarea required value={formData.message} rows={5}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm resize-none" />
              </div>

              <button type="submit" disabled={status === 'loading'}
                className={`w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${status === 'loading' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg active:scale-[0.99]'}`}>
                <Send className="w-4 h-4" />
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Quick info */}
            <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] rounded-2xl p-6 border border-[#1a3a5c]">
              <h3 className="text-white font-black text-base mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Response time', val: 'Within 24 hours' },
                  { label: 'Support email', val: 'contact@propcoupouns.com' },
                  { label: 'Partnerships', val: 'contact@propcoupouns.com' },
                  { label: 'Community', val: 'Discord server' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-start gap-2">
                    <span className="text-slate-500 flex-shrink-0">{item.label}</span>
                    <span className="text-slate-300 font-semibold text-right text-xs">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common issues */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-black text-gray-900 text-base mb-4">Common Questions</h3>
              <div className="space-y-3">
                {[
                  { q: 'Code not working?', a: 'Check expiry date, try incognito mode, or contact us.' },
                  { q: 'Want to submit a code?', a: 'Use the form and select "Submit New Code".' },
                  { q: 'Prop firm wants to partner?', a: 'Email us with your discount and firm details.' },
                ].map(({ q, a }) => (
                  <div key={q} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-black text-gray-800 mb-1">{q}</p>
                    <p className="text-xs text-gray-500">{a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shield badge */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3">
              <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-emerald-900 mb-1">We never share your data</p>
                <p className="text-xs text-emerald-700">Your contact information is only used to reply to your message.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ──────────────────────────────────────────────── */}
        <div className="text-center pt-4">
          <p className="text-gray-400 text-sm mb-3">Looking for discount codes instead?</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black px-6 py-3 rounded-xl hover:shadow-lg transition-all text-sm">
            <Zap className="w-4 h-4" /> View All Deals
          </Link>
        </div>

      </div>
    </div>
  );
}