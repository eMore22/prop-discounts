import { MetadataRoute } from 'next';
import { getDeals } from '@/lib/getDeals';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://propcoupouns.com';

  // ── Static pages ────────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/prop-firms`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/affiliate-disclosure`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ── Dynamic firm pages from Supabase ────────────────────────────────────────
  let firmPages: MetadataRoute.Sitemap = [];
  try {
    const deals = await getDeals();
    firmPages = deals.map((deal) => {
      const slug = deal.firm
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      return {
        url: `${baseUrl}/prop-firms/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      };
    });
  } catch (error) {
    console.error('Sitemap: failed to fetch deals from Supabase', error);
  }

  // ── Static blog posts ────────────────────────────────────────────────────────
  const blogSlugs = [
    'ftmo-profit-split-increase-2026',
    'fundednext-stellar-model-2026',
    'prop-firm-regulations-2026',
    'best-prop-firm-discounts-2026',
    'ftmo-vs-fundednext-2026',
    'passing-ftmo-challenge-tips',
    'goat-funded-50000-accounts',
    'prop-firm-payout-reliability-2026',
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...firmPages, ...blogPages];
}