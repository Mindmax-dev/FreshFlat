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
export async function getRecipesIngredients(recipeID) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('recipes_have_ingredients')
    .select('ingredient, amount, unit')
    .eq('recipe', recipeID);

  if (error) {
    console.error('Error fetching ingredients:', error);
    return null;
  }

  const recipeName = await supabase
    .from('recipes')
    .select('title')
    .eq('id', recipeID);

  return [recipeName.data[0].title, data];
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
export async function getFlatsIngredients() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    console.log('No user logged in.');
    return null;
  }

  // need to combine these into one query sometime

  // get flat if of current user
  const flatID = await supabase
    .from('flats_have_users')
    .select('flat')
    .eq('user', user.data.user.id);

  // get users in current users flat
  const users = await supabase
    .from('flats_have_users')
    .select('user')
    .eq('flat', flatID.data[0].flat);

  // get ingredients for each user in current users flat
  // ! We only want to have the public ingredients of the other users in the flat. So needs
  // ! handling of attribute: is_public
  const ingredients = await supabase
    .from('users_have_ingredients')
    .select('ingredient, ingredients(name), expiry_date, amount, unit')
    .in(
      'user',
      users.data.map((user) => user.user)
    );

  return ingredients.data;
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
