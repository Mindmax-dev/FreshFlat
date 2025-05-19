'use client';
import styles from './page.module.css';
import { useEffect } from 'react';
import { useState } from 'react';

export default function RecipeDisplay({ params }) {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      const { id } = await params;

      try {
        const response = await fetch(`/api/recipe/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Failed to load recipe');
          return;
        }
        setRecipe(await response.json());
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipes:', err);
      }
    };

    getRecipe();
  }, [params]);

  return loading ? (
    'Loading'
  ) : (
    <div className={styles.container}>
      <h1 className={styles.recipeTitle}>{recipe.title}</h1>
      <span className={styles.subTitleContainer}>
        <p className={styles.preparationTime}>
          Preparation time: {recipe.preparation_time} mins
        </p>
        <p className={styles.cookingTime}>
          Cooking time: {recipe.cooking_time} mins
        </p>
        <p className={styles.difficulty}>Difficulty: {recipe.difficulty}</p>
      </span>
      <span className={styles.lineBreak}></span>
      <ul className={styles.innerBlock}>
        <h2 className={styles.innerBlockTitle}>Ingredients</h2>
        {recipe.recipes_have_ingredients.map((ingredient) => (
          <li className={styles.innerBlockLine} key={ingredient.ingredient}>
            {ingredient.amount +
              ' ' +
              ingredient.unit +
              ' ' +
              ingredient.ingredient}
          </li>
        ))}
      </ul>
      <span className={styles.lineBreak}></span>
      <ol className={styles.innerBlock}>
        <h2 className={styles.innerBlockTitle}>Instructions</h2>
        {recipe.instructions
          .split(/\d+\./) // split the instructions on each (number + '.')
          .filter(Boolean)
          .map((instruction, index) => (
            <li className={styles.innerBlockLine} key={index}>
              {instruction}
            </li>
          ))}
      </ol>
    </div>
  );
}
