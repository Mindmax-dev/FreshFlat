const { createClient } = require('@/utils/supabase/server');

async function getFlatOfUser() {
  const supabase = await createClient();
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
    .single(); // Use .single() to get a single record

  const flatAdminId = flat.data.admin;
  const flatId = flat.data.id;
  const flatName = flat.data.name;

  const flatMembers = await supabase
    .from('flats_have_users')
    .select('user')
    .eq('flat', flatIdOfUser.data[0].flat);

  const flatMembersId = flatMembers.data.map((member) => member.user);

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
  const supabase = await createClient();
  const { data: flat, error } = await supabase
    .from('flats')
    .insert({
      name: name,
      admin: adminId,
    })
    .select();

  await addFlatmateToFlat(flat[0].id, adminId);

  return { flat, error };
}

async function addFlatmateToFlat(flatId, userId) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('flats_have_users')
    .insert({ flat: flatId, user: userId });
  return { error };
}

async function updateFlat(flatId, updateData) {
  const supabase = await createClient();
  const { data: updatedFlat, error } = await supabase
    .from('flats')
    .update(updateData)
    .eq('id', flatId)
    .select()
    .single(); // Use .single() to get a single updated record
  return { updatedFlat, error };
}

async function deleteFlat(flatId) {
  const supabase = await createClient();
  const { error } = await supabase.from('flats').delete().eq('id', flatId);
  return { error };
}

async function getFlatById(flatId) {
  const supabase = await createClient();
  const { data: flat, error } = await supabase
    .from('flats')
    .select('*')
    .eq('id', flatId)
    .single(); // Use .single() to get a single record
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

module.exports = {
  getFlatOfUser,
  createFlat,
  addFlatmateToFlat,
  updateFlat,
  deleteFlat,
  getFlatById,
};