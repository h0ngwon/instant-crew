import { PostType } from '@/components/BoardMain';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/apis/dbApi';

export const GET = async () => {
    let { data: post, error } = await supabase.from('post').select('*');
    return NextResponse.json(post);
};

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { file, ...rest } = body;

    const { data, error } = await supabase
        .from('post')
        .insert([
            {
                ...rest,
            },
        ])
        .select();

    if (error) {
        return new Response(JSON.stringify({ message: error }), {
            status: 500,
        });
    } else {
        return NextResponse.json(data);
    }
}
const PAGE_SIZE = 6;
export const getPostByPage = async (page: number = 0) => {
    const { data, count } = await supabase
        .from('post')
        .select('', { count: 'exact' })
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    console.log(data);
    console.log('총 개수:', count);
    //@ts-ignore
    return data as PostType[];
};

export const getPostByPageAndCategory = async (
    page: number = 0,
    category?: string,
) => {
    if (category) {
        const { data, count } = await supabase
            .from('post')
            .select('', { count: 'exact' })
            .eq('category', category)
            .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
        //@ts-ignore
        return data as PostType[];
    }
    return await getPostByPage(page);
};
