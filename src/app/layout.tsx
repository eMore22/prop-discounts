import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { NewsletterForm } from "@/components/NewsletterForm"; // ← This line is important!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prop Discounts",
  description: "Exclusive and verified discount codes for top prop firms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MR6MGMFT');
          `}
        </Script>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MR6MGMFT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Navbar />
        {children}

        {/* ←←← PERFECT NEWSLETTER BAR – FINAL VERSION ↓↓↓ */}
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
        {/* ←←← END OF NEWSLETTER BAR ↑↑↑ */}

        <Footer />
      </body>
    </html>
  );
}