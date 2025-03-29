import { getIngredients } from "@/controller/ingredient";

export default async function Ingredient() {
  const data = await getIngredients();
  const elements = data.map((d) => <li key={d.id}>{d.name}</li>);

  return <ul>{elements}</ul>;
}
