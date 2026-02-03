'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  BookOpen,
  TrendingUp,
  Flame,
  Trophy,
  Target,
} from 'lucide-react';
import { useData } from '@/lib/data-context';

export default function ProgressPage() {
  const { contents, userProgress } = useData();

  const stats = useMemo(() => {
    const completed = userProgress.filter((p) => p.completed).length;
    const total = contents.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Simular sequência de dias
    const streak = 7;

    // Progresso por idioma
    const byLanguage = {
      english: {
        completed: userProgress.filter((p) =>
          contents.find((c) => c.id === p.contentId && c.language === 'english')
        ).length,
        total: contents.filter((c) => c.language === 'english').length,
      },
      spanish: {
        completed: userProgress.filter((p) =>
          contents.find((c) => c.id === p.contentId && c.language === 'spanish')
        ).length,
        total: contents.filter((c) => c.language === 'spanish').length,
      },
      portuguese: {
        completed: userProgress.filter((p) =>
          contents.find((c) => c.id === p.contentId && c.language === 'portuguese')
        ).length,
        total: contents.filter((c) => c.language === 'portuguese').length,
      },
    };

    // Progresso por nível
    const byLevel = {
      beginner: {
        completed: userProgress.filter((p) =>
          contents.find((c) => c.id === p.contentId && c.level === 'beginner')
        ).length,
        total: contents.filter((c) => c.level === 'beginner').length,
      },
      basic: {
        completed: userProgress.filter((p) =>
          contents.find((c) => c.id === p.contentId && c.level === 'basic')
        ).length,
        total: contents.filter((c) => c.level === 'basic').length,
      },
      intermediate: {
        completed: userProgress.filter((p) =>
          contents.find((c) => c.id === p.contentId && c.level === 'intermediate')
        ).length,
        total: contents.filter((c) => c.level === 'intermediate').length,
      },
      advanced: {
        completed: userProgress.filter((p) =>
          contents.find((c) => c.id === p.contentId && c.level === 'advanced')
        ).length,
        total: contents.filter((c) => c.level === 'advanced').length,
      },
    };

    return {
      completed,
      total,
      percentage,
      streak,
      byLanguage,
      byLevel,
    };
  }, [contents, userProgress]);

  const statCards = [
    {
      icon: CheckCircle2,
      label: 'Concluídos',
      value: stats.completed,
      gradient: 'from-green-600 to-emerald-500',
    },
    {
      icon: BookOpen,
      label: 'Total',
      value: stats.total,
      gradient: 'from-blue-600 to-cyan-500',
    },
    {
      icon: TrendingUp,
      label: 'Progresso',
      value: `${stats.percentage}%`,
      gradient: 'from-purple-600 to-pink-500',
    },
    {
      icon: Flame,
      label: 'Sequência',
      value: `${stats.streak} dias`,
      gradient: 'from-orange-600 to-red-500',
    },
  ];

  const languages = [
    {
      name: 'Inglês',
      emoji: '🇺🇸',
      gradient: 'from-blue-600 to-cyan-500',
      ...stats.byLanguage.english,
    },
    {
      name: 'Espanhol',
      emoji: '🇪🇸',
      gradient: 'from-red-500 to-yellow-500',
      ...stats.byLanguage.spanish,
    },
    {
      name: 'Português',
      emoji: '🇧🇷',
      gradient: 'from-green-500 to-yellow-400',
      ...stats.byLanguage.portuguese,
    },
  ];

  const levels = [
    {
      name: 'Iniciante',
      icon: Target,
      gradient: 'from-emerald-600 to-emerald-500',
      ...stats.byLevel.beginner,
    },
    {
      name: 'Básico',
      icon: BookOpen,
      gradient: 'from-blue-600 to-blue-500',
      ...stats.byLevel.basic,
    },
    {
      name: 'Intermediário',
      icon: TrendingUp,
      gradient: 'from-amber-600 to-amber-500',
      ...stats.byLevel.intermediate,
    },
    {
      name: 'Avançado',
      icon: Trophy,
      gradient: 'from-purple-600 to-purple-500',
      ...stats.byLevel.advanced,
    },
  ];

  const hasProgress = stats.completed > 0;

  return (
    <div className="min-h-screen px-6 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Seu <span className="gradient-text">Progresso</span>
        </h1>
        <p className="text-slate-400">
          Acompanhe sua evolução no aprendizado
        </p>
      </motion.div>

      {hasProgress ? (
        <>
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-5"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-20 flex items-center justify-center mb-3`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress by Language */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Progresso por Idioma
            </h2>

            <div className="space-y-6">
              {languages.map((language, index) => {
                const percentage =
                  language.total > 0
                    ? Math.round((language.completed / language.total) * 100)
                    : 0;

                return (
                  <div key={language.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{language.emoji}</span>
                        <span className="font-medium text-white">
                          {language.name}
                        </span>
                      </div>
                      <span className="text-sm text-slate-400">
                        {language.completed}/{language.total}
                      </span>
                    </div>

                    <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${language.gradient} rounded-full`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Progress by Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Progresso por Nível
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {levels.map((level, index) => {
                const percentage =
                  level.total > 0
                    ? Math.round((level.completed / level.total) * 100)
                    : 0;

                return (
                  <motion.div
                    key={level.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-xl bg-slate-800/50"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${level.gradient} bg-opacity-20 flex items-center justify-center`}
                      >
                        <level.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">
                          {level.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {level.completed}/{level.total} concluídos
                        </div>
                      </div>
                      <div className="text-lg font-bold text-white">
                        {percentage}%
                      </div>
                    </div>

                    <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${level.gradient}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-slate-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Comece sua jornada
          </h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Complete conteúdos da biblioteca para acompanhar seu progresso e evolução
          </p>
          <a
            href="/platform/library"
            className="inline-flex h-12 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium items-center gap-2 transition-all"
          >
            Explorar Conteúdos
          </a>
        </motion.div>
      )}
    </div>
  );
}
