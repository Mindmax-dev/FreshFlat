import {
  getAllIngredients,
  getAllUsersIngredients,
  getRecipesIngredients,
  getFlatsIngredients,
  addUserIngredient,
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

export async function getFlatIngredients() {
  return await getFlatsIngredients();
}

export async function addUsersIngredient(
  ingredient,
  quantity,
  unit,
  expiryDate,
  isPublic
) {
  return await addUserIngredient(
    ingredient,
    quantity,
    unit,
    expiryDate,
    isPublic
  );
}
