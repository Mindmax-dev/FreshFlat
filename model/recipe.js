import { createClient } from '@/utils/supabase/server';
import OpenAI from 'openai';

export async function generateRecipeWithAi(ingredients, difficulty) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: [
      {
        role: 'system',
        content: [
          {
            type: 'input_text',
            text: 'You are an helpful assistant that provides recipes in a structured json format. You take the ingredients from the request and generate a delicious recipe based on them. Only use ingredients, that you have been told to.',
          },
        ],
      },
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text:
              'Generate me a recipe for one or two persons with the diffifculty:' +
              difficulty +
              'You are only allowed to use the following ingredients and the maximum amount of them. You do not have to use all of the ingredients:' +
              ingredients,
          },
        ],
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'recipe',
        strict: true,
        schema: {
          type: 'object',
          $defs: {
            ingredient: {
              type: 'object',
              required: ['name', 'amount', 'unit'],
              properties: {
                name: {
                  type: 'string',
                  description: 'The name of the ingredient.',
                },
                unit: {
                  type: 'string',
                  description: 'The unit of measurement for the amount.',
                },
                amount: {
                  type: 'number',
                  description: 'The amount of the ingredient.',
                },
              },
              additionalProperties: false,
            },
          },
          required: [
            'title',
            'instructions',
            'preparation_time',
            'cooking_time',
            'ingredients',
          ],
          properties: {
            title: {
              type: 'string',
              description: 'The title of the recipe.',
            },
            ingredients: {
              type: 'array',
              items: {
                $ref: '#/$defs/ingredient',
              },
              description: 'A list of ingredients required for the recipe.',
            },
            cooking_time: {
              type: 'number',
              description: 'The cooking time in minutes.',
            },
            instructions: {
              type: 'string',
              description:
                'A step-by-step list of instructions for preparing the recipe.',
            },
            preparation_time: {
              type: 'number',
              description: 'The preparation time in minutes.',
            },
          },
          additionalProperties: false,
        },
      },
    },
    reasoning: {},
    tools: [],
    temperature: 1,
    max_output_tokens: 2048,
    top_p: 1,
    store: true,
  });

  return response.output_text;
}

export async function getAllRecipesOfFlatWithFilters(
  orderIsAscending,
  titleIncludes,
  cookingTimeIsAscending,
  preparation_time,
  difficulty
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .ilike('title', `%${titleIncludes}%`)
    .order('created_at', { ascending: orderIsAscending })
    .order('cooking_time', { ascending: cookingTimeIsAscending })
    .order('preparation_time', {
      ascending: preparation_time,
    })
    .eq('difficulty', difficulty);

  if (error) {
    console.error('Error fetching recipes:', error);
    return null;
  }
  return data;
}

export async function saveRecipeToDatabase(
  title,
  instructions,
  preparation_time,
  cooking_time,
  ingredients
) {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();
  let userId = null;
  if (!user.error) {
    console.error('Error fetching user:', user.error);
    userId = user.data.user.id;
  }
  const flatOfUser = await supabase
    .from('flats_have_users')
    .select()
    .eq('user', userId);

  const saveRecipe = await supabase
    .from('recipes')
    .insert([
      {
        title: title,
        instructions: instructions,
        preparation_time: preparation_time,
        cooking_time: cooking_time,
        created_by: userId,
        flat: flatOfUser.data[0].flat,
      },
    ])
    .select();

  if (saveRecipe.error) {
    console.error('Error saving recipe:', error);
    return null;
  }

  console.log('Recipe saved:', saveRecipe);

  const ingredientsData = ingredients.map((ingredient) => ({
    recipe: saveRecipe.data[0].id,
    ingredient: ingredient.id,
    amount: ingredient.amount,
    unit: ingredient.unit,
  }));

  const saveIngredients = await supabase
    .from('recipes_have_ingredients')
    .insert(ingredientsData);

  if (saveIngredients.error) {
    console.error('Error saving ingredients:', saveIngredients.error);
    return null;
  }

  // return the recipe id
  return saveRecipe.data[0].id;
}
