'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import Toast from '@/components/Toast/Toast';
import styles from '../login/auth.module.css';

export default function SignupPage() {
  const { locale } = useParams();
  const router = useRouter();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Carregar mensagens do idioma atual
  const [messages, setMessages] = useState<any>(null);
  
  useState(() => {
    import(`@/messages/${locale}.json`).then((m) => setMessages(m.default));
  });

  const sendWelcomeEmail = async (name: string, email: string) => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, locale }),
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Validações
    if (!name || !email || !password || !confirmPassword) {
      setError(locale === 'pt' ? 'Preencha todos os campos' : 
               locale === 'es' ? 'Completa todos los campos' : 
               'Fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError(locale === 'pt' ? 'As senhas não coincidem' : 
               locale === 'es' ? 'Las contraseñas no coinciden' : 
               'Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(locale === 'pt' ? 'Senha deve ter no mínimo 6 caracteres' : 
               locale === 'es' ? 'La contraseña debe tener al menos 6 caracteres' : 
               'Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // Tentar cadastrar
    const success = signup(name, email, password);

    if (success) {
      // Enviar email de boas-vindas
      await sendWelcomeEmail(name, email);
      
      setUserEmail(email);
      setShowToast(true);
      setLoading(false);
      
      // Redirecionar após 3 segundos
      setTimeout(() => {
        router.push(`/${locale}/welcome`);
      }, 3000);
    } else {
      setError(locale === 'pt' ? 'Este email já está cadastrado' : 
               locale === 'es' ? 'Este correo ya está registrado' : 
               'This email is already registered');
      setLoading(false);
    }
  };

  if (!messages) return null;

  return (
    <>
      {showToast && (
        <Toast
          message={messages.notifications.emailSent}
          email={userEmail}
          subMessage={messages.notifications.checkInbox}
          onClose={() => setShowToast(false)}
        />
      )}
      
      <main className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>{messages.auth.signup.title}</h1>
            <p className={styles.subtitle}>{messages.auth.signup.subtitle}</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                {messages.auth.signup.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                placeholder={messages.auth.signup.name}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                {messages.auth.signup.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                placeholder={messages.auth.signup.email}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                {messages.auth.signup.password}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={styles.input}
                placeholder={messages.auth.signup.password}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                {messages.auth.signup.confirmPassword}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={styles.input}
                placeholder={messages.auth.signup.confirmPassword}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? '...' : messages.auth.signup.submit}
            </button>
          </form>

          <div className={styles.divider}>{messages.auth.signup.orContinueWith}</div>

          <button type="button" className={styles.googleButton}>
            <svg className={styles.googleIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {messages.auth.signup.google}
          </button>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              {messages.auth.signup.hasAccount}{' '}
              <Link href={`/${locale}/login`} className={styles.link}>
                {messages.auth.signup.loginLink}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
