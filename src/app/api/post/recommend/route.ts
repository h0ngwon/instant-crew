import { supabase } from '@/app/api/dbApi';
import { NextResponse } from 'next/server';

export type Data = {
    category: string;
    content: string;
    created_at: string;
    date: string;
    id: string;
    location: string | null;
    picture: string | null;
    title: string;
    user_id: string | null;
}[];

export type RecommendData = NextResponse<Data[]>;

export const getRecommendData = async (): Promise<NextResponse<Data[]>> => {
    try {
        const { data, error } = await supabase
            .from('random_post')
            .select('*')
            .limit(2);
        if (error) throw new Error();
        return NextResponse.json(data);
    } catch (err) {
        throw new Error();
    }
};

export const GET = async (): Promise<RecommendData> => {
    try {
        const data: RecommendData = await getRecommendData();
        return data;
    } catch (error) {
        throw new Error();
    }
};
