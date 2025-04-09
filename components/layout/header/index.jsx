'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './styles.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <a className="title" href="/">
        FreshFlat
      </a>
      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </div>
      <nav className={`nav-buttons ${isOpen ? 'open' : ''}`}>
        <button className="nav-button">Account</button>
        <button className="nav-button">Flat</button>
      </nav>
    </header>
  );
}
