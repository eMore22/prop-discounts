// ============================================================
// FILE: src/app/api/v1/firms/route.ts
// GET /api/v1/firms — returns all firms (summary, no full rules)
// GET /api/v1/firms?full=true — returns all firms with full rules
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// Simple in-memory rate limit (per IP, 100 req/min)
const rateLimitMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (entry.count >= 100) return false;
  entry.count++;
  return true;
}

function getIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

export async function GET(req: NextRequest) {
  const ip = getIP(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Max 100 requests per minute.' },
      { status: 429 }
    );
  }

  const full = req.nextUrl.searchParams.get('full') === 'true';

  const supabase = getSupabase();

  const selectFields = full
    ? '*'
    : `firm_slug, firm_name, website, logo_url,
       max_daily_loss_pct, max_total_drawdown_pct, drawdown_type,
       profit_target_pct, min_trading_days, max_trading_days,
       profit_split_pct, payout_frequency, min_payout_usd,
       ea_allowed, news_trading_allowed, weekend_trading_allowed,
       scalping_allowed, hedging_allowed, crypto_allowed,
       platforms, leverage, last_verified`;

  const { data, error } = await supabase
    .from('prop_firm_rules')
    .select(selectFields)
    .order('firm_name', { ascending: true });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch firms' }, { status: 500 });
  }

  return NextResponse.json(
    {
      api_version: 'v1',
      source: 'propcoupouns.com',
      count: data.length,
      firms: data,
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
    },
  });
}