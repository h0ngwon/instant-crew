import { supabase } from '@/apis/dbApi';
import { useSearchParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    context: { params: { postid: string } },
) => {
    const {
        params: { postid },
    } = context;

    let { data: post, error } = await supabase
        .from('post')
        .select('*,user(nickname,profile_pic)')
        .eq('id', postid);

    return NextResponse.json(post);
};

export const DELETE = async (
    req: NextRequest,
    context: { params: { postid: string } },
) => {
    const {
        params: { postid },
    } = context;

    const { error } = await supabase.from('post').delete().eq('id', postid);

    if (error) {
        // 실패시 에러
        return new Response(JSON.stringify({ error }), { status: 400 });
    } else {
        const { data, error: storageError } = await supabase.storage
            .from('post')
            .remove([`${postid}/picture`]);

        return NextResponse.json(data);
    }
};

export const PUT = async (
    req: NextRequest,
    context: { params: { postid: string } },
) => {
    const {
        params: { postid },
    } = context;

    const { file, ...rest } = await req.json();

    console.log(rest);
    console.log(postid);
    const { data, error } = await supabase
        .from('post')
        .update(rest)
        .eq('id', postid)
        .select();

    console.log(data);
    console.log(error);

    if (error) {
        return new Response(JSON.stringify({ error }), { status: 400 });
    } else {
        return NextResponse.json(data);
    }
};
