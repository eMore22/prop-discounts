// src/app/admin/scanner/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  Shield, Search, Trash2, CheckCircle, AlertCircle,
  Plus, ExternalLink, Loader2, ArrowLeft, RefreshCw, Mail
} from 'lucide-react';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default function AdminScannerPage() {
  const router = useRouter();
  const [firms, setFirms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('');
  const [adding, setAdding] = useState(false);
  const [addResult, setAddResult] = useState<{ success: boolean; message: string } | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadFirms = async () => {
    setLoading(true);
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from('prop_firms')
      .select('*')
      .in('status', ['draft', 'unverified', 'pending_claim'])
      .order('detected_at', { ascending: false });
    setFirms(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // Check auth
    fetch('/api/admin/check')
      .then(r => r.json())
      .then(d => {
        if (!d.authenticated) router.push('/admin');
        else loadFirms();
      });
  }, []);

  const handleAddDomain = async () => {
    if (!domain.trim()) return;
    setAdding(true);
    setAddResult(null);
    try {
      const res = await fetch('/api/scanner/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setAddResult({ success: true, message: `Successfully added ${domain}` });
        setDomain('');
        await loadFirms();
      } else {
        setAddResult({ success: false, message: data.error || 'Failed to add domain' });
      }
    } catch {
      setAddResult({ success: false, message: 'Network error' });
    } finally {
      setAdding(false);
    }
  };

  const handleVerify = async (firm: any) => {
    setActionLoading(firm.id);
    try {
      const res = await fetch(`/api/admin/scanner/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: firm.id, status: 'verified' }),
      });
      if (res.ok) {
        showToast(`✅ ${firm.name} marked as verified`);
        await loadFirms();
      }
    } catch {
      showToast('Failed to update status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (firm: any) => {
    if (!confirm(`Delete ${firm.name}? This cannot be undone.`)) return;
    setActionLoading(firm.id);
    try {
      const res = await fetch(`/api/admin/scanner/update`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: firm.id }),
      });
      if (res.ok) {
        showToast(`🗑️ ${firm.name} deleted`);
        await loadFirms();
      }
    } catch {
      showToast('Failed to delete');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = firms.filter(f =>
    !search || f.name.toLowerCase().includes(search.toLowerCase()) ||
    (f.website ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-600';
      case 'unverified': return 'bg-yellow-100 text-yellow-700';
      case 'pending_claim': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-gradient-to-br from-[#060d1f] to-[#0d1f3c] py-8">
        <div className="max-w-6xl mx-auto px-4">
          <button onClick={() => router.push('/admin')}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Admin
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-white">Scanner Management</h1>
              <p className="text-slate-400 text-sm mt-1">Manage unverified prop firm listings</p>
            </div>
            <button onClick={loadFirms}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Unverified', val: firms.length, color: 'text-gray-900' },
            { label: 'Pending Claim', val: firms.filter(f => f.status === 'pending_claim').length, color: 'text-blue-600' },
            { label: 'Draft (No Email)', val: firms.filter(f => f.status === 'draft' && !f.contact_email).length, color: 'text-yellow-600' },
          ].map(({ label, val, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
              <p className={`text-3xl font-black ${color}`}>{val}</p>
              <p className="text-xs text-gray-400 mt-1 font-semibold">{label}</p>
            </div>
          ))}
        </div>

        {/* Add Domain */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-black text-gray-900 text-sm mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-600" /> Manually Add Domain
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g. newpropfirm.com"
              value={domain}
              onChange={e => setDomain(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddDomain()}
              className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-blue-400 focus:outline-none"
            />
            <button
              onClick={handleAddDomain}
              disabled={adding || !domain.trim()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black px-5 py-2.5 rounded-xl text-sm transition-all disabled:opacity-50"
            >
              {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {adding ? 'Adding...' : 'Add Domain'}
            </button>
          </div>
          {addResult && (
            <div className={`mt-3 flex items-center gap-2 text-sm font-semibold ${addResult.success ? 'text-emerald-600' : 'text-red-500'}`}>
              {addResult.success ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {addResult.message}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search firms..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none w-full bg-white"
          />
        </div>

        {/* Firms List */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-400">{filtered.length} firms</p>
            {filtered.map(firm => (
              <div key={firm.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${firm.color ?? '#94a3b8'}, ${firm.color ?? '#94a3b8'}88)` }}>
                  {firm.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-gray-900 text-sm">{firm.name}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusBadge(firm.status)}`}>
                      {firm.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    {firm.website && (
                      <a href={firm.website} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                        <ExternalLink className="w-3 h-3" />
                        {firm.website.replace('https://', '')}
                      </a>
                    )}
                    {firm.contact_email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {firm.contact_email}
                      </span>
                    )}
                    {firm.claimed_by && (
                      <span className="flex items-center gap-1 text-blue-600 font-semibold">
                        Claimed by: {firm.claimed_by}
                      </span>
                    )}
                    {firm.detected_at && (
                      <span>Detected: {new Date(firm.detected_at).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleVerify(firm)}
                    disabled={actionLoading === firm.id}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-3 py-2 rounded-xl text-xs transition-all disabled:opacity-50"
                  >
                    {actionLoading === firm.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CheckCircle className="w-3.5 h-3.5" />
                    )}
                    Verify
                  </button>
                  <button
                    onClick={() => handleDelete(firm)}
                    disabled={actionLoading === firm.id}
                    className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-black px-3 py-2 rounded-xl text-xs transition-all border border-red-200 disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <Shield className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 font-semibold">No unverified firms found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-bold">
          {toast}
        </div>
      )}
    </div>
  );
}