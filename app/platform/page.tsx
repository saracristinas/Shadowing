'use client';

import { motion } from 'framer-motion';
import { Sparkles, Headphones, BarChart3, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import LanguageCard from '@/components/ui/LanguageCard';
import ContentCard from '@/components/content/ContentCard';
import { useData } from '@/lib/data-context';
import { useRouter } from 'next/navigation';

const features = [
  {
    icon: Headphones,
    title: 'Escuta Ativa',
    description: 'Melhore sua compreensão auditiva',
  },
  {
    icon: BarChart3,
    title: 'Níveis Detalhados',
    description: 'Do iniciante ao avançado',
  },
  {
    icon: Users,
    title: 'Comunidade',
    description: 'Aprenda com outros estudantes',
  },
  {
    icon: TrendingUp,
    title: 'Acompanhe Progresso',
    description: 'Veja sua evolução',
  },
];

export default function HomePage() {
  const { contents } = useData();
  const router = useRouter();

  const recentContents = contents.slice(0, 6);

  const languageStats = {
    english: contents.filter((c) => c.language === 'english').length,
    spanish: contents.filter((c) => c.language === 'spanish').length,
    portuguese: contents.filter((c) => c.language === 'portuguese').length,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Aprenda idiomas de forma natural</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Domine idiomas com{' '}
              <span className="gradient-text">Shadowing</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              A técnica mais eficaz para melhorar pronúncia, fluência e compreensão. 
              Aprenda repetindo nativos em tempo real.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/platform/library">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-14 px-8 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium flex items-center gap-2 transition-all"
                >
                  Começar Agora
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link href="/platform/community">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-14 px-8 text-lg rounded-xl border border-white/10 text-white hover:bg-white/5 font-medium transition-all"
                >
                  Ver Comunidade
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-5 hover-glow transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Language Selection */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Escolha seu idioma
          </h2>
          <p className="text-slate-400 text-lg mb-12">
            Comece sua jornada de aprendizado
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LanguageCard
              language="Inglês"
              contentCount={languageStats.english}
              emoji="🇺🇸"
              onClick={() => router.push('/platform/library?language=english')}
            />
            <LanguageCard
              language="Espanhol"
              contentCount={languageStats.spanish}
              emoji="🇪🇸"
              onClick={() => router.push('/platform/library?language=spanish')}
            />
            <LanguageCard
              language="Português"
              contentCount={languageStats.portuguese}
              emoji="🇧🇷"
              onClick={() => router.push('/platform/library?language=portuguese')}
            />
          </div>
        </motion.div>
      </section>

      {/* Recent Content */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Conteúdos <span className="gradient-text">Recentes</span>
              </h2>
              <p className="text-slate-400">
                Últimas adições à plataforma
              </p>
            </div>
            <Link href="/platform/library">
              <button className="text-purple-400 hover:text-purple-300 flex items-center gap-2 transition-colors">
                Ver Todos
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentContents.map((content, index) => (
              <ContentCard
                key={content.id}
                content={content}
                index={index}
                onClick={() => router.push(`/platform/content/${content.id}`)}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card rounded-2xl p-8 md:p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para começar?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de estudantes que já melhoraram sua fluência com shadowing
            </p>
            <Link href="/platform/library">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-14 px-8 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium flex items-center gap-2 mx-auto transition-all"
              >
                Explorar Conteúdos
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
