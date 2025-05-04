// flats.js
import { createClient } from '@/utils/supabase/server';

export async function getFlatOfUser() {
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser()).data.user.id;
  const flatIdOfUser = await supabase
    .from('flats_have_users')
    .select('flat')
    .eq('user', userId);
  const flat = await supabase
    .from('flats')
    .select('*')
    .eq('id', flatIdOfUser.data[0].flat);

  const flatAdminId = flat.data[0].admin;
  const flatInviteToken = flat.data[0].id;
  const flatName = flat.data[0].name;

  const flatMembers = await supabase
    .from('flats_have_users')
    .select('user')
    .eq('flat', flatIdOfUser.data[0].flat);

  const flatMembersId = flatMembers.data.map((member) => member.user);

  const flatObject = {
    inviteToken: flatInviteToken,
    admin: flatAdminId,
    name: flatName,
    members: flatMembersId,
  };

  return { flat: flatObject, error: flat.error };
}

export async function createFlat(name, adminId) {
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

export async function addFlatmateToFlat(flatId, userId) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('flats_have_users')
    .insert({ flat: flatId, user: userId });
  return { error };
}

// export async function getFlats() {
//   const supabase = createClient();
//   const { data: flats, error } = await supabase.from('flats').select('*');
//   return { flats, error };
// }

// export async function getFlatById(flatId) {
//   const supabase = createClient();
//   const { data: flat, error } = await supabase
//     .from('flats')
//     .select('*')
//     .eq('id', flatId);
//   return { flat, error };
// }

// export async function updateFlat(flatId, updateData) {
//   const supabase = createClient();
//   const { data: updatedFlat, error } = await supabase
//     .from('flats')
//     .update(updateData)
//     .eq('id', flatId);
//   return { updatedFlat, error };
// }

// export async function deleteFlat(flatId) {
//   const supabase = createClient();
//   const { error } = await supabase.from('flats').delete().eq('id', flatId);
//   return { error };
// }

// export async function removeFlatmateFromFlat(flatId, userId) {
//   const supabase = createClient();
//   const { error } = await supabase
//     .from('flats_have_users')
//     .delete()
//     .eq('flat', flatId)
//     .eq('user', userId);
//   return { error };
// }

export async function transferAdminPrivileges(flatId, newAdminId) {
  const supabase = createClient();
  const { error } = await supabase
    .from('flats')
    .update({ admin_id: newAdminId })
    .eq('id', flatId);
  return { error };
}
