import type { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ firm: string }> }
): Promise<Metadata> {
  const { firm } = await params;
  const name = firm.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `${name} Discount Code & Review | PropCoupons`,
    description: `Get the latest verified ${name} promo code. Save on your challenge fee and read our full ${name} review.`,
  };
}

export default async function FirmLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ firm: string }>;
}) {
  await params; // resolve to satisfy Next.js 15
  return <>{children}</>;
}