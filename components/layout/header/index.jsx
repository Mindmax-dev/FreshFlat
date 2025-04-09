'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className={styles.header}>
      <a className={styles.title} href="/">
        FreshFlat
      </a>
      <div className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </div>
      <nav className={`${styles.navButtons} ${isOpen ? styles.open : ''}`}>
        <button
          className={styles.navButton}
          onClick={() => router.push('/account')}
        >
          Account
        </button>
        <button className={styles.navButton}>Flat</button>
      </nav>
    </header>
  );
}
