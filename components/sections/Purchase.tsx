'use client';

import { Phone, Mail, AlertTriangle } from 'lucide-react';
import { useContent } from '@/lib/use-content';

export default function Purchase() {
  const { content } = useContent();
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 lg:py-40 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-12">
          {/* Purchase Button */}
          <div>
            <a
              href={process.env.NEXT_PUBLIC_PURCHASE_URL || '#'}
              className="inline-block font-[family-name:var(--font-body)] bg-royal-blue text-white px-8 py-3 rounded-lg text-xl md:text-2xl font-bold hover:bg-royal-blue/90 transition-all duration-200 shadow-2xl"
            >
              {content.purchase.buttonText}
            </a>
          </div>

          {/* Contact Information */}
          <div className="font-[family-name:var(--font-body)] text-charcoal space-y-3">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-4">
              {content.purchase.companyName}
            </h3>
            <p className="text-lg whitespace-pre-line">
              {content.purchase.address}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a
                href={`tel:${content.purchase.phone}`}
                className="flex items-center gap-2 text-royal-blue hover:underline transition-all"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">{content.purchase.phone}</span>
              </a>
              <span className="hidden sm:inline text-charcoal/30">|</span>
              <a
                href={`mailto:${content.purchase.email}`}
                className="flex items-center gap-2 text-royal-blue hover:underline transition-all"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">{content.purchase.email}</span>
              </a>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="bg-amber-50 border-2 border-amber-600/40 rounded-lg p-8 md:p-10 text-left">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <h4 className="font-[family-name:var(--font-body)] text-2xl font-bold text-amber-900">
                {content.purchase.warningTitle}
              </h4>
            </div>

            <div className="font-[family-name:var(--font-body)] text-base md:text-lg text-charcoal/90 space-y-4 leading-relaxed">
              <p className="font-semibold">
                {content.purchase.warningText}
              </p>

              <p className="text-base">
                {content.purchase.disclaimerText}
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="font-[family-name:var(--font-body)] text-sm text-charcoal/50 pt-8">
            <p>{content.purchase.copyright}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
