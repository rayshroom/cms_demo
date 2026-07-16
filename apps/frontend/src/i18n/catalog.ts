import { en } from "./catalogs/en";
import { fr } from "./catalogs/fr";
import type { Locale, TranslationShape } from "./types";

export type Messages = TranslationShape<typeof en>;

export const catalogs: Record<Locale, Messages> = {
  en,
  fr
};
