const {
  getFlatById,
  updateFlat,
  deleteFlat,
  removeFlatmate,
} = require('@/model/flat');
import { createAdminClient } from '@/utils/supabase/admin';

export async function getFlatOfUserController() {
  const supabase = await createAdminClient();
  const userResponse = await supabase.auth.getUser();
  if (!userResponse.data.user) {
    return { flat: null, error: 'User not authenticated' };
  }

  const userId = userResponse.data.user.id;
  const { data: flatIdData, error: flatIdError } = await supabase
    .from('flats_have_users')
    .select('flat')
    .eq('user', userId)
    .single();

  if (flatIdError || !flatIdData) {
    return { flat: null, error: 'Flat not found' };
  }

  const { data: flatData, error: flatError } = await supabase
    .from('flats')
    .select('*')
    .eq('id', flatIdData.flat)
    .single();

  if (flatError || !flatData) {
    return { flat: null, error: 'Flat not found' };
  }

  // Get admin info from auth
  const { data: adminUser, error: adminUserError } = await supabase.auth.admin.getUserById(flatData.admin);
  if (adminUserError || !adminUser?.user) {
    return { flat: null, error: 'Admin not found' };
  }

  // Get members' ids
  const { data: membersData, error: membersError } = await supabase
    .from('flats_have_users')
    .select('user')
    .eq('flat', flatIdData.flat);

  if (membersError) {
    return { flat: null, error: 'Failed to fetch members' };
  }

  // Fetch member profiles from auth
  const memberIds = membersData.map((m) => m.user);
  const members = [];
  for (const id of memberIds) {
    const { data: memberUser, error: memberUserError } = await supabase.auth.admin.getUserById(id);
    if (memberUser && memberUser.user) {
      members.push({
        id: memberUser.user.id,
        name: memberUser.user.user_metadata?.full_name || memberUser.user.email,
      });
    }
  }

  return {
    flat: {
      id: flatData.id,
      name: flatData.name,
      admin: {
        id: adminUser.user.id,
        name: adminUser.user.user_metadata?.full_name || adminUser.user.email,
      },
      inviteToken: flatData.inviteToken,
      members,
    },
    error: null,
  };
}

export async function editFlatController(flatId, updatedData) {
  const { updatedFlat, error } = await updateFlat(flatId, updatedData);
  if (error) {
    throw new Error(error.message);
  }
  return updatedFlat;
}

export async function deleteFlatController(flatId) {
  try {
    const { error } = await deleteFlat(flatId);
    if (error) {
      return { error };
    }
    return { error: null };
  } catch (err) {
    console.error('Error in deleteFlatController:', err);
    return { error: err };
  }
}

export async function getFlatByIdController(flatId) {
  const { flat, error } = await getFlatById(flatId);
  if (error) {
    return null;
  }
  return flat;
}

export async function leaveFlatController(flatId, userId) {
  const { flat, error: flatError } = await getFlatById(flatId);
  if (flatError || !flat) {
    throw { message: 'Flat not found' };
  }

  const { error } = await removeFlatmate(flatId, userId);
  if (error) {
    throw { message: error.message };
  }

  return { message: 'Successfully left the flat' };
}
