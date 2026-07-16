import { createContext } from "react";
import type { Messages } from "./catalog";
import type { Locale } from "./types";

export interface I18nContextValue {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
