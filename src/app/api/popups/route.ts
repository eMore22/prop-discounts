// src/app/api/popups/route.ts
// Public route - no auth required. Returns the active popup for the site frontend.
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error('Missing Supabase env vars');

    const supabase = createClient(url, key);

    // Return the most recently created active popup
    const { data, error } = await supabase
      .from('deal_popups')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return NextResponse.json(data); // null if none active
  } catch (err: any) {
    return NextResponse.json(null); // fail silently on frontend
  }
}