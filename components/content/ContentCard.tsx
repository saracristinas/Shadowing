'use client';

import { motion } from 'framer-motion';
import { Play, ExternalLink, Clock, Eye } from 'lucide-react';
import LevelBadge from '../ui/LevelBadge';
import { formatDuration } from '@/lib/utils';

export interface Content {
  id: string;
  title: string;
  description: string;
  language: 'english' | 'spanish' | 'portuguese';
  level: 'beginner' | 'basic' | 'intermediate' | 'advanced';
  type: 'video' | 'link' | 'audio';
  url: string;
  thumbnail?: string;
  duration: number;
  views: number;
}

interface ContentCardProps {
  content: Content;
  onClick?: () => void;
  index?: number;
}

export default function ContentCard({ content, onClick, index = 0 }: ContentCardProps) {
  const isVideo = content.type === 'video';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer hover-glow transition-all"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-t-2xl overflow-hidden bg-gradient-to-br from-purple-600/30 to-pink-600/30">
        {content.thumbnail ? (
          <img
            src={content.thumbnail}
            alt={content.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isVideo ? (
              <Play className="w-12 h-12 text-white/50" />
            ) : (
              <ExternalLink className="w-12 h-12 text-white/50" />
            )}
          </div>
        )}

        {/* Play Overlay */}
        {isVideo && (
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
          </div>
        )}

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-xs text-white flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatDuration(content.duration)}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <LevelBadge level={content.level} />
          {content.type === 'link' && (
            <span className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
              Link
            </span>
          )}
        </div>

        <h3 className="font-semibold text-white mb-1 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {content.title}
        </h3>

        <p className="text-sm text-slate-400 line-clamp-2 mb-3">
          {content.description}
        </p>

        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Eye className="w-4 h-4" />
          {content.views} visualizações
        </div>
      </div>
    </motion.div>
  );
}
