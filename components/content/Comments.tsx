'use client';

import { useEffect, useState } from 'react';

type Comment = {
  id: string;
  text: string;
  createdAt: string;
};

type CommentsProps = {
  contentId: string; // ID ÚNICO DO VÍDEO
};

export default function Comments({ contentId }: CommentsProps) {
  const storageKey = `comments:${contentId}`;

  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  /* ===================== LOAD COMMENTS ===================== */
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, [storageKey]);

  /* ===================== SAVE COMMENTS ===================== */
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, storageKey]);

  function handlePublish() {
    if (!text.trim()) return;

    setComments(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: text.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);

    setText('');
    setIsTyping(false);
  }

  function handleCancel() {
    setText('');
    setIsTyping(false);
  }

  return (
    <section className="mt-10 mb-10 box-border">
      {/* HEADER */}
      <div className="mb-4 text-slate-400">
        <strong className="text-white">Comentários</strong> {comments.length}
      </div>

      {/* INPUT */}
      <div className="flex mb-4">
        {/* AVATAR */}
        <div className="flex-shrink-0 mr-4">
          <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold">
            SS
          </div>
        </div>

        {/* TEXTAREA */}
        <div className="w-full">
          <textarea
            value={text}
            onFocus={() => setIsTyping(true)}
            onChange={e => setText(e.target.value)}
            placeholder="Comente algo sobre a aula."
            rows={isTyping ? 4 : 3}
            className="
              w-full border border-slate-700 rounded-lg
              bg-transparent text-white p-3
              placeholder:text-slate-400
              resize-none outline-none
              transition-all
            "
          />

          {/* ACTIONS (SÓ APARECEM AO DIGITAR) */}
          {isTyping && (
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={handleCancel}
                type="button"
                className="px-4 py-1.5 text-sm text-slate-300 hover:text-white"
              >
                Cancelar
              </button>

              <button
                onClick={handlePublish}
                type="button"
                className="
                  px-4 py-1.5 rounded-md text-sm font-medium
                  bg-slate-200 text-black hover:bg-white
                "
              >
                Publicar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* EMPTY STATE */}
      {comments.length === 0 && !isTyping && (
        <div className="w-full text-center text-slate-400 mt-10">
          <div className="mx-auto w-40 h-40 rounded-full bg-slate-800 flex items-center justify-center text-4xl">
            💬
          </div>

          <h2 className="mt-4 text-lg font-bold text-white">
            Ainda sem comentários por aqui
          </h2>

          <p className="mt-1 text-sm">
            Seja a primeira pessoa a comentar algo e inicie um tópico para trocar ideias sobre a aula.
          </p>
        </div>
      )}

      {/* COMMENTS LIST */}
      {comments.length > 0 && (
        <div className="space-y-4 mt-6">
          {comments.map(comment => (
            <div
              key={comment.id}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white text-sm font-semibold">
                SS
              </div>

              <div className="bg-slate-800 rounded-lg p-4 text-white w-full">
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
