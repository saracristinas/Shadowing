'use client';

import { motion } from 'framer-motion';
import { Trophy, Flame, Target, Award, Star, Zap, Crown, Heart, Sunrise } from 'lucide-react';

interface AchievementBadgeProps {
  type: string;
  unlocked: boolean;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const achievements: Record<string, {
  title: string;
  description: string;
  icon: any;
  gradient: string;
}> = {
  first_content: {
    title: 'Primeira Conquista',
    description: 'Complete seu primeiro conteúdo',
    icon: Star,
    gradient: 'from-yellow-500 to-orange-500',
  },
  streak_7: {
    title: 'Sequência de 7 Dias',
    description: 'Estude por 7 dias seguidos',
    icon: Flame,
    gradient: 'from-orange-500 to-red-500',
  },
  streak_30: {
    title: 'Mestre da Consistência',
    description: 'Sequência de 30 dias',
    icon: Flame,
    gradient: 'from-red-500 to-pink-500',
  },
  complete_10: {
    title: 'Iniciante Dedicado',
    description: 'Complete 10 conteúdos',
    icon: Target,
    gradient: 'from-blue-500 to-cyan-500',
  },
  complete_50: {
    title: 'Estudante Comprometido',
    description: 'Complete 50 conteúdos',
    icon: Award,
    gradient: 'from-purple-500 to-pink-500',
  },
  complete_100: {
    title: 'Mestre do Shadowing',
    description: 'Complete 100 conteúdos',
    icon: Crown,
    gradient: 'from-yellow-500 to-amber-500',
  },
  master_english: {
    title: 'Mestre do Inglês',
    description: 'Complete todos níveis de inglês',
    icon: Trophy,
    gradient: 'from-blue-500 to-cyan-500',
  },
  master_spanish: {
    title: 'Mestre do Espanhol',
    description: 'Complete todos níveis de espanhol',
    icon: Trophy,
    gradient: 'from-red-500 to-yellow-500',
  },
  master_portuguese: {
    title: 'Mestre do Português',
    description: 'Complete todos níveis de português',
    icon: Trophy,
    gradient: 'from-green-500 to-yellow-500',
  },
  beginner_complete: {
    title: 'Iniciante Completo',
    description: 'Complete todos conteúdos iniciantes',
    icon: Star,
    gradient: 'from-emerald-500 to-green-500',
  },
  intermediate_complete: {
    title: 'Intermediário Completo',
    description: 'Complete todos intermediários',
    icon: Zap,
    gradient: 'from-amber-500 to-orange-500',
  },
  advanced_complete: {
    title: 'Avançado Completo',
    description: 'Complete todos avançados',
    icon: Crown,
    gradient: 'from-purple-500 to-pink-500',
  },
  community_star: {
    title: 'Estrela da Comunidade',
    description: 'Receba 50 curtidas em posts',
    icon: Heart,
    gradient: 'from-pink-500 to-red-500',
  },
  early_bird: {
    title: 'Madrugador',
    description: 'Estude antes das 7h',
    icon: Sunrise,
    gradient: 'from-cyan-500 to-blue-500',
  },
};

export default function AchievementBadge({ type, unlocked, size = 'md', showDetails = true }: AchievementBadgeProps) {
  const achievement = achievements[type];
  if (!achievement) return null;

  const Icon = achievement.icon;
  
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <motion.div
      whileHover={unlocked ? { scale: 1.05, y: -4 } : {}}
      className={`h-full ${unlocked ? '' : 'opacity-40'}`}
    >
      <div className={`h-full min-h-[180px] flex flex-col items-center justify-center text-center glass-card rounded-2xl p-5 border transition-all ${
        unlocked
          ? `bg-gradient-to-br ${achievement.gradient}/10 border-white/20`
          : 'bg-slate-800/50 border-white/5'
      }`}>
        {/* Icon Container */}
        <div
          className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 mb-4 ${
            unlocked
              ? `bg-gradient-to-br ${achievement.gradient} border-white/20`
              : 'bg-slate-700 border-slate-600'
          }`}
        >
          <Icon className={`w-10 h-10 ${unlocked ? 'text-white' : 'text-slate-600'}`} />
        </div>

        {/* Details */}
        {showDetails && (
          <>
            <h3 className={`font-bold mb-2 text-sm ${unlocked ? 'text-white' : 'text-slate-500'}`}>
              {achievement.title}
            </h3>
            <p className={`text-xs leading-tight line-clamp-2 ${unlocked ? 'text-slate-400' : 'text-slate-600'}`}>
              {achievement.description}
            </p>
            {unlocked && (
              <div className={`mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${achievement.gradient} text-xs font-medium text-white`}>
                <Trophy className="w-3 h-3" />
                Desbloqueado
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
