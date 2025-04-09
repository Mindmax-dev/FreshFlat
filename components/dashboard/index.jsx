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
  const [editValues, setEditValues] = useState({ amount: '', unit: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    amount: '',
    unit: '',
    ingredient: '',
    expiry_date: '',
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
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    setIngredients((prev) =>
      prev.map((ing) =>
        ing.id === editingIngredient.id
          ? {
              ...ing,
              amount: editValues.amount,
              unit: editValues.unit,
              expiry_date: editValues.expiry_date,
            }
          : ing
      )
    );
    setEditingIngredient(null);
  };

  const closeModal = () => {
    setEditingIngredient(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIngredient((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddIngredient = () => {
    const newId = ingredients.length
      ? ingredients[ingredients.length - 1].id + 1
      : 0;
    setIngredients([
      ...ingredients,
      {
        ...newIngredient,
        id: newId,
        user: 'You',
      },
    ]);
    setShowAddModal(false);
    setNewIngredient({ amount: '', unit: '', ingredient: '', expiry_date: '' });
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
