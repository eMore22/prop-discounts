// ============================================================
// FILE: src/app/api/v1/firms/[slug]/route.ts
// GET /api/v1/firms/{slug} — full firm profile + rules summary
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

  const supabase = getSupabase();

  // Fetch rules + join basic display info from prop_firms
  const [rulesResult, firmResult] = await Promise.all([
    supabase
      .from('prop_firm_rules')
      .select('*')
      .eq('firm_slug', slug)
      .single(),
    supabase
      .from('prop_firms')
      .select('tp_rating, tp_reviews, prop_score, description, pros, cons, plans')
      .eq('slug', slug)
      .single(),
  ]);

  if (rulesResult.error || !rulesResult.data) {
    return NextResponse.json(
      { error: `Firm '${slug}' not found.` },
      { status: 404 }
    );
  }

  const payload = {
    api_version: 'v1',
    source: 'propcoupouns.com',
    firm: {
      ...rulesResult.data,
      // Merge in display data from prop_firms if available
      ...(firmResult.data
        ? {
            tp_rating: firmResult.data.tp_rating,
            tp_reviews: firmResult.data.tp_reviews,
            prop_score: firmResult.data.prop_score,
            description: firmResult.data.description,
            pros: firmResult.data.pros,
            cons: firmResult.data.cons,
            plans: firmResult.data.plans,
          }
        : {}),
    },
  };

  return NextResponse.json(payload, {
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