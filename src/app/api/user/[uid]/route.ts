import { supabase } from '@/apis/dbApi';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    context: { params: { uid: string } },
) {
    const {
        params: { uid },
    } = context;

    const { data: user, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', uid);

    console.log(user);
    if (error) {
        return new Response(JSON.stringify({ message: error }), {
            status: 400,
        });
    }

    return NextResponse.json(user);
}
