'use client';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [signInWasSuccessful, setSignInWasSuccessful] = useState(false);

  const signUp = async (event) => {
    event.preventDefault();
    const supabase = createClient();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const username = event.target.username.value;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: username,
        },
      },
    });

    if (error) {
      console.error('Error signing up:', error.message);
      setSignInWasSuccessful(false);
    } else {
      console.log('Sign up successful:', data);
      setSignInWasSuccessful(true);
    }
  };

  return (
    <div>
      <h1>Sign Up!</h1>
      <p>Create your account</p>
      {signInWasSuccessful ? (
        <div>
          <h1>Sign Up Successful!</h1>
          <p>Thank you for signing up!</p>
        </div>
      ) : (
        <div>
          <form onSubmit={signUp}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button type="submit">Sign Up</button>
          </form>

          <br />
          <Link href="/auth/login">Already have an account? Log In!</Link>
        </div>
      )}
    </div>
  );
}
