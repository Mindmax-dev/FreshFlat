'use client';
import PropTypes from 'prop-types';

export default function SelectIngredientsTable({
  ingredients,
  setIngredients,
}) {
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

  return !ingredients ? (
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
              checked={ingredients.every((ingredient) => ingredient.selected)}
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
  );
}

SelectIngredientsTable.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      unit: PropTypes.string,
      name: PropTypes.string.isRequired,
      created_by: PropTypes.string,
      expiry_date: PropTypes.string,
      selected: PropTypes.bool,
    })
  ).isRequired,
  setIngredients: PropTypes.func.isRequired,
};
