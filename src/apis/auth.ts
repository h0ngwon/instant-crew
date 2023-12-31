import { supabase } from './dbApi';

export interface authInput {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
}

// 회원가입
export const signUp = async ({ email, password, nickname }: authInput) => {
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
        localStorage.clear();
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
};

export const test = async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log(data);
};
