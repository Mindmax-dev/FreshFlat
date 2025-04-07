'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function Account() {
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
    const { error } = supabase.auth.updateUser({
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

  const handlePasswordReset = async (email) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://example.com/update-password',
    });
    if (error) {
      console.error('Error resetting password:', error);
    } else {
      console.log('Password reset email sent');
    }
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
      <button onClick={() => handlePasswordReset(username)}>Reset Password</button>
    </>
  );
}
