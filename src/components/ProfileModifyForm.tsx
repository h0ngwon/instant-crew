'use client';
import { supabase } from '@/app/api/dbApi';
import { AuthType, userState } from '@/recoil/authAtom';
import { Button, TextField } from '@mui/material';
import { DebouncedFunc, debounce } from 'lodash';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const ProfileModifyForm = () => {
    const [userInfo, setUserInfo] = useRecoilState<AuthType>(userState);
    const [file, setFile] = useState<File | undefined>();
    const [prevImage, setPrevImage] = useState<string | undefined>();
    const [userNickname, setUserNickname] = useState<string>(
        userInfo.full_name,
    );

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
        //TODO storage upload -> databae update -> recoil mutate

        //storage upload
        try {
            if (file) {
                await supabase.storage
                    .from('user')
                    .update(`${userInfo.id}/profile`, file, {
                        cacheControl: '300',
                        upsert: true,
                    });
            }
        } catch (error) {
            throw new Error();
        }

        //database update
        try {
            const { data } = await supabase.storage
                .from('user')
                .getPublicUrl(`${userInfo.id}/profile`);

            const profilePicUrl = data?.publicUrl ?? userInfo.profile_pic;

            await supabase
                .from('user')
                .update({
                    nickname: userNickname ?? userInfo.full_name,
                    profile_pic: profilePicUrl,
                })
                .eq('email', userInfo.email);
        } catch (error) {
            throw new Error();
        }

        //recoil update
        try {
            const { data } = await supabase
                .from('user')
                .select()
                .eq('email', userInfo.email);
            console.log(data);
            if (data) {
                setUserInfo({
                    ...userInfo,
                    profile_pic: data[0].profile_pic ?? '',
                    full_name: data[0].nickname,
                });
            }
            await supabase.auth.updateUser({
                data: {
                    profile_pic: userInfo.profile_pic ?? '',
                    full_name: userInfo.full_name,
                },
            });
        } catch (error) {
            throw new Error();
        }
        console.log(userInfo);

        await supabase.auth.updateUser({
            data: {
                profile_pic: userInfo.profile_pic ?? '',
                full_name: userInfo.full_name,
            },
        });
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
                        src={
                            prevImage ??
                            userInfo.profile_pic ??
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
