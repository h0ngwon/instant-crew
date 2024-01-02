import { supabase } from '@/apis/dbApi';
import { Database } from '@/types/db';
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

//
export async function PUT(
    req: NextRequest,
    context: { params: { uid: string } },
) {
    const {
        params: { uid },
    } = context;

    const { data, error } = await supabase
        .from('user')
        .select('join_posts_id')
        .eq('id', uid)
        .single();

    if (error) {
        return new Response(JSON.stringify({ message: error }), {
            status: 400,
        });
    }

    const body = await req.json();
    const { join_posts_id } = body;
    const currentJoinPostsId = data.join_posts_id || [];

    console.log(currentJoinPostsId);

    const updatedJoinPostsId = currentJoinPostsId.includes(join_posts_id)
        ? currentJoinPostsId.filter((id) => id !== join_posts_id)
        : [...currentJoinPostsId, join_posts_id];

    const { data: user, error: updateError } = await supabase
        .from('user')
        .update({
            ...body,
            join_posts_id: updatedJoinPostsId,
        })
        .eq('id', uid)
        .select();

    console.log(updateError);
    if (updateError) {
        return new Response(JSON.stringify({ message: updateError }), {
            status: 400,
        });
    }

    return NextResponse.json(user);
}
