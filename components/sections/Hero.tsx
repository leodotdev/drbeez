'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 lg:py-40 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
        {/* Product Image - Centered & Larger */}
        <div className="relative w-full max-w-3xl md:max-w-5xl h-64 md:h-96">
          <Image
            src="/label_for_Dr_Beez_blend.png"
            alt="Dr. Bee Leez Blend Smoker's Supplement label showing complete formula"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Content - All Centered */}
        <div className="flex flex-col gap-8 items-center">
          <div className="space-y-4">
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-8xl font-semibold text-charcoal tracking-tight leading-[1.05]">
              Dr. Bee Leez Blend
            </h1>
            <p className="font-[family-name:var(--font-body)] text-xl md:text-2xl text-royal-blue font-medium tracking-widest uppercase">
              Smoker's Supplement™
            </p>
          </div>

          <p className="font-[family-name:var(--font-body)] text-xl md:text-2xl lg:text-3xl text-charcoal leading-relaxed max-w-3xl">
            Scientifically Formulated to Replace Vital Nutrients Depleted by Tobacco Smoking
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
            <a
              href={process.env.NEXT_PUBLIC_PURCHASE_URL || '#'}
              className="font-[family-name:var(--font-body)] bg-royal-blue text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-royal-blue/90 transition-all duration-200 shadow-lg w-full sm:w-auto text-center"
            >
              Purchase Direct from Manufacturer
            </a>
            <a
              href="#research"
              className="font-[family-name:var(--font-body)] text-charcoal border-2 border-charcoal px-8 py-3 rounded-md text-lg font-medium hover:bg-charcoal hover:text-cream transition-colors duration-200 w-full sm:w-auto text-center"
            >
              View Research
            </a>
          </div>

          <div className="font-[family-name:var(--font-body)] text-base md:text-lg text-charcoal/70 space-y-1 pt-4">
            <p>Based on U.S. Patent #8,889,194</p>
            <p>Developed by Dr. Harlan Bieley, MD, MS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
