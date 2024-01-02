'use client';

import { supabase } from '@/app/api/dbApi';
import { AuthType, userState } from '@/recoil/authAtom';
import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { DebouncedFunc, debounce } from 'lodash';

const ProfileModifyForm = () => {
    const [userInfo, setUserInfo] = useRecoilState<AuthType>(userState);
    const [file, setFile] = useState<string | null>();
    const [userNickname, setUserNickname] = useState<string>(
        userInfo.full_name,
    );

    const prevImg = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const fileInput = event.target;
        if (fileInput.files) {
            const imgFile: File | null = fileInput.files[0];

            // make preview url
            const imageurl: string = URL.createObjectURL(imgFile);
            setFile(imageurl);
        }
    };

    const nicknameHandler: DebouncedFunc<
        (e: React.ChangeEvent<HTMLInputElement>) => void
    > = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setUserNickname(e.target.value);
    }, 300);

    const submitHandler = async (
        e: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        e.preventDefault();
        //TODO storage upload -> databae update -> recoil mutate
        try {
            const { data, error } = await supabase
                .from('user')
                .update({
                    nickname: userNickname ?? userInfo.full_name,
                    profile_pic: file ?? userInfo.avatar_url,
                })
                .eq('email', userInfo.email);
            console.log(userInfo.full_name, userInfo.avatar_url);
            console.log(data, error);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form
            className='flex flex-col justify-center items-center gap-[10px]'
            onSubmit={submitHandler}
        >
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
            <TextField
                label='닉네임'
                color='warning'
                required
                defaultValue={userInfo.full_name}
                onChange={nicknameHandler}
            ></TextField>
            <Button
                type='submit'
                className='bg-main-color hover:bg-main-background hover:text-main-color'
                variant='contained'
            >
                프로필 변경
            </Button>
        </form>
    );
};

export default ProfileModifyForm;
