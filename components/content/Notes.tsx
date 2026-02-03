'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Save, Edit2, Plus, Trash2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Note {
  id: string;
  text: string;
  timestamp: number;
  contentId: string;
  contentTitle?: string;
  contentType: 'content' | 'guide';
}

interface NotesProps {
  contentId: string;
  contentType: 'content' | 'guide';
  contentTitle?: string;
}

export default function Notes({ contentId, contentType, contentTitle }: NotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const storageKey = 'all_notes';

  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) {
      const allNotes: Note[] = JSON.parse(savedNotes);
      const contentNotes = allNotes.filter(
        n => n.contentId === contentId && n.contentType === contentType
      );
      setNotes(contentNotes);
    }
  }, [contentId, contentType]);

  const saveNotes = (updatedNotes: Note[]) => {
    const savedNotes = localStorage.getItem(storageKey);
    const allNotes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];
    
    const otherNotes = allNotes.filter(
      n => !(n.contentId === contentId && n.contentType === contentType)
    );
    
    const newAllNotes = [...otherNotes, ...updatedNotes];
    localStorage.setItem(storageKey, JSON.stringify(newAllNotes));
    setNotes(updatedNotes);
  };

  const handleAdd = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      text: newNote.trim(),
      timestamp: Date.now(),
      contentId,
      contentTitle,
      contentType,
    };

    const updatedNotes = [...notes, note];
    saveNotes(updatedNotes);
    setNewNote('');
    setIsAdding(false);
  };

  const handleEdit = (noteId: string) => {
    if (!editText.trim()) return;

    const updatedNotes = notes.map(note =>
      note.id === noteId
        ? { ...note, text: editText.trim(), timestamp: Date.now() }
        : note
    );
    saveNotes(updatedNotes);
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = (noteId: string) => {
    const updatedNotes = notes.filter(n => n.id !== noteId);
    saveNotes(updatedNotes);
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Minhas Anotações</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">Apenas você vê</span>
          <button
            onClick={() => setIsAdding(true)}
            className="p-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
            title="Nova anotação"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lista de Anotações */}
      <div className="space-y-3 mb-4">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700"
            >
              {editingId === note.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    autoFocus
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(note.id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium transition-all flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Salvar
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditText('');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-sm font-medium transition-all"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(note.timestamp, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startEdit(note)}
                        className="p-1 rounded-lg hover:bg-purple-500/20 text-slate-500 hover:text-purple-400 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-1 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {note.text}
                  </p>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Nova Anotação */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Escreva sua anotação aqui... Dicas, pontos importantes, palavras novas, etc."
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            autoFocus
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleAdd}
              disabled={!newNote.trim()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Salvar
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewNote('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-sm font-medium transition-all"
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {notes.length === 0 && !isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-4 rounded-xl border-2 border-dashed border-slate-700 hover:border-purple-500 text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Adicionar primeira anotação
        </button>
      )}
    </div>
  );
}
