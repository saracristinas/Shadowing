import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    english: 'from-blue-600 to-cyan-500',
    spanish: 'from-red-500 to-yellow-500',
    portuguese: 'from-green-500 to-yellow-400',
  };
  return colors[language.toLowerCase()] || 'from-purple-600 to-pink-600';
}

export function getLevelColor(level: string): {
  bg: string;
  text: string;
  border: string;
} {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    beginner: {
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
    },
    basic: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
    },
    intermediate: {
      bg: 'bg-amber-500/20',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
    },
    advanced: {
      bg: 'bg-purple-500/20',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
    },
  };
  return colors[level.toLowerCase()] || colors.beginner;
}
