// ============================================================
// FILE: src/app/api/v1/firms/[slug]/rules/route.ts
// GET /api/v1/firms/{slug}/rules
// GET /api/v1/firms/{slug}/rules?account_type=2-Step+Challenge
// — returns structured rules object optimised for PropSentinel
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const ip = getIP(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Max 100 requests per minute.' },
      { status: 429 }
    );
  }

  const { slug } = await params;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: 'Invalid slug format.' }, { status: 400 });
  }

  const accountTypeFilter = req.nextUrl.searchParams.get('account_type');

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('prop_firm_rules')
    .select('*')
    .eq('firm_slug', slug)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: `Firm '${slug}' not found.` },
      { status: 404 }
    );
  }

  // Filter account types if requested
  let accountTypes = data.account_types ?? [];
  if (accountTypeFilter) {
    const filtered = accountTypes.filter((at: { type_name: string }) =>
      at.type_name.toLowerCase().includes(accountTypeFilter.toLowerCase())
    );
    if (filtered.length === 0) {
      return NextResponse.json(
        {
          error: `No account type matching '${accountTypeFilter}' found for ${data.firm_name}.`,
          available_types: accountTypes.map((at: { type_name: string }) => at.type_name),
        },
        { status: 404 }
      );
    }
    accountTypes = filtered;
  }

  // PropSentinel-optimised rules payload
  const rules = {
    api_version: 'v1',
    source: 'propcoupouns.com',
    last_verified: data.last_verified,

    // Identity
    firm_slug: data.firm_slug,
    firm_name: data.firm_name,
    website: data.website,
    logo_url: data.logo_url,
    rules_source_url: data.rules_source_url,

    // Account types (all or filtered)
    account_types: accountTypes,

    // Primary risk parameters (for quick pre-fill)
    risk: {
      max_daily_loss_pct: data.max_daily_loss_pct,
      max_total_drawdown_pct: data.max_total_drawdown_pct,
      drawdown_type: data.drawdown_type,
      profit_target_pct: data.profit_target_pct,
      min_trading_days: data.min_trading_days,
      max_trading_days: data.max_trading_days,
      consistency_rule: data.consistency_rule,
    },

    // Payout
    payout: {
      profit_split_pct: data.profit_split_pct,
      frequency: data.payout_frequency,
      min_payout_usd: data.min_payout_usd,
      first_payout_days: data.first_payout_days,
    },

    // Trading rules (for compliance checks)
    trading: {
      allowed_instruments: data.allowed_instruments,
      forbidden_instruments: data.forbidden_instruments,
      max_lot_size: data.max_lot_size,
      max_positions: data.max_positions,
      ea_allowed: data.ea_allowed,
      news_trading_allowed: data.news_trading_allowed,
      weekend_trading_allowed: data.weekend_trading_allowed,
      scalping_allowed: data.scalping_allowed,
      hedging_allowed: data.hedging_allowed,
      copy_trading_allowed: data.copy_trading_allowed,
      crypto_allowed: data.crypto_allowed,
    },

    // Platform info
    platform: {
      platforms: data.platforms,
      leverage: data.leverage,
    },

    // Scaling milestones
    scaling_plan: data.scaling_plan,
  };

  return NextResponse.json(rules, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
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