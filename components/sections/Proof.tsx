'use client';

import { FileText, Presentation } from 'lucide-react';
import { useContent } from '@/lib/use-content';

export default function Proof() {
  const { content } = useContent();
  return (
    <section id="proof" className="px-6 md:px-12 lg:px-24 py-24 md:py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Research Highlights */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-semibold text-charcoal tracking-tight leading-tight">
                {content.research.title}
              </h2>
              <h3 className="font-[family-name:var(--font-body)] text-2xl font-semibold text-charcoal">
                {content.research.subtitle}
              </h3>
            </div>

            <ul className="space-y-6">
              {content.research.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex gap-4 font-[family-name:var(--font-body)] text-lg text-charcoal/80 leading-relaxed"
                >
                  <span className="text-royal-blue font-bold text-xl flex-shrink-0">✓</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <p className="font-[family-name:var(--font-body)] text-lg text-charcoal/70 pt-4 italic">
              {content.research.highlightsFooter}
            </p>
          </div>

          {/* Downloads */}
          <div className="space-y-8 lg:border-l lg:border-charcoal/20 lg:pl-12">
            <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-charcoal tracking-tight">
              {content.research.downloadsTitle}
            </h3>

            <div className="space-y-6">
              {/* PDF Download */}
              <a
                href="/downloads/Abstracts_of_Nutrient_Depletion_10-19-18.pdf"
                download
                className="group block p-6 bg-cream border-2 border-charcoal/20 rounded-lg hover:border-royal-blue hover:bg-royal-blue/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <FileText className="w-8 h-8 text-royal-blue flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h4 className="font-[family-name:var(--font-body)] text-xl font-semibold text-charcoal mb-2 group-hover:text-royal-blue transition-colors">
                      Complete Abstracts of Nutrient Depletion Studies
                    </h4>
                    <p className="font-[family-name:var(--font-body)] text-base text-charcoal/60">
                      Compilation of research citations and abstracts
                    </p>
                    <p className="font-[family-name:var(--font-mono)] text-sm text-charcoal/50 mt-2">
                      PDF
                    </p>
                  </div>
                </div>
              </a>

              {/* PPTX Download */}
              <a
                href="/downloads/Powerpoint_Tob_Smoking_New_Perspective_allows_3-8-25.pptx"
                download
                className="group block p-6 bg-cream border-2 border-charcoal/20 rounded-lg hover:border-royal-blue hover:bg-royal-blue/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <Presentation className="w-8 h-8 text-royal-blue flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h4 className="font-[family-name:var(--font-body)] text-xl font-semibold text-charcoal mb-2 group-hover:text-royal-blue transition-colors">
                      "Tobacco Smoking: A New Perspective"
                    </h4>
                    <p className="font-[family-name:var(--font-body)] text-base text-charcoal/60">
                      Dr. Bieley's comprehensive research presentation (75 slides)
                    </p>
                    <p className="font-[family-name:var(--font-mono)] text-sm text-charcoal/50 mt-2">
                      PPTX
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
