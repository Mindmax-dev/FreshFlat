import { deleteFlatController, getFlatOfUserController, leaveFlatController } from '@/controller/flat';
import { createAdminClient } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    let body;

    // Read the body as text and determine its format
    const text = await req.text();
    try {
      // Attempt to parse as JSON
      body = JSON.parse(text);
    } catch (jsonError) {
      // Fallback for non-JSON requests (e.g., application/x-www-form-urlencoded)
      body = Object.fromEntries(new URLSearchParams(text));
    }

    const { action, flatId, userId } = body;

    if (!flatId || !action) {
      return NextResponse.json({ error: 'Flat ID and action are required' }, { status: 400 });
    }

    const supabase = await createAdminClient();
    const userResponse = await supabase.auth.getUser();
    if (!userResponse.data.user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }
    const authenticatedUserId = userResponse.data.user.id;

    if (action === 'leave' && userId !== authenticatedUserId) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 403 });
    }

    if (action === 'delete') {
      const result = await deleteFlatController(flatId);
      if (result.error) {
        return NextResponse.json({ error: result.error.message }, { status: 400 });
      }
      return NextResponse.json({ message: 'Flat deleted successfully' });
    }

    if (action === 'leave') {
      const { error } = await leaveFlatController(flatId, userId);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ message: 'Successfully left the flat' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error processing flat action:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { flat, error } = await getFlatOfUserController();
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
    return NextResponse.json({ flat });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch flat data' }, { status: 500 });
  }
}

const handleDeleteFlat = async () => {
  try {
    const res = await fetch('/api/flat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'delete',
        flatId: flatData.id,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      console.log('Flat deleted successfully:', data.message);
    } else {
      console.error('Error deleting flat:', data.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};