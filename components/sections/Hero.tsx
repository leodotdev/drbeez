"use client";

import Image from "next/image";
import { FileText, Presentation, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { defaultContent, type SiteContent } from "@/lib/default-content";

const heroImages = [
  "/hero-1.png",
  "/hero-2.jpeg",
  "/hero-3.jpeg",
  "/hero-4.jpeg",
];

export default function Hero() {
  const [quantity, setQuantity] = useState(1);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/content');
        if (response.ok) {
          const data = await response.json() as SiteContent;
          setContent(data);
        }
      } catch (error) {
        console.error('Failed to load content:', error);
      }
    };
    loadContent();
  }, []);

  // Autoplay carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  // Pricing: $50 per bottle, 10% off for 3+ bottles, 20% off for 12+ bottles
  const calculateDisplayPrice = (qty: number) => {
    if (qty <= 0) return 0;
    const basePrice = 50;

    if (qty >= 12) {
      // 20% off for a box of a dozen or more
      return qty * basePrice * 0.8;
    } else if (qty >= 3) {
      // 10% off for 3+ bottles
      return qty * basePrice * 0.9;
    } else {
      // Regular price for 1-2 bottles
      return qty * basePrice;
    }
  };

  const displayPrice = calculateDisplayPrice(quantity);

  return (
    <section className="px-6 md:px-12 lg:px-24 py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_3fr] gap-8 lg:gap-12 items-center">
          {/* Product Image Carousel - Left Side */}
          <div className="flex flex-col items-center gap-4 max-w-[737px] mx-auto lg:mx-0">
            <div className="relative w-full aspect-square">
              {heroImages.map((src, index) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Dr. Bee Leez Blend - Image ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex gap-3 bg-gray-100 px-4 py-2 rounded-full">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-royal-blue scale-125"
                      : "bg-charcoal/30 hover:bg-charcoal/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start gap-8">
            <h1 className="text-royal-blue text-3xl font-bold tracking-tight leading-tight">
              {content.hero.title}
            </h1>

            <div className="flex flex-col gap-6 text-charcoal leading-relaxed">
              <p>{content.hero.paragraph1}</p>
              <p>{content.hero.paragraph2}</p>
              <p>{content.hero.paragraph3}</p>
              <p>{content.hero.paragraph4}</p>
            </div>

            <h2 className="text-royal-blue font-bold text-3xl">
              {content.hero.proofHeading}
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
                <span>{content.hero.pdfLinkText}</span>
              </a>

              {/* PPTX Download */}
              <a
                href="/downloads/Powerpoint_Tob_Smoking_New_Perspective_allows_3-8-25.pptx"
                download
                className="inline-flex items-center gap-2 px-5 py-2 border-2 border-charcoal/20 rounded-md text-charcoal hover:border-royal-blue hover:text-royal-blue transition-all duration-200"
              >
                <Presentation className="w-4 h-4" />
                <span>{content.hero.pptxLinkText}</span>
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
                    {content.hero.qtyLabel}
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
                    {content.hero.priceLabel} ${displayPrice.toFixed(2)}
                  </div>
                  {quantity >= 12 && (
                    <div className="text-royal-blue font-medium">
                      {content.hero.saveText12Plus}
                    </div>
                  )}
                  {quantity >= 3 && quantity < 12 && (
                    <div className="text-royal-blue font-medium">
                      {content.hero.saveText3Plus}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-royal-blue text-white px-8 py-3 rounded-md font-semibold hover:bg-royal-blue/90 transition-all duration-200 w-full sm:w-auto justify-center"
                >
                  <span>{content.hero.addToCartButtonText}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
