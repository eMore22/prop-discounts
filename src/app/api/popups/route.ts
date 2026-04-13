// src/app/api/admin/popups/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing Supabase env vars');
  return createClient(url, key);
}

function verifyAdminToken(request: NextRequest): boolean {
  const tokenCookie = request.cookies.get('admin_token');
  const jwtSecret = process.env.JWT_SECRET;
  if (!tokenCookie?.value || !jwtSecret) return false;
  try {
    jwt.verify(tokenCookie.value, jwtSecret);
    return true;
  } catch {
    return false;
  }
}

// GET - fetch all popups
export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('deal_popups')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Public GET - for the frontend popup component (no auth needed)
// Called at /api/popups (separate public route - see below)

// POST - create new popup
export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { title, message, firm, code, discount, link, delay_seconds, active } = body;

    if (!title?.trim()) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    if (!firm?.trim()) return NextResponse.json({ error: 'Firm is required' }, { status: 400 });
    if (!code?.trim()) return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    if (!discount?.trim()) return NextResponse.json({ error: 'Discount is required' }, { status: 400 });
    if (!link?.trim()) return NextResponse.json({ error: 'Link is required' }, { status: 400 });

    const { data, error } = await supabase
      .from('deal_popups')
      .insert({
        title: title.trim(),
        message: message?.trim() || null,
        firm: firm.trim(),
        code: code.trim(),
        discount: discount.trim(),
        link: link.trim(),
        delay_seconds: delay_seconds || 5,
        active: active ?? true,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT - update popup (also used for toggle active/inactive)
export async function PUT(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    // Trim strings if present
    if (updates.title) updates.title = updates.title.trim();
    if (updates.message) updates.message = updates.message.trim();
    if (updates.firm) updates.firm = updates.firm.trim();
    if (updates.code) updates.code = updates.code.trim();
    if (updates.discount) updates.discount = updates.discount.trim();
    if (updates.link) updates.link = updates.link.trim();

    const { data, error } = await supabase
      .from('deal_popups')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE - delete popup
export async function DELETE(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const { error } = await supabase.from('deal_popups').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}