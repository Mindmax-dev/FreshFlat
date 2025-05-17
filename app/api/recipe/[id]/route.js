import { NextResponse } from 'next/server';
import { getRecipeByID } from '@/model/recipe';

export async function GET(request, { params }) {
  const { recipeID } = await params.id;

  const recipe = await getRecipeByID(recipeID);

  if (!recipe) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
  }

  return NextResponse.json(recipe);
}
