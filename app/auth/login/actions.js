'use server';
import { signInUserWithSupabase } from '@/controller/user';
import { redirect } from 'next/navigation';

export const handleLogin = async (formData) => {
  const signInIsSuccessful = await signInUserWithSupabase(
    formData.get('email'),
    formData.get('password')
  );

  if (signInIsSuccessful) {
    redirect('/');
  }
};
