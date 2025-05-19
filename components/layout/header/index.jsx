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
    { name: 'Pantry', path: '/', initialRoute: '/' },
    { name: 'Recipes', path: '/recipe', initialRoute: '/recipe/collection' },
    { name: 'Account', path: '/account', initialRoute: '/account' },
    { name: 'Flat', path: '/flat', initialRoute: '/flat' },
  ];

  // Helper to get the first segment after "/"
  const getFirstSegment = (path) => {
    if (path === '/') return '/';
    const segments = path.split('/').filter(Boolean);
    return segments.length > 0 ? `/${segments[0]}` : '/';
  };

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
        {navItems.map((item) => {
          const isRoot = item.path === '/';
          const active = isRoot
            ? pathname === '/'
            : getFirstSegment(pathname) === item.path;
          return (
            <button
              key={item.path}
              className={`${styles.navButton} ${
                active ? styles.navButtonActive : ''
              }`}
              onClick={() => router.push(item.initialRoute)}
            >
              {item.name}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
