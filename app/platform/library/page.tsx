'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import ContentCard from '@/components/content/ContentCard';
import { useData } from '@/lib/data-context';
import { useRouter, useSearchParams } from 'next/navigation';

type Language = 'all' | 'english' | 'spanish' | 'portuguese';
type Level = 'all' | 'beginner' | 'basic' | 'intermediate' | 'advanced';
type ContentType = 'all' | 'video' | 'link' | 'audio';

export default function LibraryPage() {
  const { contents } = useData();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [language, setLanguage] = useState<Language>(
    (searchParams?.get('language') as Language) || 'all'
  );
  const [level, setLevel] = useState<Level>('all');
  const [contentType, setContentType] = useState<ContentType>('all');

  const activeFiltersCount = [
    language !== 'all',
    level !== 'all',
    contentType !== 'all',
  ].filter(Boolean).length;

  const filteredContents = useMemo(() => {
    return contents.filter((content) => {
      const matchesSearch =
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLanguage = language === 'all' || content.language === language;
      const matchesLevel = level === 'all' || content.level === level;
      const matchesType = contentType === 'all' || content.type === contentType;

      return matchesSearch && matchesLanguage && matchesLevel && matchesType;
    });
  }, [contents, searchQuery, language, level, contentType]);

  const clearFilters = () => {
    setLanguage('all');
    setLevel('all');
    setContentType('all');
  };

  return (
    <div className="min-h-screen px-6 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          <span className="gradient-text">Biblioteca</span> de Conteúdos
        </h1>
        <p className="text-slate-400">
          {filteredContents.length} conteúdo{filteredContents.length !== 1 ? 's' : ''} disponível
          {filteredContents.length !== 1 ? 'is' : ''}
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por título ou descrição..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`h-12 px-4 rounded-xl border transition-all flex items-center gap-2 whitespace-nowrap ${
              showFilters || activeFiltersCount > 0
                ? 'bg-purple-600/20 border-purple-500/30 text-purple-400'
                : 'border-white/10 text-slate-400 hover:bg-white/5'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Quick Language Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'Todos', emoji: '🌎' },
            { value: 'english', label: 'Inglês', emoji: '🇺🇸' },
            { value: 'spanish', label: 'Espanhol', emoji: '🇪🇸' },
            { value: 'portuguese', label: 'Português', emoji: '🇧🇷' },
          ].map((lang) => (
            <button
              key={lang.value}
              onClick={() => setLanguage(lang.value as Language)}
              className={`rounded-full px-3 py-2 whitespace-nowrap transition-all border ${
                language === lang.value
                  ? 'bg-purple-600/20 border-purple-500/30 text-purple-400'
                  : 'border-white/10 text-slate-400 hover:bg-white/5'
              }`}
            >
              <span className="mr-2">{lang.emoji}</span>
              {lang.label}
            </button>
          ))}
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card rounded-2xl p-4 mt-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Filtros Avançados</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Limpar
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Idioma
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                  >
                    <option value="all">Todos</option>
                    <option value="english">Inglês</option>
                    <option value="spanish">Espanhol</option>
                    <option value="portuguese">Português</option>
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Nível
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as Level)}
                    className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                  >
                    <option value="all">Todos</option>
                    <option value="beginner">Iniciante</option>
                    <option value="basic">Básico</option>
                    <option value="intermediate">Intermediário</option>
                    <option value="advanced">Avançado</option>
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Tipo
                  </label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value as ContentType)}
                    className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                  >
                    <option value="all">Todos</option>
                    <option value="video">Vídeos</option>
                    <option value="link">Links</option>
                    <option value="audio">Áudios</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Content Grid */}
      {filteredContents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((content, index) => (
            <ContentCard
              key={content.id}
              content={content}
              index={index}
              onClick={() => router.push(`/platform/content/${content.id}`)}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Nenhum conteúdo encontrado
          </h3>
          <p className="text-slate-400 mb-6">
            Tente ajustar os filtros ou buscar por outros termos
          </p>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="h-12 px-6 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 hover:bg-purple-600/30 transition-all"
            >
              Limpar Filtros
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
