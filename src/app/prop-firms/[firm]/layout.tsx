export async function generateMetadata({ params }: { params: { firm: string } }) {
  // This will generate unique metadata for each firm page
  const firmName = params.firm.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${firmName} Discount Code 2025 – Save Up To 50% | Prop Coupon`,
    description: `Get the latest ${firmName} promo codes and discount codes for 2025. Save up to 50% on prop trading challenges. Verified codes updated daily.`,
    keywords: `${firmName} discount code, ${firmName} promo code, ${firmName} coupon, ${firmName} discount 2025`,
  };
}

export default function FirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}