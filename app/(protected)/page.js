import styles from './page.module.css';
import Dashboard from '@/components/dashboard';
import { getFlatIngredients } from '@/controller/ingredient';

export default async function Home() {
  const pantryIngredients = await getFlatIngredients();
  

  return (
    <div className={styles.container}>
      <Dashboard pantryIngredients={pantryIngredients} />
    </div>
  );
}
