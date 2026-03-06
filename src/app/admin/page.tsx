"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, Edit, Trash2, Save, X, Calendar, Tag, Percent,
  Link as LinkIcon, Lock, LogOut, AlertCircle, Bell, BookOpen,
  ToggleLeft, ToggleRight, Eye, EyeOff, Zap, Settings
} from 'lucide-react';
import PasswordChangeForm from '@/components/admin/PasswordChangeForm';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Deal {
  id: string;
  firm: string;
  code: string;
  discount: string;
  expiry: string | null;
  slug: string;
  link: string;
  description?: string;
  prop_score?: number;
  verification_status?: string;
  votes_got_paid?: number;
  votes_still_waiting?: number;
  votes_failed?: number;
  created_at: string;
}

interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  description?: string;
  cover_image?: string;
  amazon_link: string;
  price?: string;
  pages?: number;
  publish_date?: string;
  rating?: number;
  reviews?: number;
  category?: string;
  asin?: string;
  created_at: string;
}

interface Popup {
  id: string;
  title: string;
  message: string;
  firm: string;
  code: string;
  discount: string;
  link: string;
  active: boolean;
  delay_seconds: number;
  created_at: string;
}

type ActiveTab = 'deals' | 'books' | 'popups';

// ── Main Component ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();

  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('deals');

  // ── Deals state ──────────────────────────────────────────────────────────────
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isEditingDeal, setIsEditingDeal] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [dealForm, setDealForm] = useState({
    firm: '', code: '', discount: '', expiry: '', slug: '',
    link: '', description: '', prop_score: '', verification_status: 'verified'
  });
  const [dealError, setDealError] = useState('');

  // ── Books state ──────────────────────────────────────────────────────────────
  const [books, setBooks] = useState<Book[]>([]);
  const [isEditingBook, setIsEditingBook] = useState(false);
  const [bookForm, setBookForm] = useState({
    title: '', subtitle: '', author: '', description: '',
    coverImage: '', amazonLink: '', price: '', pages: '',
    publishDate: '', rating: '', reviews: '', category: 'Trading Education', asin: ''
  });
  const [bookError, setBookError] = useState('');
  const [bookSubmitting, setBookSubmitting] = useState(false);

  // ── Popup state ──────────────────────────────────────────────────────────────
  const [popups, setPopups] = useState<Popup[]>([]);
  const [isEditingPopup, setIsEditingPopup] = useState(false);
  const [editingPopup, setEditingPopup] = useState<Popup | null>(null);
  const [popupForm, setPopupForm] = useState({
    title: '', message: '', firm: '', code: '',
    discount: '', link: '', delay_seconds: '5', active: true
  });
  const [popupError, setPopupError] = useState('');
  const [popupSubmitting, setPopupSubmitting] = useState(false);

  // ── Auth ──────────────────────────────────────────────────────────────────────
  useEffect(() => { checkAuth(); }, []);
  useEffect(() => {
    if (isAuthenticated) {
      fetchDeals();
      fetchBooks();
      fetchPopups();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check');
      if (res.ok) {
        const data = await res.json();
        if (data.email) setAdminEmail(data.email);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Auth check error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setAdminEmail(email);
      setIsAuthenticated(true);
      setEmail(''); setPassword('');
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setAdminEmail('');
    router.push('/');
  };

  // ── Deals ─────────────────────────────────────────────────────────────────────
  const fetchDeals = async () => {
    try {
      const res = await fetch('/api/admin/deals');
      if (res.ok) setDeals(await res.json());
    } catch (e) { console.error(e); }
  };

  const handleSaveDeal = async () => {
    setDealError('');
    if (!dealForm.firm.trim()) return setDealError('Firm name is required');
    if (!dealForm.code.trim()) return setDealError('Discount code is required');
    if (!dealForm.discount.trim()) return setDealError('Discount amount is required');
    if (!dealForm.link.trim()) return setDealError('Affiliate link is required');
    setSubmitting(true);
    try {
      const slug = dealForm.slug || dealForm.firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const body = {
        firm: dealForm.firm.trim(), code: dealForm.code.trim(),
        discount: dealForm.discount.trim(), expiry: dealForm.expiry || null,
        slug, link: dealForm.link.trim(), description: dealForm.description.trim(),
        prop_score: dealForm.prop_score ? parseFloat(dealForm.prop_score) : null,
        verification_status: dealForm.verification_status
      };
      const res = await fetch('/api/admin/deals', {
        method: editingDeal ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDeal ? { id: editingDeal.id, ...body } : body)
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed to save'); }
      await fetchDeals();
      setIsEditingDeal(false); setEditingDeal(null);
    } catch (err: any) {
      setDealError(err.message || 'Failed to save deal');
    } finally { setSubmitting(false); }
  };

  const handleDeleteDeal = async (id: string) => {
    if (!confirm('Delete this deal?')) return;
    const res = await fetch(`/api/admin/deals?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchDeals();
    else alert('Failed to delete deal');
  };

  const handleEditDeal = (deal: Deal) => {
    setIsEditingDeal(true); setEditingDeal(deal); setDealError('');
    setDealForm({
      firm: deal.firm, code: deal.code, discount: deal.discount,
      expiry: deal.expiry || '', slug: deal.slug, link: deal.link || '',
      description: deal.description || '', prop_score: deal.prop_score?.toString() || '',
      verification_status: deal.verification_status || 'verified'
    });
  };

  const handleAddDeal = () => {
    setIsEditingDeal(true); setEditingDeal(null); setDealError('');
    setDealForm({ firm: '', code: '', discount: '', expiry: '', slug: '', link: '', description: '', prop_score: '', verification_status: 'verified' });
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(deals, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `prop-deals-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  // ── Books ─────────────────────────────────────────────────────────────────────
  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/books');
      if (res.ok) setBooks(await res.json());
    } catch (e) { console.error(e); }
  };

  const handleSaveBook = async () => {
    setBookError('');
    if (!bookForm.title.trim()) return setBookError('Title is required');
    if (!bookForm.author.trim()) return setBookError('Author is required');
    if (!bookForm.amazonLink.trim()) return setBookError('Amazon link is required');
    setBookSubmitting(true);
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: bookForm.title.trim(),
          subtitle: bookForm.subtitle.trim() || null,
          author: bookForm.author.trim(),
          description: bookForm.description.trim() || null,
          coverImage: bookForm.coverImage.trim() || null,
          amazonLink: bookForm.amazonLink.trim(),
          price: bookForm.price.trim() || null,
          pages: bookForm.pages ? parseInt(bookForm.pages) : null,
          publishDate: bookForm.publishDate || null,
          rating: bookForm.rating ? parseFloat(bookForm.rating) : null,
          reviews: bookForm.reviews ? parseInt(bookForm.reviews) : null,
          category: bookForm.category || 'Trading Education',
          asin: bookForm.asin.trim() || null,
        })
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed to save book'); }
      await fetchBooks();
      setIsEditingBook(false);
      setBookForm({ title: '', subtitle: '', author: '', description: '', coverImage: '', amazonLink: '', price: '', pages: '', publishDate: '', rating: '', reviews: '', category: 'Trading Education', asin: '' });
    } catch (err: any) {
      setBookError(err.message || 'Failed to save book');
    } finally { setBookSubmitting(false); }
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm('Delete this book?')) return;
    const res = await fetch(`/api/books?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchBooks();
    else alert('Failed to delete book');
  };

  // ── Popups ────────────────────────────────────────────────────────────────────
  const fetchPopups = async () => {
    try {
      const res = await fetch('/api/admin/popups');
      if (res.ok) setPopups(await res.json());
    } catch (e) { console.error('Popups not set up yet:', e); }
  };

  const handleSavePopup = async () => {
    setPopupError('');
    if (!popupForm.title.trim()) return setPopupError('Title is required');
    if (!popupForm.firm.trim()) return setPopupError('Firm name is required');
    if (!popupForm.code.trim()) return setPopupError('Discount code is required');
    if (!popupForm.discount.trim()) return setPopupError('Discount amount is required');
    if (!popupForm.link.trim()) return setPopupError('Link is required');
    setPopupSubmitting(true);
    try {
      const body = {
        title: popupForm.title.trim(),
        message: popupForm.message.trim(),
        firm: popupForm.firm.trim(),
        code: popupForm.code.trim(),
        discount: popupForm.discount.trim(),
        link: popupForm.link.trim(),
        delay_seconds: parseInt(popupForm.delay_seconds) || 5,
        active: popupForm.active,
      };
      const res = await fetch('/api/admin/popups', {
        method: editingPopup ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPopup ? { id: editingPopup.id, ...body } : body)
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed to save popup'); }
      await fetchPopups();
      setIsEditingPopup(false); setEditingPopup(null);
    } catch (err: any) {
      setPopupError(err.message || 'Failed to save popup');
    } finally { setPopupSubmitting(false); }
  };

  const handleTogglePopup = async (popup: Popup) => {
    try {
      const res = await fetch('/api/admin/popups', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: popup.id, active: !popup.active })
      });
      if (res.ok) fetchPopups();
    } catch (e) { console.error(e); }
  };

  const handleDeletePopup = async (id: string) => {
    if (!confirm('Delete this popup?')) return;
    const res = await fetch(`/api/admin/popups?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchPopups();
  };

  const handleEditPopup = (popup: Popup) => {
    setIsEditingPopup(true); setEditingPopup(popup); setPopupError('');
    setPopupForm({
      title: popup.title, message: popup.message || '', firm: popup.firm,
      code: popup.code, discount: popup.discount, link: popup.link,
      delay_seconds: popup.delay_seconds?.toString() || '5', active: popup.active
    });
  };

  const handleAddPopup = () => {
    setIsEditingPopup(true); setEditingPopup(null); setPopupError('');
    setPopupForm({ title: '', message: '', firm: '', code: '', discount: '', link: '', delay_seconds: '5', active: true });
  };

  // ── Loading ───────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4" />
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    </div>
  );

  // ── Login (unchanged) ─────────────────────────────────────────────────────────
  if (!isAuthenticated) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">Sign in to manage discount codes</p>
        </div>
        {loginError && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-semibold">{loginError}</p>
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com" required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password" required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" />
          </div>
          <button type="submit" disabled={submitting}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:scale-105'}`}>
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">← Back to Home</a>
        </div>
      </div>
    </div>
  );

  const activeCount = deals.filter(d => !d.expiry || new Date(d.expiry) >= new Date()).length;
  const expiredCount = deals.length - activeCount;

  // ── Dashboard ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-1">Admin Dashboard</h1>
              <p className="text-blue-200 text-sm">{adminEmail}</p>
            </div>
            <button onClick={handleLogout}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Stats + Password */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Deals', val: deals.length, color: 'text-gray-900' },
              { label: 'Active Deals', val: activeCount, color: 'text-green-600' },
              { label: 'Expired', val: expiredCount, color: 'text-red-600' },
              { label: 'Books', val: books.length, color: 'text-purple-600' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl shadow-md p-5">
                <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                <p className={`text-3xl font-bold ${s.color}`}>{s.val}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <PasswordChangeForm adminEmail={adminEmail} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-xl shadow-sm p-2 w-fit">
          {([
            { id: 'deals', label: 'Deals', icon: Tag },
            { id: 'books', label: 'Books', icon: BookOpen },
            { id: 'popups', label: 'Deal Popups', icon: Bell },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === id ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* ── DEALS TAB ─────────────────────────────────────────────────────────── */}
        {activeTab === 'deals' && (
          <div className="space-y-6">
            {!isEditingDeal && (
              <div className="flex gap-3">
                <button onClick={handleAddDeal}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all">
                  <Plus className="w-5 h-5" /> Add New Discount Code
                </button>
                <button onClick={exportData}
                  className="bg-white border-2 border-gray-200 text-gray-700 px-5 py-3 rounded-lg font-semibold hover:border-blue-400 transition-all">
                  Export JSON
                </button>
              </div>
            )}

            {isEditingDeal && (
              <div className="bg-white rounded-xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingDeal ? 'Edit Discount Code' : 'Add New Discount Code'}
                </h2>
                {dealError && (
                  <div className="mb-5 p-4 bg-red-50 border-2 border-red-300 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700 font-semibold">{dealError}</p>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: 'Firm Name *', name: 'firm', placeholder: 'FTMO', required: true },
                    { label: 'Discount Code *', name: 'code', placeholder: 'FTMO10OFF', required: true },
                    { label: 'Discount Amount *', name: 'discount', placeholder: '10%', required: true },
                    { label: 'Prop Score (0-10)', name: 'prop_score', placeholder: '8.5', type: 'number' },
                    { label: 'Slug (auto if empty)', name: 'slug', placeholder: 'ftmo' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{f.label}</label>
                      <input type={f.type || 'text'} name={f.name}
                        value={(dealForm as any)[f.name]}
                        onChange={e => setDealForm({ ...dealForm, [f.name]: e.target.value })}
                        placeholder={f.placeholder} step={f.type === 'number' ? '0.1' : undefined}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                    <input type="date" name="expiry" value={dealForm.expiry}
                      onChange={e => setDealForm({ ...dealForm, expiry: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Affiliate Link *</label>
                    <input type="url" name="link" value={dealForm.link}
                      onChange={e => setDealForm({ ...dealForm, link: e.target.value })}
                      placeholder="https://ftmo.com/?ref=your-id"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Verification Status</label>
                    <select name="verification_status" value={dealForm.verification_status}
                      onChange={e => setDealForm({ ...dealForm, verification_status: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none">
                      <option value="verified">Verified</option>
                      <option value="sponsored">Sponsored</option>
                      <option value="community-favorite">Community Favorite</option>
                      <option value="limited-time">Limited Time</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea name="description" value={dealForm.description} rows={3}
                      onChange={e => setDealForm({ ...dealForm, description: e.target.value })}
                      placeholder="Brief description of the firm..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none resize-none" />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button onClick={handleSaveDeal} disabled={submitting}
                    className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${submitting ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                    <Save className="w-5 h-5" /> {submitting ? 'Saving...' : 'Save Deal'}
                  </button>
                  <button onClick={() => { setIsEditingDeal(false); setEditingDeal(null); }} disabled={submitting}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <X className="w-5 h-5" /> Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <tr>
                      {['Firm', 'Code', 'Discount', 'Score', 'Expiry', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-4 text-left text-xs font-bold text-white uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {deals.map(deal => {
                      const isExpired = deal.expiry ? new Date(deal.expiry) < new Date() : false;
                      return (
                        <tr key={deal.id} className={isExpired ? 'bg-red-50' : 'hover:bg-blue-50'}>
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-gray-900">{deal.firm}</p>
                            <p className="text-xs text-gray-500 truncate max-w-[180px]">{deal.description}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">{deal.code}</code>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-lg font-bold text-green-600">{deal.discount}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-purple-600">
                              {deal.prop_score ? `${deal.prop_score}/10` : '-'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {deal.expiry ? new Date(deal.expiry).toLocaleDateString() : 'No expiry'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                              {isExpired ? 'Expired' : 'Active'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => handleEditDeal(deal)}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteDeal(deal.id)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {deals.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No deals yet. Add your first discount code!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── BOOKS TAB ─────────────────────────────────────────────────────────── */}
        {activeTab === 'books' && (
          <div className="space-y-6">
            {!isEditingBook && (
              <button onClick={() => { setIsEditingBook(true); setBookError(''); }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all">
                <Plus className="w-5 h-5" /> Add New Book
              </button>
            )}

            {isEditingBook && (
              <div className="bg-white rounded-xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Book</h2>
                {bookError && (
                  <div className="mb-5 p-4 bg-red-50 border-2 border-red-300 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-700 font-semibold">{bookError}</p>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: 'Title *', name: 'title', placeholder: 'Trading in the Zone' },
                    { label: 'Author *', name: 'author', placeholder: 'Mark Douglas' },
                    { label: 'Subtitle', name: 'subtitle', placeholder: 'Optional subtitle' },
                    { label: 'ASIN (Amazon ID)', name: 'asin', placeholder: 'B000FXDKV6' },
                    { label: 'Price', name: 'price', placeholder: '$19.99' },
                    { label: 'Pages', name: 'pages', placeholder: '240', type: 'number' },
                    { label: 'Rating (0-5)', name: 'rating', placeholder: '4.8', type: 'number' },
                    { label: 'Number of Reviews', name: 'reviews', placeholder: '1250', type: 'number' },
                    { label: 'Publish Date', name: 'publishDate', placeholder: '2000-01-01', type: 'date' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{f.label}</label>
                      <input type={f.type || 'text'} value={(bookForm as any)[f.name]}
                        onChange={e => setBookForm({ ...bookForm, [f.name]: e.target.value })}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select value={bookForm.category}
                      onChange={e => setBookForm({ ...bookForm, category: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none">
                      <option>Trading Education</option>
                      <option>Psychology</option>
                      <option>Technical Analysis</option>
                      <option>Risk Management</option>
                      <option>Prop Trading</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Amazon Link *</label>
                    <input type="url" value={bookForm.amazonLink}
                      onChange={e => setBookForm({ ...bookForm, amazonLink: e.target.value })}
                      placeholder="https://amazon.com/dp/B000FXDKV6"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image URL</label>
                    <input type="url" value={bookForm.coverImage}
                      onChange={e => setBookForm({ ...bookForm, coverImage: e.target.value })}
                      placeholder="https://images-na.ssl-images-amazon.com/..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea value={bookForm.description} rows={3}
                      onChange={e => setBookForm({ ...bookForm, description: e.target.value })}
                      placeholder="Brief description of the book..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none resize-none" />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button onClick={handleSaveBook} disabled={bookSubmitting}
                    className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${bookSubmitting ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                    <Save className="w-5 h-5" /> {bookSubmitting ? 'Saving...' : 'Save Book'}
                  </button>
                  <button onClick={() => setIsEditingBook(false)}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <X className="w-5 h-5" /> Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <tr>
                      {['Title', 'Author', 'Category', 'Rating', 'Price', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-4 text-left text-xs font-bold text-white uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {books.map(book => (
                      <tr key={book.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-gray-900">{book.title}</p>
                          {book.subtitle && <p className="text-xs text-gray-400">{book.subtitle}</p>}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{book.author}</td>
                        <td className="px-6 py-4">
                          <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">{book.category}</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-yellow-600">{book.rating ? `${book.rating}★` : '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{book.price || '-'}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleDeleteBook(book.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {books.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-500">No books yet. Add your first book!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── POPUPS TAB ────────────────────────────────────────────────────────── */}
        {activeTab === 'popups' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
              <strong>How it works:</strong> Create a deal alert popup below. Toggle it Active/Inactive at any time from this dashboard — no code changes needed. The popup appears on your homepage after the delay you set.
            </div>

            {!isEditingPopup && (
              <button onClick={handleAddPopup}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all">
                <Plus className="w-5 h-5" /> Create New Popup
              </button>
            )}

            {isEditingPopup && (
              <div className="bg-white rounded-xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingPopup ? 'Edit Popup' : 'Create Deal Alert Popup'}
                </h2>
                {popupError && (
                  <div className="mb-5 p-4 bg-red-50 border-2 border-red-300 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-700 font-semibold">{popupError}</p>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Popup Title *</label>
                    <input type="text" value={popupForm.title}
                      onChange={e => setPopupForm({ ...popupForm, title: e.target.value })}
                      placeholder="🔥 Limited Time Deal!"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message (optional)</label>
                    <input type="text" value={popupForm.message}
                      onChange={e => setPopupForm({ ...popupForm, message: e.target.value })}
                      placeholder="Use this code before it expires!"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
                  </div>
                  {[
                    { label: 'Firm Name *', key: 'firm', placeholder: 'FTMO' },
                    { label: 'Discount Code *', key: 'code', placeholder: 'FTMO10OFF' },
                    { label: 'Discount Amount *', key: 'discount', placeholder: '10%' },
                    { label: 'Delay (seconds)', key: 'delay_seconds', placeholder: '5', type: 'number' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{f.label}</label>
                      <input type={f.type || 'text'} value={(popupForm as any)[f.key]}
                        onChange={e => setPopupForm({ ...popupForm, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Destination Link *</label>
                    <input type="url" value={popupForm.link}
                      onChange={e => setPopupForm({ ...popupForm, link: e.target.value })}
                      placeholder="https://ftmo.com/?ref=your-id"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                    <span className="text-sm font-semibold text-gray-700">Active on site right now?</span>
                    <button onClick={() => setPopupForm({ ...popupForm, active: !popupForm.active })}
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${popupForm.active ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${popupForm.active ? 'translate-x-8' : 'translate-x-1'}`} />
                    </button>
                    <span className={`text-sm font-bold ${popupForm.active ? 'text-green-600' : 'text-gray-400'}`}>
                      {popupForm.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button onClick={handleSavePopup} disabled={popupSubmitting}
                    className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${popupSubmitting ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                    <Save className="w-5 h-5" /> {popupSubmitting ? 'Saving...' : 'Save Popup'}
                  </button>
                  <button onClick={() => { setIsEditingPopup(false); setEditingPopup(null); }}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <X className="w-5 h-5" /> Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Popups list */}
            {popups.length > 0 ? (
              <div className="space-y-4">
                {popups.map(popup => (
                  <div key={popup.id} className={`bg-white rounded-xl shadow-md border-2 p-5 flex flex-col md:flex-row items-start md:items-center gap-4 transition-all ${popup.active ? 'border-green-300' : 'border-gray-200 opacity-60'}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${popup.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <p className="font-black text-gray-900 text-base">{popup.title}</p>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${popup.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {popup.active ? 'LIVE' : 'OFF'}
                        </span>
                      </div>
                      {popup.message && <p className="text-sm text-gray-500 mb-2">{popup.message}</p>}
                      <div className="flex flex-wrap gap-3 text-xs">
                        <span className="bg-blue-50 text-blue-700 font-bold px-2 py-1 rounded-lg">{popup.firm}</span>
                        <span className="bg-gray-100 font-mono font-bold px-2 py-1 rounded-lg">{popup.code}</span>
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-1 rounded-lg">{popup.discount} off</span>
                        <span className="bg-orange-50 text-orange-600 font-bold px-2 py-1 rounded-lg">Shows after {popup.delay_seconds}s</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Toggle */}
                      <button onClick={() => handleTogglePopup(popup)}
                        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${popup.active ? 'bg-green-500' : 'bg-gray-300'}`}
                        title={popup.active ? 'Click to deactivate' : 'Click to activate'}>
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${popup.active ? 'translate-x-8' : 'translate-x-1'}`} />
                      </button>
                      <button onClick={() => handleEditPopup(popup)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeletePopup(popup.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !isEditingPopup && (
                <div className="text-center py-16 bg-white rounded-xl shadow-md">
                  <Bell className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-500 font-semibold text-lg">No popups yet</p>
                  <p className="text-gray-400 text-sm mt-1">Create your first deal alert popup above</p>
                </div>
              )
            )}
          </div>
        )}

      </div>
    </div>
  );
}