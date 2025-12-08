import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

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

        {/* CLEAN & HIGH-CONVERTING NEWSLETTER BAR */}
        <div className="bg-[#0a0a0f] border-t border-[#333] py-12">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[#00ff9d] text-2xl md:text-3xl font-bold mb-6">
              Get the hottest prop deals in your inbox every Tuesday
            </p>
            <form
              action="https://buttondown.email/api/emails/embed-subscribe/propcoupuons"
              method="post"
              target="popupwindow"
              onSubmit={() => window.open('https://buttondown.email/propcoupouns', 'popupwindow')}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto items-center justify-center"
            >
              <input
                type="email"
                name="email"
                placeholder="you@trader.com"
                required
                className="w-full px-6 py-4 rounded-xl bg-[#111] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff9d] transition"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-[#00ff9d] hover:bg-[#00cc7a] text-black font-bold rounded-xl transition shadow-lg hover:shadow-xl"
              >
                Send Me Deals
              </button>
            </form>
            <p className="text-gray-500 text-sm mt-4">
              Zero spam · Unsubscribe anytime · 5,000+ traders already subscribed
            </p>
          </div>
        </div>

        <Footer />
      </body>
    </html>
  );
}