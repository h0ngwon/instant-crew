import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../dbApi';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/authAtom';

export const signOut = async () => {
    try {
        const res = await supabase.auth.signOut();
        console.log({ res });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export async function GET(req: NextRequest) {
    const data = await signOut();
    return NextResponse.json(data);
}
