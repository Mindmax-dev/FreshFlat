import {
  getAllUserIngredients,
  getIngredients,
  getRecipeIngredients,
  getFlatIngredients,
} from '@/controller/ingredient';

export default async function Ingredient() {
  return (
    <div>
      <AllIngredients></AllIngredients>
      <UserIngredients></UserIngredients>
      <RecipeIngredients></RecipeIngredients>
      <FlatsIngredients></FlatsIngredients>
    </div>
  );
}

async function AllIngredients() {
  const data = await getIngredients();
  const elements = data?.map((d) => <li key={d.name}>{d.name}</li>);

  return (
    data && (
      <>
        <h2>All Ingredients in DB</h2>
        <ul>{elements}</ul>
      </>
    )
  );
}

async function UserIngredients() {
  const [name, data] = await getAllUserIngredients();

  const elements = data?.map((d) => (
    <li key={d.ingredient}>
      {d.amount} {d.unit ? ` ${d.unit} ` : ' '}
      {d.ingredients.name}
    </li>
  ));

  return (
    data && (
      <>
        <h2>{name}&apos;s ingredients:</h2>
        <ul>{elements}</ul>
      </>
    )
  );
}

async function RecipeIngredients() {
  const [name, ingredients] = await getRecipeIngredients(7);

  const elements = ingredients.map((ing) => (
    <li key={ing.ingredient}>
      {ing.amount} {ing.unit} {ing.ingredient}
    </li>
  ));

  return (
    ingredients && (
      <>
        <h2>{name} ingredients:</h2>
        <ul>{elements}</ul>
      </>
    )
  );
}

async function FlatsIngredients() {
  const data = await getFlatIngredients();

  const elements = data.map((data) => (
    <li key={data.ingredient}>
      {data.amount} {data.unit} {data.ingredient}
    </li>
  ));

  return (
    data && (
      <>
        <h2>Current Users Flat Ingredients</h2>
        <ul>{elements}</ul>
      </>
    )
  );
}
