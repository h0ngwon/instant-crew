import { supabase } from '@/apis/dbApi';
import { useSearchParams } from 'next/navigation';
import { NextRequest } from 'next/server';

interface IProps {
    req: NextRequest;
    context: { postid: string };
}

// export async function GET({ req, params: { postid } }: IProps) {
//     const body = req.json();

//     console.log('서버~~~~~~~~~');
//     console.log(postid);
//     // const post = await supabase.from('post').select();
// }

export const GET = async ({ req, context }: IProps) => {
    let { data: post, error } = await supabase.from('post').select('*');
    // return NextResponse.json(post);
    // return post;
    console.log(context);
    console.log(req);

    // console.log(params.postid);

    return new Response(JSON.stringify(post), { status: 200 });
};
