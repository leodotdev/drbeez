"use client";

import Image from "next/image";
import { FileText, Presentation, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [quantity, setQuantity] = useState(1);

  // Pricing: 1=$50, 2=$100, 3=$135, 4-19=$45 each, 20+=$40 each
  const calculateDisplayPrice = (qty: number) => {
    if (qty <= 0) return 0;
    if (qty === 1) return 50;
    if (qty === 2) return 100;
    if (qty === 3) return 135;
    if (qty < 20) {
      // For 4-19: $135 base (first 3) + $45 for each additional
      return 135 + (qty - 3) * 45;
    }
    // For 20+: $40 per item
    return qty * 40;
  };

  const displayPrice = calculateDisplayPrice(quantity);

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
            <h1 className="text-royal-blue text-3xl font-bold tracking-tight leading-tight">
              What makes Dr. BeeLeez Blend Smoker's Supplement unique?
            </h1>

            <div className="flex flex-col gap-6 text-charcoal leading-relaxed">
              <p>
                Tobacco smoking depletes you of specific vitamins, minerals and
                antioxidants.
              </p>

              <p>
                Multiple medical studies show that restoring the loss of
                specific vitamins, minerals and antioxidants gives smokers a
                fighting chance for a healthier and longer life.
              </p>

              <p>This supplement is a recovery and replenishment system.</p>

              <p>
                Additional studies show a decrease in the number of cigarettes
                smoked.
              </p>
            </div>

            <h2 className="text-royal-blue font-bold text-3xl">
              See the proof!
            </h2>

            {/* Research Downloads - directly under "See the proof!" */}
            <div className="flex flex-col items-center lg:items-start gap-2.5">
              {/* PDF Download */}
              <a
                href="/downloads/Abstracts_of_Nutrient_Depletion_10-19-18.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2 border-2 border-charcoal/20 rounded-md text-charcoal hover:border-royal-blue hover:text-royal-blue transition-all duration-200"
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
                className="inline-flex items-center gap-2 px-5 py-2 border-2 border-charcoal/20 rounded-md text-charcoal hover:border-royal-blue hover:text-royal-blue transition-all duration-200"
              >
                <Presentation className="w-4 h-4" />
                <span>Tobacco Smoking: A New Perspective (PPTX)</span>
              </a>
            </div>

            {/* Purchase Form */}
            <form
              method="post"
              action="https://stats.slimcd.com/cscript/cart32.exe/1549B-AddItem"
              className="w-full sm:w-auto"
            >
              <input type="hidden" name="item" value="Dr. BeeLeez Blend" />
              <input type="hidden" name="Price" value="50.00" />
              <input type="hidden" name="PartNo" value="DS1" />

              <div className="flex flex-col items-center lg:items-start gap-4">
                <div className="flex items-center gap-4">
                  <label htmlFor="qty" className="text-charcoal font-medium">
                    Qty:
                  </label>
                  <input
                    type="number"
                    id="qty"
                    name="Qty"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    min="1"
                    // max="99"
                    className="w-24 px-3 py-2 border-2 border-charcoal/20 rounded-md text-charcoal focus:border-royal-blue focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-charcoal font-semibold">
                    Price: ${displayPrice.toFixed(2)}
                  </div>
                  {quantity >= 3 && (
                    <div className="text-royal-blue font-medium">
                      Save ${(quantity * 50 - displayPrice).toFixed(2)}!
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-royal-blue text-white px-8 py-3 rounded-md font-semibold hover:bg-royal-blue/90 transition-all duration-200 w-full sm:w-auto justify-center"
                >
                  <span>Add to Shopping Cart</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
