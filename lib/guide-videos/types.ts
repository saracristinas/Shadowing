export interface GuideVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  category: 'inicio' | 'niveis' | 'recursos' | 'dicas';
  isNew?: boolean;
  watched?: boolean;
  fullDescription?: string;
  materials?: Array<{
    id: string;
    title: string;
    subtitle: string;
    type: 'reading' | 'pdf' | 'link';
    size?: string;
    url: string;
  }>;
  playlist?: Array<{
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    videoUrl: string;
    completed?: boolean;
  }>;
}
