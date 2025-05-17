'use client';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

export default function RecipeDisplay() {
  const searchParams = useSearchParams();
  return (
    <div className={styles.container}>
      <h1 className={styles.recipeTitle}>{searchParams.get('title')}</h1>
      <span className={styles.subTitleContainer}>
        <p className={styles.preparationTime}>
          Preparation time: {searchParams.get('preparation_time')} mins
        </p>
        <p className={styles.cookingTime}>
          Cooking time: {searchParams.get('cooking_time')} mins
        </p>
      </span>
      <p className={styles.difficulty}>
        Difficulty: {searchParams.get('difficulty')}
      </p>
      <ol className={styles.instructions}>
        <h2 className={styles.instructionTitle}>Instructions</h2>
        {searchParams
          .get('instructions')
          .split(/\d+\./) // split the instructions on each (number + '.')
          .filter(Boolean)
          .map((instruction, index) => (
            <li className={styles.instruction} key={index}>
              {instruction}
            </li>
          ))}
      </ol>
    </div>
  );
}
