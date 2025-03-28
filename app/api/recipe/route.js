import { saveRecipeToDatabase } from '@/model/recipe';
import { NextResponse } from 'next/server';

export async function GET() {
  const saveRecipe = await saveRecipeToDatabase(
    'Pasta Carbonara',
    'Boil pasta, fry bacon, mix with eggs and cheese.',
    10,
    20,
    [{ id: '1', amount: '200', unit: 'g' }]
  );

  console.log(saveRecipe);

  return new NextResponse(JSON.stringify(saveRecipe), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
