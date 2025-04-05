'use client';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Account() {
  const router = useRouter();
  const [sessionInfo, setSessionInfo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const setSessionInfoState = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      console.log(user);
      setSessionInfo(user);
    };
    setSessionInfoState();
  }, []);
  const updateUsername = async (newUsername) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({
      data: { user_metadata: { username: newUsername } },
    });
    if (error) {
      console.error('Error updating username:', error);
      setError(error.message);
    } else {
      console.log('Username updated successfully:', data);
      setSessionInfo((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          user_metadata: { ...prev.user.user_metadata, username: newUsername },
        },
      }));
    }
  };
  const handleSave = () => {
    console.log('Save button clicked with username:', username);
    const supabase = createClient();
    setEditing(false);
  };
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (sessionInfo) {
      setUsername(sessionInfo.user?.user_metadata?.username || '');
    }
  }, [sessionInfo]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  return (
    <>
      <h1>Account</h1>
      <div>
        <label htmlFor="username">Username:</label>
        {editing ? (
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        ) : (
          <span>{username}</span>
        )}
      </div>
      {editing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setEditing(true)}>Edit</button>
      )}{' '}
    </>
  );
}
