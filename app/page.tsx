"use client";

import Hero from "@/components/sections/Hero";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";

export default function Home() {
  const { t: content } = useI18n();

  return (
    <main id="main-content" className="min-h-screen bg-white flex flex-col" tabIndex={-1}>
      <Hero />

      {/* Footer */}
      <footer className="border-t border-charcoal/10 py-4 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-2 text-charcoal-muted text-sm">
          <span>{content.purchase.companyName} | Palm Beach Gardens, FL | {content.purchase.phone}</span>
          <div className="flex items-center gap-4">
            <span>U.S. Patent #8,889,194</span>
            <Link
              href="/accessibility"
              className="hover:text-royal-blue hover:underline"
            >
              {content.accessibilityStatement.title}
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
