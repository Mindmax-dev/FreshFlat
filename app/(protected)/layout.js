// app/(dashboard)/layout.tsx
import Header from '@/components/layout/header';
import { createClient } from '@/utils/supabase/server';

export default async function ProtectedLayout({ children }) {
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  console.log('userId', userId);

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
