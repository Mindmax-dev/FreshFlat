import { createAdminClient } from '@/utils/supabase/admin';

async function getFlatOfUser() {
  const supabase = await createAdminClient();
  const userId = (await supabase.auth.getUser()).data.user.id;
  const flatIdOfUser = await supabase
    .from('flats_have_users')
    .select('flat')
    .eq('user', userId);
  if (!flatIdOfUser.data || flatIdOfUser.data.length === 0) {
    return { flat: null, error: 'User is not associated with any flat' };
  }
  const flat = await supabase
    .from('flats')
    .select('*')
    .eq('id', flatIdOfUser.data[0].flat)
    .single();
  if (flat.error) {
    return { flat: null, error: flat.error.message };
  }

  const flatAdminId = flat.data.admin;
  const flatId = flat.data.id;
  const flatName = flat.data.name;

  const flatMembersResult = await supabase
    .from('flats_have_users')
    .select('user')
    .eq('flat', flatId);
  const flatMembersId = flatMembersResult.data.map((member) => member.user);

  const flatObject = {
    id: flatId,
    inviteToken: flatId,
    admin: flatAdminId,
    name: flatName,
    members: flatMembersId,
  };

  return { flat: flatObject, error: flat.error };
}

async function createFlat(name, adminId) {
  const supabase = await createAdminClient();
  const { data: flat, error } = await supabase
    .from('flats')
    .insert({
      name: name,
      admin: adminId,
    })
    .select();

  if (flat && flat.length > 0) {
    await addFlatmateToFlat(flat[0].id, adminId);
  }

  return { flat: flat?.[0] || null, error };
}

async function addFlatmateToFlat(flatId, userId) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from('flats_have_users')
    .insert({ flat: flatId, user: userId });
  return { error };
}

async function updateFlat(flatId, updateData) {
  const supabase = await createAdminClient();
  const { data: updatedFlat, error } = await supabase
    .from('flats')
    .update(updateData)
    .eq('id', flatId)
    .select()
    .single();
  return { updatedFlat, error };
}

export async function deleteFlat(flatId) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from('flats').delete().eq('id', flatId);
  return { error };
}

async function getFlatById(flatId) {
  const supabase = await createAdminClient();
  const { data: flat, error } = await supabase
    .from('flats')
    .select('*')
    .eq('id', flatId)
    .single();
  if (error) {
    return { flat: null, error };
  }
  const flatObject = {
    id: flat.id,
    inviteToken: flat.id,
    admin: flat.admin,
    name: flat.name,
    members: [], // Populate this if needed from flats_have_users
  };
  return { flat: flatObject, error: null };
}

async function removeFlatmate(flatId, userId) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from('flats_have_users')
    .delete()
    .eq('flat', flatId)
    .eq('user', userId);
  if (error) {
    return { error: error.message };
  }
  return { error: null };
}

export {
  addFlatmateToFlat,
  createFlat,
  getFlatById,
  getFlatOfUser, removeFlatmate, updateFlat
};

