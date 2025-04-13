'use client';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.css';

export default function AccountPage({ username: initialUsername }) {
  const [username, setUsername] = useState(initialUsername);
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { full_name: username },
    });
    if (error) {
      console.error('Error updating username:', error);
    }
    setEditing(false);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      router.refresh();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Account</h1>
      <div className={styles.field}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          id="username"
          type="text"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={!editing}
        />
      </div>

      <div className={styles.buttons}>
        {editing ? (
          <button className={styles.button} onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className={styles.button} onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
        <button className={styles.button} onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
