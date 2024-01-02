'use client';
import { getUser } from '@/apis/auth';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const getUserInfo = async (): Promise<{
        user: User | null;
    }> => {
        try {
            const res: {
                user: User | null;
            } = await getUser();
            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const fetchUserData = async (): Promise<void> => {
        const data: {
            user: User | null;
        } = await getUserInfo()
        setUserInfo(data.user);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (userInfo?.user_metadata.avatar_url === undefined) return null;

    return (
        <div className='flex flex-col justify-center items-center'>
            <Image
                priority
                src={`${userInfo?.user_metadata.avatar_url}`}
                width={150}
                height={150}
                alt='avatar'
            />
            <h1 className='m-8 font-bold text-[48px]'>
                {userInfo?.user_metadata.name}
            </h1>
        </div>
    );
};

export default Profile;
