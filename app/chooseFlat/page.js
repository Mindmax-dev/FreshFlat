'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';

export default function ChooseFlatPage() {
  const router = useRouter();
  const [flatName, setFlatName] = useState('');
  const [flatCode, setFlatCode] = useState('');

  const handleCreateFlat = async () => {
    await fetch('/api/flat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ flatName }),
    }).then(() => {
      router.push('/');
    });
  };

  const handleJoinFlat = async () => {
    const res = await fetch('/api/flat', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ flatCode }),
    });
    if (res.ok) router.push('/');
    // TODO: Handle errors
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div>CREATE FLAT</div>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter flat name"
          value={flatName}
          onChange={(e) => setFlatName(e.target.value)}
        />
        <button className={styles.button} onClick={handleCreateFlat}>
          Done
        </button>
      </div>
      <div className={styles.box}>
        <div>JOIN FLAT</div>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter flat code"
          value={flatCode}
          onChange={(e) => setFlatCode(e.target.value)}
        />
        <button className={styles.button} onClick={handleJoinFlat}>
          Done
        </button>
      </div>
    </div>
  );
}
