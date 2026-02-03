import styles from './welcome.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default async function WelcomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const levels = [
    {
      id: 'a1',
      name: 'LEVEL A1',
      title: messages.welcome.levels.a1.title,
      description: messages.welcome.levels.a1.description,
      color: '#e74c3c',
      image: '/levels/a1.png', // Coloque a imagem em public/levels/a1.png
    },
    {
      id: 'a2',
      name: 'LEVEL A2',
      title: messages.welcome.levels.a2.title,
      description: messages.welcome.levels.a2.description,
      color: '#e74c3c',
      image: '/levels/a2.png',
    },
    {
      id: 'b1',
      name: 'LEVEL B1',
      title: messages.welcome.levels.b1.title,
      description: messages.welcome.levels.b1.description,
      color: '#e74c3c',
      image: '/levels/b1.png',
    },
    {
      id: 'b2',
      name: 'LEVEL B2',
      title: messages.welcome.levels.b2.title,
      description: messages.welcome.levels.b2.description,
      color: '#e74c3c',
      image: '/levels/b2.png',
    },
  ];

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{messages.welcome.title}</h1>
        <p className={styles.subtitle}>{messages.welcome.subtitle}</p>
        
        <div className={styles.levelsGrid}>
          {levels.map((level) => (
            <Link
              key={level.id}
              href={`/${locale}/videos/${level.id}`}
              className={styles.levelCard}
            >
              <div className={styles.cardHeader}>
                <Image
                  src={level.image}
                  alt={level.name}
                  width={300}
                  height={300}
                  className={styles.levelImage}
                  priority
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.levelTitle}>{level.title}</h3>
                <p className={styles.levelDescription}>{level.description}</p>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.viewVideos}>{messages.welcome.viewVideos} →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
