'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const { locale } = useParams();

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.langSwitch}>
          <li>
            <Link
              href="/en"
              className={locale === 'en' ? styles.active : ''}
              prefetch={false}
            >
              EN
            </Link>
          </li>
          <li>
            <Link
              href="/es"
              className={locale === 'es' ? styles.active : ''}
              prefetch={false}
            >
              ES
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
