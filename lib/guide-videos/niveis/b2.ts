import { GuideVideo } from '../types';

export const b2Videos: GuideVideo[] = [
  {
    id: '7',
    title: 'Estudando no Nível B2',
    description: 'Dominando o idioma',
    fullDescription: 'No B2, você está próximo da fluência completa! Aprenda estratégias avançadas para refinar sua pronúncia, expandir vocabulário técnico e se preparar para situações profissionais.',
    duration: '13:20',
    thumbnail: '/levels/level-b2.png',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'niveis',
    playlist: [
      {
        id: '1',
        title: 'SHADOWING B2 - VÍDEO 1',
        duration: '03:30',
        thumbnail: '/levels/level-b2.png',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        completed: false
      },
      {
        id: '2',
        title: 'SHADOWING B2 - VÍDEO 2',
        duration: '03:45',
        thumbnail: '/levels/level-b2.png',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        completed: false
      }
    ]
  },
];
