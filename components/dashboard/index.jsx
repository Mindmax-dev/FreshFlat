'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function Dashboard({ pantryIngredients }) {
  const [ingredients, setIngredients] = useState(
    pantryIngredients.map((ingredient, index) => ({
      ...ingredient,
      id: index,
    }))
  );
  const [editingIngredient, setEditingIngredient] = useState(null);

  const handleDelete = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const handleEdit = (ingredient) => {
    setEditingIngredient(ingredient);
  };

  const closeModal = () => {
    setEditingIngredient(null);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Ingredient</th>
            <th>Name</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient.amount}</td>
              <td>{ingredient.ingredient}</td>
              <td>{ingredient.user}</td>
              <td>{ingredient.expiry_date}</td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(ingredient)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(ingredient.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingIngredient && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Edit Ingredient</h2>
            <p>Amount: {editingIngredient.amount}</p>
            <p>Ingredient: {editingIngredient.ingredient}</p>
            <p>Name: {editingIngredient.user}</p>
            <p>Expiry Date: {editingIngredient.expiry_date}</p>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Dashboard.propTypes = {
  pantryIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string.isRequired,
      ingredient: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      expiry_date: PropTypes.string.isRequired,
    })
  ).isRequired,
};
