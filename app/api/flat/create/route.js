import { createFlat } from '@/model/flat';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(req) {
    try {
        const { name } = await req.json();
        if (!name) {
            return new Response(JSON.stringify({ error: 'Flat name is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const supabase = await createAdminClient();
        const userResponse = await supabase.auth.getUser();

        if (!userResponse.data.user) {
            return new Response(JSON.stringify({ error: 'User not authenticated' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const userId = userResponse.data.user.id;
        console.log('User ID:', userId);

        const { flat, error } = await createFlat(name, userId);
        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ flat }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error in /api/flat/create:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}