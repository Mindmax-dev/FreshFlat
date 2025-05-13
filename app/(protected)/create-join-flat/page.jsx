import { createAdminClient } from '@/utils/supabase/admin';
import { redirect } from 'next/navigation';

export default async function CreateJoinFlat() {
  const supabase = await createAdminClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    redirect('/login');
  }
  const userId = user.data.user.id;

  async function handleCreateFlat(formData) {
    'use server';
    const flatName = formData.get('flatName');
    if (!flatName) {
      return { error: 'Flat name is required' };
    }
    const { flat, error } = await createFlat(flatName, userId);
    if (error) {
      return { error: error.message };
    }
    redirect(`/flat?id=${flat.id}`);
  }

  async function handleJoinFlat(formData) {
    'use server';
    const inviteToken = formData.get('inviteToken');
    if (!inviteToken) {
      return { error: 'Invite token is required' };
    }
    const { flat, error } = await getFlatById(inviteToken);
    if (error || !flat) {
      return { error: 'Invalid invite token' };
    }
    if (flat.members.includes(userId)) {
      return { error: 'You are already a member of this flat' };
    }
    const { error: joinError } = await addFlatmateToFlat(flat.id, userId);
    if (joinError) {
      return { error: joinError.message };
    }
    redirect(`/flat?id=${flat.id}`);
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Create or Join a Flat</h1>
      <form action={handleCreateFlat}>
        <h2>Create New Flat</h2>
        <div>
          <label htmlFor="flatName">Flat Name:</label>
          <input
            type="text"
            id="flatName"
            name="flatName"
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Create Flat
        </button>
      </form>

      <form action={handleJoinFlat} style={{ marginTop: '20px' }}>
        <h2>Join Existing Flat</h2>
        <div>
          <label htmlFor="inviteToken">Invite Token:</label>
          <input
            type="text"
            id="inviteToken"
            name="inviteToken"
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Join Flat
        </button>
      </form>
    </div>
  );
}

// Server actions
import { addFlatmateToFlat, createFlat, getFlatById } from '@/model/flat';
