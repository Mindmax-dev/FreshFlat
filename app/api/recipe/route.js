import { generateRecipeWithAi } from '@/model/recipe';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { ingredients, difficulty } = await request.json();

  return generateRecipeWithAi(ingredients, difficulty).then((recipe) => {
    return NextResponse.json(recipe, { status: 200 });
  });
}
