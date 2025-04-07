'use server';
import { signUpUserWithSupabase } from '@/controller/user';
import { redirect } from 'next/navigation';

export const handleSignUp = async (formData) => {
  const signUpIsSuccessfull = await signUpUserWithSupabase(
    formData.get('email'),
    formData.get('password'),
    formData.get('username')
  );

  if (signUpIsSuccessfull) {
    redirect('/auth/login');
  }
};
