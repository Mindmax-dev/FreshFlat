import { getIngredients } from "@/controller/ingredient";

export default function Ingredient() {
  return <div>{getIngredients()}</div>;
}
