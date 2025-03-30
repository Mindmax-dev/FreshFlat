// flats.js
import { createClient } from '@/utils/supabase/client';

export async function createFlat(name, adminId) {
    const supabase = createClient();
    const { data: flat, error } = await supabase.from('flats').insert([{ name, admin_id: adminId }]);
    return { flat, error };
}

export async function getFlats() {
    const supabase = createClient();
    const { data: flats, error } = await supabase.from('flats').select('*');
    return { flats, error };
}

export async function getFlatById(flatId) {
    const supabase = createClient();
    const { data: flat, error } = await supabase.from('flats').select('*').eq('id', flatId);
    return { flat, error };
}

export async function updateFlat(flatId, updateData) {
    const supabase = createClient();
    const { data: updatedFlat, error } = await supabase.from('flats').update(updateData).eq('id', flatId);
    return { updatedFlat, error };
}

export async function deleteFlat(flatId) {
    const supabase = createClient();
    const { error } = await supabase.from('flats').delete().eq('id', flatId);
    return { error };
}

export async function addFlatmateToFlat(flatId, userId) {
    const supabase = createClient();
    const { error } = await supabase.from('flats_have_users').insert({ flat: flatId, user: userId });
    return { error };
}

export async function removeFlatmateFromFlat(flatId, userId) {
    const supabase = createClient();
    const { error } = await supabase.from('flats_have_users').delete().eq('flat', flatId).eq('user', userId);
    return { error };
}

export async function transferAdminPrivileges(flatId, newAdminId) {
    const supabase = createClient();
    const { error } = await supabase.from('flats').update({ admin_id: newAdminId }).eq('id', flatId);
    return { error };
}