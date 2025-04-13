import AccountPage from '@/components/account';
import { createClient } from '@/utils/supabase/server';

export default async function Account() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  return <AccountPage username={user.data.user.user_metadata.full_name} />;
}
