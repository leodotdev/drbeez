"use client";

import { useEffect, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

// Declare Google Translate types
declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: number;
            autoDisplay: boolean;
          },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export default function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    // Initialize Google Translate (hidden)
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,it,de,es,ar,he,ja,zh-CN", // English, Italian, German, Spanish, Arabic, Hebrew, Japanese, Chinese
            layout: 0, // Simple layout
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // Load Google Translate script
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);

    // Trigger Google Translate
    const selectElement = document.querySelector(
      ".goog-te-combo"
    ) as unknown as HTMLSelectElement;

    if (selectElement) {
      selectElement.value = langCode;
      selectElement.dispatchEvent(new Event("change"));
    }
  };

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
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none px-3 py-2 pr-10 border border-charcoal/20 rounded text-charcoal focus:border-royal-blue focus:outline-none min-w-[150px] bg-white cursor-pointer"
              >
                <option value="en">English</option>
                <option value="it">Italian</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
                <option value="ar">Arabic</option>
                <option value="he">Hebrew</option>
                <option value="ja">Japanese</option>
                <option value="zh-CN">Chinese</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal pointer-events-none" />
            </div>
            {/* Hidden Google Translate widget */}
            <div id="google_translate_element" className="hidden"></div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Hide Google Translate branding and banner */
        .goog-te-banner-frame {
          display: none !important;
        }

        /* Adjust body top margin when translation is active */
        body {
          top: 0 !important;
        }

        /* Hide Google Translate top frame */
        body > .skiptranslate {
          display: none !important;
        }

        #google_translate_element {
          display: none !important;
        }
      `}</style>
    </header>
  );
}
