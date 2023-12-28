import { PostType } from '@/components/BoardMain';
import { NextResponse } from 'next/server';
import { supabase } from '@/apis/dbApi';

export const GET = async () => {
    let { data: post, error } = await supabase.from('post').select('*');
    // return NextResponse.json(post);
    return post;
};

export async function POST(req: Request, res: NextResponse) {
    const body = await req.json();
    console.log(body);
    const { file, ...rest } = body;

    const { data, error } = await supabase
        .from('post')
        .insert([
            {
                ...rest,
            },
        ])
        .select();

    console.log(data);
    console.log(error);
    // if (error) {
    //     return new Response(JSON.stringify({ message: error }), {
    //         status: 500,
    //     });
    // } else {
    //     console.log(data);
    //     return new Response(
    //         JSON.stringify({ message: '파일업로드에 성공하였습니다.' }),
    //         {
    //             status: 200,
    //         },
    //     );
    // }
}
const PAGE_SIZE = 10;
export const GET_POST_BY_PAGE = async (page: number = 0) => {
    const { data, count } = await supabase
        .from('post')
        .select('', { count: 'exact' })
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    console.log(data);
    console.log('총 개수:', count);
    //@ts-ignore
    return data as PostType[];
};

export const GET_POST_BY_PAGE_AND_CATEGORY = async (
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
    return await GET_POST_BY_PAGE(page);
};
