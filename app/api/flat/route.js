import { editFlatController, deleteFlatController } from '@/controller/flat';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const action = formData.get('action');
    const flatId = formData.get('flatId');

    // Construct absolute URL using the request host
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host');
    const baseUrl = `${protocol}://${host}`;

    if (action === 'edit') {
      return NextResponse.redirect(`${baseUrl}/flat/edit/${flatId}`, { status: 303 });
    } else if (action === 'delete') {
      await deleteFlatController(flatId);
      return NextResponse.redirect(`${baseUrl}/`, { status: 303 });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing flat action:', error.message);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}