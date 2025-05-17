'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SelectIngredientsTable from '../selectIngredientsTable';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

export default function ViewPage({ flatIngredients }) {
  const [ingredients, setIngredients] = useState(flatIngredients);

  useEffect(() => {
    console.log('Ingredients:', ingredients);
  }, [ingredients]);

  return (
    <div className={styles.container}>
      <h1>Recipes</h1>
      <p>Choose a recipe to view</p>
      <SelectIngredientsTable
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
    </div>
  );
}

ViewPage.propTypes = {
  flatIngredients: PropTypes.array.isRequired,
};
