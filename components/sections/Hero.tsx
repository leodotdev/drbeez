"use client";

import Image from "next/image";
import { FileText, Presentation, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center">
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
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start gap-8">
            <h1 className="text-royal-blue text-5xl font-bold tracking-tight leading-tight">
              What makes Dr. BeeLeez Blend Smoker's Supplement unique?
            </h1>

            <div className="flex flex-col gap-6 text-lg md:text-xl text-charcoal leading-relaxed">
              <p>
                You need to know that tobacco smoking depletes you of specific
                vitamins, minerals and antioxidants.
              </p>

              <p>
                Now, we can show multiple studies in the medical literature that
                restoring losses of specific vitamins, minerals and antioxidants
                gives the smoker a fighting chance for a healthier life and a
                longer life. This is a recovery and replenishment system.
              </p>

              <p>
                Some studies show a decrease in the number of cigarettes smoked.
              </p>
            </div>

            <h2 className="text-royal-blue font-bold text-2xl md:text-3xl">
              See the proof!
            </h2>

            {/* Research Downloads - directly under "See the proof!" */}
            <div className="flex flex-col items-center lg:items-start gap-2.5">
              {/* PDF Download */}
              <a
                href="/downloads/Abstracts_of_Nutrient_Depletion_10-19-18.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2 border-2 border-charcoal/20 rounded-md text-charcoal hover:border-royal-blue hover:text-royal-blue transition-all duration-200 text-sm"
              >
                <FileText className="w-4 h-4" />
                <span>
                  Endorsement and Complete Abstracts of Nutrient Depletion
                  Studies (PDF)
                </span>
              </a>

              {/* PPTX Download */}
              <a
                href="/downloads/Powerpoint_Tob_Smoking_New_Perspective_allows_3-8-25.pptx"
                download
                className="inline-flex items-center gap-2 px-5 py-2 border-2 border-charcoal/20 rounded-md text-charcoal hover:border-royal-blue hover:text-royal-blue transition-all duration-200 text-sm"
              >
                <Presentation className="w-4 h-4" />
                <span>Tobacco Smoking: A New Perspective (PPTX)</span>
              </a>
            </div>

            <a
              href={process.env.NEXT_PUBLIC_PURCHASE_URL || "#"}
              className="inline-flex items-center gap-2 bg-royal-blue text-white px-8 py-3 rounded-md font-semibold hover:bg-royal-blue/90 transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <span>Purchase Direct from Manufacturer</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
