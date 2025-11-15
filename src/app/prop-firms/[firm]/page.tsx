// src/app/prop-firms/[firm]/page.tsx
// UPDATED: Server-side rendering for SEO

import { getDealBySlug, getDeals } from '@/lib/getDeals';
import { notFound } from 'next/navigation';
import FirmDetailClient from './FirmDetailClient';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    firm: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const firmData = await getDealBySlug(params.firm);
    
    if (!firmData) {
      return {
        title: 'Firm Not Found | Prop Discounts',
      };
    }

    return {
      title: `${firmData.firm} Discount Code - Save ${firmData.discount} [2025] | Prop Discounts`,
      description: `Active ${firmData.firm} discount codes. Save up to ${firmData.discount} on funded trading challenges. Verified daily. Free to use.`,
      keywords: `${firmData.firm} discount code, ${firmData.firm} coupon, ${firmData.firm} promo code, prop firm discount`,
      openGraph: {
        title: `${firmData.firm} Discount Code - Save ${firmData.discount}`,
        description: `Save ${firmData.discount} on ${firmData.firm} challenges with our verified discount code`,
        url: `https://www.propcoupouns.com/prop-firms/${params.firm}`,
        type: 'website',
        images: [
          {
            url: `https://www.propcoupouns.com/og-image.jpg`,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${firmData.firm} Discount Code - Save ${firmData.discount}`,
        description: `Save ${firmData.discount} on ${firmData.firm} challenges`,
      },
    };
  } catch (error) {
    return {
      title: 'Firm Not Found | Prop Discounts',
    };
  }
}

// Server Component - fetches data on server
export default async function FirmDetailPage({ params }: PageProps) {
  try {
    // Fetch data on server
    const [firmData, allFirms] = await Promise.all([
      getDealBySlug(params.firm),
      getDeals()
    ]);
    
    if (!firmData) {
      notFound();
    }

    const otherFirms = allFirms
      .filter(f => f.slug !== params.firm)
      .slice(0, 3);

    // Pass server-fetched data to client component
    return (
      <FirmDetailClient 
        firm={firmData}
        otherFirms={otherFirms}
      />
    );
  } catch (error) {
    console.error('Error fetching firm data:', error);
    notFound();
  }
}

// Generate static paths for all firms at build time
export async function generateStaticParams() {
  try {
    const deals = await getDeals();
    return deals.map((deal) => ({
      firm: deal.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Revalidate every hour
export const revalidate = 3600;