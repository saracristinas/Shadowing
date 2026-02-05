'use client';

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  CheckCircle2,
  Settings,
  ChevronDown,
  ChevronUp,
  List,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Comments from '@/components/content/Comments';
import { allVideos } from '@/lib/guide-videos';

/* ===================== DESKTOP SIDEBAR ===================== */
function ContentSidebar({
  videoId,
  expandedVideos,
  setExpandedVideos,
  sidebarPosition,
  setSidebarCollapsed,
  setSidebarPosition,
}: {
  videoId: string;
  expandedVideos: Set<string>;
  setExpandedVideos: (v: Set<string>) => void;
  sidebarPosition: 'left' | 'right';
  setSidebarCollapsed: (v: boolean) => void;
  setSidebarPosition: (v: 'left' | 'right') => void;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <aside
      className={`
        hidden lg:flex fixed top-[72px] h-[calc(100vh-72px)] w-[420px]
        bg-slate-900 border-slate-800 z-40 flex-col
        ${sidebarPosition === 'right' ? 'right-0 border-l' : 'left-0 border-r'}
      `}
    >
      <div className="sticky top-0 bg-slate-900 border-b border-slate-700 px-5 py-4 flex justify-between relative">
        <p className="font-bold text-white">Lista de Conteúdos</p>

        <div className="flex gap-1">
          {/* ENGRENAGEM */}
          <button
            onClick={() => setSettingsOpen(v => !v)}
            className="w-10 h-10 rounded-lg hover:bg-slate-800 flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-slate-300" />
          </button>

          {/* MENU */}
          {settingsOpen && (
            <div className="absolute right-0 top-14 bg-slate-800 border border-slate-700 rounded-lg p-2 w-40 z-50">
              <p className="text-xs text-slate-400 px-2 mb-1">Posição da lista</p>

              <button
                onClick={() => {
                  setSidebarPosition('left');
                  setSettingsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-slate-700 text-sm text-white"
              >
                Esquerda
              </button>

              <button
                onClick={() => {
                  setSidebarPosition('right');
                  setSettingsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-slate-700 text-sm text-white"
              >
                Direita
              </button>
            </div>
          )}

          {/* OCULTAR */}
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="w-10 h-10 rounded-lg hover:bg-slate-800 flex items-center justify-center"
          >
            {sidebarPosition === 'right' ? (
              <ArrowRightFromLine className="w-5 h-5 text-slate-300" />
            ) : (
              <ArrowLeftFromLine className="w-5 h-5 text-slate-300" />
            )}
          </button>
        </div>
      </div>

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
                  {expanded ? <ChevronUp /> : <ChevronDown />}
                </div>
              </button>

              {expanded &&
                item.playlist?.map((p, idx) => (
                  <Link
                    key={p.id}
                    href={`/platform/guide/${item.id}?playlist=${idx}`}
                    scroll={false}
                    className="block ml-3 mt-1 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-xs text-white"
                  >
                    {p.title}
                  </Link>
                ))}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

/* ===================== MOBILE DRAWER ===================== */
function MobileDrawer({
  open,
  onClose,
  videoId,
  expandedVideos,
  setExpandedVideos,
}: {
  open: boolean;
  onClose: () => void;
  videoId: string;
  expandedVideos: Set<string>;
  setExpandedVideos: (v: Set<string>) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="absolute bottom-0 left-0 right-0 h-[85%] bg-slate-900 rounded-t-2xl p-4 overflow-y-auto">
        <div className="flex justify-between mb-4">
          <p className="text-white font-bold">Lista de Conteúdos</p>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-slate-300" />
          </button>
        </div>

        {allVideos.map(item => {
          const expanded = expandedVideos.has(item.id);
          const active = item.id === videoId;

          return (
            <div key={item.id} className="mb-2">
              <button
                onClick={() => {
                  const next = new Set(expandedVideos);
                  next.has(item.id) ? next.delete(item.id) : next.add(item.id);
                  setExpandedVideos(next);
                }}
                className={`w-full px-3 py-2 rounded-lg border ${
                  active
                    ? 'bg-purple-600/20 border-purple-500/40'
                    : 'bg-slate-800/40 border-slate-700'
                }`}
              >
                <div className="flex justify-between">
                  <span className="text-white text-sm">{item.title}</span>
                  {expanded ? <ChevronUp /> : <ChevronDown />}
                </div>
              </button>

              {expanded &&
                item.playlist?.map((p, idx) => (
                  <Link
                    key={p.id}
                    href={`/platform/guide/${item.id}?playlist=${idx}`}
                    onClick={onClose}
                    scroll={false}
                    className="block ml-3 mt-1 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-xs text-white"
                  >
                    {p.title}
                  </Link>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ===================== MINI SIDEBAR (DESKTOP) ===================== */
function DesktopMiniSidebar({
  position,
  onExpand,
}: {
  position: 'left' | 'right';
  onExpand: () => void;
}) {
  return (
    <aside
      className={`
        hidden lg:flex fixed top-[72px] h-[calc(100vh-72px)]
        w-[56px] bg-slate-900 border-slate-800 z-40
        flex-col items-center py-4
        ${position === 'left' ? 'left-0 border-r' : 'right-0 border-l'}
      `}
    >
      <button
        onClick={onExpand}
        className="w-10 h-10 rounded-lg hover:bg-slate-800 flex items-center justify-center"
      >
        {position === 'left' ? (
          <ArrowRightFromLine className="w-5 h-5 text-slate-300" />
        ) : (
          <ArrowLeftFromLine className="w-5 h-5 text-slate-300" />
        )}
      </button>
    </aside>
  );
}

/* ===================== PAGE ===================== */
export default function GuideVideoPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const videoId = params.id as string;
  const playlistIndex = Number(searchParams.get('playlist') ?? 0);

  const video = allVideos.find(v => v.id === videoId);
  if (!video) return <div className="text-white">Vídeo não encontrado</div>;

  const playlist = video.playlist ?? [];
  const currentVideo = playlist[playlistIndex] || video;

  const [expandedVideos, setExpandedVideos] = useState<Set<string>>(new Set());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarPosition, setSidebarPosition] =
    useState<'left' | 'right'>('left');
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [concludedVideos, setConcludedVideos] = useState<Set<string>>(new Set());

  const contentKey = `${video.id}-${playlistIndex}`;
  const concluded = concludedVideos.has(contentKey);
  const currentVideoId = video.id;
  const iframeRef = useState<HTMLIFrameElement | null>(null)[0];

  useEffect(() => {
    // Reset toast quando trocar de vídeo
    setShowToast(false);
  }, [contentKey]);

  function toggleConcluded() {
    const next = new Set(concludedVideos);
    const wasNotConcluded = !next.has(contentKey);
    next.has(contentKey) ? next.delete(contentKey) : next.add(contentKey);
    setConcludedVideos(next);
    
    if (wasNotConcluded) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }

  function goTo(index: number) {
    if (index < 0 || index >= playlist.length) return;
    setIsNavigating(true);
    router.push(`/platform/guide/${currentVideoId}?playlist=${index}`);
    setTimeout(() => setIsNavigating(false), 500);
  }

  return (
    <>
      {/* LOADING OVERLAY */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-slate-800 rounded-lg p-6 flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-white font-medium">Carregando...</span>
          </div>
        </div>
      )}

      {/* TOAST CONCLUSÃO */}
      {showToast && (
        <div className="fixed right-4 top-20 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
          <CheckCircle2 className="w-6 h-6" />
          <div>
            <p className="font-bold">Aula concluída!</p>
            <p className="text-sm text-green-100">Parabéns pelo progresso 🎉</p>
          </div>
        </div>
      )}

      {!sidebarCollapsed ? (
        <ContentSidebar
          videoId={videoId}
          expandedVideos={expandedVideos}
          setExpandedVideos={setExpandedVideos}
          sidebarPosition={sidebarPosition}
          setSidebarCollapsed={setSidebarCollapsed}
          setSidebarPosition={setSidebarPosition}
        />
      ) : (
        <DesktopMiniSidebar
          position={sidebarPosition}
          onExpand={() => setSidebarCollapsed(false)}
        />
      )}

      <MobileDrawer
        open={mobileDrawer}
        onClose={() => setMobileDrawer(false)}
        videoId={videoId}
        expandedVideos={expandedVideos}
        setExpandedVideos={setExpandedVideos}
      />

      <div
        className={`min-h-screen py-8 flex justify-center transition-all ${
          sidebarCollapsed
            ? sidebarPosition === 'left' ? 'lg:pl-[96px]' : 'lg:pr-[96px]'
            : sidebarPosition === 'left' ? 'lg:pl-[460px]' : 'lg:pr-[460px]'
        }`}
      >
        <div className="w-full max-w-[880px] px-4">
          <button
            onClick={() => router.push('/platform/guide')}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
          >
            <ArrowLeft />
            Voltar
          </button>

          <h1 className="text-2xl font-bold text-white mb-4">
            {currentVideo.title}
          </h1>

          <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-4">
            <iframe
              src={currentVideo.videoUrl}
              className="w-full h-full"
              allowFullScreen
              onLoad={(e) => {
                // Tentar detectar quando vídeo está acabando (limitado por CORS)
                const iframe = e.currentTarget;
                try {
                  // Nota: isso só funciona se o vídeo permitir acesso cross-origin
                  const video = iframe.contentWindow?.document.querySelector('video');
                  if (video) {
                    video.addEventListener('timeupdate', () => {
                      if (video.duration - video.currentTime <= 5 && video.duration - video.currentTime > 4) {
                        if (!concluded) {
                          toggleConcluded();
                        }
                      }
                    });
                  }
                } catch (e) {
                  // CORS bloqueado, normal para vídeos externos
                }
              }}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="text-yellow-400">★★★★★</div>
            <button
              onClick={toggleConcluded}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                concluded ? 'bg-green-600' : 'bg-slate-700'
              }`}
            >
              <CheckCircle2 />
              {concluded ? 'Concluída' : 'Concluir'}
            </button>
          </div>

          {'description' in currentVideo && (currentVideo as any).description ? (
            <p className="text-slate-300 mb-8">
              {(currentVideo as any).description}
            </p>
          ) : null}

          <Comments
            contentId={contentKey}
          />
        </div>
      </div>

      {/* MOBILE BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 px-4 py-3 flex justify-between">
        <button onClick={() => goTo(playlistIndex - 1)}>
          <ArrowLeft />
        </button>

        <button onClick={() => setMobileDrawer(true)}>
          <List />
        </button>

        <button
          onClick={toggleConcluded}
          className={concluded ? 'text-green-500' : ''}
        >
          <CheckCircle2 />
        </button>

        <button onClick={() => goTo(playlistIndex + 1)}>
          <ArrowRight />
        </button>
      </div>
    </>
  );
}
