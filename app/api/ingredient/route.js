import {
  addNewUserIngredient,
  deleteUserIngredient,
  updateUsersIngredient,
} from '@/model/ingredient';
import { NextResponse } from 'next/server';

export async function POST(req) {
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

export async function PUT(req) {
  try {
    const body = await req.json();

    await updateUsersIngredient(
      body.ingredient,
      body.amount,
      body.unit,
      body.expiry_date,
      body.is_public
    );

    return NextResponse.json(
      { message: 'PUT request received successfully', body },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling PUT request:', error);
    return NextResponse.json(
      { error: 'Error handling PUT request' },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();

    await deleteUserIngredient(body.ingredient, body.expiry_date);

    return NextResponse.json(
      { message: 'DELETE request received successfully', body },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling DELETE request:', error);
    return NextResponse.json(
      { error: 'Error handling DELETE request' },
      { status: 500 }
    );
  }
}
