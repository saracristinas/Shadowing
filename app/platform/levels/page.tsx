'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useData } from '@/lib/data-context';
import ContentCard from '@/components/content/ContentCard';

const levels = [
  {
    id: 'beginner',
    title: 'Iniciante',
    emoji: '🌱',
    description: 'Perfeito para quem está começando',
    gradient: 'from-emerald-500 to-green-500',
    bgGradient: 'from-emerald-500/20 to-green-500/20',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'basic',
    title: 'Básico',
    emoji: '📚',
    description: 'Desenvolva fundamentos sólidos',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/20 to-cyan-500/20',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  {
    id: 'intermediate',
    title: 'Intermediário',
    emoji: '🚀',
    description: 'Expanda suas habilidades',
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-500/20 to-orange-500/20',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  {
    id: 'advanced',
    title: 'Avançado',
    emoji: '👑',
    description: 'Domine o idioma completamente',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/20 to-pink-500/20',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
];

export default function LevelsPage() {
  const { contents, userProgress } = useData();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const getProgressForLevel = (levelId: string) => {
    const levelContents = contents.filter((c) => c.level === levelId);
    const completed = levelContents.filter((c) =>
      userProgress.some((p) => p.contentId === c.id && p.completed)
    ).length;
    const total = levelContents.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, percentage };
  };

  if (selectedLevel) {
    const level = levels.find((l) => l.id === selectedLevel)!;
    const levelContents = contents.filter((c) => c.level === selectedLevel);

    return (
      <div className="min-h-screen px-6 py-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => setSelectedLevel(null)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Voltar para níveis
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="text-6xl">{level.emoji}</span>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{level.title}</h1>
              <div className={`inline-flex px-3 py-1 rounded-full border ${level.badge} text-sm font-medium`}>
                {levelContents.length} conteúdos disponíveis
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contents Grid */}
        {levelContents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levelContents.map((content, index) => (
              <ContentCard
                key={content.id}
                content={content}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-4">{level.emoji}</div>
            <h2 className="text-2xl font-bold text-white mb-2">Nenhum conteúdo disponível</h2>
            <p className="text-slate-400 mb-6">Em breve teremos mais conteúdos neste nível</p>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Níveis de <span className="gradient-text">Aprendizado</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Organize seu estudo por dificuldade
        </p>
      </motion.div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {levels.map((level, index) => {
          const progress = getProgressForLevel(level.id);

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => setSelectedLevel(level.id)}
              className={`relative group cursor-pointer rounded-2xl p-6 border border-white/10 hover-glow transition-all bg-gradient-to-br ${level.bgGradient} overflow-hidden`}
            >
              {/* Decorative blob */}
              <div
                className={`absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-gradient-to-br ${level.gradient} opacity-20 blur-2xl`}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-6xl mb-3">{level.emoji}</div>
                    <h3 className="text-2xl font-bold text-white mb-1">{level.title}</h3>
                    <p className="text-sm text-slate-400">{level.description}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>

                {/* Progress Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">
                      {progress.completed} de {progress.total} concluídos
                    </span>
                    <span className="font-bold text-white">{progress.percentage}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.percentage}%` }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${level.gradient} rounded-full`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
