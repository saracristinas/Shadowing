'use client';

import { useEffect } from 'react';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  email?: string;
  subMessage?: string;
  onClose: () => void;
}

export default function Toast({ message, email, subMessage, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.toastContainer}>
      <div className={styles.toast}>
        <div className={styles.icon}>✉️</div>
        <div className={styles.content}>
          <p className={styles.message}>
            {message} {email && <strong>{email}</strong>}
          </p>
          {subMessage && <p className={styles.subMessage}>{subMessage}</p>}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
