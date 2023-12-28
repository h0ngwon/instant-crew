import { supabase } from './dbApi';
import { v4 as uuidv4 } from 'uuid';

export interface authInput {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
}

// 회원가입
export const signUp = async ({ email, password, nickname }: authInput) => {
    const defaultPhotoUrl =
        'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F26470D3654FC08C40C';
    const uuid = uuidv4();
    try {
        await supabase.auth.signUp({
            email,
            password,
        });
        const { data } = await supabase.auth.updateUser({
            data: { nickname, defaultPhotoUrl, id: uuid },
        });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

// 로그인
export const signIn = async ({
    email,
    password,
}: Pick<authInput, 'email' | 'password'>) => {
    try {
        const { data } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

// 구글 로그인
export const googleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
            skipBrowserRedirect: true,
        },
    });
    console.log(data);
};

// 로그아웃
export const logout = async () => {
    try {
        const { error } = await supabase.auth.signOut();
    } catch (error) {
        console.log(error);
    }
};

// 유저정보
export const userInfo = async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
};
