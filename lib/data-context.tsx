'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Content } from '@/components/content/ContentCard';
import type { Post } from '@/components/community/PostCard';

interface UserProgress {
  contentId: string;
  completed: boolean;
  completedAt?: Date;
}

interface DataContextType {
  contents: Content[];
  posts: Post[];
  userProgress: UserProgress[];
  addContent: (content: Content) => void;
  updateContent: (id: string, updates: Partial<Content>) => void;
  addPost: (post: Post) => void;
  likePost: (postId: string) => void;
  markContentComplete: (contentId: string) => void;
  incrementViews: (contentId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Dados de exemplo iniciais
const initialContents: Content[] = [
  {
    id: '1',
    title: 'Basic Greetings',
    description: 'Learn essential greetings and introductions in English',
    language: 'english',
    level: 'beginner',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '',
    duration: 180,
    views: 1234,
  },
  {
    id: '2',
    title: 'Conversaciones Cotidianas',
    description: 'Practica conversaciones del día a día en español',
    language: 'spanish',
    level: 'basic',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '',
    duration: 300,
    views: 856,
  },
  {
    id: '3',
    title: 'Expressões Idiomáticas',
    description: 'Aprenda expressões populares do português brasileiro',
    language: 'portuguese',
    level: 'intermediate',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '',
    duration: 420,
    views: 2103,
  },
  {
    id: '4',
    title: 'Business English',
    description: 'Advanced business communication and professional vocabulary',
    language: 'english',
    level: 'advanced',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '',
    duration: 600,
    views: 3421,
  },
  {
    id: '5',
    title: 'Recursos de Pronunciación',
    description: 'Mejora tu pronunciación con estos recursos útiles',
    language: 'spanish',
    level: 'intermediate',
    type: 'link',
    url: 'https://example.com',
    thumbnail: '',
    duration: 240,
    views: 567,
  },
  {
    id: '6',
    title: 'Números em Português',
    description: 'Aprenda a contar e usar números no dia a dia',
    language: 'portuguese',
    level: 'beginner',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '',
    duration: 150,
    views: 789,
  },
];

const initialPosts: Post[] = [
  {
    id: '1',
    author: { name: 'Maria Silva' },
    content: 'Comecei a praticar shadowing há 2 semanas e já noto uma grande diferença na minha pronúncia! 🎉',
    tag: 'english',
    likes: 24,
    comments: 5,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    liked: false,
  },
  {
    id: '2',
    author: { name: 'João Pedro' },
    content: 'Alguém tem dicas de séries em espanhol para praticar? Prefiro algo com legendas.',
    tag: 'spanish',
    likes: 12,
    comments: 8,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    liked: false,
  },
  {
    id: '3',
    author: { name: 'Ana Costa' },
    content: 'É normal sentir que não estou melhorando? Como vocês lidam com isso?',
    tag: 'general',
    likes: 18,
    comments: 12,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    liked: false,
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [contents, setContents] = useState<Content[]>(initialContents);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);

  const addContent = (content: Content) => {
    setContents((prev) => [content, ...prev]);
  };

  const updateContent = (id: string, updates: Partial<Content>) => {
    setContents((prev) =>
      prev.map((content) =>
        content.id === id ? { ...content, ...updates } : content
      )
    );
  };

  const addPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const likePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
              liked: !post.liked,
            }
          : post
      )
    );
  };

  const markContentComplete = (contentId: string) => {
    setUserProgress((prev) => {
      const existing = prev.find((p) => p.contentId === contentId);
      if (existing) {
        return prev.map((p) =>
          p.contentId === contentId
            ? { ...p, completed: true, completedAt: new Date() }
            : p
        );
      }
      return [
        ...prev,
        { contentId, completed: true, completedAt: new Date() },
      ];
    });
  };

  const incrementViews = (contentId: string) => {
    updateContent(contentId, {
      views: (contents.find((c) => c.id === contentId)?.views || 0) + 1,
    });
  };

  return (
    <DataContext.Provider
      value={{
        contents,
        posts,
        userProgress,
        addContent,
        updateContent,
        addPost,
        likePost,
        markContentComplete,
        incrementViews,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
