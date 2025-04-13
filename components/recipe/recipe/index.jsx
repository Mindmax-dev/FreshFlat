import { ChefHat, List, ScrollText } from 'lucide-react';
import styles from './index.module.css'; // ← CSS module import

export default function Recipe({ recipeJson }) {
  return (
    <div className={styles.recipeContainer}>
      <div className={styles.headLine}>
        <div className={styles.interHeading}>
          <ChefHat size={36} className={styles.icon} />
          <h1>{recipeJson.title}</h1>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.ingredients}>
          <div className={styles.interHeading}>
            <List size={20} /> <h2>Ingredients</h2>
          </div>
          <ul>
            {recipeJson.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.instructions}>
          <div className={styles.interHeading}>
            <ScrollText size={20} />
            <h2>Instructions</h2>
          </div>
          <p className={styles.instructions}>{recipeJson.instructions}</p>
        </div>
      </div>
    </div>
  );
}
