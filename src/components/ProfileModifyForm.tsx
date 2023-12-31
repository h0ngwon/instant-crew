'use client';
import { getUser } from '@/apis/auth';
import { supabase } from '@/app/api/dbApi';
import { AuthType, userState } from '@/recoil/authAtom';
import { Button, TextField } from '@mui/material';
import { User } from '@supabase/supabase-js';
import { DebouncedFunc, debounce } from 'lodash';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ProfileType } from './Profile';

const ProfileModifyForm = () => {
    const [userInfo, setUserInfo] = useRecoilState<AuthType>(userState);
    const [file, setFile] = useState<File | undefined>();
    const [prevImage, setPrevImage] = useState<string | undefined>();
    const [userNickname, setUserNickname] = useState<string>(
        userInfo.full_name,
    );
    const [test, setTest] = useState<User | null>();
    const [profile, setProfile] = useState<ProfileType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUser();
            const { data, error } = await supabase
                .from('user')
                .select()
                .eq('id', userData.user?.user_metadata[0].id);
            if (data) {
                setProfile(data);
            }
            if (data) {
                setTest(userData.user);
            }
        };
        fetchData();
    }, []);

    const prevImg = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files[0]) {
            const imgFile: File | null = fileInput.files[0];
            setFile(imgFile);
            // make preview url
            const imageUrl: string = URL.createObjectURL(imgFile);
            setPrevImage(imageUrl);
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
        //TODO storage upload -> databae update ->

        //storage upload
        try {
            if (file) {
                await supabase.storage
                    .from('user')
                    .update(`${test?.id}/profile`, file);
            }
        } catch (error) {
            throw new Error();
        }

        //database update
        try {
            const { data } = await supabase.storage
                .from('user')
                .getPublicUrl(`${test?.id}/profile`);

            const profilePicUrl =
                data?.publicUrl ?? test?.user_metadata.avatar_url;

            await supabase
                .from('user')
                .update({
                    nickname: userNickname ?? test?.user_metadata.full_name,
                    profile_pic: profilePicUrl,
                })
                .eq('email', test?.user_metadata.email);
        } catch (error) {
            throw new Error();
        }

        try {
            const { data } = await supabase
                .from('user')
                .select()
                .eq('email', test?.user_metadata.email);
            console.log(data);

            if (data) {
                await supabase.auth.updateUser({
                    data: {
                        ...data,
                        full_name: data[0].nickname,
                        avatar_url: data[0].profile_pic,
                    },
                });
            }
        } catch (error) {
            throw new Error();
        }
    };

    console.log(profile);

    return (
        <form
            className='flex flex-col justify-center items-center gap-[10px]'
            onSubmit={submitHandler}
        >
            <label>
                <div>
                    <Image
                        className='cursor-pointer'
                        src={
                            prevImage ??
                            profile[0]?.profile_pic ??
                            '/img/avatar.png'
                        }
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
                color='warning'
                required
                defaultValue={profile[0]?.nickname}
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
