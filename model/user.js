import { createClient } from "@/utils/supabase/client";

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
