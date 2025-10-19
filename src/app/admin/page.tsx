"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar, Tag, Percent, Link as LinkIcon, Lock } from 'lucide-react';

interface DiscountCode {
  firm: string;
  code: string;
  discount: string;
  expiry: string;
  link: string;
  description?: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<DiscountCode>({
    firm: '',
    code: '',
    discount: '',
    expiry: '',
    link: '',
    description: ''
  });

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load codes from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const savedCodes = localStorage.getItem('discountCodes');
      if (savedCodes) {
        setCodes(JSON.parse(savedCodes));
      } else {
        const defaultCodes: DiscountCode[] = [
          {
            firm: "FTMO",
            code: "FTMO10OFF",
            discount: "10%",
            expiry: "2025-12-01",
            link: "https://ftmo.com/?affiliates=your-affiliate-id",
            description: "World's leading prop firm"
          },
          {
            firm: "FundedNext",
            code: "FUNDEDNEXT15",
            discount: "15%",
            expiry: "2025-11-30",
            link: "https://fundednext.com/?ref=your-affiliate-id",
            description: "Fast evaluation process"
          }
        ];
        setCodes(defaultCodes);
        localStorage.setItem('discountCodes', JSON.stringify(defaultCodes));
      }
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (In production, use proper authentication)
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setPassword('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddNew = () => {
    setIsEditing(true);
    setEditingIndex(null);
    setFormData({
      firm: '',
      code: '',
      discount: '',
      expiry: '',
      link: '',
      description: ''
    });
  };

  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditingIndex(index);
    setFormData(codes[index]);
  };

  const handleSave = () => {
    let newCodes;
    if (editingIndex !== null) {
      newCodes = [...codes];
      newCodes[editingIndex] = formData;
    } else {
      newCodes = [...codes, formData];
    }
    setCodes(newCodes);
    localStorage.setItem('discountCodes', JSON.stringify(newCodes));
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this discount code?')) {
      const newCodes = codes.filter((_, i) => i !== index);
      setCodes(newCodes);
      localStorage.setItem('discountCodes', JSON.stringify(newCodes));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingIndex(null);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(codes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'discount-codes.json';
    link.click();
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="Enter admin password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm font-semibold">{error}</p>
              </div>
            )}

            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Login
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Demo Password:</strong> admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  const activeCount = codes.filter(c => new Date(c.expiry) >= new Date()).length;
  const expiredCount = codes.length - activeCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Admin Dashboard</h1>
              <p className="text-xl text-blue-100">Manage your discount codes</p>
            </div>
            <button onClick={handleLogout} className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Logout
            </button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-sm text-gray-600 mb-1">Total Codes</p>
              <p className="text-3xl font-bold text-gray-900">{codes.length}</p>
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
                {editingIndex !== null ? 'Edit Discount Code' : 'Add New Discount Code'}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Tag className="w-4 h-4 inline mr-2" />
                    Firm Name *
                  </label>
                  <input type="text" name="firm" value={formData.firm} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" placeholder="FTMO" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Tag className="w-4 h-4 inline mr-2" />
                    Discount Code *
                  </label>
                  <input type="text" name="code" value={formData.code} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" placeholder="FTMO10OFF" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Percent className="w-4 h-4 inline mr-2" />
                    Discount Amount *
                  </label>
                  <input type="text" name="discount" value={formData.discount} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" placeholder="10%" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Expiry Date *
                  </label>
                  <input type="date" name="expiry" value={formData.expiry} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <LinkIcon className="w-4 h-4 inline mr-2" />
                    Affiliate Link *
                  </label>
                  <input type="url" name="link" value={formData.link} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" placeholder="https://ftmo.com/?ref=your-id" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none" placeholder="Brief description of the firm..." />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all">
                  <Save className="w-5 h-5" />
                  Save
                </button>
                <button onClick={handleCancel} className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all">
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
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">Expiry</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {codes.map((code, index) => {
                    const isExpired = new Date(code.expiry) < new Date();
                    return (
                      <tr key={index} className={isExpired ? 'bg-red-50' : 'hover:bg-blue-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">{code.firm}</div>
                          <div className="text-xs text-gray-500">{code.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">{code.code}</code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-green-600">{code.discount}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{code.expiry}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isExpired ? (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">Expired</span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Active</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex gap-2 justify-end">
                            <button onClick={() => handleEdit(index)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(index)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all">
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

          <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <p className="text-yellow-800 font-semibold mb-2">⚠️ Important Notes:</p>
            <ul className="text-yellow-700 text-sm space-y-1 ml-4">
              <li>• Data is stored in browser localStorage only</li>
              <li>• Export your data regularly as backup</li>
              <li>• Password: admin123 (change in production)</li>
              <li>• Access URL: /admin (hidden from public)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}