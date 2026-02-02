'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  photoUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, photoUrl?: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar se há usuário logado ao carregar
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = (name: string, email: string, password: string, photoUrl?: string): boolean => {
    // Buscar usuários existentes
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    // Verificar se email já existe
    const emailExists = users.some((u: any) => u.email === email);
    if (emailExists) {
      return false;
    }

    // Criar novo usuário
    const newUser = { name, email, password, photoUrl };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Fazer login automaticamente
    const userData = { name, email, photoUrl };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));

    return true;
  };

  const login = (email: string, password: string): boolean => {
    // Buscar usuários
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    // Verificar credenciais
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      const userData = { name: user.name, email: user.email, photoUrl: user.photoUrl };
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
