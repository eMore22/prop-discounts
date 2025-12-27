import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { NewsletterForm } from "@/components/NewsletterForm";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prop Firm Discount Codes December 2025 | Verified Coupons – Prop Coupons",
  description: "Save on FTMO, FundedNext, The5ers & more with exclusive prop firm promo codes. Best deals updated daily for 2025 challenges.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <div className="bg-[#0a0a0f] border-t border-[#333] py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-[#00ff9d] text-2xl md:text-3xl font-bold mb-8">
              Get the hottest prop deals in your inbox every Tuesday
            </h2>
            <NewsletterForm />
            <p className="text-gray-500 text-sm mt-6">
              Zero spam · Unsubscribe anytime · Join 5,000+ traders saving big
            </p>
          </div>
        </div>
        <Footer />
        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}