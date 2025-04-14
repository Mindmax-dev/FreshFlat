import { createAdminClient } from '@/utils/supabase/admin';
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

/**
 * Get all ingredients for a the current users flat.
 */
export async function getFlatsIngredients() {
  const supabase = await createAdminClient();

  const { data: authUser } = await supabase.auth.getUser();

  if (!authUser?.user) {
    console.log('No user logged in.');
    return null;
  }

  const userId = authUser.user.id;

  const { data: data1, error: error1 } = await supabase
    .from('flats_have_users')
    .select('flat')
    .eq('user', userId);

  if (error1 || !data1?.length) return null;

  const flatId = data1[0].flat;

  const { data: data2, error: error2 } = await supabase
    .from('flats_have_users')
    .select('user')
    .eq('flat', flatId);

  if (error2 || !data2?.length) return null;

  const userIds = data2.map((u) => u.user);

  const { data: data3, error: error3 } = await supabase
    .from('users_have_ingredients')
    .select('ingredient, expiry_date, amount, unit, user, is_public')
    .in('user', userIds);

  if (error3) return null;

  // Fetch auth users
  const { data: allUsers } = await supabase.auth.admin.listUsers();
  const userMap = new Map(
    allUsers.users
      .filter((u) => userIds.includes(u.id))
      .map((u) => [u.id, u.user_metadata?.full_name || u.email])
  );

  const filteredData = data3
    .filter((ing) => ing.user === userId || ing.is_public)
    .map((ing) => ({
      ...ing,
      user: {
        id: ing.user,
        name: userMap.get(ing.user) || 'Unknown',
      },
    }));

  return filteredData;
}

/**
 * Assign an ingredient to the current user. If the user already has the ingredient, the unit must
 * match the unit stored in the database in order to succeed.
 *
 * @param {string} ingredient Name of ingredient
 * @param {number} amount amount of ingredient, related to the unit
 * @param {string} unit Unit of ingredient
 * @param {string} expiryDate Expiry date of ingredient. Format: 'yyyy-mm-dd'
 * @returns {boolean} True if successful, False otherwise
 */
export async function addNewUserIngredient(
  ingredient,
  amount,
  unit,
  expiryDate,
  isPublic
) {
  const supabase = await createClient();

  // Check if user is logged in
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    console.error('No user logged in.');
    return false;
  }

  const usersIngredients = await getAllUsersIngredients();

  // check if ingredient already exists in users_have_ingredient relation
  let contains = false;

  usersIngredients[1].forEach((ing) => {
    if (ing.ingredient === ingredient && ing.expiry_date === expiryDate) {
      contains = true;
    }
  });

  if (contains) {
    console.error(
      'Error: User already has the ingredient. Must use updateUsersIngredient() to update the amount.'
    );
    return false;
  }

  const allIngredients = await getAllIngredients();

  contains = false;
  allIngredients.forEach((ing) => {
    if (ing.name === ingredient) {
      contains = true;
    }
  });

  // Add to ingredient relation if it doesn't exist
  if (!contains) {
    const { error } = await supabase
      .from('ingredients')
      .insert({ name: ingredient });

    if (error) {
      console.error('Error inserting new ingredient: ', error);
      return false;
    }
  }

  const { error } = await supabase.from('users_have_ingredients').insert({
    user: user.data.user.id,
    expiry_date: expiryDate,
    ingredient: ingredient,
    amount: amount,
    unit: unit,
    is_public: isPublic,
  });

  if (error) {
    console.error('Error adding new ingredient: ', error);
    return false;
  }

  return true;
}

export async function deleteUserIngredient(ingredient, expiryDate) {
  const supabase = await createClient();

  // Check if user is logged in
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    console.error('No user logged in.');
    return false;
  }

  const usersIngredients = await getAllUsersIngredients();

  // check if ingredient already exists in users_have_ingredient relation
  let contains = false;

  usersIngredients[1].forEach((ing) => {
    if (ing.ingredient === ingredient && ing.expiry_date === expiryDate) {
      contains = true;
    }
  });

  if (!contains) {
    console.error(
      'Error: User doesnt have the ingredient. No need to DELETE ingredient.'
    );
    return false;
  }

  const { error } = await supabase
    .from('users_have_ingredients')
    .delete()
    .eq('ingredient', ingredient)
    .eq('expiry_date', expiryDate)
    .eq('user', user.data.user.id);

  if (error) {
    console.error('Error deleting ingredient: ', error);
    return false;
  }

  return true;
}

export async function updateUsersIngredient(
  ingredient,
  amount,
  unit,
  expiryDate,
  isPublic
) {
  const supabase = await createClient();

  // Check if user is logged in
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    console.error('No user logged in.');
    return false;
  }

  const usersIngredients = await getAllUsersIngredients();

  // check if ingredient already exists in users_have_ingredient relation
  let contains = false;

  usersIngredients[1].forEach((ing) => {
    if (ing.ingredient === ingredient) {
      contains = true;
    }
  });

  if (!contains) {
    console.error(
      'Error: User doesnt have the ingredient. Must use addUsersIngredient() to add.'
    );
    return false;
  }

  const { error } = await supabase
    .from('users_have_ingredients')
    .update({
      user: user.data.user.id,
      expiry_date: expiryDate,
      ingredient: ingredient,
      amount: amount,
      unit: unit,
      is_public: isPublic,
    })
    .eq('user', user.data.user.id)
    .eq('ingredient', ingredient);

  if (error) {
    console.error('Error updating ingredient: ', error);
    return false;
  }

  return true;
}
