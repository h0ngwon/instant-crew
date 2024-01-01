import { supabase } from '@/apis/dbApi';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { ...rest } = body;

    const { data, error } = await supabase
        .from('comment')
        .insert({ ...rest })
        .select();

    if (error) {
        return new Response(JSON.stringify({ message: error }), {
            status: 500,
        });
    } else {
        return NextResponse.json(data);
    }
}
