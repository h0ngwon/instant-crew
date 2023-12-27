import { supabase } from '../dbApi';
import { NextResponse } from 'next/server';
export const GET = async () => {
    let { data: post, error } = await supabase.from('post').select('*');
    // return NextResponse.json(post);
    return post;
};
