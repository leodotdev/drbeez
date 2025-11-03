'use client';

import { useContent } from '@/lib/use-content';

export default function ProblemSolution() {
  const { content } = useContent();
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Problem Column */}
          <div className="space-y-8">
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-semibold text-charcoal tracking-tight leading-tight">
              {content.problemSolution.problemTitle}
            </h2>

            <div className="font-[family-name:var(--font-body)] text-lg md:text-xl text-charcoal/80 leading-relaxed space-y-6">
              <p>
                Smoking causes immediate, measurable depletion of critical nutrients:
              </p>

              <ul className="space-y-3 pl-6">
                <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-royal-blue before:font-bold">
                  Antioxidants (Vitamins C, E)
                </li>
                <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-royal-blue before:font-bold">
                  B-Vitamins (B2, B6, B12, Folate)
                </li>
                <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-royal-blue before:font-bold">
                  Essential Minerals (Magnesium, Selenium)
                </li>
              </ul>

              <blockquote className="border-l-4 border-royal-blue pl-6 py-4 my-8 italic">
                <p className="text-xl">
                  "Any exposure to tobacco smoke causes immediate damage to your body."
                </p>
                <footer className="text-base not-italic text-charcoal/60 mt-2">
                  — U.S. Surgeon General
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Solution Column */}
          <div className="space-y-8 lg:border-l lg:border-charcoal/20 lg:pl-12">
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-semibold text-charcoal tracking-tight leading-tight">
              {content.problemSolution.solutionTitle}
            </h2>

            <div className="font-[family-name:var(--font-body)] text-lg md:text-xl text-charcoal/80 leading-relaxed space-y-6">
              <p>
                100+ peer-reviewed studies demonstrate that replacing these nutrients:
              </p>

              <ul className="space-y-3 pl-6">
                <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-royal-blue before:font-bold">
                  Reduces oxidative stress markers by 11-17%
                </li>
                <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-royal-blue before:font-bold">
                  Supports cardiovascular health
                </li>
                <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-royal-blue before:font-bold">
                  Protects lung function
                </li>
                <li className="relative before:content-['•'] before:absolute before:-left-6 before:text-royal-blue before:font-bold">
                  Aids smoking reduction efforts
                </li>
              </ul>

              <p className="pt-4 font-medium">
                {content.problemSolution.solutionClosing}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
