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
  { id: 'guide', label: 'Guia de Estudos', icon: GraduationCap, href: '/platform/guide' },
  { id: 'notes', label: 'Anotações', icon: BookMarked, href: '/platform/notes' },
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-purple-600/20 border-t-purple-600 animate-spin" />
      </div>
    );
  }

  if (!session) {
    router.push('/pt/login');
    return null;
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header Desktop & Mobile */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left: Menu Hamburger + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 rounded-lg hover:bg-slate-800 flex items-center justify-center transition-colors"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            
            <Link href="/platform" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">
                Método Shadowing
              </span>
            </Link>
          </div>

          {/* Right: User Profile */}
          <div className="flex items-center gap-3">
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
          </div>
        </div>
      </header>

      {/* Sidebar - Opens from left */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-72 bg-slate-900 border-r border-slate-800 z-50 flex flex-col"
            >
              {/* Logo Section */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <Link href="/platform" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold gradient-text">
                    Shadowing
                  </span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                      )}
                    </Link>
                  );
                })}

                {/* Notes Link */}
                <Link
                  href="/platform/notes"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
                    pathname === '/platform/notes'
                      ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <BookMarked className="w-5 h-5" />
                  <span className="font-medium">Anotações</span>
                  {pathname === '/platform/notes' && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                  )}
                </Link>

                {/* Settings Link */}
                <Link
                  href="/platform/settings"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
                    pathname === '/platform/settings'
                      ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Configurações</span>
                  {pathname === '/platform/settings' && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                  )}
                </Link>
              </nav>

              {/* User Section */}
              <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800">
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
}
