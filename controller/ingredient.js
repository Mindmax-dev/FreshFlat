import { getAllIngredients } from "@/model/ingredient";
import { getAllUsersIngredients } from "@/model/ingredient";

export async function getIngredients() {
  return await getAllIngredients();
}

export async function getAllUserIngredients() {
  return await getAllUsersIngredients();
}
