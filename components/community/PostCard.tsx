'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  tag: 'general' | 'english' | 'spanish' | 'portuguese';
  likes: number;
  comments: number;
  createdAt: Date;
  liked?: boolean;
}

interface PostCardProps {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
  currentUser?: { id: string; name: string };
  index?: number;
}

const tagLabels: Record<string, string> = {
  general: 'Geral',
  english: 'Inglês',
  spanish: 'Espanhol',
  portuguese: 'Português',
};

const tagColors: Record<string, string> = {
  general: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  english: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  spanish: 'bg-red-500/20 text-red-400 border-red-500/30',
  portuguese: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export default function PostCard({
  post,
  onLike,
  onComment,
  index = 0,
}: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-2xl p-5 hover-glow transition-all"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full border-2 border-purple-500/30 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
          {post.author.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white">{post.author.name}</span>
            <span
              className={`px-2 py-0.5 text-xs rounded-full border ${tagColors[post.tag]}`}
            >
              {tagLabels[post.tag]}
            </span>
          </div>
          <span className="text-xs text-slate-500">
            {formatDistanceToNow(post.createdAt, {
              addSuffix: true,
              locale: ptBR,
            })}
          </span>
        </div>
      </div>

      {/* Content */}
      <p className="text-slate-300 leading-relaxed whitespace-pre-wrap mb-4">
        {post.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/5">
        <button
          onClick={onLike}
          className={`flex items-center gap-2 text-sm transition-colors ${
            post.liked
              ? 'text-pink-500'
              : 'text-slate-400 hover:text-pink-500'
          }`}
        >
          <Heart
            className={`w-5 h-5 ${post.liked ? 'fill-pink-500' : ''}`}
          />
          {post.likes}
        </button>

        <button
          onClick={onComment}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-purple-400 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          {post.comments}
        </button>

        <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
