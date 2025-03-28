import { createClient } from '@/utils/supabase/client';
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
              'Generate me a' +
              difficulty +
              'recipe with these ingredients:' +
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
              type: 'array',
              items: {
                type: 'string',
              },
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
