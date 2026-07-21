"use client";

import Image from "next/image";
import { FileText, Presentation, Stethoscope, X, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import CheckoutForm from "@/components/sections/CheckoutForm";

const heroImages = [
  { src: "/product-1.webp", width: 704, height: 832 },
  { src: "/product-2.webp", width: 704, height: 832 },
  { src: "/product-3.webp", width: 704, height: 832 },
  { src: "/product-4.webp", width: 704, height: 832 },
];

export default function Hero() {
  const { t: content } = useI18n();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPhysicianSummary, setShowPhysicianSummary] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const focusTrapRef = useFocusTrap(showPhysicianSummary);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Autoplay carousel with pause support
  useEffect(() => {
    if (isCarouselPaused) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  const goToPrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  // Focus management for modal dialog
  useEffect(() => {
    if (showPhysicianSummary) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the dialog after it opens
      setTimeout(() => {
        focusTrapRef.current?.focus();
      }, 0);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [showPhysicianSummary, focusTrapRef]);

  // Escape key handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showPhysicianSummary) {
        setShowPhysicianSummary(false);
      }
    };

    if (showPhysicianSummary) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showPhysicianSummary]);

  return (
    <section className="px-6 md:px-12 lg:px-24 py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-start">
          {/* Product Image Carousel - Left Side (sticky on desktop so the product stays visible) */}
          <div
            className="flex flex-col items-center gap-4 mx-auto lg:mx-0 w-full max-w-[400px] lg:max-w-[500px] lg:sticky lg:top-24"
            role="region"
            aria-roledescription="carousel"
            aria-label="Product images"
          >
            <div
              className="relative w-full aspect-[704/832]"
              aria-live="polite"
              aria-atomic="true"
            >
              {heroImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  aria-hidden={index !== currentImageIndex}
                >
                  <Image
                    src={image.src}
                    alt={content.accessibility.productImageAlt[index] || `Dr. Bee Leez Blend product image ${index + 1}`}
                    width={image.width}
                    height={image.height}
                    className="w-full h-full object-contain"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 1024px) 400px, 500px"
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                </div>
              ))}
            </div>

            {/* Screen Reader Announcement */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {content.accessibility.carouselAnnouncement
                ?.replace("{current}", String(currentImageIndex + 1))
                .replace("{total}", String(heroImages.length))}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
              {/* Previous Button */}
              <button
                onClick={goToPrevImage}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-charcoal/10 hover:bg-charcoal/20 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue"
                aria-label={content.accessibility.carouselPrevious}
              >
                <ChevronLeft className="w-4 h-4 text-charcoal" aria-hidden="true" />
              </button>

              {/* Pause/Play Button */}
              <button
                onClick={() => setIsCarouselPaused(!isCarouselPaused)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-charcoal/10 hover:bg-charcoal/20 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue"
                aria-label={isCarouselPaused ? content.accessibility.carouselPlay : content.accessibility.carouselPause}
              >
                {isCarouselPaused ? (
                  <Play className="w-4 h-4 text-charcoal" aria-hidden="true" />
                ) : (
                  <Pause className="w-4 h-4 text-charcoal" aria-hidden="true" />
                )}
              </button>

              {/* Carousel Indicators */}
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-royal-blue ${
                    index === currentImageIndex
                      ? "bg-royal-blue scale-125"
                      : "bg-charcoal/30 hover:bg-charcoal/50"
                  }`}
                  aria-label={`Go to image ${index + 1} of ${heroImages.length}`}
                  aria-current={index === currentImageIndex ? "true" : undefined}
                />
              ))}

              {/* Next Button */}
              <button
                onClick={goToNextImage}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-charcoal/10 hover:bg-charcoal/20 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue"
                aria-label={content.accessibility.carouselNext}
              >
                <ChevronRight className="w-4 h-4 text-charcoal" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="flex flex-col items-center lg:items-start gap-10">
            {/* Pitch */}
            <div className="flex flex-col gap-6">
              <h1 className="text-royal-blue text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-center lg:text-left">
                {content.hero.title}
              </h1>

              <div className="flex flex-col gap-6 text-charcoal leading-relaxed text-left">
                <p>{content.hero.paragraph1}</p>
                <p>{content.hero.paragraph2}</p>
                <p>{content.hero.paragraph3}</p>
                <p>{content.hero.paragraph4}</p>
              </div>
            </div>

            {/* Evidence: physician's summary & research downloads */}
            <div className="flex flex-col items-center lg:items-start gap-3 w-full max-w-md">
              <button
                onClick={() => setShowPhysicianSummary(true)}
                className="inline-flex items-center gap-2 px-5 py-2 border border-charcoal/20 rounded-md text-charcoal font-[450] hover:border-royal-blue hover:text-royal-blue transition-all duration-200"
                aria-haspopup="dialog"
              >
                <Stethoscope className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{content.physicianSummary.buttonText}</span>
              </button>

              <h2 className="text-royal-blue font-bold text-2xl mt-3">
                {content.hero.proofHeading}
              </h2>

              {/* PDF Download */}
              <a
                href="/downloads/Abstracts_of_Nutrient_Depletion_10-19-18.pdf"
                download
                className="w-full flex items-start gap-2 px-5 py-2.5 border border-charcoal/20 rounded-md text-charcoal font-[450] text-left hover:border-royal-blue hover:text-royal-blue transition-all duration-200"
              >
                <FileText className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{content.hero.pdfLinkText}</span>
              </a>

              {/* PPTX Download */}
              <a
                href="/downloads/Powerpoint_Tob_Smoking_New_Perspective_allows_3-8-25.pptx"
                download
                className="w-full flex items-start gap-2 px-5 py-2.5 border border-charcoal/20 rounded-md text-charcoal font-[450] text-left hover:border-royal-blue hover:text-royal-blue transition-all duration-200"
              >
                <Presentation className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{content.hero.pptxLinkText}</span>
              </a>
            </div>

            {/* Checkout Form */}
            <CheckoutForm />
          </div>
        </div>
      </div>

      {/* Physician's Summary Dialog */}
      {showPhysicianSummary && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPhysicianSummary(false)}
          role="presentation"
        >
          <div
            ref={focusTrapRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="physician-summary-title"
            className="bg-white rounded-lg max-w-xl max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-10 py-6 flex items-center justify-between">
              <h3 id="physician-summary-title" className="text-xl font-bold text-royal-blue">{content.physicianSummary.title}</h3>
              <button
                onClick={() => setShowPhysicianSummary(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 text-charcoal" aria-hidden="true" />
              </button>
            </div>
            <div className="px-10 py-10 text-charcoal space-y-6">
              <div>
                <h4 className="text-lg font-bold text-royal-blue mb-3">
                  {content.physicianSummary.subtitle}
                </h4>
              </div>

              <div>
                <h5 className="font-bold mb-2">{content.physicianSummary.clinicalProblemTitle}</h5>
                <p className="leading-relaxed">
                  {content.physicianSummary.clinicalProblemP1}
                </p>
                <p className="leading-relaxed mt-2">
                  {content.physicianSummary.clinicalProblemP2}
                </p>
              </div>

              <div>
                <h5 className="font-bold mb-2">{content.physicianSummary.clinicalSolutionTitle}</h5>
                <p className="leading-relaxed">
                  {content.physicianSummary.clinicalSolutionP1}
                </p>
                <p className="leading-relaxed mt-2 italic">
                  {content.physicianSummary.clinicalSolutionP2}
                </p>
              </div>

              <div>
                <h5 className="font-bold mb-2">{content.physicianSummary.mechanismTitle}</h5>
                <ul className="list-disc list-inside space-y-1">
                  {content.physicianSummary.mechanismList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-bold mb-2">{content.physicianSummary.whyMattersTitle}</h5>
                <ul className="list-disc list-inside space-y-1">
                  {content.physicianSummary.whyMattersList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-bold mb-2">{content.physicianSummary.candidatesTitle}</h5>
                <ul className="list-disc list-inside space-y-1">
                  {content.physicianSummary.candidatesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-bold mb-2">{content.physicianSummary.differentiatorsTitle}</h5>
                <ul className="list-disc list-inside space-y-1">
                  {content.physicianSummary.differentiatorsList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-bold mb-2">{content.physicianSummary.takeawayTitle}</h5>
                <p className="leading-relaxed">
                  {content.physicianSummary.takeawayText}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-charcoal-muted italic">{content.physicianSummary.attribution}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
