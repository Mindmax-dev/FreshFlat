import { getIngredients } from "@/controller/ingredient";
import { getAllUserIngredients } from "@/controller/ingredient";

export default async function Ingredient() {
  const data = await getIngredients();
  const elements = data.map((d) => <li key={d.id}>{d.name}</li>);

  const [name, userData] = await getAllUserIngredients();

  const userElements = userData.map((d) => (
    <li key={d.ingredient}>
      x{d.amount}
      {d.unit === null ? " " : " " + d.unit + " "}
      {d.ingredients.name}
    </li>
  ));

  return (
    <div>
      <h2>All Ingredients in DB</h2>
      <ul>{elements}</ul>
      <h2>{name}'s ingredients:</h2>
      <ul>{userElements}</ul>
    </div>
  );
}
