'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import styles from './auth.module.css';

export default function LoginPage() {
  const { locale } = useParams();
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Carregar mensagens do idioma atual
  const [messages, setMessages] = useState<any>(null);
  
  useState(() => {
    import(`@/messages/${locale}.json`).then((m) => setMessages(m.default));
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validações
    if (!email || !password) {
      setError(locale === 'pt' ? 'Preencha todos os campos' : 
               locale === 'es' ? 'Completa todos los campos' : 
               'Fill in all fields');
      setLoading(false);
      return;
    }

    // Tentar fazer login
    const success = login(email, password);

    if (success) {
      router.push(`/${locale}/welcome`);
    } else {
      setError(locale === 'pt' ? 'Email ou senha incorretos' : 
               locale === 'es' ? 'Correo o contraseña incorrectos' : 
               'Incorrect email or password');
      setLoading(false);
    }
  };

  if (!messages) return null;

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>{messages.auth.login.title}</h1>
          <p className={styles.subtitle}>{messages.auth.login.subtitle}</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              {messages.auth.login.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder={messages.auth.login.email}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              {messages.auth.login.password}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              placeholder={messages.auth.login.password}
              required
            />
          </div>

          <Link href={`/${locale}/forgot-password`} className={styles.forgotLink}>
            {messages.auth.login.forgotPassword}
          </Link>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? '...' : messages.auth.login.submit}
          </button>
        </form>

        <div className={styles.divider}>{messages.auth.login.orContinueWith}</div>

        <button type="button" className={styles.googleButton}>
          <svg className={styles.googleIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {messages.auth.login.google}
        </button>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            {messages.auth.login.noAccount}{' '}
            <Link href={`/${locale}/signup`} className={styles.link}>
              {messages.auth.login.signUpLink}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
