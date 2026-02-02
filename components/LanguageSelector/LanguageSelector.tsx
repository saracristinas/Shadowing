'use client';

import styles from './LanguageSelector.module.css';

interface LanguageSelectorProps {
  onSelect?: (locale: string) => void;
  selectedLocale?: string | null;
}

export default function LanguageSelector({ onSelect, selectedLocale }: LanguageSelectorProps) {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ];

  const handleLanguageChange = (locale: string) => {
    if (onSelect) {
      onSelect(locale);
    }
  };

  return (
    <div className={styles.languageSelector}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`${styles.languageButton} ${selectedLocale === lang.code ? styles.selected : ''}`}
          title={lang.name}
        >
          <span className={styles.flag}>{lang.flag}</span>
          <span className={styles.name}>{lang.name}</span>
        </button>
      ))}
    </div>
  );
}
