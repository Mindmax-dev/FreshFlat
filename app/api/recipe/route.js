import { getAllRecipesOfFlat } from '@/model/recipe';
import { NextResponse } from 'next/server';

export async function GET() {
  const allRecipesOfFlat = await getAllRecipesOfFlat(
    true,
    'asdf',
    true,
    true,
    'easy'
  );

  console.log(allRecipesOfFlat);

  return new NextResponse(JSON.stringify(allRecipesOfFlat), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
