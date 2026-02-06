'use client';

import { useState, useEffect } from 'react';
import { BookMarked, Plus, Trash2, Edit2, Save, X } from 'lucide-react';
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

interface NotesInputProps {
  contentId: string;
  contentTitle: string;
  contentType: 'content' | 'guide';
}

export default function NotesInput({ contentId, contentTitle, contentType }: NotesInputProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Carregar notas do localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('all_notes');
    if (savedNotes) {
      const allNotes: Note[] = JSON.parse(savedNotes);
      const contentNotes = allNotes.filter(n => n.contentId === contentId);
      setNotes(contentNotes.sort((a, b) => b.timestamp - a.timestamp));
    }
  }, [contentId]);

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      text: newNote.trim(),
      timestamp: Date.now(),
      contentId,
      contentTitle,
      contentType,
    };

    // Adicionar à lista de todas as notas
    const savedNotes = localStorage.getItem('all_notes');
    const allNotes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];
    allNotes.push(note);
    localStorage.setItem('all_notes', JSON.stringify(allNotes));

    // Atualizar UI
    setNotes([note, ...notes]);
    setNewNote('');
  };

  const handleDeleteNote = (noteId: string) => {
    // Remover de todas as notas
    const savedNotes = localStorage.getItem('all_notes');
    if (savedNotes) {
      const allNotes: Note[] = JSON.parse(savedNotes);
      const updatedNotes = allNotes.filter(n => n.id !== noteId);
      localStorage.setItem('all_notes', JSON.stringify(updatedNotes));
      
      // Atualizar UI
      setNotes(notes.filter(n => n.id !== noteId));
    }
  };

  const handleStartEdit = (note: Note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleSaveEdit = (noteId: string) => {
    if (!editText.trim()) return;

    // Atualizar no localStorage
    const savedNotes = localStorage.getItem('all_notes');
    if (savedNotes) {
      const allNotes: Note[] = JSON.parse(savedNotes);
      const updatedNotes = allNotes.map(n => 
        n.id === noteId ? { ...n, text: editText.trim() } : n
      );
      localStorage.setItem('all_notes', JSON.stringify(updatedNotes));
      
      // Atualizar UI
      setNotes(notes.map(n => 
        n.id === noteId ? { ...n, text: editText.trim() } : n
      ));
    }

    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 sm:p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
            <BookMarked className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Minhas Anotações</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {notes.length} {notes.length === 1 ? 'anotação' : 'anotações'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-700 text-slate-400"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {/* Input Area */}
      <div className={`space-y-4 ${!isExpanded ? 'hidden lg:block' : ''}`}>
        <div className="flex flex-col sm:flex-row gap-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Escreva sua anotação aqui..."
            className="flex-1 min-h-[80px] sm:min-h-[60px] px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                handleAddNote();
              }
            }}
          />
          <button
            onClick={handleAddNote}
            disabled={!newNote.trim()}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            <span className="sm:hidden">Adicionar</span>
          </button>
        </div>
        <p className="text-xs text-slate-500">
          💡 Dica: Use <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-xs">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-xs">Enter</kbd> para adicionar rapidamente
        </p>

        {/* Notes List */}
        {notes.length > 0 && (
          <div className="space-y-3 mt-6">
            <div className="border-t border-slate-700 pt-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-3">Suas anotações:</h3>
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 sm:p-4 rounded-lg bg-slate-900 border border-slate-700 mb-3 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-xs text-slate-500">
                      {formatDistanceToNow(note.timestamp, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </div>
                    {editingId === note.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleSaveEdit(note.id)}
                          className="p-1.5 rounded-lg hover:bg-green-500/20 text-slate-500 hover:text-green-400 transition-colors"
                          title="Salvar"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-slate-300 transition-colors"
                          title="Cancelar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleStartEdit(note)}
                          className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  {editingId === note.id ? (
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full min-h-[80px] px-3 py-2 bg-slate-800 border border-purple-500 rounded-lg text-white placeholder-slate-500 focus:outline-none resize-none text-sm sm:text-base"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                          handleSaveEdit(note.id);
                        }
                        if (e.key === 'Escape') {
                          handleCancelEdit();
                        }
                      }}
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {note.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
