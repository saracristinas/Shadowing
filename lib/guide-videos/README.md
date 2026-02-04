# Guide Videos

Esta pasta contém todos os vídeos do guia organizados por categoria e nível.

## Estrutura de Arquivos

```
lib/guide-videos/
├── types.ts          # Interface GuideVideo
├── index.ts          # Exporta todos os vídeos combinados
├── inicio.ts         # Vídeos de introdução
├── recursos.ts       # Vídeos sobre recursos da plataforma
├── dicas.ts          # Vídeos com dicas de estudo
└── niveis/
    ├── a1.ts         # Vídeos do nível A1 (Iniciante)
    ├── a2.ts         # Vídeos do nível A2 (Básico)
    ├── b1.ts         # Vídeos do nível B1 (Intermediário)
    └── b2.ts         # Vídeos do nível B2 (Intermediário-Avançado)
```

## Como Usar

### Importar todos os vídeos:
```typescript
import { allVideos } from '@/lib/guide-videos';
```

### Importar vídeos específicos por categoria:
```typescript
import { a1Videos, a2Videos, b1Videos, b2Videos } from '@/lib/guide-videos';
import { inicioVideos, recursosVideos, dicasVideos } from '@/lib/guide-videos';
```

### Importar o tipo:
```typescript
import { GuideVideo } from '@/lib/guide-videos';
```

## Como Adicionar Novos Vídeos

### Para adicionar vídeos ao nível A1:
1. Abra `/lib/guide-videos/niveis/a1.ts`
2. Adicione o novo vídeo ao array `a1Videos`
3. Se for um vídeo com playlist, adicione os itens da playlist no campo `playlist`

### Para adicionar vídeos a outras categorias:
- **A2**: Edite `/lib/guide-videos/niveis/a2.ts`
- **B1**: Edite `/lib/guide-videos/niveis/b1.ts`
- **B2**: Edite `/lib/guide-videos/niveis/b2.ts`
- **Início**: Edite `/lib/guide-videos/inicio.ts`
- **Recursos**: Edite `/lib/guide-videos/recursos.ts`
- **Dicas**: Edite `/lib/guide-videos/dicas.ts`

## Exemplo de Vídeo

```typescript
{
  id: '1',
  title: 'Título do Vídeo',
  description: 'Descrição curta',
  fullDescription: 'Descrição completa que aparece na página do vídeo',
  duration: '02:30',
  thumbnail: '/path/to/image.png',
  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
  category: 'niveis', // 'inicio' | 'niveis' | 'recursos' | 'dicas'
  isNew: true, // opcional
  watched: false, // opcional
  playlist: [ // opcional - para vídeos com múltiplos episódios
    {
      id: '1',
      title: 'Episódio 1',
      duration: '02:30',
      thumbnail: '/path/to/image.png',
      videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
      completed: false
    }
  ],
  materials: [ // opcional - materiais complementares
    {
      id: '1',
      title: 'Material PDF',
      subtitle: 'PDF - 2.42 MB',
      type: 'pdf', // 'pdf' | 'reading' | 'link'
      size: '2.42 MB',
      url: '/files/material.pdf'
    }
  ]
}
```

## Benefícios desta Organização

✅ **Código limpo**: O arquivo `page.tsx` fica muito mais limpo e focado na lógica
✅ **Fácil manutenção**: Encontrar e editar vídeos específicos é muito mais simples
✅ **Escalabilidade**: Adicionar novos níveis (C1, C2) é trivial
✅ **Organização**: Cada nível tem seu próprio arquivo
✅ **Type-safe**: TypeScript garante que todos os vídeos seguem a interface correta
