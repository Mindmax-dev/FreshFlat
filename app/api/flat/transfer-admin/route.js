import { createAdminClient } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { flatId, newAdmin: newAdminId } = await req.json();
  if (!flatId || !newAdminId) {
    return NextResponse.json(
      { error: 'Missing flatId or newAdmin' },
      { status: 400 }
    );
  }

  try {
    const supabase = await createAdminClient();
    const { error } = await supabase
      .from('flats')
      .update({ admin: newAdminId })
      .eq('id', flatId);

    if (error) throw error;

    return NextResponse.json({ message: 'Admin rights transferred' });
  } catch (err) {
    console.error('Transfer error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
