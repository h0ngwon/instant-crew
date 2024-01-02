import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../dbApi';

interface authInput {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
}

const signIn = async ({
    email,
    password,
}: Pick<authInput, 'email' | 'password'>) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
};

export async function POST(req: NextRequest) {
    const data = await req.json();
    const signup = await signIn(data);

    return NextResponse.json(signup);
}
