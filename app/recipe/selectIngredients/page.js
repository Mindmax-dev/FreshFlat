'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SelectIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);

  useEffect(() => {
    // ? Format:
    // {
    //   quantity: 2,
    //   unit: 'cups',
    //   name: 'Flour',
    //   created_by: 'John Doe',
    //   expiry_date: '2023-10-01',
    //   selected: true,
    // },
    const getUsersAndFlatsPublicIngredients = async () => {
      // # 1. Get the ingredients of the user and the public ingredients of the flat
      setIngredients([]);
      setIsLoadingIngredients(false);
    };

    getUsersAndFlatsPublicIngredients();
  }, []);

  const [difficulty, setDifficulty] = useState('easy');
  const router = useRouter();

  const handleMasterCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) => ({
        ...ingredient,
        selected: isChecked,
      }))
    );
  };

  const handleCheckboxChange = (index) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index
          ? { ...ingredient, selected: !ingredient.selected }
          : ingredient
      )
    );
  };

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

  return (
    <div>
      <h1>Create Recipe</h1>
      <p>Choose your ingredients</p>
      {isLoadingIngredients ? (
        <table>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Name</th>
              <th>Owner</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td>
                  <div
                    className="skeleton"
                    style={{ width: '50px', height: '20px' }}
                  ></div>
                </td>
                <td>
                  <div
                    className="skeleton"
                    style={{ width: '50px', height: '20px' }}
                  ></div>
                </td>
                <td>
                  <div
                    className="skeleton"
                    style={{ width: '100px', height: '20px' }}
                  ></div>
                </td>
                <td>
                  <div
                    className="skeleton"
                    style={{ width: '80px', height: '20px' }}
                  ></div>
                </td>
                <td>
                  <div
                    className="skeleton"
                    style={{ width: '80px', height: '20px' }}
                  ></div>
                </td>
                <td>
                  <div
                    className="skeleton"
                    style={{ width: '20px', height: '20px' }}
                  ></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Name</th>
              <th>Owner</th>
              <th>Date</th>
              <th>
                <input
                  type="checkbox"
                  onChange={handleMasterCheckboxChange}
                  checked={ingredients.every(
                    (ingredient) => ingredient.selected
                  )}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, index) => (
              <tr key={ingredient.name + index}>
                <td>{ingredient.quantity}</td>
                <td>{ingredient.unit}</td>
                <td>{ingredient.name}</td>
                <td>{ingredient.created_by}</td>
                <td>{ingredient.expiry_date}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={ingredient.selected}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
      <button style={{ marginTop: '20px' }} onClick={handleGenerateRecipe}>
        Generate Recipe
      </button>
    </div>
  );
}
