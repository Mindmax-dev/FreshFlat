import {
  getAllIngredients,
  getAllUsersIngredients,
  getRecipesIngredients,
} from '@/model/ingredient';

export async function getIngredients() {
  return await getAllIngredients();
}

export async function getAllUserIngredients() {
  return await getAllUsersIngredients();
}

export async function getRecipeIngredients(recipeID) {
  return await getRecipesIngredients(recipeID);
}
