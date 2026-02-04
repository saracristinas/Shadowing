import { GuideVideo } from './types';

export const inicioVideos: GuideVideo[] = [
  {
    id: '1',
    title: 'Bem-vindo à Plataforma',
    description: 'Conheça a interface e recursos principais',
    fullDescription: 'Neste vídeo, você vai conhecer todos os recursos da plataforma de shadowing. Vamos explorar juntos a biblioteca de conteúdos, o sistema de níveis, a comunidade, e como acompanhar seu progresso. Ao final, você estará pronto para começar seus estudos!',
    duration: '5:30',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'inicio',
    isNew: true,
    materials: [
      {
        id: '1',
        title: 'Teste de nível - Inglês geral',
        subtitle: 'Leitura Complementar',
        type: 'reading',
        url: 'https://www.cambridgeenglish.org/br/test-your-english/general-english/'
      }
    ]
  },
  {
    id: '2',
    title: 'O que é Shadowing?',
    description: 'Entenda o método e como ele funciona',
    fullDescription: 'O shadowing é uma técnica poderosa de aprendizado de idiomas. Neste vídeo, você vai entender o que é o método, como praticá-lo corretamente, e por que ele é tão eficaz para melhorar sua pronúncia, fluência e compreensão auditiva.',
    duration: '8:15',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'inicio',
    isNew: true,
    materials: [
      {
        id: '2',
        title: 'MÉTODO SHADOWING.pdf',
        subtitle: 'PDF - 2.42 MB',
        type: 'pdf',
        size: '2.42 MB',
        url: '/files/MÉTODO SHADOWING.pdf'
      },
      {
        id: '3',
        title: 'MÉTODO SHADOWING - SPANISH.pdf',
        subtitle: 'PDF - 2.15 MB',
        type: 'pdf',
        size: '2.15 MB',
        url: '/files/MÉTODO SHADOWING - SPANISH.pdf'
      }
    ]
  },
];
