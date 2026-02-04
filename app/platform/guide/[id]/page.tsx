'use client';

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRightFromLine,
  ArrowLeftFromLine,
  CheckCircle2,
  Settings,
  ChevronDown,
  ChevronUp,
  Search,
  List,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Comments from '@/components/content/Comments';
import { allVideos } from '@/lib/guide-videos';

/* ===================== MINI SIDEBAR ===================== */
function MiniSidebar({
  position,
  onExpand,
}: {
  position: 'left' | 'right';
  onExpand: () => void;
}) {
  return (
    <aside
      className={`
        fixed top-[72px] h-[calc(100vh-72px)]
        w-[56px] z-40
        bg-slate-900 border-slate-800
        flex flex-col items-center gap-2 py-4
        ${position === 'left' ? 'left-0 border-r' : 'right-0 border-l'}
      `}
    >
      <button
        onClick={onExpand}
        aria-label="Expandir lista"
        className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-800"
      >
        {position === 'left' ? (
          <ArrowRightFromLine className="w-5 h-5 text-slate-200" />
        ) : (
          <ArrowLeftFromLine className="w-5 h-5 text-slate-200" />
        )}
      </button>

      <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-800">
        <Search className="w-5 h-5 text-slate-400" />
      </button>

      <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-800">
        <List className="w-5 h-5 text-slate-400" />
      </button>
    </aside>
  );
}

/* ===================== SIDEBAR EXPANDIDA ===================== */
function ContentSidebar({
  videoId,
  currentPlaylistIndex,
  expandedVideos,
  setExpandedVideos,
  sidebarPosition,
  setSidebarCollapsed,
  setSidebarPosition,
}: {
  videoId: string;
  currentPlaylistIndex: number;
  expandedVideos: Set<string>;
  setExpandedVideos: (v: Set<string>) => void;
  sidebarPosition: 'left' | 'right';
  setSidebarCollapsed: (v: boolean) => void;
  setSidebarPosition: (v: 'left' | 'right') => void;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <aside
      className={`
        fixed top-[72px] h-[calc(100vh-72px)] w-[420px]
        bg-slate-900 border-slate-800 z-40 flex flex-col
        ${sidebarPosition === 'left' ? 'left-0 border-r' : 'right-0 border-l'}
      `}
    >
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-slate-900 border-b border-slate-700 px-5 py-4 flex justify-between">
        <p className="font-bold text-white">Lista de Conteúdos</p>

        <div className="flex gap-1 relative" ref={settingsRef}>
          <button
            onClick={() => setSettingsOpen(v => !v)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-800"
          >
            <Settings className="w-5 h-5 text-slate-300" />
          </button>

          {settingsOpen && (
            <div className="absolute right-0 top-12 bg-slate-800 border border-slate-700 rounded-xl p-2 w-44">
              <p className="text-slate-400 px-2 py-1 text-sm">Posição da lista</p>
              <button
                onClick={() => {
                  setSidebarPosition('left');
                  setSettingsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-slate-700 text-sm"
              >
                Esquerda
              </button>
              <button
                onClick={() => {
                  setSidebarPosition('right');
                  setSettingsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-slate-700 text-sm"
              >
                Direita
              </button>
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-800"
          >
            {sidebarPosition === 'left' ? (
              <ArrowLeftFromLine className="w-5 h-5 text-slate-300" />
            ) : (
              <ArrowRightFromLine className="w-5 h-5 text-slate-300" />
            )}
          </button>
        </div>
      </div>

      {/* LISTA */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {allVideos.map(item => {
          const expanded = expandedVideos.has(item.id);
          const active = item.id === videoId;

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  const next = new Set(expandedVideos);
                  next.has(item.id) ? next.delete(item.id) : next.add(item.id);
                  setExpandedVideos(next);
                }}
                className={`w-full px-3 py-2 rounded-lg border text-left ${
                  active
                    ? 'bg-purple-600/20 border-purple-500/40'
                    : 'bg-slate-800/40 border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm">{item.title}</span>
                  {expanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {expanded && item.playlist && (
                <div className="ml-3 mt-1 space-y-1">
                  {item.playlist.map((p, idx) => (
                    <Link
                      key={p.id}
                      href={`/platform/guide/${item.id}?playlist=${idx}`}
                      scroll={false}
                      className={`block px-3 py-1.5 rounded text-xs ${
                        active && idx === currentPlaylistIndex
                          ? 'bg-purple-600/30 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

/* ===================== PAGE ===================== */
export default function GuideVideoPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const videoId = params.id as string;
  const video = allVideos.find(v => v.id === videoId);

  const [mounted, setMounted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState<'left' | 'right'>('left');
  const [expandedVideos, setExpandedVideos] = useState<Set<string>>(new Set());
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const playlistParam = searchParams.get('playlist');
    if (playlistParam) {
      const index = Number(playlistParam);
      if (!Number.isNaN(index)) setCurrentPlaylistIndex(index);
    }
  }, [searchParams]);

  if (!video) {
    return <div className="text-white">Vídeo não encontrado</div>;
  }

  const currentPlaylistItem = video.playlist?.[currentPlaylistIndex];

  return (
    <>
      {mounted && sidebarCollapsed && (
        <MiniSidebar
          position={sidebarPosition}
          onExpand={() => setSidebarCollapsed(false)}
        />
      )}

      {mounted && !sidebarCollapsed && (
        <ContentSidebar
          videoId={videoId}
          currentPlaylistIndex={currentPlaylistIndex}
          expandedVideos={expandedVideos}
          setExpandedVideos={setExpandedVideos}
          sidebarPosition={sidebarPosition}
          setSidebarCollapsed={setSidebarCollapsed}
          setSidebarPosition={setSidebarPosition}
        />
      )}

      <div
        className={`min-h-screen py-8 flex justify-center transition-all ${
          sidebarCollapsed
            ? sidebarPosition === 'left'
              ? 'pl-[72px]'
              : 'pr-[72px]'
            : sidebarPosition === 'left'
            ? 'pl-[460px]'
            : 'pr-[460px]'
        }`}
      >
        <div className="w-full max-w-[880px] px-4">
          <button
            onClick={() => router.push('/platform/guide')}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <h1 className="text-3xl font-bold text-white mb-4">
            {currentPlaylistItem?.title || video.title}
          </h1>

          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-6">
            <iframe
              src={currentPlaylistItem?.videoUrl || video.videoUrl}
              className="w-full h-full"
              allowFullScreen
            />
          </div>

          <Comments contentId={video.id} contentType="guide" />
        </div>
      </div>
    </>
  );
}
