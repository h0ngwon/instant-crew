import { supabase } from '@/apis/dbApi';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const formData = await req.formData();

    const file = formData.get('file') as File;
    console.log(file);

    const { data, error } = await supabase.storage
        .from('post')
        .upload(`/${file.name}`, file!);

    // if (error) {
    //     return new Response(JSON.stringify({ message: error }), {
    //         status: 500,
    //     });
    // }
    if (error) {
        console.log(error);
        return new Response(JSON.stringify({ error }), { status: 400 });
    } else {
        return NextResponse.json(data);
    }
}
