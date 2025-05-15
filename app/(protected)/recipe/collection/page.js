'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function RecipeCollectionPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllRecipes = async () => {
      try {
        const response = await fetch('/api/recipe', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error('Failed to fetch recipes');
        }
      } catch (err) {
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    getAllRecipes();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <button
        className="actionButton"
        onClick={() => router.push('/recipe/selectIngredients')}
      >
        Generate Recipe
      </button>

      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <table className={styles.recipeTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Preparation Time</th>
              <th>Cooking Time</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr
                key={recipe.id}
                className={styles.recipeRow}
                onClick={() => router.push('/recipe/recipeDisplay')}
              >
                <td>{recipe.title}</td>
                <td>{recipe.difficulty}</td>
                <td>{recipe.preparation_time} min</td>
                <td>{recipe.cooking_time} min</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
