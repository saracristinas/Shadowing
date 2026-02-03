import { getLevelColor } from '@/lib/utils';

interface LevelBadgeProps {
  level: 'beginner' | 'basic' | 'intermediate' | 'advanced';
  className?: string;
}

const levelLabels = {
  beginner: 'Iniciante',
  basic: 'Básico',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
};

export default function LevelBadge({ level, className = '' }: LevelBadgeProps) {
  const colors = getLevelColor(level);

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${className}`}
    >
      {levelLabels[level]}
    </span>
  );
}
