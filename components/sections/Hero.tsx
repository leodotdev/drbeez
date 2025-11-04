'use client';

import Image from 'next/image';
import { useContent } from '@/lib/use-content';

export default function Hero() {
  const { content } = useContent();

  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Product Image - Left Side */}
        <div className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0">
          <Image
            src="/hero-1.png"
            alt="Dr. Bee Leez Blend Smoker's Supplement"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Content - Right Side */}
        <div className="flex flex-col gap-8 text-center lg:text-left items-center lg:items-start">
          <div className="space-y-4">
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-semibold text-charcoal tracking-tight leading-[1.1]">
              {content.hero.title}
            </h1>
            <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-royal-blue font-medium tracking-wide uppercase">
              {content.hero.subtitle}
            </p>
          </div>

          <p className="font-[family-name:var(--font-body)] text-xl md:text-2xl text-charcoal leading-relaxed max-w-xl">
            {content.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
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

          <div className="font-[family-name:var(--font-body)] text-base text-charcoal/70 space-y-1">
            <p>{content.hero.patent}</p>
            <p>{content.hero.developer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
