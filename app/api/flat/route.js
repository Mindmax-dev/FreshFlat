import { addFlatmateToFlat, createFlat } from '@/model/flat';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();

    const supabase = await createClient();
    const userId = (await supabase.auth.getUser()).data.user.id;

    const { flat, error } = await createFlat(body.flatName, userId);

    if (error) {
      return NextResponse.json(
        { error: 'Error creating flat' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Flat created successfully', flat },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error handling POST request' },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const body = await req.json();
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser()).data.user.id;

  try {
    const { error } = await addFlatmateToFlat(body.flatCode, userId);
    if (error) {
      return NextResponse.json(
        { error: 'Error joining flat' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Joined flat successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Error joining flat' }, { status: 400 });
  }
}
