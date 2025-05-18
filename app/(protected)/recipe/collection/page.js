'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function RecipeCollectionPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleFilter, setTitleFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

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

  const handleTitleFilterChange = (e) => {
    setTitleFilter(e.target.value);
  };

  const handleDifficultyFilterChange = (e) => {
    setDifficultyFilter(e.target.value);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.controlRow}>
        <button
          className="actionButton"
          onClick={() => router.push('/recipe/selectIngredients')}
        >
          Generate New Recipe
        </button>
        <label htmlFor="titleFilter">Search</label>
        <input
          name="titleFilter"
          type="text"
          placeholder="Search recipe..."
          onChange={handleTitleFilterChange}
        />
        <label htmlFor="difficultyFilter">Difficulty</label>
        <select name="difficultyFilter" onChange={handleDifficultyFilterChange}>
          <option value="">Select...</option>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
      </div>
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
            {recipes
              .filter(
                (recipe) =>
                  recipe.title
                    .toLowerCase()
                    .includes(titleFilter.toLowerCase()) &&
                  recipe.difficulty
                    .toLowerCase()
                    .includes(difficultyFilter.toLowerCase())
              )
              .map((recipe) => (
                <tr
                  key={recipe.id}
                  className={styles.recipeRow}
                  onClick={() => {
                    router.push(`/recipe/${recipe.id}`);
                  }}
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
