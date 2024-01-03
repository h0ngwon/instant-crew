'use client';
import { getUser } from '@/apis/auth';
import { supabase } from '@/apis/dbApi';
import { AuthType, userState } from '@/recoil/authAtom';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

interface ProfileType {
    email: string;
    id: string;
    nickname: string;
    join_posts_id: string[];
    profile_pic: string | null;
}

const Profile = () => {
    const [test, setTest] = useState<ProfileType[]>([]);
    const [userInfo, setUserInfo] = useRecoilState<AuthType>(userState);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUser();
            const { data, error } = await supabase
                .from('user')
                .select()
                .eq('id', userData.user?.user_metadata[0].id);
            if (data) {
                setTest(data);
            }
        };
        fetchData();
    }, []);

    console.log(test);

    return (
        <div className='flex flex-col justify-center items-center'>
            {test[0]?.profile_pic && (
                <Image
                    src={`${test[0]?.profile_pic ?? 'img/avatar.png'}`}
                    width={150}
                    height={150}
                    alt='avatar'
                />
            )}
            <h1 className='m-8 font-bold text-[48px]'>{test[0]?.nickname}</h1>
        </div>
    );
};

export default Profile;
