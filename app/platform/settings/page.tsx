'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Bell,
  Globe,
  Moon,
  Save,
  Upload,
  Check,
} from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Profile Settings
  const [name, setName] = useState(session?.user?.name || '');
  const [bio, setBio] = useState('');

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [communityNotifications, setCommunityNotifications] = useState(true);

  // Preference Settings
  const [language, setLanguage] = useState('pt-BR');
  const [theme, setTheme] = useState('dark');

  const handleSave = async () => {
    setSaveStatus('saving');

    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  return (
    <div className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          <span className="gradient-text">Configurações</span>
        </h1>
        <p className="text-slate-400">
          Personalize sua experiência
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Perfil</h2>
          </div>

          <div className="space-y-6">
            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-3">
                Foto de Perfil
              </label>
              <div className="flex items-center gap-4">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full border-2 border-purple-500/30"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white">
                    {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <div className="flex-1">
                  {session?.user?.image ? (
                    <div>
                      <div className="text-sm text-slate-400 mb-1">
                        Foto do Google
                      </div>
                      <div className="text-xs text-slate-500">
                        A foto é gerenciada pela sua conta Google e não pode ser alterada aqui
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors flex items-center gap-2 mb-2">
                        <Upload className="w-4 h-4" />
                        Alterar foto
                      </button>
                      <div className="text-xs text-slate-500">
                        Formatos aceitos: JPG, PNG, GIF (máx. 5MB)
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Seu nome"
              />
            </div>

            {/* Email (Readonly) */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Email
              </label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <Mail className="w-5 h-5 text-slate-500" />
                <span className="text-slate-400">{session?.user?.email || 'email@exemplo.com'}</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Email não pode ser alterado
              </p>
            </div>

            {/* Bio Textarea */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Biografia
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Conte um pouco sobre você..."
              />
            </div>
          </div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Notificações</h2>
          </div>

          <div className="space-y-4">
            {/* Email Notifications Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50">
              <div>
                <div className="font-medium text-white mb-1">
                  Notificações por email
                </div>
                <div className="text-sm text-slate-400">
                  Receba atualizações sobre seu progresso
                </div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  emailNotifications ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              >
                <motion.div
                  animate={{ x: emailNotifications ? 28 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-5 h-5 bg-white rounded-full"
                />
              </button>
            </div>

            {/* Community Notifications Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50">
              <div>
                <div className="font-medium text-white mb-1">
                  Notificações da comunidade
                </div>
                <div className="text-sm text-slate-400">
                  Receba avisos sobre novos posts e comentários
                </div>
              </div>
              <button
                onClick={() => setCommunityNotifications(!communityNotifications)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  communityNotifications ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              >
                <motion.div
                  animate={{ x: communityNotifications ? 28 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-5 h-5 bg-white rounded-full"
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Preferences Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Preferências</h2>
          </div>

          <div className="space-y-6">
            {/* Language Select */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Idioma da interface
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (United States)</option>
                <option value="es-ES">Español (España)</option>
              </select>
            </div>

            {/* Theme Select */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Tema
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-4 rounded-xl border transition-all ${
                    theme === 'dark'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Moon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-medium text-white">Escuro</div>
                  {theme === 'dark' && (
                    <div className="text-xs text-purple-400 mt-1">Atual</div>
                  )}
                </button>

                <button
                  onClick={() => setTheme('light')}
                  className={`p-4 rounded-xl border transition-all ${
                    theme === 'light'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-medium text-white">Claro</div>
                  {theme === 'light' && (
                    <div className="text-xs text-purple-400 mt-1">Atual</div>
                  )}
                  <div className="text-xs text-slate-500 mt-1">(Em breve)</div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handleSave}
            disabled={saveStatus !== 'idle'}
            className={`w-full py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              saveStatus === 'saved'
                ? 'bg-green-600 text-white'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {saveStatus === 'idle' && (
              <>
                <Save className="w-5 h-5" />
                Salvar Alterações
              </>
            )}
            {saveStatus === 'saving' && (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                  <Save className="w-5 h-5" />
                </motion.div>
                Salvando...
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <Check className="w-5 h-5" />
                Salvo com sucesso!
              </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
