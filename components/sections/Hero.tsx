'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 bg-cream">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/label_for_Dr_Beez_blend.png"
              alt="Dr. Bee Leez Blend Smoker's Supplement label showing complete formula"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-8 text-center lg:text-left"
        >
          <div className="space-y-4">
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-semibold text-charcoal tracking-tight leading-[1.1]">
              Dr. Bee Leez Blend
            </h1>
            <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-royal-blue font-medium tracking-wide uppercase">
              Smoker's Supplement™
            </p>
          </div>

          <p className="font-[family-name:var(--font-body)] text-xl md:text-2xl text-charcoal leading-relaxed max-w-xl">
            Scientifically Formulated to Replace Vital Nutrients Depleted by Tobacco Smoking
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
            <a
              href={process.env.NEXT_PUBLIC_PURCHASE_URL || '#'}
              className="font-[family-name:var(--font-body)] bg-royal-blue text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-royal-blue/90 transition-all duration-200 shadow-lg w-full sm:w-auto text-center"
            >
              Purchase Direct from Manufacturer
            </a>
            <a
              href="#research"
              className="font-[family-name:var(--font-body)] text-charcoal border-2 border-charcoal px-8 py-4 rounded-md text-lg font-medium hover:bg-charcoal hover:text-cream transition-colors duration-200 w-full sm:w-auto text-center"
            >
              View Research
            </a>
          </div>

          <div className="font-[family-name:var(--font-body)] text-base text-charcoal/70 space-y-1">
            <p>Based on U.S. Patent #8,889,194</p>
            <p>Developed by Dr. Harlan Bieley, MD, MS</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
