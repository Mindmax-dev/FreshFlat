'use client';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Account() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const setSessionInfoState = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      console.log(user);
      setUsername(user.data.user.user_metadata.full_name);
    };
    setSessionInfoState();
  }, []);

  const handleSave = () => {
    const supabase = createClient();
    const { data, error } = supabase.auth.updateUser({
      data: { user_metadata: { full_name: username } },
    });
    if (error) {
      console.error('Error updating username:', error);
    } else {
      console.log('Username updated successfully:');
    }
    setEditing(false);
  };

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
      )}
    </>
  );
}
