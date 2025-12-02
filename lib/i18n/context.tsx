"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { translations, LANGUAGES, type Language } from "./translations";
import type { SiteContent } from "../default-content";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: SiteContent;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = "drbeez-language";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved language preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
    setIsHydrated(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    // Update document direction for RTL languages
    const langConfig = LANGUAGES.find((l) => l.code === lang);
    if (langConfig) {
      document.documentElement.dir = langConfig.dir;
      document.documentElement.lang = lang;
    }
  }, []);

  // Set initial document attributes
  useEffect(() => {
    if (isHydrated) {
      const langConfig = LANGUAGES.find((l) => l.code === language);
      if (langConfig) {
        document.documentElement.dir = langConfig.dir;
        document.documentElement.lang = language;
      }
    }
  }, [isHydrated, language]);

  const langConfig = LANGUAGES.find((l) => l.code === language);

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        dir: langConfig?.dir ?? "ltr",
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
