import { supabase } from '@/apis/dbApi';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextResponse) {
    const formData = await req.formData();

    const file = formData.get('file') as File;
    console.log(file);

    const { data, error } = await supabase.storage
        .from('post')
        .upload(`/${file.name}`, file!);

    if (error) {
        return new Response(JSON.stringify({ message: error }), {
            status: 500,
        });
    } else {
        console.log(data);
        return new Response(
            JSON.stringify({ message: '파일업로드에 성공하였습니다.' }),
            {
                status: 200,
            },
        );
    }
}
