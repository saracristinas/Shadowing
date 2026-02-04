import { GuideVideo } from '../types';

export const a2Videos: GuideVideo[] = [
  {
    id: '5',
    title: 'Estudando no Nível A2',
    description: 'Evoluindo do básico',
    fullDescription: 'No nível A2, você já tem uma base e está pronto para evoluir! Aprenda estratégias específicas para este nível, como aumentar seu vocabulário e ganhar mais confiança na conversação.',
    duration: '11:15',
    thumbnail: '/levels/level-a2.png',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'niveis',
    playlist: [
      {
        id: '1',
        title: 'SHADOWING A2 - VÍDEO 1',
        duration: '02:30',
        thumbnail: '/levels/level-a2.png',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        completed: false
      },
      {
        id: '2',
        title: 'SHADOWING A2 - VÍDEO 2',
        duration: '02:45',
        thumbnail: '/levels/level-a2.png',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        completed: false
      }
    ]
  },
];
