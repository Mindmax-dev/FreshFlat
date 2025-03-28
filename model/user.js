import { createClient } from '@/utils/supabase/client';

export default async function signUpUser(email, password, username) {
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
  // Sign out the current user
  // This functionality is currently on the main page
}

export async function getUser() {
  // Get the current user
  // This functionality is currently used in the "useEffect" hook in the login page
}

export async function deleteUser() {
  // Delete the current user
  // This functionality is currently not used
}

export async function updateUser() {
  // Update the current user
  // This functionality is currently not used
}

export async function resetPassword() {
  // Send a password reset email
  // This functionality is currently not used
}
