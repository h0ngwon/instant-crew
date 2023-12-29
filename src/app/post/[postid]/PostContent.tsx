import React from 'react';
import Avatar from '@mui/material/Avatar';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { IPost } from '@/hooks/useQueryPost';
import Image from 'next/image';

interface IProps {
    data: IPost;
}

export default function PostContent({ data }: IProps) {
    const {
        category,
        content,
        created_at,
        date,
        id,
        location,
        picture,
        title,
        user_id,
    } = data;

    return (
        <>
            <div className='flex items-center gap-1'>
                <Avatar src='/broken-image.jpg' />
                <Typography>닉네임</Typography>
                <Typography className='text-xs text-neutral-400'>
                    {date}
                </Typography>
            </div>
            <div className='flex justify-between'>
                <Typography variant='h4' className='font-semibold'>
                    {title}
                </Typography>
                <Button
                    className='text-black hover:bg-transparent rounded-lg'
                    variant='contained'
                >
                    참여하기
                </Button>
            </div>
            <Image
                className='mx-auto w-full max-w-[800px] max-h-[400px]'
                src={picture}
                alt='picture'
                width={300}
                height={300}
            />
            <Typography variant='h4' className='font-semibold'>
                내용
            </Typography>
            <p>{content}</p>
        </>
    );
}
