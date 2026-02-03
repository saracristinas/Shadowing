'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import Toast from '@/components/Toast/Toast';
import { signIn } from 'next-auth/react';

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
        router.push('/platform');
      }, 3000);
    } else {
      setError(locale === 'pt' ? 'Este email já está cadastrado' : 
               locale === 'es' ? 'Este correo ya está registrado' : 
               'This email is already registered');
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    await signIn('google', { callbackUrl: '/platform' });
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
      
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md w-full"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold gradient-text">Shadowing</span>
          </Link>

          {/* Card */}
          <div className="glass-card rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {messages.auth.signup.title}
              </h1>
              <p className="text-slate-400">
                {messages.auth.signup.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  {messages.auth.signup.name}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder={messages.auth.signup.name}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  {messages.auth.signup.email}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder={messages.auth.signup.email}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  {messages.auth.signup.password}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder={messages.auth.signup.password}
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                  {messages.auth.signup.confirmPassword}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder={messages.auth.signup.confirmPassword}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserPlus className="w-5 h-5" />
                {loading ? '...' : messages.auth.signup.submit}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-sm text-slate-500">{messages.auth.signup.orContinueWith}</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full h-12 rounded-xl border border-white/10 hover:bg-white/5 text-white flex items-center justify-center gap-3 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {messages.auth.signup.google}
            </button>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-slate-400 text-sm">
                {messages.auth.signup.hasAccount}{' '}
                <Link href={`/${locale}/login`} className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  {messages.auth.signup.loginLink}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
