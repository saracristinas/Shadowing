import { GuideVideo } from './types';

export const inicioVideos: GuideVideo[] = [
  {
    id: '1',
    title: 'Bem-vindo à Plataforma',
    description: 'Conheça a interface e recursos principais',
    fullDescription: 'Bem-vindo à nossa plataforma de aprendizado de idiomas! Aqui você terá acesso a uma metodologia comprovada que vai acelerar seu processo de aprendizado. Nossa plataforma oferece conteúdos organizados por níveis (A1, A2, B1, B2), sistema de acompanhamento de progresso, comunidade de estudantes, e materiais complementares. Explore todos os recursos disponíveis e comece sua jornada rumo à fluência!',
    duration: '5:30',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'inicio',
    isNew: true,
    playlist: [
      {
        id: '1-video',
        title: 'Vídeo de Boas-vindas',
        type: 'video',
        duration: '5:30',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        completed: false
      },
      {
        id: '1-link',
        title: 'Teste de nível - Inglês geral',
        subtitle: 'Avaliação Online • Cambridge English',
        type: 'link',
        url: 'https://www.cambridgeenglish.org/br/test-your-english/general-english/'
      }
    ]
  },
  {
    id: '2',
    title: 'O que é Shadowing?',
    description: 'Entenda o método e como ele funciona',
    fullDescription: 'O Shadowing é uma técnica de aprendizado de idiomas que consiste em repetir em voz alta, simultaneamente, o que você está ouvindo. Este método trabalha simultaneamente a compreensão auditiva, pronúncia, entonação e ritmo natural do idioma. É utilizado por poliglota e profissionais de idiomas ao redor do mundo. Nesta seção, você encontrará detalhes completos sobre como aplicar o método corretamente, dicas práticas, e orientações passo a passo para maximizar seus resultados.',
    duration: '8:15',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'inicio',
    isNew: true,
    playlist: [
      {
        id: '2-video',
        title: 'Vídeo Explicativo',
        type: 'video',
        duration: '8:15',
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        completed: false
      },
      {
        id: '2-pdf-pt',
        title: 'MÉTODO SHADOWING (Português)',
        subtitle: 'Detalhes da Metodologia • PDF • 2.42 MB',
        type: 'pdf',
        url: '/files/metodo-shadowing.pdf'
      },
      {
        id: '2-pdf-es',
        title: 'MÉTODO SHADOWING (Espanhol)',
        subtitle: 'Detalles del Método • PDF • 2.15 MB',
        type: 'pdf',
        url: '/files/metodo-shadowing-spanish.pdf'
      }
    ]
  },
];
