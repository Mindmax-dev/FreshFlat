import {
  getAllUserIngredients,
  getIngredients,
  getRecipeIngredients,
  getFlatIngredients,
  addUsersIngredient,
  updateUserIngredient,
  deleteUsersIngredient,
} from '@/controller/ingredient';

export default async function Ingredient() {
  console.log(await deleteUsersIngredient('potato', '2025-02-26'));

  await updateUserIngredient(
    'sponge',
    Math.floor(Math.random() * 100),
    'g',
    '2024-09-04',
    false
  );

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
  const elements = data?.map((d) => <li key={'all-' + d.name}>{d.name}</li>);

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
    <li key={'user-' + d.ingredient}>
      x{d.amount} {d.unit ? ` ${d.unit} ` : ' '}
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
    <li key={'recipe-' + ing.ingredient}>
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
    <li key={data.user + '-' + data.ingredient}>
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
