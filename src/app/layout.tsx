import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GoogleAdsense } from "@/components/GoogleAdsense";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | 24bitColors - 無料色彩診断",
    default: "無料色彩診断テスト、あなたの感性を可視化 | 24bitColors",
  },
  description:
    "たった20問の無料色彩診断で、あなたが直感的に心地よいと感じる「運命の色」を1677万色から特定します。登録不要、30秒で完了。自分の色彩感覚を知りたい方や、デザインのインスピレーションを得たい方におすすめ。",
  metadataBase: new URL("https://24bitcolors.com"),
  keywords: [
    "色彩診断",
    "色診断",
    "無料テスト",
    "色彩感覚",
    "好みの色",
    "パーソナルカラー",
    "デザイン",
    "1677万色",
    "OKLCH",
  ],
  authors: [{ name: "24bitColors Team" }],
  openGraph: {
    title: "無料色彩診断テスト、あなたの感性を可視化 | 24bitColors",
    description:
      "20問の選択で、あなたが直感的に心地よいと感じる「運命の色」を1677万色から特定します。登録不要で今すぐ分析。",
    url: "https://24bitcolors.com",
    siteName: "24bitColors",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Ensure this exists or use a default
        width: 1200,
        height: 630,
        alt: "24bitColors Diagnosis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "無料色彩診断テスト | 24bitColors",
    description:
      "あなたが直感的に心地よいと感じる「運命の色」を1677万色から特定します。登録不要の無料診断。",
  },
  verification: {
    google: "TaOm_LAGUp_4fRTmzV_USJgAIEUimwfCDb5l-Q-DsPY",
  },
  other: {
    "google-adsense-account": "ca-pub-8772469250047655",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: { themeColor: string } = {
  themeColor: "#E8E8E8",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "24bitColors",
  url: "https://24bitcolors.com",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
  },
  description:
    "20の質問であなたの好きな色を1677万色の中から特定します。bit診断方式による色の好み診断。",
  publisher: {
    "@type": "Organization",
    name: "24bitColors Team",
    logo: {
      "@type": "ImageObject",
      url: "https://24bitcolors.com/icon",
    },
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            <Header />
            <main className="flex-grow flex flex-col">
              <Breadcrumbs />
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        {/* scripts ... */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <GoogleAdsense pId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID} />
        )}
      </body>
    </html>
  );
}
