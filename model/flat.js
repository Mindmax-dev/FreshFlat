import { createClient } from "@/utils/supabase/client";

export async function createFlat(flatData) {
    const supabase = createClient();
    const { data: flat, error } = await
        supabase.from('flats').insert([flatData]);
    return
}

export async function getFlats() {
    const supabase = createClient();
    const { data: flats, error } = await
        supabase.from('flats').select('*');
    return { flats, error };
}

export async function getFlatById(flatId) {
    const supabase = createClient();
    const { data: flat, error } = await
        supabase.from('flats').select('*').eq('id', flatId);
    return { flat, error };
}

export async function updateFlat(flatId, flatData) {
    const supabase = createClient();
    const { data: flat, error } = await
        supabase.from('flats').update(flatData).eq('id', flatId);
    return { flat, error };
}
