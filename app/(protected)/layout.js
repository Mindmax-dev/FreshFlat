// app/(dashboard)/layout.tsx
import Header from '@/components/layout/header';

export default async function ProtectedLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
