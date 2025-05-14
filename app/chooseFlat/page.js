'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';

export default function ChooseFlatPage() {
  const router = useRouter();
  const [flatName, setFlatName] = useState('');
  const [flatCode, setFlatCode] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateFlat = async () => {
    setMessage('');
    try {
      const res = await fetch('/api/flat/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: flatName }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`Flat created successfully! Invite Token: ${data.flat.inviteToken}`);
        router.push('/'); // Redirect to home or another page
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleJoinFlat = async () => {
    setMessage('');
    try {
      const res = await fetch('/api/flat/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteToken: flatCode }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Successfully joined the flat!');
        router.push('/'); // Redirect to home or another page
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>CREATE FLAT</h2>
        {message && <p>{message}</p>}
        <input
          className={styles.input}
          type="text"
          placeholder="Enter flat name"
          value={flatName}
          onChange={(e) => setFlatName(e.target.value)}
        />
        <button className={styles.button} onClick={handleCreateFlat}>
          Create Flat
        </button>
      </div>
      <div className={styles.box}>
        <h2>JOIN FLAT</h2>
        {message && <p>{message}</p>}
        <input
          className={styles.input}
          type="text"
          placeholder="Enter flat code"
          value={flatCode}
          onChange={(e) => setFlatCode(e.target.value)}
        />
        <button className={styles.button} onClick={handleJoinFlat}>
          Join Flat
        </button>
      </div>
    </div>
  );
}
