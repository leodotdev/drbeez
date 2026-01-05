"use client";

import { Globe, ChevronDown } from "lucide-react";
import { useI18n, LANGUAGES, type Language } from "@/lib/i18n";

export default function Header() {
  const { language, setLanguage } = useI18n();

  return (
    <header className="bg-white border-b border-charcoal/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <h2 className="text-royal-blue font-bold text-xl">
              Dr. Bee Leez Blend
            </h2>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-royal-blue" />
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="appearance-none px-5 py-2 pr-10 border-2 border-charcoal/20 rounded-md text-charcoal font-[450] bg-white cursor-pointer hover:border-royal-blue hover:text-royal-blue focus:border-royal-blue focus:outline-none min-w-[140px] transition-all duration-200"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
