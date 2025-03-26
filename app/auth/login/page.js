'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const asdf = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      console.log(user);
    };
    asdf();
  }, []);

  const loginUser = async (event) => {
    event.preventDefault();
    const supabase = createClient();
    const email = event.target.elements[0].value;
    const password = event.target.elements[1].value;
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(user, session, error);
    if (error) {
      alert(error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Log in to your account</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          loginUser(event);
        }}
      >
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Log in</button>
      </form>
      <br></br>
      <Link href="/auth/signup">
        Version 1: Do not have an account yet? Sign Up!
      </Link>
      <br></br>
      <button onClick={() => router.push('/auth/signup')}>
        Version 2: Do not have an account yet? Sign Up!
      </button>
    </div>
  );
}
