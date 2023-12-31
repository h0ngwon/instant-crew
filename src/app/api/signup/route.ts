import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../dbApi';

interface authInput {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
}

const signUp = async ({ email, password, nickname }: authInput) => {
    const defaultImg =
        'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F26470D3654FC08C40C';

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: nickname,
                avatar_url: defaultImg,
            },
        },
    });

    return { data, error };
};

export async function POST(req: NextRequest) {
    const data = await req.json();
    const signup = await signUp(data);

    return NextResponse.json(signup);
}
