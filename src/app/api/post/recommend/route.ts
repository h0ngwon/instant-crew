import { supabase } from '@/app/api/dbApi';
import { NextResponse } from 'next/server';

type Data = Promise<
    {
        category: string;
        content: string;
        created_at: string;
        date: string;
        id: string;
        location: string | null;
        picture: string | null;
        title: string;
        user_id: string | null;
    }[]
>;

export const getRecommendData = async (): Promise<any> => {
    try {
        const { data, error } = await supabase
            .from('post')
            .select('*')
            .order('random', { ascending: false })
            .limit(2);

        if (error) throw new Error();
        return NextResponse.json(data);
    } catch (err) {
        throw new Error();
    }
};

export const GET = async () => {
    const data = await getRecommendData();

    return data;
};
