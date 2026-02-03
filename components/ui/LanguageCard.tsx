'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface LanguageCardProps {
  language: string;
  contentCount: number;
  emoji: string;
  onClick?: () => void;
}

const languageBackgrounds: { [key: string]: string } = {
  'Inglês': 'bg-gradient-to-br from-blue-900/80 to-blue-800/60',
  'Espanhol': 'bg-gradient-to-br from-orange-900/70 to-amber-900/60',
  'Português': 'bg-gradient-to-br from-green-900/70 to-green-800/60',
};

export default function LanguageCard({
  language,
  contentCount,
  emoji,
  onClick,
}: LanguageCardProps) {
  const bgClass = languageBackgrounds[language] || 'bg-slate-800/50';

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative group cursor-pointer rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all ${bgClass} backdrop-blur-sm overflow-hidden min-h-[140px]`}
    >
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{emoji}</div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{language}</h3>
            <p className="text-base text-slate-300">
              {contentCount} conteúdos
            </p>
          </div>
        </div>
        <ChevronRight className="w-8 h-8 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  );
}
