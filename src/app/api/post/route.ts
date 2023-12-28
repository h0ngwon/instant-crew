import { NextResponse } from 'next/server';
import { supabase } from '@/apis/dbApi';

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
