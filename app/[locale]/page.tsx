import Link from 'next/link';
import { Sparkles, LogIn, UserPlus } from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-12">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <span className="text-4xl font-bold gradient-text">Shadowing</span>
        </Link>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {messages.home.title}
          </h1>
          <h2 className="text-2xl text-purple-300 mb-4">
            {messages.home.subtitle}
          </h2>
          <p className="text-lg text-slate-300 mb-12 max-w-xl mx-auto">
            {messages.home.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/login`}>
              <button className="w-full sm:w-auto h-14 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium text-lg flex items-center justify-center gap-2 transition-all">
                <LogIn className="w-5 h-5" />
                {messages.home.cta}
              </button>
            </Link>
            
            <Link href={`/${locale}/signup`}>
              <button className="w-full sm:w-auto h-14 px-8 rounded-xl border-2 border-white/20 hover:bg-white/5 text-white font-medium text-lg flex items-center justify-center gap-2 transition-all">
                <UserPlus className="w-5 h-5" />
                Criar Conta
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
