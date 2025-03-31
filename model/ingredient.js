import { createClient } from '@/utils/supabase/server';

export async function getAllIngredients() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('ingredients').select('*');

  if (error) {
    console.error('Error fetching ingredients:', error);
    return null;
  }

  return data;
}

export async function getAllUsersIngredients() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    console.log('No user logged in.');
    return [null, null];
  }

  const { data, error } = await supabase
    .from('users_have_ingredients')
    .select('ingredient, ingredients(name), expiry_date, amount, unit')
    .eq('user', user.data.user.id);

  if (error) {
    console.error('Error fetching ingredients:', error);
    return [null, null];
  }

  return [user.data.user.user_metadata.full_name, data];
}

/**
 * Get all ingredients for a specific recipe.
 *
 * @param {string} recipeID ID of recipe
 * @returns
 */
export function getRecipesIngredients(recipeID) {
  return 'Hi from model/ingredient.getRecipesIngredients';
}

// maybe redundant
/**
 * Get all ingredients for the current user.
 */
export function getUsersIngredients() {
  return 'Hi from model/ingredient.getUsersIngredients';
}

/**
 * Get all ingredients for a the current users flat.
 */
export function getFlatsIngredients() {
  return 'Hi from model/ingedient.getFlatsIngredients';
}

/**
 * Assign an ingredient to the current user. If the user already has the ingredient, the unit must
 * match the unit stored in the database in order to succeed.
 *
 * @param {string} ingredient Name of ingredient
 * @param {number} quantity Quantity of ingredient, related to the unit
 * @param {string} unit Unit of ingredient
 * @param {string} expiry_date Expiry date of ingredient. Format: 'yyyy-mm-dd'
 * @returns {boolean} True if successful, False otherwise
 */
export function addUserIngredient(
  ingredient,
  quantity,
  unit = null,
  expiry_date
) {
  return 'Hi from model/ingredient.addUserIngredient';
}

export function deleteUserIngredient(ingredient) {
  return 'Hi from model/ingredient.deleteUserIngredient';
}

export function setQuantityOfUserIngredient(ingredient, quantity, unit = null) {
  return 'Hi from model/ingredient.setQuantityOfUserIngredient';
}

/**
 * Create new ingredient in database.
 *
 * @param {string} ingredientName
 */
function createIngredient(ingredientName) {
  return 'Hi from model/ingredient.createIngredient';
}
