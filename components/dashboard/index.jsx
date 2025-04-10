'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

export default function Dashboard({ pantryIngredients }) {
  const router = useRouter();
  const ingredients = pantryIngredients.map((ingredient, index) => ({
    ...ingredient,
    id: index,
  }));
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    amount: '',
    unit: '',
    ingredient: '',
    expiry_date: '',
    is_public: false,
  });

  const [editValues, setEditValues] = useState({
    amount: '',
    unit: '',
    expiry_date: '',
    is_public: false,
  });

  const handleDelete = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const handleEdit = (ingredient) => {
    setEditingIngredient(ingredient);
    setEditValues({
      amount: ingredient.amount,
      unit: ingredient.unit || '',
      expiry_date: ingredient.expiry_date || '',
      is_public: ingredient.is_public || false,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveEdit = () => {
    // setIngredients((prev) =>
    //   prev.map((ing) =>
    //     ing.id === editingIngredient.id
    //       ? {
    //           ...ing,
    //           amount: editValues.amount,
    //           unit: editValues.unit,
    //           expiry_date: editValues.expiry_date,
    //           is_public: editValues.is_public,
    //         }
    //       : ing
    //   )
    // );
    setEditingIngredient(null);
  };

  const closeModal = () => {
    setEditingIngredient(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewIngredient((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddIngredient = async () => {
    await fetch('/api/ingredient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredient: newIngredient.ingredient,
        amount: newIngredient.amount,
        unit: newIngredient.unit,
        expiry_date: newIngredient.expiry_date,
        is_public: false,
      }),
    });

    router.refresh();

    setShowAddModal(false);
    setNewIngredient({
      amount: '',
      unit: '',
      ingredient: '',
      expiry_date: '',
      is_public: false,
    });
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
              <td>
                {ingredient.amount} {ingredient.unit}
              </td>
              <td>{ingredient.ingredient}</td>
              <td>{ingredient.user}</td>
              <td>{ingredient.expiry_date}</td>
              <td>
                <button
                  className="editButton"
                  onClick={() => handleEdit(ingredient)}
                >
                  Edit
                </button>
                <button
                  className="deleteButton"
                  onClick={() => handleDelete(ingredient.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.addButtonContainer}>
        <button
          className={styles.addButton}
          onClick={() => setShowAddModal(true)}
        >
          Add Ingredient
        </button>
      </div>

      {editingIngredient && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Edit Ingredient</h2>
            <input
              type="text"
              name="amount"
              value={editValues.amount}
              onChange={handleEditChange}
              className={styles.input}
              placeholder="Amount"
            />
            <input
              type="text"
              name="unit"
              value={editValues.unit}
              onChange={handleEditChange}
              className={styles.input}
              placeholder="Unit"
            />
            <input
              type="date"
              name="expiry_date"
              value={editValues.expiry_date}
              onChange={handleEditChange}
              className={styles.input}
            />
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="is_public"
                checked={editValues.is_public}
                onChange={handleEditChange}
              />
              Public
            </label>
            <button onClick={handleSaveEdit} className={styles.confirmButton}>
              Save
            </button>
            <button onClick={closeModal} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showAddModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add Ingredient</h2>
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={newIngredient.amount}
              onChange={handleInputChange}
              className={styles.input}
            />
            <input
              type="text"
              name="unit"
              placeholder="Unit"
              value={newIngredient.unit}
              onChange={handleInputChange}
              className={styles.input}
            />
            <input
              type="text"
              name="ingredient"
              placeholder="Ingredient"
              value={newIngredient.ingredient}
              onChange={handleInputChange}
              className={styles.input}
            />
            <input
              type="date"
              name="expiry_date"
              value={newIngredient.expiry_date}
              onChange={handleInputChange}
              className={styles.input}
            />
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="is_public"
                checked={newIngredient.is_public}
                onChange={handleInputChange}
              />
              Public
            </label>
            <button
              onClick={handleAddIngredient}
              className={styles.confirmButton}
            >
              Add
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className={styles.cancelButton}
            >
              Cancel
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
