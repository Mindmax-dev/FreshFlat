'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

export default function Dashboard({ pantryIngredients, user }) {
  const router = useRouter();
  const ingredients = pantryIngredients.map((ingredient, index) => ({
    ...ingredient,
    id: index,
  }));

  const names = [...new Set(pantryIngredients.map((ing) => ing.user.name))];

  const nameSelectOptionElements = names.map((name) => {
    return (
      <option key={'option-' + name} id={name} value={name}>
        {name}
      </option>
    );
  });
  nameSelectOptionElements.unshift(
    <option key="option-default" id="default" value="">
      Select...
    </option>
  );

  const [nameFilter, setNameFilter] = useState('');
  const [ingredientSearchFilter, setIngredientSearchFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
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

  const handleDelete = (ingredient, expiry_date) => {
    fetch(`/api/ingredient/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredient: ingredient,
        expiry_date: expiry_date,
      }),
    });

    router.refresh();
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
    fetch(`/api/ingredient`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredient: editingIngredient.ingredient,
        amount: editValues.amount,
        unit: editValues.unit,
        expiry_date: editValues.expiry_date,
        is_public: editValues.is_public,
      }),
    });

    router.refresh();

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
        is_public: newIngredient.is_public,
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

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleSearchboxChange = (e) => {
    setIngredientSearchFilter(e.target.value.toLowerCase());
  };

  const handleDateFilterChange = (e) => {
    if (e.target.value === '') {
      setDateFilter(null);
      return;
    }

    setDateFilter(e.target.value);
  };

  const ingredientElements = ingredients
    .filter((ingredient) => {
      if (nameFilter !== '' && ingredient.user.name !== nameFilter) {
        return false;
      }

      if (dateFilter !== null && ingredient.expiry_date !== dateFilter) {
        return false;
      }

      return ingredient.ingredient
        .toLowerCase()
        .includes(ingredientSearchFilter, 0);
    })
    .map((ingredient) => (
      <tr key={ingredient.id}>
        <td>
          {ingredient.amount} {ingredient.unit}
        </td>
        <td>{ingredient.ingredient}</td>
        <td>{ingredient.user.name}</td>
        <td>{new Date(ingredient.expiry_date).toLocaleDateString('en-GB')}</td>
        <td>
          {ingredient.user.id === user.userId && (
            <>
              <button
                className="editButton"
                onClick={() => handleEdit(ingredient)}
              >
                Edit
              </button>
              <button
                className="deleteButton"
                onClick={() =>
                  handleDelete(ingredient.ingredient, ingredient.expiry_date)
                }
              >
                Delete
              </button>
            </>
          )}
        </td>
      </tr>
    ));

  return (
    <div className={styles.container}>
      <div className={styles.filtersContainer}>
        <span className={styles.nameFilterContainer}>
          <label htmlFor="nameFilter">Name Filter</label>
          <select
            name="nameFilter"
            id="nameFilter"
            onChange={handleNameFilterChange}
          >
            {nameSelectOptionElements}
          </select>
        </span>
        <span className={styles.dateFilterContainer}>
          <label htmlFor="dateFilter">Date Filter</label>
          <input
            name="dateFilter"
            type="date"
            onChange={handleDateFilterChange}
          />
        </span>
        <span className={styles.dateFilterContainer}>
          <label htmlFor="dateFilter">Ingredient</label>
          <input
            className={styles.searchBox}
            type="text"
            onChange={handleSearchboxChange}
            placeholder="Search..."
          />
        </span>
      </div>
      {/* <span className={styles.nameFilterContainer}>
        <label htmlFor="nameFilter">Name Filter</label>
        <select
          name="nameFilter"
          id="nameFilter"
          onChange={handleNameFilterChange}
        >
          {nameSelectOptionElements}
        </select>
      </span>
      <span className={styles.dateFilterContainer}>
        <label htmlFor="dateFilter">Date Filter</label>
        <input
          name="dateFilter"
          type="date"
          onChange={handleDateFilterChange}
        />
      </span>
      <input
        className={styles.searchBox}
        type="search"
        onChange={handleSearchboxChange}
        placeholder="Search ingredient..."
      /> */}
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
        <tbody>{ingredientElements}</tbody>
      </table>

      <div className={styles.addButtonContainer}>
        <button className="actionButton" onClick={() => setShowAddModal(true)}>
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
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      unit: PropTypes.string,
      expiry_date: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
};
