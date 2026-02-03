'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { locale } = useParams();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = (code: string) => {
    if (isAuthenticated) {
      // Se está logado, mantém a página atual e só troca o idioma
      const newPath = pathname.replace(`/${locale}`, `/${code}`);
      router.push(newPath);
    } else {
      // Se não está logado, volta para a página inicial
      router.push(`/${code}`);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button 
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <span className={styles.icon}>🌐</span>
        <span className={styles.currentFlag}>{currentLanguage.flag}</span>
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.option} ${lang.code === locale ? styles.active : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.name}>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
