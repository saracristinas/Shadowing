'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  ExternalLink,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import LevelBadge from '@/components/ui/LevelBadge';
import { useData } from '@/lib/data-context';
import { formatDuration } from '@/lib/utils';

export default function ContentViewPage() {
  const router = useRouter();
  const params = useParams();
  const { contents, incrementViews, markContentComplete, userProgress } = useData();
  
  const contentId = params?.id as string;
  const content = contents.find((c) => c.id === contentId);
  const isCompleted = userProgress.find((p) => p.contentId === contentId)?.completed;

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [localLikes, setLocalLikes] = useState(0);

  useEffect(() => {
    if (content) {
      incrementViews(content.id);
    }
  }, [content?.id]);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Conteúdo não encontrado</h2>
          <button
            onClick={() => router.push('/platform/library')}
            className="text-purple-400 hover:text-purple-300"
          >
            Voltar para biblioteca
          </button>
        </div>
      </div>
    );
  }

  const isVideo = content.type === 'video';
  const isLink = content.type === 'link';

  const languageLabels: Record<string, string> = {
    english: 'Inglês 🇺🇸',
    spanish: 'Espanhol 🇪🇸',
    portuguese: 'Português 🇧🇷',
  };

  const handleComplete = () => {
    markContentComplete(content.id);
  };

  const handleLike = () => {
    setLiked(!liked);
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1);
  };

  return (
    <div className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push('/platform/library')}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para biblioteca
      </motion.button>

      {/* Video/Link Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        {isVideo ? (
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
            <iframe
              src={content.url}
              title={content.title}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : isLink ? (
          <a
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600/30 to-pink-600/30 glass-card hover-glow cursor-pointer"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <ExternalLink className="w-16 h-16 text-white/50 mb-4" />
              <span className="text-white text-lg font-medium">Abrir Link Externo</span>
            </div>
          </a>
        ) : null}
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-3 mb-4"
      >
        <LevelBadge level={content.level} />
        <span className="px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
          {languageLabels[content.language]}
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-slate-700 text-slate-300 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {formatDuration(content.duration)}
        </span>
      </motion.div>

      {/* Title and Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          {content.title}
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          {content.description}
        </p>
      </motion.div>

      {/* Stats and Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap items-center gap-4 py-4 border-y border-white/10 mb-6"
      >
        <div className="flex items-center gap-2 text-slate-400">
          <Eye className="w-5 h-5" />
          <span>{content.views} visualizações</span>
        </div>

        <button
          onClick={handleLike}
          className={`flex items-center gap-2 rounded-full px-4 py-2 border transition-all ${
            liked
              ? 'bg-pink-600/20 border-pink-500/30 text-pink-400'
              : 'border-white/10 text-slate-400 hover:bg-white/5'
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-pink-400' : ''}`} />
          {localLikes}
        </button>

        <button
          onClick={() => setSaved(!saved)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 border transition-all ${
            saved
              ? 'bg-purple-600/20 border-purple-500/30 text-purple-400'
              : 'border-white/10 text-slate-400 hover:bg-white/5'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${saved ? 'fill-purple-400' : ''}`} />
          Salvar
        </button>

        <button className="flex items-center gap-2 rounded-full px-4 py-2 border border-white/10 text-slate-400 hover:bg-white/5 transition-all">
          <Share2 className="w-5 h-5" />
          Compartilhar
        </button>
      </motion.div>

      {/* Completion Card */}
      {!isCompleted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/20 to-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">
                Concluiu este conteúdo?
              </h3>
              <p className="text-slate-400 mb-4">
                Marque como concluído para acompanhar seu progresso
              </p>
              <button
                onClick={handleComplete}
                className="h-12 px-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-medium transition-all"
              >
                Marcar como Concluído
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-2xl p-6 border border-green-500/30"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            <div>
              <h3 className="text-lg font-semibold text-white">
                Conteúdo Concluído! 🎉
              </h3>
              <p className="text-slate-400">
                Parabéns! Continue praticando para melhorar ainda mais.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
