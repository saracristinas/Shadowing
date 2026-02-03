'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, ThumbsUp, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  timestamp: number;
  likes: number;
  likedBy: string[];
}

interface CommentsProps {
  contentId: string;
  contentType: 'content' | 'guide';
}

export default function Comments({ contentId, contentType }: CommentsProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const storageKey = `comments_${contentType}_${contentId}`;

  useEffect(() => {
    // Carregar comentários do localStorage
    const savedComments = localStorage.getItem(storageKey);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [storageKey]);

  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const handleSubmit = () => {
    if (!newComment.trim() || !session?.user) return;

    setIsSubmitting(true);

    const comment: Comment = {
      id: Date.now().toString(),
      userId: session.user.email || 'user',
      userName: session.user.name || 'Usuário',
      userAvatar: session.user.image || undefined,
      text: newComment.trim(),
      timestamp: Date.now(),
      likes: 0,
      likedBy: [],
    };

    const updatedComments = [comment, ...comments];
    saveComments(updatedComments);
    setNewComment('');
    
    setTimeout(() => setIsSubmitting(false), 300);
  };

  const handleLike = (commentId: string) => {
    if (!session?.user?.email) return;

    const userEmail = session.user.email;

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const hasLiked = comment.likedBy.includes(userEmail);
        return {
          ...comment,
          likes: hasLiked ? comment.likes - 1 : comment.likes + 1,
          likedBy: hasLiked
            ? comment.likedBy.filter(id => id !== userEmail)
            : [...comment.likedBy, userEmail],
        };
      }
      return comment;
    });
    saveComments(updatedComments);
  };

  const handleDelete = (commentId: string) => {
    const updatedComments = comments.filter(c => c.id !== commentId);
    saveComments(updatedComments);
  };

  const canDelete = (comment: Comment) => {
    return session?.user?.email === comment.userId;
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Comentários</h3>
        </div>
        <span className="text-sm text-slate-400">{comments.length}</span>
      </div>

      {/* New Comment */}
      <div className="mb-6">
        <div className="flex gap-3">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-purple-500/30 object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
              {session?.user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          )}
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Adicione um comentário..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
            {newComment.trim() && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Enviando...' : 'Comentar'}
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        <AnimatePresence>
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                Seja o primeiro a comentar!
              </p>
            </div>
          ) : (
            comments.map((comment) => {
              const userEmail = session?.user?.email;
              const hasLiked = userEmail && comment.likedBy.includes(userEmail);
              
              return (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
                >
                  <div className="flex gap-3">
                    {comment.userAvatar ? (
                      <img
                        src={comment.userAvatar}
                        alt={comment.userName}
                        className="w-10 h-10 rounded-full border-2 border-purple-500/30 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-sm">
                        {comment.userName[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-semibold text-white">
                            {comment.userName}
                          </span>
                          <span className="text-xs text-slate-500 ml-2">
                            {formatDistanceToNow(comment.timestamp, {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        {canDelete(comment) && (
                          <button
                            onClick={() => handleDelete(comment.id)}
                            className="p-1 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
                            title="Excluir comentário"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-3">
                        {comment.text}
                      </p>
                      <button
                        onClick={() => handleLike(comment.id)}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          hasLiked
                            ? 'text-purple-400'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                        <span className="font-medium">{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
