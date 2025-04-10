export const dynamic = 'force-dynamic';

import styles from './page.module.css';
import Dashboard from '@/components/dashboard';
import { getFlatIngredients } from '@/controller/ingredient';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const pantryIngredients = await getFlatIngredients();
  const supabase = await createClient();
  const loggedInUser = (await supabase.auth.getUser()).data.user;
  const userId = loggedInUser.id;
  const userName = loggedInUser.app_metadata.full_name;

  return (
    <div className={styles.container}>
      <Dashboard
        pantryIngredients={pantryIngredients}
        user={{
          userId: userId,
          userName: userName,
        }}
      />
    </div>
  );
}
