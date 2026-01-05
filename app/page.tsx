"use client";

import Hero from "@/components/sections/Hero";
import { useI18n } from "@/lib/i18n";

export default function Home() {
  const { t: content } = useI18n();

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Hero />

      {/* Footer */}
      <footer className="border-t border-charcoal/10 py-4 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-2 text-charcoal/50 text-sm">
          <span>{content.purchase.companyName} | Palm Beach Gardens, FL | {content.purchase.phone}</span>
          <span>U.S. Patent #8,889,194 | {content.purchase.disclaimerText.split('.')[0]}</span>
        </div>
      </footer>
    </main>
  );
}
