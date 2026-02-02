'use client';

import styles from './Header.module.css';
import LanguageSwitcher from './LanguageSwitcher';
import UserMenu from './UserMenu';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <h2>Shadowing Platform</h2>
        </div>
        <div className={styles.rightSection}>
          <LanguageSwitcher />
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}
