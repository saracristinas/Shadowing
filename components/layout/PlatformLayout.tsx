'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BookOpen,
  Users,
  BarChart3,
  Sparkles,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/platform' },
  { id: 'library', label: 'Biblioteca', icon: BookOpen, href: '/platform/library' },
  { id: 'community', label: 'Comunidade', icon: Users, href: '/platform/community' },
  { id: 'progress', label: 'Progresso', icon: BarChart3, href: '/platform/progress' },
];

interface PlatformLayoutProps {
  children: React.ReactNode;
}

export default function PlatformLayout({ children }: PlatformLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Verificar sessão do NextAuth primeiro
    if (status === 'authenticated' && session?.user) {
      setUser({
        name: session.user.name || 'Usuário',
        email: session.user.email || '',
      });
      // Salvar no localStorage também para compatibilidade
      localStorage.setItem('currentUser', JSON.stringify({
        id: session.user.email,
        name: session.user.name,
        email: session.user.email,
      }));
      return;
    }

    // Se não tiver sessão NextAuth, verificar localStorage (login manual)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (status === 'unauthenticated') {
      // Só redireciona se tiver certeza que não está autenticado
      router.push('/pt/login');
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    localStorage.removeItem('currentUser');
    
    // Se estiver logado com NextAuth, fazer signOut
    if (session) {
      const { signOut } = await import('next-auth/react');
      await signOut({ callbackUrl: '/pt/login' });
    } else {
      router.push('/pt/login');
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (status === 'loading' || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-purple-600/20 border-t-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 glass-card flex-col z-40">
        {/* Logo Section */}
        <div className="p-6 border-b border-white/5">
          <Link href="/platform" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">
              Shadowing
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-purple-500/30 flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{user.name}</div>
              <div className="text-xs text-slate-500 truncate">{user.email}</div>
            </div>
            <button
              onClick={handleLogout}
              className="w-8 h-8 rounded-lg hover:bg-red-500/20 flex items-center justify-center transition-colors group"
              title="Sair"
            >
              <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
            </button>
          </div>
        </div>
      </aside>

      {/* Header Mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
        <div className="flex items-center justify-between p-4">
          <Link href="/platform" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">Shadowing</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/5 overflow-hidden"
            >
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white'
                          : 'text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Bottom Navigation Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/5">
        <div className="flex items-center justify-around h-20 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-purple-400' : 'text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0 pb-24 lg:pb-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
