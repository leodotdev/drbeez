'use client';

import Image from 'next/image';
import { FileText, Presentation } from 'lucide-react';

export default function Hero() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
            <div className="space-y-6">
              <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-semibold text-charcoal tracking-tight leading-tight">
                What makes Dr. BeeLeez blend smoker's supplement unique?
              </h1>

              <div className="space-y-6 font-[family-name:var(--font-body)] text-xl md:text-2xl text-charcoal leading-relaxed">
                <p>
                  You need to know that tobacco smoking depletes you of specific vitamins, minerals and antioxidants.
                </p>

                <p>
                  Now, we can show multiple studies in the medical literature that restoring losses of specific vitamins, minerals and antioxidants gives the smoker a fighting chance for a healthier life and a longer life. This is a recovery and replenishment system.
                </p>

                <p>
                  Some studies show a decrease the number of cigarettes smoked.
                </p>

                <p className="text-royal-blue font-bold text-2xl md:text-3xl">
                  See the proof!
                </p>
              </div>

              {/* Research Downloads - directly under "See the proof!" */}
              <div className="w-full space-y-4 mt-4">
                {/* PDF Download */}
                <a
                  href="/downloads/Abstracts_of_Nutrient_Depletion_10-19-18.pdf"
                  download
                  className="group block p-4 bg-cream border-2 border-charcoal/20 rounded-lg hover:border-royal-blue hover:bg-royal-blue/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="w-6 h-6 text-royal-blue flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-body)] text-lg font-semibold text-charcoal mb-1 group-hover:text-royal-blue transition-colors">
                        Complete Abstracts of Nutrient Depletion Studies
                      </h3>
                      <p className="font-[family-name:var(--font-body)] text-sm text-charcoal/60">
                        Compilation of research citations and abstracts (PDF)
                      </p>
                    </div>
                  </div>
                </a>

                {/* PPTX Download */}
                <a
                  href="/downloads/Powerpoint_Tob_Smoking_New_Perspective_allows_3-8-25.pptx"
                  download
                  className="group block p-4 bg-cream border-2 border-charcoal/20 rounded-lg hover:border-royal-blue hover:bg-royal-blue/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <Presentation className="w-6 h-6 text-royal-blue flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-body)] text-lg font-semibold text-charcoal mb-1 group-hover:text-royal-blue transition-colors">
                        "Tobacco Smoking: A New Perspective"
                      </h3>
                      <p className="font-[family-name:var(--font-body)] text-sm text-charcoal/60">
                        Dr. Bieley's comprehensive research presentation - 75 slides (PPTX)
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <a
              href={process.env.NEXT_PUBLIC_PURCHASE_URL || '#'}
              className="font-[family-name:var(--font-body)] bg-royal-blue text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-royal-blue/90 transition-all duration-200 shadow-lg w-full sm:w-auto text-center"
            >
              Purchase Direct from Manufacturer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
