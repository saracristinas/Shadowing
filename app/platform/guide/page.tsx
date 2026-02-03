'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, Clock, CheckCircle2, Sparkles } from 'lucide-react';

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
}

const videos: GuideVideo[] = [
  {
    id: '1',
    title: 'Bem-vindo à Plataforma',
    description: 'Conheça a interface e recursos principais',
    duration: '5:30',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    videoUrl: 'https://www.youtube.com/watch?v=...',
    category: 'inicio',
    isNew: true,
  },
  {
    id: '2',
    title: 'O que é Shadowing?',
    description: 'Entenda o método e como ele funciona',
    duration: '8:15',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
    videoUrl: 'https://www.youtube.com/watch?v=...',
    category: 'inicio',
    isNew: true,
  },
  {
    id: '3',
    title: 'Como Usar a Biblioteca',
    description: 'Aprenda a navegar e filtrar conteúdos',
    duration: '6:45',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    videoUrl: 'https://www.youtube.com/watch?v=...',
    category: 'recursos',
  },
  {
    id: '4',
    title: 'Estudando no Nível A1-A2',
    description: 'Dicas para iniciantes e básico',
    duration: '10:20',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    videoUrl: 'https://www.youtube.com/watch?v=...',
    category: 'niveis',
  },
  {
    id: '5',
    title: 'Estudando no Nível B1-B2',
    description: 'Estratégias para intermediário e avançado',
    duration: '12:10',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
    videoUrl: 'https://www.youtube.com/watch?v=...',
    category: 'niveis',
  },
  {
    id: '6',
    title: 'Sistema de XP e Conquistas',
    description: 'Como funciona a gamificação',
    duration: '7:30',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
    videoUrl: 'https://www.youtube.com/watch?v=...',
    category: 'recursos',
  },
  {
    id: '7',
    title: 'Dicas de Pronúncia',
    description: 'Técnicas para melhorar sua pronúncia',
    duration: '9:40',
    thumbnail: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800',
    videoUrl: 'https://www.youtube.com/watch?v=...',
    category: 'dicas',
  },
  {
    id: '8',
    title: 'Organização de Estudos',
    description: 'Crie uma rotina eficiente de aprendizado',
    duration: '11:25',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
    videoUrl: 'https://www.youtube.com/watch?v=...',
    category: 'dicas',
  },
];

const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'inicio', label: 'Comece Aqui' },
  { id: 'niveis', label: 'Por Nível' },
  { id: 'recursos', label: 'Recursos' },
  { id: 'dicas', label: 'Dicas' },
];

export default function GuidePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  const filteredVideos = selectedCategory === 'todos' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

  return (
    <div className="min-h-screen px-6 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Guia de <span className="gradient-text">Estudos</span>
          </h1>
        </div>
        <p className="text-slate-400 text-lg">
          Aprenda a usar a plataforma e maximize seu aprendizado
        </p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'glass-card text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
            onClick={() => router.push(`/platform/guide/${video.id}`)}
            className="group cursor-pointer"
          >
            <div className="glass-card rounded-2xl overflow-hidden hover-glow transition-all">
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-slate-800">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                
                {/* Play Button */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: hoveredVideo === video.id ? 1 : 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-8 h-8 text-purple-600 ml-1" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {video.isNew && (
                    <div className="px-2 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold text-white">
                      NOVO
                    </div>
                  )}
                  {video.watched && (
                    <div className="px-2 py-1 rounded-lg bg-green-600/90 backdrop-blur-sm text-xs font-bold text-white flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Assistido
                    </div>
                  )}
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-xs font-medium text-white flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-slate-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Nenhum vídeo encontrado
          </h3>
          <p className="text-slate-400">
            Tente selecionar outra categoria
          </p>
        </motion.div>
      )}
    </div>
  );
}
