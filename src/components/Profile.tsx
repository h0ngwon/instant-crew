'use client';
import Image from 'next/image';
import React from 'react';

const Profile = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <Image src='/img/avatar.png' width={150} height={150} alt='avatar' />
            <h1 className='m-8 font-bold text-[48px]'>이름</h1>
        </div>
    );
};

export default Profile;
