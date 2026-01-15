// FILE 6: src/app/prop-firms/[firm]/layout.tsx
// ==========================================
export async function generateMetadata({ params }: { params: { firm: string } }) {
  const firmName = params.firm.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${firmName} Discount Code 2026 – Save Up To 50% | Prop Firm Discounts`,
    description: `Get the latest ${firmName} promo codes and discount codes for 2026. Save up to 50% on prop trading challenges. Verified codes updated daily.`,
    keywords: `${firmName} discount code, ${firmName} promo code, ${firmName} coupon, ${firmName} discount 2026`,
  };
}

export default function FirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}