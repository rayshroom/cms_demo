import { useI18n } from "../i18n/useI18n";
import type { Locale } from "../i18n/types";
import styles from "../styles/TdsPage.module.css";

export function LanguageSwitcher() {
  const { locale, messages, setLocale } = useI18n();

  return (
    <div className={styles.languageSwitcher} role="group" aria-label={messages.language.label}>
      <span className={styles.languageLabel}>{messages.language.label}</span>
      <LocaleButton
        activeLocale={locale}
        label={messages.language.english}
        locale="en"
        onSelect={setLocale}
      />
      <LocaleButton
        activeLocale={locale}
        label={messages.language.french}
        locale="fr"
        onSelect={setLocale}
      />
    </div>
  );
}

function LocaleButton({
  activeLocale,
  label,
  locale,
  onSelect
}: {
  activeLocale: Locale;
  label: string;
  locale: Locale;
  onSelect: (locale: Locale) => void;
}) {
  const isActive = locale === activeLocale;

  return (
    <button
      aria-label={label}
      aria-pressed={isActive}
      className={`${styles.languageButton} ${isActive ? styles.languageButtonActive : ""}`}
      onClick={() => onSelect(locale)}
      title={label}
      type="button"
    >
      {locale.toUpperCase()}
    </button>
  );
}
