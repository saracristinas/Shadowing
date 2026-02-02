import styles from './welcome.module.css';

export default async function WelcomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{messages.welcome.title}</h1>
      </div>
    </main>
  );
}
