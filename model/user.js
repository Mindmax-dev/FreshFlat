'use server';

import { createClient } from '@/utils/supabase/server';

export async function signInUser(email, password) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in:', error);
    return false;
  }
  return true;
}

export async function signUpUser(email, password, username) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: username,
      },
    },
  });

  if (error) {
    return error;
  }
  return true;
}

export async function signOutUser() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing up:', error);
    return false;
  }
  return true;
}

export async function updateUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({
    data: {
      full_name: 'New Name',
    },
  });
  if (error) {
    console.error('Error updating user:', error);
    return null;
  }
  return data.user;
}

// export async function getUser() {
//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.getUser();
//   if (error) {
//     console.error('Error fetching user:', error);
//     return null;
//   }
//   return data.user;
// }

// export async function deleteUser() {
//   // Needs to be handled by admin client
//   const supabase = await createClient();
//   const { user } = await supabase.auth.getUser();
//   if (!user) {
//     console.error('No user found to delete');
//     return null;
//   }
//   const { data, error } = await supabase.auth.admin.deleteUser();

//   if (error) {
//     console.error('Error deleting user:', error);
//     return null;
//   }
//   return data;
// }

// export async function resetPassword(email) {
//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.resetPasswordForEmail(email);

//   if (error) {
//     console.error('Error sending password reset email:', error);
//     return null;
//   }
//   return data;
// }