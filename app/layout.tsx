import type { Metadata } from "next";
import { Epilogue, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import { I18nProvider } from "@/lib/i18n";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Bee Leez Blend - Smoker's Supplement | Patent-Protected Formula",
  description: "Scientifically formulated supplement that replaces vitamins, minerals, and antioxidants depleted by tobacco smoking. Based on U.S. Patent #8,889,194 by Dr. Harlan Bieley, MD, MS.",
  keywords: ["smoker's supplement", "vitamin depletion tobacco", "smoking nutrients", "antioxidants for smokers", "B-vitamins smoking"],
  openGraph: {
    title: "Dr. Bee Leez Blend - Smoker's Supplement",
    description: "Replaces vital nutrients depleted by tobacco smoking. Patent-protected formula backed by 100+ peer-reviewed studies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/product-1.webp" as="image" type="image/webp" />
        <link rel="prefetch" href="/product-2.webp" as="image" type="image/webp" />
        <link rel="prefetch" href="/product-3.webp" as="image" type="image/webp" />
        <link rel="prefetch" href="/product-4.webp" as="image" type="image/webp" />
      </head>
      <body
        className={`${epilogue.variable} ${inter.variable} antialiased`}
      >
        <I18nProvider>
          <SkipLink />
          <Header />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
