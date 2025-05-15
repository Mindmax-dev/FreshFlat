'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './styles.module.css';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import freshFlatLogo from '@/utils/images/freshFlatLogo.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Pantry', path: '/' },
    { name: 'Recipes', path: '/recipe/collection' },
    { name: 'Account', path: '/account' },
    { name: 'Flat', path: '/flat' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => router.push('/')}>
        <Image
          src={freshFlatLogo}
          alt="FreshFlat Logo"
          width={75}
          height={75}
        />
      </div>
      <div className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </div>
      <nav className={`${styles.navButtons} ${isOpen ? styles.open : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`${styles.navButton} ${
              pathname === item.path ? styles.navButtonActive : ''
            }`}
            onClick={() => router.push(item.path)}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </header>
  );
}
