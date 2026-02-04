import { GuideVideo } from './types';
import { inicioVideos } from './inicio';
import { recursosVideos } from './recursos';
import { dicasVideos } from './dicas';
import { a1Videos } from './niveis/a1';
import { a2Videos } from './niveis/a2';
import { b1Videos } from './niveis/b1';
import { b2Videos } from './niveis/b2';

// Exporta todos os vídeos combinados
export const allVideos: GuideVideo[] = [
  ...inicioVideos,
  ...recursosVideos,
  ...dicasVideos,
  ...a1Videos,
  ...a2Videos,
  ...b1Videos,
  ...b2Videos,
];

// Exporta por categoria para facilitar uso específico
export {
  inicioVideos,
  recursosVideos,
  dicasVideos,
  a1Videos,
  a2Videos,
  b1Videos,
  b2Videos,
};

// Exporta o tipo
export type { GuideVideo } from './types';
