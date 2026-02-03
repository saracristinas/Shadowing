'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Globe } from 'lucide-react';

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
  const [selectedLocale, setSelectedLocale] = useState<string>('pt');
  const [messages, setMessages] = useState<Messages | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadMessages() {
      const loadedMessages = await import(`@/messages/${selectedLocale}.json`);
      setMessages(loadedMessages.default);
    }
    loadMessages();
  }, [selectedLocale]);

  const handleContinue = () => {
    router.push(`/${selectedLocale}`);
  };

  if (!messages) {
    return null;
  }

  const languages = [
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  return (
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
        className="relative z-10 max-w-2xl w-full"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold gradient-text">Shadowing</span>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {messages.landing.title}
            </h1>
            <p className="text-xl text-slate-300 mb-2">
              {messages.landing.subtitle}
            </p>
            <p className="text-slate-400">
              {messages.landing.description}
            </p>
          </div>

          {/* Language Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">
                {messages.landing.selectLanguage}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLocale(lang.code)}
                  className={`p-5 rounded-xl border-2 transition-all ${
                    selectedLocale === lang.code
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="text-4xl mb-2">{lang.flag}</div>
                  <div className="text-white font-medium">{lang.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium text-lg flex items-center justify-center gap-2 transition-all"
          >
            {messages.landing.continue}
            <span>→</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
