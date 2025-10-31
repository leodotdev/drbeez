'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, AlertTriangle } from 'lucide-react';

export default function Purchase() {
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
              Purchase from Manufacturer
            </a>
          </div>

          {/* Contact Information */}
          <div className="font-[family-name:var(--font-body)] text-charcoal space-y-3">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-4">
              Dr. Bee Leez Products
            </h3>
            <p className="text-lg">
              11380 Prosperity Farms Road, #114<br />
              Palm Beach Gardens, FL 33410
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a
                href="tel:561-842-7422"
                className="flex items-center gap-2 text-royal-blue hover:underline transition-all"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">561-842-7422</span>
              </a>
              <span className="hidden sm:inline text-charcoal/30">|</span>
              <a
                href="mailto:ask@hllmc.com"
                className="flex items-center gap-2 text-royal-blue hover:underline transition-all"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">ask@hllmc.com</span>
              </a>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="bg-amber-50 border-2 border-amber-600/40 rounded-lg p-8 md:p-10 text-left">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <h4 className="font-[family-name:var(--font-body)] text-2xl font-bold text-amber-900">
                Important Safety Information
              </h4>
            </div>

            <div className="font-[family-name:var(--font-body)] text-base md:text-lg text-charcoal/90 space-y-4 leading-relaxed">
              <p className="font-semibold">
                WARNING: Tobacco smoking can lead to cancer and other health risks. DO NOT use this product as an excuse to start or continue smoking.
              </p>

              <p className="text-base">
                † These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before use if you have any medical conditions or take medications.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="font-[family-name:var(--font-body)] text-sm text-charcoal/50 pt-8">
            <p>© 2019-2025 Harlan Bieley, MD, MS. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
