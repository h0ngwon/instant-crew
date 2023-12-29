import { supabase } from '@/app/api/dbApi';
import { NextResponse } from 'next/server';
import { Data } from '../recommend/route';

export type RecommendData = NextResponse<Data[]>;

export const getRecentData = async (): Promise<NextResponse<Data[]>> => {
    try {
        const { data, error } = await supabase
            .from('random_post')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(4);
        if (error) throw new Error();
        return NextResponse.json(data);
    } catch (err) {
        throw new Error();
    }
};

export const GET = async (): Promise<RecommendData> => {
    try {
        const data: RecommendData = await getRecentData();
        return data;
    } catch (error) {
        throw new Error();
    }
};
