'use client';

import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  Clock,
  CheckCircle2,
  Share2,
  Bookmark,
  ThumbsUp,
} from 'lucide-react';
import { useState } from 'react';
import Notes from '@/components/content/Notes';
import Comments from '@/components/content/Comments';

interface GuideVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  category: 'inicio' | 'niveis' | 'recursos' | 'dicas';
  isNew?: boolean;
  watched?: boolean;
  fullDescription?: string;
}

// Mesmos vídeos da página principal
const videos: GuideVideo[] = [
  {
    id: '1',
    title: 'Bem-vindo à Plataforma',
    description: 'Conheça a interface e recursos principais',
    fullDescription: 'Neste vídeo, você vai conhecer todos os recursos da plataforma de shadowing. Vamos explorar juntos a biblioteca de conteúdos, o sistema de níveis, a comunidade, e como acompanhar seu progresso. Ao final, você estará pronto para começar seus estudos!',
    duration: '5:30',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'inicio',
    isNew: true,
  },
  {
    id: '2',
    title: 'O que é Shadowing?',
    description: 'Entenda o método e como ele funciona',
    fullDescription: 'O shadowing é uma técnica poderosa de aprendizado de idiomas. Neste vídeo, você vai entender o que é o método, como praticá-lo corretamente, e por que ele é tão eficaz para melhorar sua pronúncia, fluência e compreensão auditiva.',
    duration: '8:15',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'inicio',
    isNew: true,
  },
  {
    id: '3',
    title: 'Como Usar a Biblioteca',
    description: 'Aprenda a navegar e filtrar conteúdos',
    fullDescription: 'A biblioteca tem centenas de conteúdos organizados por idioma e nível. Aprenda a usar os filtros, favoritar seus conteúdos preferidos, e encontrar exatamente o que você precisa para seu estágio de aprendizado.',
    duration: '6:45',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'recursos',
  },
  {
    id: '4',
    title: 'Estudando no Nível A1-A2',
    description: 'Dicas para iniciantes e básico',
    fullDescription: 'Se você está começando, este vídeo é para você! Descubra as melhores práticas para estudar nos níveis A1 e A2, quanto tempo dedicar por dia, e como progredir rapidamente para os níveis intermediários.',
    duration: '10:20',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'niveis',
  },
  {
    id: '5',
    title: 'Estudando no Nível B1-B2',
    description: 'Estratégias para intermediário e avançado',
    fullDescription: 'Nos níveis B1 e B2, o desafio é diferente. Aprenda técnicas avançadas de shadowing, como trabalhar com conteúdos mais complexos, e estratégias para alcançar a fluência completa.',
    duration: '12:10',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'niveis',
  },
  {
    id: '6',
    title: 'Sistema de XP e Conquistas',
    description: 'Como funciona a gamificação',
    fullDescription: 'A plataforma tem um sistema completo de gamificação! Entenda como ganhar XP, subir de nível, desbloquear conquistas, e usar a competição saudável para manter sua motivação em alta.',
    duration: '7:30',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'recursos',
  },
  {
    id: '7',
    title: 'Dicas de Pronúncia',
    description: 'Técnicas para melhorar sua pronúncia',
    fullDescription: 'A pronúncia é crucial no aprendizado de idiomas. Neste vídeo, você vai aprender técnicas específicas para melhorar sua pronúncia através do shadowing, incluindo exercícios práticos e erros comuns a evitar.',
    duration: '9:40',
    thumbnail: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'dicas',
  },
  {
    id: '8',
    title: 'Organização de Estudos',
    description: 'Crie uma rotina eficiente de aprendizado',
    fullDescription: 'Consistência é a chave! Aprenda a criar uma rotina de estudos que funcione para você, como definir metas realistas, e técnicas de gestão de tempo para estudar mesmo com uma agenda cheia.',
    duration: '11:25',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'dicas',
  },
];

export default function GuideVideoPage() {
  const router = useRouter();
  const params = useParams();
  const videoId = params?.id as string;
  const video = videos.find((v) => v.id === videoId);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [watched, setWatched] = useState(video?.watched || false);

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Vídeo não encontrado</h2>
          <button
            onClick={() => router.push('/platform/guide')}
            className="text-purple-400 hover:text-purple-300"
          >
            Voltar para guia
          </button>
        </div>
      </div>
    );
  }

  const categoryLabels = {
    inicio: 'Comece Aqui',
    niveis: 'Por Nível',
    recursos: 'Recursos',
    dicas: 'Dicas',
  };

  const handleMarkWatched = () => {
    setWatched(true);
  };

  return (
    <div className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push('/platform/guide')}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para guia
      </motion.button>

      {/* Video Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black glass-card">
          <iframe
            src={video.videoUrl}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>

      {/* Video Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              {video.isNew && (
                <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold text-white">
                  NOVO
                </div>
              )}
              <div className="px-3 py-1 rounded-lg bg-slate-700 text-xs font-medium text-slate-300">
                {categoryLabels[video.category]}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{video.title}</h1>
            <p className="text-slate-400 text-lg">{video.description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-6 pb-6 border-b border-white/5">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-5 h-5" />
            <span className="font-medium">{video.duration}</span>
          </div>
          {watched && (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Assistido</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!watched && (
            <button
              onClick={handleMarkWatched}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-5 h-5" />
              Marcar como assistido
            </button>
          )}

          <button
            onClick={() => setLiked(!liked)}
            className={`h-12 px-6 rounded-xl border transition-all flex items-center gap-2 ${
              liked
                ? 'bg-purple-600 border-purple-600 text-white'
                : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className={`h-12 px-6 rounded-xl border transition-all flex items-center gap-2 ${
              saved
                ? 'bg-purple-600 border-purple-600 text-white'
                : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
          </button>

          <button className="h-12 px-6 rounded-xl border border-white/10 text-slate-400 hover:border-white/20 hover:text-white transition-all flex items-center gap-2">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-4">Sobre este vídeo</h2>
        <p className="text-slate-300 leading-relaxed">
          {video.fullDescription || video.description}
        </p>
      </motion.div>

      {/* Notes Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <Notes contentId={video.id} contentType="guide" contentTitle={video.title} />
      </motion.div>

      {/* Comments Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Comments contentId={video.id} contentType="guide" />
      </motion.div>
    </div>
  );
}
