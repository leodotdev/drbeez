"use client";

import { Globe, ChevronDown } from "lucide-react";
import { useI18n, LANGUAGES, type Language } from "@/lib/i18n";
import { useOrderDrawer } from "@/components/OrderDrawer";

export default function Header() {
  const { language, setLanguage, t: content } = useI18n();
  const { openOrderDrawer } = useOrderDrawer();

  return (
    <header className="bg-white border-b border-charcoal/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <h2 className="text-royal-blue font-bold text-xl whitespace-nowrap">
              Dr. Bee Leez Blend
            </h2>
          </div>

          {/* Language Switcher & Order CTA */}
          <nav aria-label={content.accessibility.siteNavigation}>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 shrink-0 text-royal-blue max-[380px]:hidden" aria-hidden="true" />
              <div className="relative flex-1 sm:flex-none">
                <label htmlFor="language-selector" className="sr-only">
                  {content.accessibility.languageSelector}
                </label>
                <select
                  id="language-selector"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="appearance-none w-full px-5 py-2 pr-10 border border-charcoal/20 rounded-md text-charcoal font-[450] bg-white cursor-pointer hover:border-royal-blue hover:text-royal-blue focus:border-royal-blue focus:outline-none sm:min-w-[140px] transition-all duration-200"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal pointer-events-none" aria-hidden="true" />
              </div>

              <button
                onClick={openOrderDrawer}
                className="inline-flex items-baseline justify-center gap-2 px-5 py-2 bg-royal-blue text-white rounded-md whitespace-nowrap shrink-0 hover:bg-royal-blue/90 transition-[background-color,transform] duration-150 active:scale-[0.96]"
                aria-haspopup="dialog"
              >
                <span className="font-[450]">{content.hero.orderNowText}</span>
                <span className="text-xs text-white/80">$50/bottle</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
