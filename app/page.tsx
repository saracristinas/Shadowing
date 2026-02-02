'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector';
import styles from './landing.module.css';

type Messages = {
  landing: {
    title: string;
    subtitle: string;
    description: string;
    selectLanguage: string;
    continue: string;
  };
};

export default function RootPage() {
  const [selectedLocale, setSelectedLocale] = useState<string>('en');
  const [messages, setMessages] = useState<Messages | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadMessages() {
      const loadedMessages = await import(`@/messages/${selectedLocale}.json`);
      setMessages(loadedMessages.default);
    }
    loadMessages();
  }, [selectedLocale]);

  const handleLanguageSelect = (locale: string) => {
    setSelectedLocale(locale);
  };

  const handleContinue = () => {
    router.push(`/${selectedLocale}`);
  };

  if (!messages) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{messages.landing.title}</h1>
        <p className={styles.subtitle}>{messages.landing.subtitle}</p>
        <p className={styles.description}>
          {messages.landing.description}
        </p>
        
        <div className={styles.languageSection}>
          <h2 className={styles.selectLanguageTitle}>{messages.landing.selectLanguage}</h2>
          <LanguageSelector onSelect={handleLanguageSelect} selectedLocale={selectedLocale} />
          
          {selectedLocale && (
            <button className={styles.continueButton} onClick={handleContinue}>
              <span className={styles.continueText}>{messages.landing.continue}</span>
              <span className={styles.arrow}>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
