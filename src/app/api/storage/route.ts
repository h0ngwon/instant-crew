import { supabase } from '@/apis/dbApi';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    // 특정 경로저장필요,
    // 폼데이터에 버킷 및 경로 속성 추가필요
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const path = formData.get('path');
    const buckets = formData.get('buckerts') as string;

    // 중복시 덮어씌움
    const { data, error } = await supabase.storage
        .from(buckets)
        .upload(`${path}/${file.name}`, file!, { upsert: true });

    if (error) {
        // 실패시 에러
        return new Response(JSON.stringify({ error }), { status: 400 });
    } else {
        // 성공시 url얻어와서 res에 뿌려줌
        const { data: url } = supabase.storage
            .from(buckets)
            .getPublicUrl(data.path);

        return NextResponse.json(url);
    }
}
