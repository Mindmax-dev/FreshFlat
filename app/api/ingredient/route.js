import { addNewUserIngredient } from '@/model/ingredient';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  console.log('Received POST request:', req.method, req.url);
  try {
    // Parse the request body
    const body = await req.json();

    await addNewUserIngredient(
      body.ingredient,
      body.amount,
      body.unit,
      body.expiry_date,
      body.is_public
    );

    // Example response to avoid 405 error
    return NextResponse.json(
      { message: 'POST request received successfully', body },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json(
      { error: 'Error handling POST request' },
      { status: 500 }
    );
  }
}
