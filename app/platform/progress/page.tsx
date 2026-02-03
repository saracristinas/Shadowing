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
  Clock,
  Calendar,
  Award,
  Zap,
} from 'lucide-react';
import { useData } from '@/lib/data-context';
import XPBar from '@/components/gamification/XPBar';
import AchievementBadge from '@/components/gamification/AchievementBadge';

export default function ProgressPage() {
  const { contents, userProgress, userStats, achievements } = useData();

  const stats = useMemo(() => {
    const completed = userProgress.filter((p) => p.completed).length;
    const total = contents.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Usar sequência real
    const streak = userStats.current_streak;

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

      {/* XP Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-10"
      >
        <XPBar currentXP={userStats.total_xp} level={userStats.level} />
      </motion.div>

      {/* Extended Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
      >
        {/* Tempo Total */}
        <div className="glass-card rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 bg-opacity-20 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {Math.floor(userStats.total_study_time / 60)}h {userStats.total_study_time % 60}m
          </div>
          <div className="text-sm text-slate-400">Tempo de Estudo</div>
        </div>

        {/* Sequência Atual */}
        <div className="glass-card rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 bg-opacity-20 flex items-center justify-center mb-3">
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {userStats.current_streak}
          </div>
          <div className="text-sm text-slate-400">Dias Seguidos</div>
        </div>

        {/* Sequência Mais Longa */}
        <div className="glass-card rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 bg-opacity-20 flex items-center justify-center mb-3">
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {userStats.longest_streak}
          </div>
          <div className="text-sm text-slate-400">Recorde de Dias</div>
        </div>

        {/* XP Total */}
        <div className="glass-card rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 bg-opacity-20 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {userStats.total_xp}
          </div>
          <div className="text-sm text-slate-400">XP Total</div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
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
            className="glass-card rounded-2xl p-6 mb-10"
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
            className="mb-10"
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

          {/* Idioma Favorito & Última Atividade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          >
            {/* Idioma Favorito */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Idioma Favorito
              </h3>
              <div className="flex items-center gap-4">
                <div className="text-6xl">
                  {userStats.favorite_language === 'english' && '🇺🇸'}
                  {userStats.favorite_language === 'spanish' && '🇪🇸'}
                  {userStats.favorite_language === 'portuguese' && '🇧🇷'}
                  {!userStats.favorite_language && '🌍'}
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {userStats.favorite_language === 'english' && 'Inglês'}
                    {userStats.favorite_language === 'spanish' && 'Espanhol'}
                    {userStats.favorite_language === 'portuguese' && 'Português'}
                    {!userStats.favorite_language && 'Nenhum ainda'}
                  </div>
                  <div className="text-sm text-slate-400">
                    {userStats.favorite_language 
                      ? 'Seu idioma mais estudado' 
                      : 'Complete conteúdos para definir'}
                  </div>
                </div>
              </div>
            </div>

            {/* Última Atividade */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Última Atividade
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {userStats.last_activity_date 
                      ? new Date(userStats.last_activity_date).toLocaleDateString('pt-BR', { 
                          day: '2-digit', 
                          month: 'short' 
                        })
                      : 'Nunca'}
                  </div>
                  <div className="text-sm text-slate-400">
                    {userStats.last_activity_date
                      ? `${Math.floor((Date.now() - new Date(userStats.last_activity_date).getTime()) / (1000 * 60 * 60 * 24))} dias atrás`
                      : 'Comece a estudar hoje!'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Conquistas
              </h2>
              <div className="text-sm text-slate-400">
                {achievements.length} de 14 desbloqueadas
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                'first_content',
                'streak_7',
                'streak_30',
                'complete_10',
                'complete_50',
                'complete_100',
                'master_english',
                'master_spanish',
                'master_portuguese',
                'beginner_complete',
                'intermediate_complete',
                'advanced_complete',
                'community_star',
                'early_bird',
              ].map((type, index) => {
                const isUnlocked = achievements.some(
                  (a) => a.achievement_type === type
                );

                return (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <AchievementBadge
                      type={type}
                      unlocked={isUnlocked}
                      size="lg"
                      showDetails={true}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
    </div>
  );
}
