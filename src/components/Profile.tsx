'use client';
import { AuthType, userState } from '@/recoil/authAtom';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

const Profile = () => {
    const [userInfo, setUserInfo] = useRecoilState<AuthType>(userState);

    if (!userInfo === undefined) {
        return null;
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            {userInfo.avatar_url && (
                <Image
                    src={`${userInfo.avatar_url}`}
                    width={150}
                    height={150}
                    alt='avatar'
                />
            )}
            <h1 className='m-8 font-bold text-[48px]'>{userInfo.full_name}</h1>
        </div>
    );
};

export default Profile;
