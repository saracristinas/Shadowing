'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
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
  Layers,
  Settings,
  GraduationCap,
  BookMarked,
} from 'lucide-react';

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/platform' },
  { id: 'guide', label: 'Guia', icon: GraduationCap, href: '/platform/guide' },
  { id: 'library', label: 'Biblioteca', icon: BookOpen, href: '/platform/library' },
  { id: 'levels', label: 'Níveis', icon: Layers, href: '/platform/levels' },
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

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-purple-600/20 border-t-purple-600 animate-spin" />
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    router.push('/pt/login');
    return null;
  }

  const user = session.user;

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

        {/* Notes Link */}
        <div className="p-4 border-t border-white/5">
          <Link
            href="/platform/notes"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
              pathname === '/platform/notes'
                ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <BookMarked className="w-5 h-5" />
            <span className="font-medium">Anotações</span>
            {pathname === '/platform/notes' && (
              <motion.div
                layoutId="activeTab"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400"
              />
            )}
          </Link>
        </div>

        {/* Settings Link */}
        <div className="p-4 border-t border-white/5">
          <Link
            href="/platform/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
              pathname === '/platform/settings'
                ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Configurações</span>
            {pathname === '/platform/settings' && (
              <motion.div
                layoutId="activeTab"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400"
              />
            )}
          </Link>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name ?? 'User'}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/30"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-purple-500/30 flex items-center justify-center text-white font-bold">
                {user?.name?.[0]?.toUpperCase() ?? 'U'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {user?.name ?? 'Usuário'}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {user?.email ?? ''}
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/pt/login' })}
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
