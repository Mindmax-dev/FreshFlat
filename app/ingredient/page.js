import { getIngredients } from "@/controller/ingredient";
import { getAllUserIngredients } from "@/controller/ingredient";
import { getAllIngredients } from "@/model/ingredient";
import { signOutUser } from "@/model/user";

export default async function Ingredient() {
  const data = await getIngredients();
  const elements = data.map((d) => <li key={d.id}>{d.name}</li>);

  const userData = await getAllUserIngredients();
  console.log(userData);

  return <ul>{elements}</ul>;
}
