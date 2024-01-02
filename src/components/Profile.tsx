'use client';
import { getUser } from '@/apis/auth';
import { AuthType, userState } from '@/recoil/authAtom';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const Profile = () => {
    const [test, setTest] = useState<User | null>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUser();

            if (data) {
                setTest(data.user);
            }
        };
        fetchData();
    }, []);

    if (!test === undefined) {
        return null;
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            {test?.user_metadata.avatar_url && (
                <Image
                    src={`${test?.user_metadata.avatar_url}`}
                    width={150}
                    height={150}
                    alt='avatar'
                />
            )}
            <h1 className='m-8 font-bold text-[48px]'>{test?.user_metadata.full_name}</h1>
        </div>
    );
};

export default Profile;
