'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SelectIngredientsTable from '../selectIngredientsTable';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

export default function SelectIngredientsPage({ flatIngredients }) {
  const [ingredients, setIngredients] = useState(flatIngredients);
  const [difficulty, setDifficulty] = useState('easy');
  const router = useRouter();

  const handleGenerateRecipe = () => {
    const selectedIngredients = ingredients.filter(
      (ingredient) => ingredient.selected
    );
    // remove the created_by and expiry_date properties from selected ingredients
    const filteredIngredients = selectedIngredients.map(
      ({ created_by, expiry_date, selected, ...rest }) => rest
    );

    const query = new URLSearchParams({
      ingredients: JSON.stringify(filteredIngredients),
      difficulty,
    }).toString();

    router.push(`/recipe/create?${query}`);
  };

  useEffect(() => {
    console.log('Ingredients:', ingredients);
  }, [ingredients]);

  return (
    <div className={styles.container}>
      <h1>Create Recipe</h1>
      <p>Choose your ingredients</p>
      <SelectIngredientsTable
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="difficulty">Difficulty: </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button
        className="actionButton"
        style={{ marginTop: '20px' }}
        onClick={handleGenerateRecipe}
      >
        Generate Recipe
      </button>
    </div>
  );
}

SelectIngredientsPage.propTypes = {
  flatIngredients: PropTypes.array.isRequired,
};
