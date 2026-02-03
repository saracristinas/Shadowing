'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, ExternalLink, Trash2, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

interface Note {
  id: string;
  text: string;
  timestamp: number;
  contentId: string;
  contentTitle?: string;
  contentType: 'content' | 'guide';
}

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filter, setFilter] = useState<'all' | 'content' | 'guide'>('all');

  useEffect(() => {
    const savedNotes = localStorage.getItem('all_notes');
    if (savedNotes) {
      const allNotes: Note[] = JSON.parse(savedNotes);
      setNotes(allNotes.sort((a, b) => b.timestamp - a.timestamp));
    }
  }, []);

  const handleDelete = (noteId: string) => {
    const updatedNotes = notes.filter(n => n.id !== noteId);
    localStorage.setItem('all_notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const handleNavigate = (note: Note) => {
    if (note.contentType === 'guide') {
      router.push(`/platform/guide/${note.contentId}`);
    } else {
      router.push(`/platform/content/${note.contentId}`);
    }
  };

  const filteredNotes = filter === 'all' 
    ? notes 
    : notes.filter(n => n.contentType === filter);

  const groupedNotes = filteredNotes.reduce((acc, note) => {
    const key = `${note.contentType}_${note.contentId}`;
    if (!acc[key]) {
      acc[key] = {
        contentId: note.contentId,
        contentTitle: note.contentTitle || 'Sem título',
        contentType: note.contentType,
        notes: [],
      };
    }
    acc[key].notes.push(note);
    return acc;
  }, {} as Record<string, { contentId: string; contentTitle: string; contentType: string; notes: Note[] }>);

  return (
    <div className="min-h-screen px-6 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Minhas <span className="gradient-text">Anotações</span>
          </h1>
        </div>
        <p className="text-slate-400 text-lg">
          Todas as suas anotações em um só lugar
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3 mb-8"
      >
        <Filter className="w-5 h-5 text-slate-400" />
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'content', label: 'Biblioteca' },
            { id: 'guide', label: 'Guia' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'glass-card text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className="ml-auto text-sm text-slate-400">
          {filteredNotes.length} {filteredNotes.length === 1 ? 'anotação' : 'anotações'}
        </span>
      </motion.div>

      {/* Notes by Content */}
      <div className="space-y-6">
        {Object.values(groupedNotes).length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Nenhuma anotação ainda
            </h3>
            <p className="text-slate-400 mb-6">
              Suas anotações aparecerão aqui conforme você estuda
            </p>
          </motion.div>
        ) : (
          Object.values(groupedNotes).map((group, index) => (
            <motion.div
              key={`${group.contentType}_${group.contentId}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="glass-card rounded-2xl p-6"
            >
              {/* Content Header */}
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-white/5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      group.contentType === 'guide'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {group.contentType === 'guide' ? 'Guia' : 'Biblioteca'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {group.contentTitle}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {group.notes.length} {group.notes.length === 1 ? 'anotação' : 'anotações'}
                  </p>
                </div>
                <button
                  onClick={() => handleNavigate(group.notes[0])}
                  className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                  title="Ir para conteúdo"
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>

              {/* Notes List */}
              <div className="space-y-3">
                {group.notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {formatDistanceToNow(note.timestamp, {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </div>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-1 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {note.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
