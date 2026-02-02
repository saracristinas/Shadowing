'use client';

import styles from './Header.module.css';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <h2>Shadowing Platform</h2>
        </div>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
