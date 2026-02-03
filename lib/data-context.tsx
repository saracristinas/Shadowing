'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Content } from '@/components/content/ContentCard';
import type { Post } from '@/components/community/PostCard';

interface UserProgress {
  contentId: string;
  completed: boolean;
  completedAt?: Date;
}

interface UserStats {
  user_email: string;
  total_xp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  total_study_time: number;
  favorite_language: string;
}

interface Achievement {
  user_email: string;
  achievement_type: string;
  unlocked_at: string;
}

interface DataContextType {
  contents: Content[];
  posts: Post[];
  userProgress: UserProgress[];
  userStats: UserStats;
  achievements: Achievement[];
  addContent: (content: Content) => void;
  updateContent: (id: string, updates: Partial<Content>) => void;
  addPost: (post: Post) => void;
  likePost: (postId: string) => void;
  markContentComplete: (contentId: string) => void;
  incrementViews: (contentId: string) => void;
  addXP: (amount: number) => void;
  updateStreak: () => void;
  unlockAchievement: (type: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

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
  const [userStats, setUserStats] = useState<UserStats>({
    user_email: '',
    total_xp: 0,
    level: 1,
    current_streak: 0,
    longest_streak: 0,
    last_activity_date: '',
    total_study_time: 0,
    favorite_language: 'english',
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    const savedStats = localStorage.getItem('userStats');
    const savedAchievements = localStorage.getItem('achievements');
    
    if (savedProgress) setUserProgress(JSON.parse(savedProgress));
    if (savedStats) setUserStats(JSON.parse(savedStats));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
  }, []);

  // Salvar userProgress
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Salvar userStats
  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  // Salvar achievements
  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

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

  const addXP = (amount: number) => {
    setUserStats((prev) => {
      const newTotalXP = prev.total_xp + amount;
      const newLevel = Math.floor(newTotalXP / 100) + 1;
      
      return {
        ...prev,
        total_xp: newTotalXP,
        level: Math.max(prev.level, newLevel),
      };
    });
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastActivity = userStats.last_activity_date;
    
    setUserStats((prev) => {
      if (!lastActivity) {
        // Primeira atividade
        return {
          ...prev,
          current_streak: 1,
          longest_streak: 1,
          last_activity_date: today,
        };
      }

      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      if (lastActivity === today) {
        // Já estudou hoje
        return prev;
      } else if (lastActivity === yesterday) {
        // Continuou a sequência
        const newStreak = prev.current_streak + 1;
        return {
          ...prev,
          current_streak: newStreak,
          longest_streak: Math.max(prev.longest_streak, newStreak),
          last_activity_date: today,
        };
      } else {
        // Quebrou a sequência
        return {
          ...prev,
          current_streak: 1,
          last_activity_date: today,
        };
      }
    });
  };

  const unlockAchievement = (type: string) => {
    const exists = achievements.some((a) => a.achievement_type === type);
    if (!exists) {
      setAchievements((prev) => [
        ...prev,
        {
          user_email: userStats.user_email,
          achievement_type: type,
          unlocked_at: new Date().toISOString(),
        },
      ]);
    }
  };

  const checkAchievements = () => {
    const completedCount = userProgress.filter((p) => p.completed).length;

    // First content
    if (completedCount >= 1) unlockAchievement('first_content');
    // Complete 10
    if (completedCount >= 10) unlockAchievement('complete_10');
    // Complete 50
    if (completedCount >= 50) unlockAchievement('complete_50');
    // Complete 100
    if (completedCount >= 100) unlockAchievement('complete_100');

    // Streak achievements
    if (userStats.current_streak >= 7) unlockAchievement('streak_7');
    if (userStats.current_streak >= 30) unlockAchievement('streak_30');

    // Level achievements
    const beginnerCompleted = contents.filter((c) => c.level === 'beginner')
      .every((c) => userProgress.some((p) => p.contentId === c.id && p.completed));
    if (beginnerCompleted) unlockAchievement('beginner_complete');

    const intermediateCompleted = contents.filter((c) => c.level === 'intermediate')
      .every((c) => userProgress.some((p) => p.contentId === c.id && p.completed));
    if (intermediateCompleted) unlockAchievement('intermediate_complete');

    const advancedCompleted = contents.filter((c) => c.level === 'advanced')
      .every((c) => userProgress.some((p) => p.contentId === c.id && p.completed));
    if (advancedCompleted) unlockAchievement('advanced_complete');
  };

  const markContentComplete = (contentId: string) => {
    const content = contents.find((c) => c.id === contentId);
    
    setUserProgress((prev) => {
      const existing = prev.find((p) => p.contentId === contentId);
      if (existing && existing.completed) {
        return prev; // Já completado
      }

      // Adicionar XP baseado no nível
      if (content) {
        const xpAmount = content.level === 'beginner' ? 10 :
                        content.level === 'basic' ? 15 :
                        content.level === 'intermediate' ? 20 : 30;
        addXP(xpAmount);
      }

      updateStreak();

      const newProgress = existing
        ? prev.map((p) =>
            p.contentId === contentId
              ? { ...p, completed: true, completedAt: new Date() }
              : p
          )
        : [...prev, { contentId, completed: true, completedAt: new Date() }];

      return newProgress;
    });

    // Verificar conquistas após delay para garantir que o estado foi atualizado
    setTimeout(checkAchievements, 100);
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
        userStats,
        achievements,
        addContent,
        updateContent,
        addPost,
        likePost,
        markContentComplete,
        incrementViews,
        addXP,
        updateStreak,
        unlockAchievement,
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
