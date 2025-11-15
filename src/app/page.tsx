// src/app/page.tsx
// UPDATED: Server-side rendering with client components for interactivity

import { getDeals } from '@/lib/getDeals';
import PropDiscountsClient from './PropDiscountsClient';

// Force dynamic rendering - prevents build-time Supabase calls
export const dynamic = 'force-dynamic';

// This is a Server Component - runs on server, SEO-friendly
export default async function HomePage() {
  try {
    // Fetch data on the server
    const deals = await getDeals();
    
    // Map to UI format
    const discountCodes = deals.map(deal => ({
      firm: deal.firm,
      code: deal.code,
      discount: deal.discount,
      expiry: deal.expiry || '',
      link: deal.link || '',
      description: deal.description,
      propScore: deal.prop_score || undefined,
      verificationStatus: deal.verification_status,
      votes: {
        gotPaid: deal.votes_got_paid || 0,
        stillWaiting: deal.votes_still_waiting || 0,
        failed: deal.votes_failed || 0
      }
    }));

    // Pass server-fetched data to client component
    return <PropDiscountsClient initialDiscountCodes={discountCodes} />;
  } catch (error) {
    console.error('Error loading deals:', error);
    // Return empty array on error so page still renders
    return <PropDiscountsClient initialDiscountCodes={[]} />;
  }
}

// Add metadata for SEO
export const metadata = {
  title: '19+ Verified Prop Firm Discount Codes 2025 | Prop Discounts',
  description: 'Save up to 90% on prop firm challenges. Get exclusive discount codes for Apex, FTMO, TopStep & 16 more firms. Updated daily. Free to use.',
  keywords: 'prop firm discounts, prop trading coupons, funded account deals, prop firm promo codes',
  openGraph: {
    title: '19+ Verified Prop Firm Discount Codes 2025',
    description: 'Save up to 90% on prop firm challenges with verified discount codes.',
    url: 'https://www.propcoupouns.com',
    siteName: 'Prop Discounts',
    images: [
      {
        url: 'https://www.propcoupouns.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '19+ Verified Prop Firm Discount Codes 2025',
    description: 'Save up to 90% on prop firm challenges.',
  },
};