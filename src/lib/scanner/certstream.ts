// src/lib/scanner/certstream.ts
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const PROP_KEYWORDS = [
  'prop', 'funded', 'funding', 'trader', 'trading',
  'capital', 'forex', 'futures', 'challenge', 'fx',
  'fund', 'payout', 'leverage', 'market', 'invest'
];

const EXCLUDE_KEYWORDS = [
  'google', 'facebook', 'amazon', 'microsoft', 'apple',
  'netflix', 'twitter', 'instagram', 'youtube', 'linkedin',
  'github', 'shopify', 'stripe', 'paypal', 'cloudflare'
];

function isPropFirmDomain(domain: string): boolean {
  const lower = domain.toLowerCase();
  if (EXCLUDE_KEYWORDS.some(kw => lower.includes(kw))) return false;
  if (lower.includes('*') || lower.includes('cpanel') || lower.includes('mail.')) return false;
  return PROP_KEYWORDS.some(kw => lower.includes(kw));
}

function domainToSlug(domain: string): string {
  return domain
    .replace(/^www\./, '')
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]/gi, '-')
    .toLowerCase();
}

function domainToName(domain: string): string {
  return domain
    .replace(/^www\./, '')
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

async function extractContactEmail(domain: string): Promise<string | null> {
  try {
    const res = await fetch(`https://${domain}`, {
      signal: AbortSignal.timeout(5000),
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await res.text();
    const emailMatch = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
    if (!emailMatch) return null;
    const filtered = emailMatch.filter(e =>
      !e.includes('example') &&
      !e.includes('placeholder') &&
      !e.includes('sentry') &&
      !e.endsWith('.png') &&
      !e.endsWith('.jpg')
    );
    const priority = filtered.find(e =>
      e.includes('support') || e.includes('admin') || e.includes('contact') || e.includes('info')
    );
    return priority || filtered[0] || null;
  } catch {
    return null;
  }
}

export async function handleNewDomain(domain: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const cleanDomain = domain.replace(/^\*\./, '').replace(/^www\./, '');

  if (!isPropFirmDomain(cleanDomain)) return;

  const slug = domainToSlug(cleanDomain);

  const { data: existing } = await supabase
    .from('prop_firms')
    .select('id')
    .eq('slug', slug)
    .single();

  if (existing) return;

  const claimToken = crypto.randomBytes(32).toString('hex');
  const firmName = domainToName(cleanDomain);
  const contactEmail = await extractContactEmail(cleanDomain);

  const { error } = await supabase.from('prop_firms').insert({
    slug,
    name: firmName,
    status: 'draft',
    claim_token: claimToken,
    contact_email: contactEmail,
    detected_at: new Date().toISOString(),
    website: `https://${cleanDomain}`,
    description: `${firmName} is a newly launched prop trading firm. Claim this listing to provide verified discount codes and rules to traders.`,
    color: '#3B82F6',
  });

  if (error) {
    console.error(`Failed to insert ${cleanDomain}:`, error);
    return;
  }

  console.log(`New prop firm detected: ${firmName} (${cleanDomain})`);

  if (contactEmail) {
    await sendClaimEmail(firmName, cleanDomain, claimToken, contactEmail);
  }
}

async function sendClaimEmail(
  firmName: string,
  domain: string,
  claimToken: string,
  contactEmail: string
): Promise<void> {
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Eugene <contact@propcoupouns.com>',
      to: contactEmail,
      subject: `Launch Detected: Your placeholder profile on PropCoupouns & PropSentinel`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #060d1f, #0d1f3c); padding: 30px; border-radius: 16px; margin-bottom: 24px;">
            <h1 style="color: white; font-size: 24px; font-weight: 900; margin: 0 0 8px 0;">PropCoupouns</h1>
            <p style="color: #94a3b8; margin: 0; font-size: 14px;">Prop Firm Discounts & Risk Intelligence</p>
          </div>
          <p style="color: #374151; font-size: 15px;">Hi there,</p>
          <p style="color: #374151; font-size: 15px;">
            Our automated indexing system has detected the launch of <strong>${domain}</strong> and generated
            an initial provisional listing for <strong>${firmName}</strong> on
            <a href="https://propcoupouns.com" style="color: #2563eb;">propcoupouns.com</a>
            and a compliance placeholder on
            <a href="https://propsentinel.com" style="color: #2563eb;">propsentinel.com</a>.
          </p>
          <div style="background: #fef3c7; border: 1px solid #fde68a; border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="color: #92400e; font-size: 14px; font-weight: 700; margin: 0 0 4px 0;">Current Status: Unverified</p>
            <p style="color: #92400e; font-size: 13px; margin: 0;">Your listing is currently showing as unverified with no active discount codes. Traders searching for ${firmName} are being redirected to verified competitors.</p>
          </div>
          <p style="color: #374151; font-size: 15px;">
            Our ecosystem puts your brand directly in front of funded traders at their precise decision point.
            Many firm owners choose to claim and activate their verified listings immediately upon launch.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="https://propcoupouns.com/claim/${claimToken}"
               style="background: #10b981; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 900; font-size: 16px; display: inline-block;">
              Claim & Activate Your Listing
            </a>
          </div>
          <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #1e293b; font-size: 14px; font-weight: 900; margin: 0 0 12px 0;">What you get when you claim:</h3>
            <ul style="color: #475569; font-size: 13px; padding-left: 20px; margin: 0; line-height: 2;">
              <li>Verified badge across PropCoupouns</li>
              <li>Active discount code displayed to 10,000+ traders</li>
              <li>PropSentinel rules listing visible at trader decision point</li>
              <li>Priority placement above unverified competitors</li>
              <li>Affiliate tracking and commission reporting</li>
            </ul>
          </div>
          <p style="color: #6b7280; font-size: 13px;">
            If you are not the owner of ${domain}, please disregard this email.
          </p>
          <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 24px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Eugene Uguomore · Founder<br>
              PropCoupouns | PropSentinel<br>
              propcoupouns.com · propsentinel.com
            </p>
          </div>
        </div>
      `,
    });

    console.log(`Claim email sent to ${contactEmail} for ${firmName}`);
  } catch (err) {
    console.error('Email send failed:', err);
  }
}
