import { addFlatmateToFlat, getFlatById } from '@/model/flat';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(req) {
    try {
        const { inviteToken } = await req.json();
        if (!inviteToken) {
            return new Response(JSON.stringify({ error: 'Invite token is required' }), {
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

        const { flat, error: flatError } = await getFlatById(inviteToken);
        if (flatError || !flat) {
            return new Response(JSON.stringify({ error: 'Invalid invite token' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { data: members } = await supabase
            .from('flats_have_users')
            .select('user')
            .eq('flat', flat.id);
        const memberIds = members.map((m) => m.user);
        if (memberIds.includes(userId)) {
            return new Response(JSON.stringify({ error: 'You are already a member of this flat' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { error: joinError } = await addFlatmateToFlat(flat.id, userId);
        if (joinError) {
            return new Response(JSON.stringify({ error: joinError.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ flatId: flat.id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error in /api/flat/join:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}