import { getAllIngredients } from "@/model/ingredient";

export async function getIngredients() {
  return await getAllIngredients();
}
