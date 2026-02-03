"use client";

import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AccessibilityPage() {
  const { t: content } = useI18n();
  const a11y = content.accessibilityStatement;

  return (
    <main id="main-content" className="min-h-screen bg-white" tabIndex={-1}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <h1 className="text-3xl font-bold text-royal-blue mb-8">
          {a11y.title}
        </h1>

        <div className="space-y-8 text-charcoal">
          {/* Compliance Section */}
          <section>
            <h2 className="text-xl font-bold text-royal-blue mb-4">
              {a11y.complianceTitle}
            </h2>
            <p className="leading-relaxed">
              {a11y.complianceText}
            </p>
          </section>

          {/* Features Section */}
          <section>
            <h2 className="text-xl font-bold text-royal-blue mb-4">
              {a11y.featuresTitle}
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {a11y.featuresList.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          {/* Assistive Technologies Section */}
          <section>
            <h2 className="text-xl font-bold text-royal-blue mb-4">
              {a11y.assistiveTechTitle}
            </h2>
            <p className="leading-relaxed">
              {a11y.assistiveTechText}
            </p>
          </section>

          {/* Known Limitations Section */}
          <section>
            <h2 className="text-xl font-bold text-royal-blue mb-4">
              {a11y.limitationsTitle}
            </h2>
            <p className="leading-relaxed">
              {a11y.limitationsText}
            </p>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-xl font-bold text-royal-blue mb-4">
              {a11y.contactTitle}
            </h2>
            <p className="leading-relaxed mb-4">
              {a11y.contactText}
            </p>
            <address className="not-italic">
              <p className="font-medium">{content.purchase.companyName}</p>
              <p>
                <a
                  href={`mailto:${content.purchase.email}`}
                  className="text-royal-blue hover:underline"
                >
                  {content.purchase.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${content.purchase.phone.replace(/-/g, '')}`}
                  className="text-royal-blue hover:underline"
                >
                  {content.purchase.phone}
                </a>
              </p>
            </address>
          </section>

          {/* Last Updated */}
          <p className="text-charcoal-muted text-sm pt-8 border-t border-charcoal/10">
            {a11y.lastUpdated}
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-royal-blue hover:underline"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {a11y.backToHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
