import { signUpUser, signInUser } from '@/model/user';

export async function signInUserWithSupabase(email, password) {
  return await signInUser(email, password);
}

export async function signUpUserWithSupabase(email, password, username) {
  return await signUpUser(email, password, username);
}
