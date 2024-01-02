'use client';

import { supabase } from '@/app/api/dbApi';
import { AuthType, userState } from '@/recoil/authAtom';
import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

const ProfileModifyForm = () => {
    const [userInfo, setUserInfo] = useRecoilState<AuthType>(userState);
    const [file, setFile] = useState<string | null>();

    const prevImg = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const fileInput = event.target;
        if (fileInput.files) {
            const imgFile: File | null = fileInput.files[0];

            // make preview url
            const imageurl: string = URL.createObjectURL(imgFile);
            setFile(imageurl);
        }
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        //TODO database update -> storage upload -> recoil mutate
        const { error } = await supabase.from('user').update({nickname, profile_pic: file})
    }
    return (
        <form className='flex flex-col justify-center items-center gap-[10px]' onSubmit={submitHandler}>
            <label>
                <div>
                    <Image
                        className='cursor-pointer'
                        src={file ?? userInfo.avatar_url ?? '/img/avatar.png'}
                        alt='avatar'
                        width={200}
                        height={200}
                        quality={100}
                    />
                </div>
                <input
                    type='file'
                    className='hidden'
                    onChange={prevImg}
                    accept='image/*'
                />
            </label>
            <TextField label='닉네임' color='warning' required defaultValue={userInfo.full_name}></TextField>
            <Button
                className='bg-main-color hover:bg-main-background hover:text-main-color'
                variant='contained'
            >
                프로필 변경
            </Button>
        </form>
    );
};

export default ProfileModifyForm;
