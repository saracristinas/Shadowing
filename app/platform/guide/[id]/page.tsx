'use client';

import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Share2,
  Bookmark,
  ThumbsUp,
  FileText,
  Download,
  ExternalLink,
  StickyNote,
  X,
  MoreVertical,
  Pencil,
  Trash2,
  Play,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';
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
  materials?: Array<{
    id: string;
    title: string;
    subtitle: string;
    type: 'reading' | 'pdf' | 'link';
    size?: string;
    url: string;
  }>;
  playlist?: Array<{
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    videoUrl: string;
    completed?: boolean;
  }>;
}

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
    materials: [
      {
        id: '1',
        title: 'Teste de nível - Inglês geral',
        subtitle: 'Leitura Complementar',
        type: 'reading',
        url: 'https://www.cambridgeenglish.org/br/test-your-english/general-english/'
      }
    ]
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
    materials: [
      {
        id: '2',
        title: 'MÉTODO SHADOWING.pdf',
        subtitle: 'PDF - 2.42 MB',
        type: 'pdf',
        size: '2.42 MB',
        url: '/files/MÉTODO SHADOWING.pdf'
      },
      {
        id: '3',
        title: 'MÉTODO SHADOWING - SPANISH.pdf',
        subtitle: 'PDF - 2.15 MB',
        type: 'pdf',
        size: '2.15 MB',
        url: '/files/MÉTODO SHADOWING - SPANISH.pdf'
      }
    ]
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
    title: 'Estudando no Nível A1',
    description: 'Dicas para iniciantes',
    fullDescription: 'Se você está começando do zero, este vídeo é para você! Descubra as melhores práticas para estudar no nível A1, quanto tempo dedicar por dia, e como construir uma base sólida no idioma. Este módulo contém 23 vídeos com aproximadamente 1h de conteúdo total.',
    duration: '1h',
    thumbnail: '/levels/level-a1.png',
    videoUrl: 'https://www.youtube.com/embed/0lHOL4iZacI',
    category: 'niveis',
    playlist: [
      {
        id: '1',
        title: 'TÉCNICA DE POMODORO',
        duration: '02:30',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/0lHOL4iZacI',
        completed: false
      },
      {
        id: '2',
        title: 'SHADOWING - APRENDENDO NOVAS HABILIDADES',
        duration: '02:05',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/bopSgLlZ2Nk',
        completed: false
      },
      {
        id: '3',
        title: 'SHADOWING - ROTINAS E TAREFAS DE CASA',
        duration: '02:15',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/V-xdxTAsZ7g',
        completed: false
      },
      {
        id: '4',
        title: 'SHADOWING - MOTIVAÇÃO',
        duration: '02:20',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/wGldCYiJiN0',
        completed: false
      },
      {
        id: '5',
        title: 'SHADOWING - ESPORTES E ATIVIDADES',
        duration: '02:10',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/-3HOngHrgMk',
        completed: false
      },
      {
        id: '6',
        title: 'SHADOWING - O QUE ACONTECE SE VOCÊ LIDA MAL COM PROBLEMAS',
        duration: '02:35',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/cTpieUM4NGc',
        completed: false
      },
      {
        id: '7',
        title: 'SHADOWING - CONHECENDO NOVAS PESSOAS',
        duration: '02:25',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/d7GYcNGxCHI',
        completed: false
      },
      {
        id: '8',
        title: 'SHADOWING - OPINIÕES E PREFERÊNCIAS',
        duration: '02:19',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/vHu3IXLdYAA',
        completed: false
      },
      {
        id: '9',
        title: 'SHADOWING - VIDA FITNESS',
        duration: '02:16',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/IBx-k6iAOm4',
        completed: false
      },
      {
        id: '10',
        title: 'SHADOWING - FAZENDO PLANOS',
        duration: '03:34',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/DnXqumOUOyc',
        completed: false
      },
      {
        id: '11',
        title: 'SHADOWING - HOBBIES E INTERESSES',
        duration: '02:29',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/sDBwIP0JRf0',
        completed: false
      },
      {
        id: '12',
        title: 'SHADOWING - EDUCAÇÃO E APRENDIZADO',
        duration: '03:21',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/rnnb508zEHI',
        completed: false
      },
      {
        id: '13',
        title: 'SHADOWING - DESCREVENDO PESSOAS',
        duration: '02:38',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/_S6dVBbcj2A',
        completed: false
      },
      {
        id: '14',
        title: 'SHADOWING - SAÚDE FÍSICA',
        duration: '02:42',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/DLxwphrQHLA',
        completed: false
      },
      {
        id: '15',
        title: 'SHADOWING - TRABALHO E CARREIRA',
        duration: '03:15',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/DY3TDYBt9qU',
        completed: false
      },
      {
        id: '16',
        title: 'SHADOWING - GUARDANDO DINHEIRO',
        duration: '02:50',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/eG9smYJPMwo',
        completed: false
      },
      {
        id: '17',
        title: 'SHADOWING - TECNOLOGIA',
        duration: '02:45',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/OXvVB8RvBzI',
        completed: false
      },
      {
        id: '18',
        title: 'SHADOWING - VIAGENS E FERIADOS',
        duration: '03:10',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/gFkNhGDd8Ws',
        completed: false
      },
      {
        id: '19',
        title: 'SHADOWING - MEIO-AMBIENTE E NATUREZA',
        duration: '02:55',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/erCtR8HayCQ',
        completed: false
      },
      {
        id: '20',
        title: 'SHADOWING - PETS',
        duration: '02:30',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/uI42r9nOycI',
        completed: false
      },
      {
        id: '21',
        title: 'SHADOWING - MARCANDO COMPROMISSOS',
        duration: '02:40',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/gp2ANbwxovQ',
        completed: false
      },
      {
        id: '22',
        title: 'SHADOWING - ROTINA PESSOAL (EXEMPLO)',
        duration: '02:35',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/KtUSwIxCskc',
        completed: false
      },
      {
        id: '23',
        title: 'SHADOWING - FAMÍLIA E AMIGOS',
        duration: '03:05',
        thumbnail: '/levels/level-a1.png',
        videoUrl: 'https://www.youtube.com/embed/UHMbJlKzNu8',
        completed: false
      }
    ]
  },
  {
    id: '5',
    title: 'Estudando no Nível A2',
    description: 'Evoluindo do básico',
    fullDescription: 'No nível A2, você já tem uma base e está pronto para evoluir! Aprenda estratégias específicas para este nível, como aumentar seu vocabulário e ganhar mais confiança na conversação.',
    duration: '11:15',
    thumbnail: '/levels/level-a2.png',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'niveis',
  },
  {
    id: '6',
    title: 'Estudando no Nível B1',
    description: 'Alcançando a independência',
    fullDescription: 'O nível B1 é onde você começa a ter independência no idioma. Descubra técnicas avançadas de shadowing e como trabalhar com conteúdos mais complexos para alcançar fluência.',
    duration: '12:10',
    thumbnail: '/levels/level-b1.png',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'niveis',
  },
  {
    id: '7',
    title: 'Estudando no Nível B2',
    description: 'Dominando o idioma',
    fullDescription: 'No B2, você está próximo da fluência completa! Aprenda estratégias avançadas para refinar sua pronúncia, expandir vocabulário técnico e se preparar para situações profissionais.',
    duration: '13:20',
    thumbnail: '/levels/level-b2.png',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'niveis',
  },
  {
    id: '8',
    title: 'Sistema de XP e Conquistas',
    description: 'Como funciona a gamificação',
    fullDescription: 'A plataforma tem um sistema completo de gamificação! Entenda como ganhar XP, subir de nível, desbloquear conquistas, e usar a competição saudável para manter sua motivação em alta.',
    duration: '7:30',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'recursos',
  },
  {
    id: '9',
    title: 'Dicas de Pronúncia',
    description: 'Técnicas para melhorar sua pronúncia',
    fullDescription: 'A pronúncia é crucial no aprendizado de idiomas. Neste vídeo, você vai aprender técnicas específicas para melhorar sua pronúncia através do shadowing, incluindo exercícios práticos e erros comuns a evitar.',
    duration: '9:40',
    thumbnail: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'dicas',
  },
  {
    id: '10',
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
  const [activeTab, setActiveTab] = useState<'description' | 'materials'>('description');
  const [notesOpen, setNotesOpen] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState<'left' | 'right'>('right');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [notes, setNotes] = useState<Array<{
    id: string;
    text: string;
    timestamp: string;
  }>>([]);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [noteMenuOpen, setNoteMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!videoId) return;
    const storageKey = `video_notes_${videoId}`;
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [videoId]);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar_position');
    if (saved === 'left' || saved === 'right') {
      setSidebarPosition(saved);
    }
    
    const collapsed = localStorage.getItem('sidebar_collapsed');
    if (collapsed === 'true') {
      setSidebarCollapsed(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setNoteMenuOpen(null);
    if (noteMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [noteMenuOpen]);

  const saveNotes = (updatedNotes: typeof notes) => {
    const storageKey = `video_notes_${videoId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note = {
      id: Date.now().toString(),
      text: newNote.trim(),
      timestamp: '43 minutos', // Em produção, pegar do player
    };

    const updatedNotes = [note, ...notes];
    saveNotes(updatedNotes);
    setNewNote('');
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(n => n.id !== noteId);
    saveNotes(updatedNotes);
    setNoteMenuOpen(null);
  };

  const handleEditNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setEditingNoteId(noteId);
      setEditingText(note.text);
      setNoteMenuOpen(null);
    }
  };

  const handleSaveEdit = () => {
    if (!editingText.trim() || !editingNoteId) return;

    const updatedNotes = notes.map(n => 
      n.id === editingNoteId 
        ? { ...n, text: editingText.trim() }
        : n
    );
    
    saveNotes(updatedNotes);
    setEditingNoteId(null);
    setEditingText('');
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditingText('');
  };

  const handleMarkWatched = () => {
    setWatched(true);
  };

  const handleChangeSidebar = (pos: 'left' | 'right') => {
    setSidebarPosition(pos);
    localStorage.setItem('sidebar_position', pos);
    setSettingsOpen(false);
  };

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebar_collapsed', String(newState));
  };

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

  const handlePreviousVideo = () => {
    if (video.playlist && currentPlaylistIndex > 0) {
      setCurrentPlaylistIndex(currentPlaylistIndex - 1);
    }
  };

  const handleNextVideo = () => {
    if (video.playlist && currentPlaylistIndex < video.playlist.length - 1) {
      setCurrentPlaylistIndex(currentPlaylistIndex + 1);
    }
  };

  const currentPlaylistItem = video.playlist?.[currentPlaylistIndex];

  const ContentSidebar = () => {
    if (!video.playlist) return null;

    return (
      <motion.aside
        animate={{ width: sidebarCollapsed ? 48 : 320 }}
        transition={{ duration: 0.25 }}
        className="flex-shrink-0 glass-card rounded-xl h-[calc(100vh-64px)] sticky top-16 overflow-hidden flex flex-col"
      >
        {sidebarCollapsed ? (
          // Versão Colapsada
          <div className="h-full flex flex-col items-center py-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
              title="Expandir lista"
            >
              {sidebarPosition === 'left' ? (
                <ChevronRight className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-slate-400" />
              )}
            </button>
          </div>
        ) : (
          // Versão Expandida
          <>
            {/* Header com engrenagem */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="text-base font-bold text-white">Lista de Conteúdos</h3>

              <div className="flex items-center gap-1">
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                  title="Ocultar lista"
                >
                  {sidebarPosition === 'left' ? (
                    <ChevronLeft className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <Settings className="w-5 h-5 text-slate-400" />
                  </button>

                  {settingsOpen && (
                    <div className="absolute right-0 top-10 w-40 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                      <button
                        onClick={() => handleChangeSidebar('left')}
                        className="w-full px-4 py-3 text-left hover:bg-slate-700 text-sm text-white transition-colors"
                      >
                        Esquerda
                      </button>
                      <button
                        onClick={() => handleChangeSidebar('right')}
                        className="w-full px-4 py-3 text-left hover:bg-slate-700 text-sm text-white transition-colors"
                      >
                        Direita
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-slate-700">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar conteúdo"
                  className="w-full px-4 py-2 pl-10 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                />
                <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Playlist Items com scroll */}
            <div className="flex-1 overflow-y-auto">
              {video.playlist.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPlaylistIndex(index)}
                  className={`w-full p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors text-left group ${
                    index === currentPlaylistIndex ? 'bg-slate-800/70' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-xs text-white font-medium">
                        {item.duration}
                      </div>
                      {index === currentPlaylistIndex && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        {item.completed && (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </motion.aside>
    );
  };

  return (
    <div className={`min-h-screen px-6 max-w-7xl mx-auto ${
      video.playlist ? '' : 'py-8'
    }`}>
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push('/platform/guide')}
        className={`flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 ${
          video.playlist ? 'mt-8' : ''
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para guia
      </motion.button>

      {/* Video Title Above Player */}
      <div className="mb-4">
        <p className="text-sm text-slate-400 mb-1 uppercase tracking-wide">
          SHADOWING NÍVEL A1
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {currentPlaylistItem?.title || video.title}
        </h1>
      </div>

      {/* Navigation Buttons */}
      {video.playlist && (
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handlePreviousVideo}
            disabled={currentPlaylistIndex === 0}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 text-white font-medium flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </button>
          <button
            onClick={handleNextVideo}
            disabled={!video.playlist || currentPlaylistIndex === video.playlist.length - 1}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 text-white font-medium flex items-center gap-2 transition-colors"
          >
            Próximo
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      )}

      {/* Layout Principal: Sidebar fixa + Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="hidden md:flex gap-8">
          {/* Sidebar Esquerda */}
          {video.playlist && sidebarPosition === 'left' && <ContentSidebar />}

          {/* Conteúdo Principal */}
          <div className="flex-1">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                src={currentPlaylistItem?.videoUrl || video.videoUrl}
                title={currentPlaylistItem?.title || video.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Rating and Actions */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="text-yellow-500 hover:text-yellow-400">
                    ★
                  </button>
                ))}
              </div>
              <button
                onClick={handleMarkWatched}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Concluída
              </button>
            </div>
          </div>

          {/* Sidebar Direita */}
          {video.playlist && sidebarPosition === 'right' && <ContentSidebar />}
        </div>

        {/* Mobile: Player simples */}
        <div className="md:hidden">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
            <iframe
              src={currentPlaylistItem?.videoUrl || video.videoUrl}
              title={currentPlaylistItem?.title || video.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            
            {/* Notes Button */}
            <button
              onClick={() => setNotesOpen(!notesOpen)}
              className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-medium flex items-center gap-2 z-30"
            >
              <StickyNote className="w-4 h-4" />
              Notas
            </button>
          </div>

          {/* Rating and Actions */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="text-yellow-500 hover:text-yellow-400">
                  ★
                </button>
              ))}
            </div>
            <button
              onClick={handleMarkWatched}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              Concluída
            </button>
          </div>
        </div>
      </motion.div>

      {/* Notes Sidebar for Mobile */}
      <AnimatePresence>
        {notesOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 bg-slate-900 z-50"
          >
            <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Anotações da Aula</h3>
                    <button
                      onClick={() => setNotesOpen(false)}
                      className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Description */}
                  <div className="px-6 py-4 border-b border-slate-700">
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Faça aqui as suas anotações sobre a aula e localize essas informações no vídeo para consultá-las sempre que quiser.
                    </p>
                  </div>

                  {/* Notes List */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className="group">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{note.timestamp}</span>
                            <span className="text-sm text-slate-500">— 00:00</span>
                          </div>
                          
                          {/* Menu Button */}
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setNoteMenuOpen(noteMenuOpen === note.id ? null : note.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-700 rounded"
                            >
                              <MoreVertical className="w-4 h-4 text-slate-400 hover:text-white" />
                            </button>

                            {/* Dropdown Menu */}
                            {noteMenuOpen === note.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-0 top-8 w-40 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden"
                              >
                                <button
                                  onClick={() => handleEditNote(note.id)}
                                  className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-3 transition-colors"
                                >
                                  <Pencil className="w-4 h-4" />
                                  Editar
                                </button>
                                <button
                                  onClick={() => handleDeleteNote(note.id)}
                                  className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-slate-700 flex items-center gap-3 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Apagar
                                </button>
                              </motion.div>
                            )}
                          </div>
                        </div>
                        
                        {/* Note Content - Editable */}
                        {editingNoteId === note.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                              autoFocus
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={handleSaveEdit}
                                className="flex-1 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors"
                              >
                                Salvar
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-600 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-300 leading-relaxed">{note.text}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Note */}
                  <div className="p-6 border-t border-slate-700">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Clique aqui e escreva o seu comentário"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors resize-none text-sm"
                    />
                    {newNote.trim() && (
                      <button
                        onClick={handleAddNote}
                        className="mt-3 w-full px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium transition-all"
                      >
                        Adicionar anotação
                      </button>
                    )}
                  </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-8 mb-8"
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

      {/* Description & Materials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-8 mb-8"
      >
        <h2 className="text-xl font-bold text-white mb-6">Informações da aula</h2>
        
        {/* Tabs */}
        <div className="flex items-center gap-6 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === 'description'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Descrição
            {activeTab === 'description' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('materials')}
            className={`pb-4 px-2 font-medium transition-colors relative flex items-center gap-2 ${
              activeTab === 'materials'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Materiais
            {video.materials && video.materials.length > 0 && (
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                {video.materials.length}
              </span>
            )}
            {activeTab === 'materials' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
              />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[200px]">
          {activeTab === 'description' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-slate-300 leading-relaxed text-base">
                {video.fullDescription || video.description}
              </p>
            </motion.div>
          )}

          {activeTab === 'materials' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {video.materials && video.materials.length > 0 ? (
                video.materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          {material.title}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {material.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    {material.type === 'reading' ? (
                      <a
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium flex items-center gap-2 transition-colors"
                      >
                        Abrir
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <a
                        href={material.url}
                        download
                        className="px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-700 text-white font-medium flex items-center gap-2 transition-colors"
                      >
                        Download
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                  <p className="text-slate-500">
                    Nenhum material disponível para este vídeo.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Comments Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Comments contentId={video.id} contentType="guide" />
      </motion.div>
    </div>
  );
}
