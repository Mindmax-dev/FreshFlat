'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './styles.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import freshFlatLogo from '@/utils/images/freshFlatLogo.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => router.push('/')}>
        <Image
          src={freshFlatLogo}
          alt="Description of image"
          width={75}
          height={75}
        />
      </div>
      <div className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </div>
      <nav className={`${styles.navButtons} ${isOpen ? styles.open : ''}`}>
        <button className={styles.navButton} onClick={() => router.push('/')}>
          Pantry
        </button>
        <button
          className={styles.navButton}
          onClick={() => router.push('/recipe/collection')}
        >
          Recipes
        </button>
        <button
          className={styles.navButton}
          onClick={() => router.push('/account')}
        >
          Account
        </button>
        <button
          className={styles.navButton}
          onClick={() => router.push('/flat')}
        >
          Flat
        </button>
      </nav>
    </header>
  );
}
