"use client";

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
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
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactReasons = [
    { value: '', label: 'Select a reason...' },
    { value: 'code-not-working', label: 'Code Not Working' },
    { value: 'new-code', label: 'Submit New Code' },
    { value: 'partnership', label: 'Partnership Inquiry' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">Have a question, feedback, or want to partner with us? We'd love to hear from you!</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'success' && (
                  <div className="flex items-center gap-2 p-4 bg-green-100 text-green-800 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    Message sent! We'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 p-4 bg-red-100 text-red-800 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                    Something went wrong. Try again or email us directly.
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                  <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" placeholder="John Doe" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" placeholder="john@example.com" />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">Reason for Contact *</label>
                  <select id="subject" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none">
                    {contactReasons.map(reason => (
                      <option key={reason.value} value={reason.value}>{reason.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={6} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none" placeholder="Tell us more about your inquiry..." />
                </div>

                <button type="submit" disabled={status === 'loading'} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-70">
                  <Send className="w-5 h-5" />
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <Mail className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Email Us</h3>
                <p className="text-gray-600 mb-4">For quick inquiries or support</p>
                <a href="mailto:contact@propcoupouns.com" className="text-blue-600 font-semibold hover:underline">contact@propcoupouns.com</a>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <MessageSquare className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Join Our Community</h3>
                <p className="text-gray-600 mb-4">Connect with fellow traders</p>
                <a href="https://discord.gg/proptrading" className="text-purple-600 font-semibold hover:underline">Discord Server</a>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Partnership Opportunities</h3>
            <p className="text-blue-100 mb-6">Are you a prop firm looking to offer exclusive deals to our community? We'd love to work with you!</p>
            <a href="mailto:partnership@propcoupouns.com" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105">Contact Partnerships Team</a>
          </div>
        </div>
      </section>
    </div>
  );
} 
