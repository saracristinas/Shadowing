'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface XPBarProps {
  currentXP: number;
  level: number;
}

export default function XPBar({ currentXP, level }: XPBarProps) {
  const xpForNextLevel = level * 100;
  const xpInCurrentLevel = currentXP % 100;
  const percentage = Math.min((xpInCurrentLevel / 100) * 100, 100);

  return (
    <div className="glass-card rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Nível</p>
            <p className="text-3xl font-bold text-white">{level}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">XP Total</p>
          <p className="text-2xl font-bold text-amber-400">{currentXP}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">{xpInCurrentLevel} XP</span>
          <span className="text-slate-400">{xpForNextLevel} XP</span>
        </div>
        <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
