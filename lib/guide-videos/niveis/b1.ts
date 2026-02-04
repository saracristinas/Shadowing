import { GuideVideo } from '../types';

export const b1Videos: GuideVideo[] = [
  {
    id: '6',
    title: 'Estudando no Nível B1',
    description: 'Alcançando a independência',
    fullDescription: 'O nível B1 é onde você começa a ter independência no idioma. Descubra técnicas avançadas de shadowing e como trabalhar com conteúdos mais complexos para alcançar fluência.',
    duration: '12:10',
    thumbnail: '/levels/level-b1.png',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'niveis',
    playlist: [
      {
        id: '1',
        title: 'SHADOWING B1 - VÍDEO 1',
        duration: '03:00',
        thumbnail: '/levels/level-b1.png',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        completed: false
      },
      {
        id: '2',
        title: 'SHADOWING B1 - VÍDEO 2',
        duration: '03:15',
        thumbnail: '/levels/level-b1.png',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        completed: false
      }
    ]
  },
];
