import styles from './home.module.css';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>{messages.home.title}</h1>
        <h2 className={styles.subtitle}>{messages.home.subtitle}</h2>
        <p className={styles.description}>{messages.home.description}</p>
        <button className={styles.cta}>{messages.home.cta}</button>
      </section>
    </main>
  );
}
