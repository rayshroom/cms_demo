# Frontend i18n

The frontend owns translations for presentation copy only. CMS-owned roadmap and news fields
(`title`, `excerpt`, `ctaLabel`, tags, and similar values) are rendered exactly as returned by the
active CMS source.

- `catalogs/en.ts` is the default English catalog and defines the catalog shape.
- `catalogs/fr.ts` must satisfy the same shape at compile time.
- `I18nProvider.tsx` owns the selected locale, document metadata, and persisted preference.
- Components read localized presentation copy through `useI18n()`.

To add another locale, extend `Locale`, add a catalog that satisfies `TranslationShape<typeof en>`,
register it in `catalog.ts`, and expose it in `LanguageSwitcher`.
