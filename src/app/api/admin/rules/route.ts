// ============================================================
// FILE: src/app/api/admin/rules/route.ts
// Admin CRUD for prop_firm_rules table (JWT protected)
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function verifyAuth(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return false;
  try {
    jwt.verify(auth.slice(7), process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}

// GET all rules (admin view with all fields)
export async function GET(req: NextRequest) {
  if (!verifyAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const slug = req.nextUrl.searchParams.get('slug');
  const supabase = getSupabase();

  const query = supabase.from('prop_firm_rules').select('*').order('firm_name');
  if (slug) query.eq('firm_slug', slug);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rules: data });
}

// PUT — update a firm's rules by slug
export async function PUT(req: NextRequest) {
  if (!verifyAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { firm_slug, ...updates } = body;

  if (!firm_slug) return NextResponse.json({ error: 'firm_slug required' }, { status: 400 });

  // Never allow overwriting slug or id
  delete updates.id;
  delete updates.created_at;
  updates.last_verified = new Date().toISOString();

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('prop_firm_rules')
    .update(updates)
    .eq('firm_slug', firm_slug)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, rule: data });
}

// POST — insert new firm rules
export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  if (!body.firm_slug || !body.firm_name) {
    return NextResponse.json({ error: 'firm_slug and firm_name are required' }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('prop_firm_rules')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, rule: data }, { status: 201 });
}

// DELETE — remove firm rules by slug
export async function DELETE(req: NextRequest) {
  if (!verifyAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

  const supabase = getSupabase();
  const { error } = await supabase
    .from('prop_firm_rules')
    .delete()
    .eq('firm_slug', slug);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}