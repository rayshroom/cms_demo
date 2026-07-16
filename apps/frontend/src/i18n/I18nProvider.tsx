import { useEffect, useMemo, useState, type ReactNode } from "react";
import { catalogs } from "./catalog";
import { I18nContext, type I18nContextValue } from "./I18nContext";
import type { Locale } from "./types";

const localeStorageKey = "tds-data-platform-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readInitialLocale);
  const messages = catalogs[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = messages.document.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", messages.document.description);

    try {
      window.localStorage.setItem(localeStorageKey, locale);
    } catch {
      // A blocked storage API should not prevent language switching in memory.
    }
  }, [locale, messages.document.description, messages.document.title]);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, messages, setLocale }),
    [locale, messages]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function readInitialLocale(): Locale {
  try {
    return window.localStorage.getItem(localeStorageKey) === "fr" ? "fr" : "en";
  } catch {
    return "en";
  }
}
