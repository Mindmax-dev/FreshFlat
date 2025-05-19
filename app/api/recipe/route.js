import {
  generateRecipeWithAi,
  getAllRecipesOfFlatWithFilters,
  saveRecipeToDatabase,
} from '@/model/recipe';
import { NextResponse } from 'next/server';

export async function GET() {
  // Returns all recipes from the database
  const recipes = await getAllRecipesOfFlatWithFilters(
    true,
    '',
    true,
    true,
  );

  return NextResponse.json(recipes, { status: 200 });
}

export async function POST(request) {
  const { ingredients, difficulty } = await request.json();

  return await generateRecipeWithAi(ingredients, difficulty).then((recipe) => {
    return NextResponse.json(recipe, { status: 200 });
  });
}

export async function PUT(request) {
  const body = await request.json();

  await saveRecipeToDatabase(
    body.recipeJson.title,
    body.recipeJson.instructions,
    body.recipeJson.preparation_time,
    body.recipeJson.cooking_time,
    body.recipeJson.ingredients,
    body.difficulty
  );

  return NextResponse.json({}, { status: 200 });
}
