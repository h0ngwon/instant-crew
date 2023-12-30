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
        .select('*')
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
    const { data, error: storageError } = await supabase.storage
        .from('post')
        .remove([`${postid}/picture`]);
};
