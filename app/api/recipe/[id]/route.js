import { NextResponse } from 'next/server';
import { getRecipeByID } from '@/model/recipe';

export async function GET(request, { params }) {
  const { id } = await params;
  const recipe = await getRecipeByID(id);

  if (!recipe) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
  }

  return NextResponse.json(recipe);
}
