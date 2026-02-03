'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/');
  };

  return (
    <div className={styles.userMenu} ref={dropdownRef}>
      <button 
        className={styles.userButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        <img 
          src={user.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2563eb&color=fff`}
          alt={user.name}
          className={styles.userPhoto}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.userInfo}>
            <img 
              src={user.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2563eb&color=fff`}
              alt={user.name}
              className={styles.dropdownPhoto}
            />
            <span className={styles.userName}>{user.name}</span>
          </div>
          
          <div className={styles.divider}></div>
          
          <button 
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            <svg 
              className={styles.logoutIcon}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
