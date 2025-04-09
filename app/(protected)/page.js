'use client';
import { createClient } from '@supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [sessionInfo, setSessionInfo] = useState(null);

  useEffect(() => {
    const setSessionInfoState = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      console.log(user);
      setSessionInfo(user);
    };
    setSessionInfoState();
  }, []);

  return (
    <div>
      {sessionInfo?.data?.user ? (
        <div>
          <h1>Welcome {sessionInfo.email}</h1>
          <p>You are logged in</p>
          <button
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              router.push('/auth/login');
            }}
          >
            Sign out
          </button>
          <pre>{JSON.stringify(sessionInfo, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <h1>Home</h1>
          <p>You are not logged in</p>
          <button onClick={() => router.push('/auth/login')}>Log in</button>
        </div>
      )}
    </div>
  );
}
