import { Provider } from '@supabase/supabase-js';
import { supabase } from './dbApi';
import { v4 as uuidv4 } from 'uuid';
import { Url } from 'next/dist/shared/lib/router/router';

export interface authInput {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
    profile_pic: string;
}

// 회원가입
export const signUp = async ({
    email,
    password,
    nickname,
    profile_pic,
}: authInput) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                nickname,
                profile_pic,
            },
        },
    });

    return { data, error };
};

// 로그인
export const signIn = async ({
    email,
    password,
}: Pick<authInput, 'email' | 'password'>) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    // console.log(data, error);
    return { data, error };
};

// 구글 로그인
export const googleSignIn = async () => {
    const { data: response, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });
    return { response, error };
};

// 로그아웃
export const signOut = async () => {
    try {
        await supabase.auth.signOut();
    } catch (error) {
        console.log(error);
    }
};

// 유저정보
export const getUser = async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
    return { user };
    // return user;
};
