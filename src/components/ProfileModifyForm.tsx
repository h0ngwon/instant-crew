'use client';

import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

const ProfileModifyForm = () => {
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
    return (
        <form className='flex flex-col justify-center items-center gap-[10px]'>
            <label>
                <div>
                    <Image
                        className='cursor-pointer'
                        src={file ?? '/img/avatar.png'}
                        alt='avatar'
                        width={200}
                        height={200}
                    />
                </div>
                <input
                    type='file'
                    className='hidden'
                    onChange={prevImg}
                    accept='image/*'
                />
            </label>
            <TextField label='닉네임' color='warning' required></TextField>
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
