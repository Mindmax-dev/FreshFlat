'use client';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Account() {
  const router = useRouter();
  const [sessionInfo, setSessionInfo] = useState(null);
  const [counter, setCounter] = useState(0);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const setSessionInfoState = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      console.log(user);
      setSessionInfo(user);
    };
    setSessionInfoState();
  }, []);
  const handleSave = () => {
    console.log('Save button clicked');
    setEditing(false);
  };

  return (

    <>
      <h1>Account</h1>
      <div></div>
      {editing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setEditing(true)}>Edit</button>
      )}{' '}
    </>
  );
}
