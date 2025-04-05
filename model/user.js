import { createClient } from '@/utils/supabase/client';

export async function signUpUser(email, password, username) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: username,
      },
    },
  });

  return { data, error };
}

export async function signInUser(email, password) {
  const supabase = createClient();

  const { user, session, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user, session, error };
}

export async function signOutUser() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    return null;
  }
  return true;
}

export async function getUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  return data.user;
}

export async function deleteUser() {
  // Needs to be handled by admin client
  const supabase = createClient();
  const { user } = await supabase.auth.getUser();
  if (!user) {
    console.error('No user found to delete');
    return null;
  }
  const { data, error } = await supabase.auth.admin.deleteUser();

  if (error) {
    console.error('Error deleting user:', error);
    return null;
  }
  return data;
}

export async function updateUser() {
  const supabase = createClient();
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

export async function resetPassword(email) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.error('Error sending password reset email:', error);
    return null;
  }
  return data;
}
