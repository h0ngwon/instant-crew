import { supabase } from '@/apis/dbApi';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    context: { params: { postid: string } },
) => {
    const {
        params: { postid },
    } = context;

    let { data: post, error } = await supabase
        .from('comment')
        .select('*')
        .eq('post_id', postid);

    return NextResponse.json(post);
};
