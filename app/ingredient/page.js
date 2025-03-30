import { getAllUserIngredients, getIngredients } from '@/controller/ingredient';

export default async function Ingredient() {
  const data = await getIngredients();
  const [name, userData] = await getAllUserIngredients();

  const elements = data?.map((d) => <li key={d.name}>{d.name}</li>);

  const userElements = userData?.map((d) => (
    <li key={d.ingredient}>
      x{d.amount} {d.unit ? ` ${d.unit} ` : ' '}
      {d.ingredients.name}
    </li>
  ));

  if (!data && !userData) return <></>;

  return (
    <div>
      {data && (
        <>
          <h2>All Ingredients in DB</h2>
          <ul>{elements}</ul>
        </>
      )}

      {userData && (
        <>
          <h2>{name}&apos;s ingredients:</h2>
          <ul>{userElements}</ul>
        </>
      )}
    </div>
  );
}
