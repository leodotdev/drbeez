"use client";

import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { defaultContent, type SiteContent } from "@/lib/default-content";

export default function Home() {
  const [quantity, setQuantity] = useState(1);
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then((data: SiteContent) => setContent(data))
      .catch(() => {}); // Keep default content on error
  }, []);

  const getPrice = (qty: number) => {
    const base = 50;
    if (qty >= 12) return qty * base * 0.8;
    if (qty >= 3) return qty * base * 0.9;
    return qty * base;
  };

  const price = getPrice(quantity);
  const discount = quantity >= 12 ? "20%" : quantity >= 3 ? "10%" : null;

  return (
    <main className="min-h-screen lg:h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row max-w-6xl mx-auto w-full px-6 py-8 lg:py-0">
        {/* Left: Product */}
        <div className="lg:flex-1 flex items-center justify-center py-8 lg:py-0">
          <div className="w-72 h-72 lg:w-[500px] lg:h-[500px] relative">
            <Image
              src="/hero-1.png"
              alt="Dr. Bee Leez Blend - Smoker's Supplement Bottle"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:flex-1 flex flex-col justify-center gap-6 py-8 lg:py-12">
          <h1 className="text-2xl font-semibold text-charcoal leading-tight">
            {content.hero.title}
          </h1>

          <div className="flex flex-col gap-3 text-charcoal/70">
            <p>{content.hero.paragraph1}</p>
            <p>{content.hero.paragraph2}</p>
            <p>{content.hero.paragraph3}</p>
            <p>{content.hero.paragraph4}</p>
          </div>

          {/* Research links */}
          <h2 className="text-2xl font-semibold text-charcoal">{content.hero.proofHeading}</h2>
          <div className="flex flex-col gap-2">
            <a
              href="/downloads/Abstracts_of_Nutrient_Depletion_10-19-18.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 border border-charcoal/20 rounded text-charcoal text-sm hover:border-royal-blue hover:text-royal-blue transition-colors"
            >
              <FileText className="w-4 h-4" />
              {content.hero.pdfLinkText}
            </a>
            <a
              href="/downloads/Powerpoint_Tob_Smoking_New_Perspective_allows_3-8-25.pptx"
              download
              className="inline-flex items-center gap-2 px-4 py-2 border border-charcoal/20 rounded text-charcoal text-sm hover:border-royal-blue hover:text-royal-blue transition-colors"
            >
              <FileText className="w-4 h-4" />
              {content.hero.pptxLinkText}
            </a>
          </div>

          {/* Purchase */}
          <div className="border border-charcoal/10 rounded-lg p-5 mt-2">
            <form
              method="post"
              action="https://stats.slimcd.com/cscript/cart32.exe/1549B-AddItem"
              className="flex flex-col gap-4"
            >
              <input type="hidden" name="item" value="Dr. BeeLeez Blend" />
              <input type="hidden" name="Price" value="50.00" />
              <input type="hidden" name="PartNo" value="DS1" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <label htmlFor="qty" className="text-charcoal/60 text-sm">{content.hero.qtyLabel}</label>
                  <input
                    type="number"
                    id="qty"
                    name="Qty"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-16 px-3 py-2 border border-charcoal/20 rounded text-center text-charcoal bg-white"
                  />
                </div>

                <div className="text-right">
                  <div className="text-2xl font-semibold text-charcoal">
                    ${price.toFixed(2)}
                  </div>
                  <div className="text-charcoal/50 text-sm">
                    {discount ? <span className="text-royal-blue">{quantity >= 12 ? content.hero.saveText12Plus : content.hero.saveText3Plus}</span> : "$50/bottle"}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-royal-blue text-white px-6 py-3 rounded font-medium hover:bg-royal-blue/90 transition-colors"
              >
                {content.hero.addToCartButtonText}
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-charcoal/40 text-sm text-center">
                $50/bottle · {content.hero.saveText3Plus} 3+ · {content.hero.saveText12Plus} 12+
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-charcoal/10 py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-2 text-charcoal/50 text-sm">
          <span>{content.purchase.companyName} | Palm Beach Gardens, FL | {content.purchase.phone}</span>
          <span>U.S. Patent #8,889,194 | {content.purchase.disclaimerText.split('.')[0]}</span>
        </div>
      </footer>
    </main>
  );
}
