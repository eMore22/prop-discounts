// src/app/api/scanner/claim/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  try {
    const { token, email, tier } = await req.json();

    if (!token || !email || !tier) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data: firm, error: findError } = await supabase
      .from('prop_firms')
      .select('*')
      .eq('claim_token', token)
      .single();

    if (findError || !firm) {
      return NextResponse.json({ error: 'Invalid claim token' }, { status: 404 });
    }

    if (firm.status === 'verified') {
      return NextResponse.json({ error: 'This listing has already been claimed' }, { status: 400 });
    }

    await supabase
      .from('prop_firms')
      .update({
        status: 'pending_claim',
        claimed_by: email,
        claimed_at: new Date().toISOString(),
      })
      .eq('id', firm.id);

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'PropCoupouns Scanner <contact@propcoupouns.com>',
      to: 'contact@propcoupouns.com',
      subject: `New Claim: ${firm.name} — ${tier} tier`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px;">
          <h2 style="color: #1e293b;">New Listing Claim</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; color: #64748b; font-size: 14px;">Firm</td><td style="padding: 8px; font-weight: bold;">${firm.name}</td></tr>
            <tr><td style="padding: 8px; color: #64748b; font-size: 14px;">Website</td><td style="padding: 8px;">${firm.website}</td></tr>
            <tr><td style="padding: 8px; color: #64748b; font-size: 14px;">Claimed by</td><td style="padding: 8px;">${email}</td></tr>
            <tr><td style="padding: 8px; color: #64748b; font-size: 14px;">Tier selected</td><td style="padding: 8px; font-weight: bold; color: #2563eb;">${tier}</td></tr>
            <tr><td style="padding: 8px; color: #64748b; font-size: 14px;">Claimed at</td><td style="padding: 8px;">${new Date().toISOString()}</td></tr>
          </table>
          <p style="color: #475569; font-size: 14px; margin-top: 16px;">
            Follow up with ${email} to complete onboarding and collect payment.
          </p>
        </div>
      `,
    });

    await resend.emails.send({
      from: 'Eugene <contact@propcoupouns.com>',
      to: email,
      subject: `Your claim for ${firm.name} is under review`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px;">
          <h2 style="color: #1e293b;">Thanks for claiming your listing!</h2>
          <p style="color: #475569;">
            We have received your claim for <strong>${firm.name}</strong> on the <strong>${tier}</strong> tier.
            Our team will reach out within 24 hours to complete onboarding and get your listing live.
          </p>
          <p style="color: #475569;">Please prepare:</p>
          <ul style="color: #475569; font-size: 14px; line-height: 2;">
            <li>Your affiliate/referral tracking link</li>
            <li>A custom discount code for PropCoupouns traders</li>
            <li>Your firm logo (PNG or SVG format)</li>
          </ul>
          <p style="color: #6b7280; font-size: 13px; margin-top: 24px;">
            Eugene Uguomore · Founder<br>
            PropCoupouns | PropSentinel
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Claim error:', err);
    return NextResponse.json({ error: 'Claim failed' }, { status: 500 });
  }
}
