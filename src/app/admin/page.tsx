"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Save, X, Calendar, Tag, Percent, Link as LinkIcon, Lock, LogOut, AlertCircle } from 'lucide-react';
import PasswordChangeForm from '@/components/admin/PasswordChangeForm';

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

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminEmail, setAdminEmail] = useState(''); 
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [formData, setFormData] = useState({
    firm: '',
    code: '',
    discount: '',
    expiry: '',
    slug: '',
    link: '',
    description: '',
    prop_score: '',
    verification_status: 'verified'
  });
  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDeals();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/check');
      if (response.ok) {
        const data = await response.json();
        if (data.email) {
            setAdminEmail(data.email); 
        } else {
            console.warn("Auth check successful but no email received.");
        }
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setAdminEmail(email); 
      setIsAuthenticated(true);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setLoginError(error.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setAdminEmail('');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchDeals = async () => {
    try {
      const response = await fetch('/api/admin/deals');
      if (response.ok) {
        const data = await response.json();
        setDeals(data);
      }
    } catch (error) {
      console.error('Fetch deals error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (saveError) setSaveError('');
  };

  const handleAddNew = () => {
    setIsEditing(true);
    setEditingDeal(null);
    setSaveError('');
    setFormData({
      firm: '',
      code: '',
      discount: '',
      expiry: '',
      slug: '',
      link: '',
      description: '',
      prop_score: '',
      verification_status: 'verified'
    });
  };

  const handleEdit = (deal: Deal) => {
    setIsEditing(true);
    setEditingDeal(deal);
    setSaveError('');
    setFormData({
      firm: deal.firm,
      code: deal.code,
      discount: deal.discount,
      expiry: deal.expiry || '',
      slug: deal.slug,
      link: deal.link || '',
      description: deal.description || '',
      prop_score: deal.prop_score?.toString() || '',
      verification_status: deal.verification_status || 'verified'
    });
  };

  const handleSave = async () => {
    setSaveError('');
    
    // CLIENT-SIDE VALIDATION
    if (!formData.firm.trim()) {
      setSaveError('Firm name is required');
      return;
    }
    if (!formData.code.trim()) {
      setSaveError('Discount code is required');
      return;
    }
    if (!formData.discount.trim()) {
      setSaveError('Discount amount is required');
      return;
    }
    if (!formData.link.trim()) {
      setSaveError('Affiliate link is required');
      return;
    }

    setSubmitting(true);

    try {
      const slug = formData.slug || formData.firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      const dealData = {
        firm: formData.firm.trim(),
        code: formData.code.trim(),
        discount: formData.discount.trim(),
        expiry: formData.expiry || null,
        slug,
        link: formData.link.trim(),
        description: formData.description.trim(),
        prop_score: formData.prop_score ? parseFloat(formData.prop_score) : null,
        verification_status: formData.verification_status
      };

      console.log('Sending data:', dealData);

      let response;
      if (editingDeal) {
        response = await fetch('/api/admin/deals', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingDeal.id, ...dealData })
        });
      } else {
        response = await fetch('/api/admin/deals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dealData)
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save deal');
      }

      await fetchDeals();
      setIsEditing(false);
      setEditingDeal(null);
      setSaveError('');
    } catch (error: any) {
      console.error('Save error:', error);
      setSaveError(error.message || 'Failed to save deal. Please check all required fields.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this deal?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/deals?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete deal');
      }

      await fetchDeals();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete deal');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingDeal(null);
    setSaveError('');
  };

  const exportData = () => {
    const dataStr = JSON.stringify(deals, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prop-deals-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
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
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
                submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:scale-105'
              }`}
            >
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">← Back to Home</a>
          </div>
        </div>
      </div>
    );
  }

  const activeCount = deals.filter(d => !d.expiry || new Date(d.expiry) >= new Date()).length;
  const expiredCount = deals.length - activeCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Admin Dashboard</h1>
              <p className="text-xl text-blue-100">Manage your discount codes</p>
            </div>
            <button onClick={handleLogout} className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-sm text-gray-600 mb-1">Total Deals</p>
                <p className="text-3xl font-bold text-gray-900">{deals.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-sm text-gray-600 mb-1">Active</p>
                <p className="text-3xl font-bold text-green-600">{activeCount}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-sm text-gray-600 mb-1">Expired</p>
                <p className="text-3xl font-bold text-red-600">{expiredCount}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center">
                <button onClick={exportData} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all">
                  Export Data
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <PasswordChangeForm adminEmail={adminEmail} /> 
            </div>
          </div>

          {!isEditing && (
            <div className="mb-6">
              <button onClick={handleAddNew} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all">
                <Plus className="w-5 h-5" />
                Add New Discount Code
              </button>
            </div>
          )}

          {isEditing && (
            <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingDeal ? 'Edit Discount Code' : 'Add New Discount Code'}
              </h2>

              {saveError && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-red-800 mb-1">Error Saving Deal</p>
                    <p className="text-sm text-red-700">{saveError}</p>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Tag className="w-4 h-4 inline mr-2" />
                    Firm Name * <span className="text-red-600">Required</span>
                  </label>
                  <input 
                    type="text" 
                    name="firm" 
                    value={formData.firm} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
                    placeholder="FTMO" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Tag className="w-4 h-4 inline mr-2" />
                    Discount Code * <span className="text-red-600">Required</span>
                  </label>
                  <input 
                    type="text" 
                    name="code" 
                    value={formData.code} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
                    placeholder="FTMO10OFF" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Percent className="w-4 h-4 inline mr-2" />
                    Discount Amount * <span className="text-red-600">Required</span>
                  </label>
                  <input 
                    type="text" 
                    name="discount" 
                    value={formData.discount} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
                    placeholder="10%" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Expiry Date
                  </label>
                  <input 
                    type="date" 
                    name="expiry" 
                    value={formData.expiry} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (auto-generated if empty)</label>
                  <input 
                    type="text" 
                    name="slug" 
                    value={formData.slug} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
                    placeholder="ftmo" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Prop Score (0-10)</label>
                  <input 
                    type="number" 
                    name="prop_score" 
                    value={formData.prop_score} 
                    onChange={handleInputChange} 
                    step="0.1"
                    min="0"
                    max="10"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
                    placeholder="8.5" 
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <LinkIcon className="w-4 h-4 inline mr-2" />
                    Affiliate Link * <span className="text-red-600">Required</span>
                  </label>
                  <input 
                    type="url" 
                    name="link" 
                    value={formData.link} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
                    placeholder="https://ftmo.com/?ref=your-id" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Verification Status</label>
                  <select
                    name="verification_status"
                    value={formData.verification_status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  >
                    <option value="verified">Verified</option>
                    <option value="sponsored">Sponsored</option>
                    <option value="community-favorite">Community Favorite</option>
                    <option value="limited-time">Limited Time</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    rows={3} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none" 
                    placeholder="Brief description of the firm..." 
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button 
                  onClick={handleSave} 
                  disabled={submitting}
                  className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    submitting ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  <Save className="w-5 h-5" />
                  {submitting ? 'Saving...' : 'Save'}
                </button>
                <button 
                  onClick={handleCancel} 
                  disabled={submitting}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">Firm</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">Code</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">Discount</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">Score</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">Expiry</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deals.map((deal) => {
                    const isExpired = deal.expiry ? new Date(deal.expiry) < new Date() : false;
                    return (
                      <tr key={deal.id} className={isExpired ? 'bg-red-50' : 'hover:bg-blue-50'}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">{deal.firm}</div>
                          <div className="text-xs text-gray-500">{deal.description}</div>
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
                          {isExpired ? (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">Expired</span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Active</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex gap-2 justify-end">
                            <button 
                              onClick={() => handleEdit(deal)} 
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(deal.id)} 
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                            >
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
          </div>

          {deals.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <p className="text-xl text-gray-600">No deals found. Add your first discount code!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}