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
