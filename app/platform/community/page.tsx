'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import PostCard from '@/components/community/PostCard';
import { useData } from '@/lib/data-context';

type Tag = 'all' | 'general' | 'english' | 'spanish' | 'portuguese';

interface Comment {
  id: string;
  postId: string;
  author: { name: string };
  content: string;
  createdAt: Date;
}

export default function CommunityPage() {
  const { posts, addPost, likePost } = useData();
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState<Exclude<Tag, 'all'>>('general');
  const [selectedTag, setSelectedTag] = useState<Tag>('all');
  const [isPosting, setIsPosting] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const filteredPosts = selectedTag === 'all'
    ? posts
    : posts.filter((post) => post.tag === selectedTag);

  const tags: { value: Tag; label: string; emoji?: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'general', label: 'Geral', emoji: '💬' },
    { value: 'english', label: 'Inglês', emoji: '🇺🇸' },
    { value: 'spanish', label: 'Espanhol', emoji: '🇪🇸' },
    { value: 'portuguese', label: 'Português', emoji: '🇧🇷' },
  ];

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    setIsPosting(true);

    const newPost = {
      id: Date.now().toString(),
      author: { name: 'Você' },
      content: newPostContent,
      tag: newPostTag,
      likes: 0,
      comments: 0,
      createdAt: new Date(),
      liked: false,
    };

    addPost(newPost);
    setNewPostContent('');
    setNewPostTag('general');
    setIsPosting(false);
  };

  const handleOpenComments = (postId: string) => {
    setSelectedPostId(postId);
    setCommentDialogOpen(true);
    // Simular alguns comentários
    setComments([
      {
        id: '1',
        postId,
        author: { name: 'Carlos Silva' },
        content: 'Ótimo post! Muito útil.',
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
      },
      {
        id: '2',
        postId,
        author: { name: 'Ana Oliveira' },
        content: 'Concordo! Tive a mesma experiência.',
        createdAt: new Date(Date.now() - 10 * 60 * 1000),
      },
    ]);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPostId) return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId: selectedPostId,
      author: { name: 'Você' },
      content: newComment,
      createdAt: new Date(),
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          <span className="gradient-text">Comunidade</span>
        </h1>
        <p className="text-slate-400">
          Compartilhe sua experiência e aprenda com outros estudantes
        </p>
      </motion.div>

      {/* Create Post Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="glass-card rounded-2xl p-5 mb-6"
      >
        <textarea
          placeholder="Compartilhe suas ideias, dúvidas ou conquistas..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="w-full min-h-[120px] rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 p-4 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none transition-all"
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-400">Tag:</label>
            <select
              value={newPostTag}
              onChange={(e) => setNewPostTag(e.target.value as Exclude<Tag, 'all'>)}
              className="h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
            >
              <option value="general">💬 Geral</option>
              <option value="english">🇺🇸 Inglês</option>
              <option value="spanish">🇪🇸 Espanhol</option>
              <option value="portuguese">🇧🇷 Português</option>
            </select>
          </div>

          <button
            onClick={handleCreatePost}
            disabled={!newPostContent.trim() || isPosting}
            className="h-10 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            {isPosting ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </motion.div>

      {/* Filter Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-6"
      >
        {tags.map((tag) => (
          <button
            key={tag.value}
            onClick={() => setSelectedTag(tag.value)}
            className={`rounded-full px-4 py-2 transition-all border ${
              selectedTag === tag.value
                ? 'bg-purple-600/20 border-purple-500/30 text-purple-400'
                : 'border-white/10 text-slate-400 hover:bg-white/5'
            }`}
          >
            {tag.emoji && <span className="mr-2">{tag.emoji}</span>}
            {tag.label}
          </button>
        ))}
      </motion.div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              onLike={() => likePost(post.id)}
              onComment={() => handleOpenComments(post.id)}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Nenhum post nesta categoria
            </h3>
            <p className="text-slate-400">
              Seja o primeiro a compartilhar algo!
            </p>
          </motion.div>
        )}
      </div>

      {/* Comments Dialog */}
      <AnimatePresence>
        {commentDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setCommentDialogOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Comentários</h2>
                <button
                  onClick={() => setCommentDialogOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {comment.author.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white text-sm">
                          {comment.author.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          há {Math.floor((Date.now() - comment.createdAt.getTime()) / 60000)} min
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escreva um comentário..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  className="flex-1 h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="h-10 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
