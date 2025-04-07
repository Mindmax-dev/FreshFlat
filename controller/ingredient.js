import {
  getAllIngredients,
  getAllUsersIngredients,
  getRecipesIngredients,
  getFlatsIngredients,
  addNewUserIngredient,
  updateUsersIngredient,
  deleteUserIngredient,
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
  return await addNewUserIngredient(
    ingredient,
    quantity,
    unit,
    expiryDate,
    isPublic
  );
}

export async function updateUserIngredient(
  ingredient,
  quantity,
  unit,
  expiryDate,
  isPublic
) {
  return await updateUsersIngredient(
    ingredient,
    quantity,
    unit,
    expiryDate,
    isPublic
  );
}

export async function deleteUsersIngredient(ingredient, expiryDate) {
  return await deleteUserIngredient(ingredient, expiryDate);
}
