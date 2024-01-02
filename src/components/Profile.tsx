'use client';
import { getUser } from '@/apis/auth';
import { supabase } from '@/apis/dbApi';
import { userState } from '@/recoil/authAtom';
import { PostgrestSingleResponse, User } from '@supabase/supabase-js';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

interface UserType {
    email: string;
    id: string;
    nickname: string;
    profile_pic: string | null;
}

const Profile = () => {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    
    // const [userInfo, setUserInfo] = useState<PostgrestSingleResponse<
    //     UserType[]
    // > | null>(null);

    // const getUserInfo = async (): Promise<{
    //     user: User | null;
    // }> => {
    //     try {
    //         const res: {
    //             user: User | null;
    //         } = await getUser();
    //         return res;
    //     } catch (error: any) {
    //         throw new Error(error.message);
    //     }
    // };

    // const fetchUserData = async (): Promise<void> => {
    //     const data: {
    //         user: User | null;
    //     } = await getUserInfo();

    //     const fetchUserInfo: PostgrestSingleResponse<UserType[]> =
    //         await supabase.from('user').select().eq('email', data.user?.email!);
    //     console.log(fetchUserInfo);

    //     if (fetchUserInfo) {
    //         setUserInfo(fetchUserInfo);
    //     }
    // };

    // useEffect(() => {
    //     fetchUserData();
    // }, []);

    if (!userInfo === undefined) {
        return null;
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <Image
                priority
                src={`${userInfo.avatar_url}`}
                width={150}
                height={150}
                alt='avatar'
            />
            <h1 className='m-8 font-bold text-[48px]'>{userInfo.full_name}</h1>
        </div>
    );
};

export default Profile;
