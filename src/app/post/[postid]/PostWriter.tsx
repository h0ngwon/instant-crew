'use client';
import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import useQueryPost, { IPost } from '@/hooks/useQueryPost';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

interface IProps {
    data: IPost;
}

export default function PostWriter({ data }: IProps) {
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
        user,
    } = data;

    // const {
    //     data: userData,
    //     isError,
    //     isLoading,

    // } = useQuery({
    //     queryFn: async () => {
    //         const response = await axios.get(`/api/user/${user_id}`);
    //         return response.data[0];
    //     },
    //     queryKey: ['user', user_id],
    // });

    const { deletePost } = useQueryPost();

    function onClickDelete() {
        deletePost.mutate(id);
    }

    useEffect(() => {
        if (deletePost.isSuccess) {
            console.log('Delete successful');
            redirect('../');
        }
    }, [deletePost.isSuccess]);

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-1'>
                    <Avatar src={user.profile_pic} />
                    <Typography>{user.nickname}</Typography>
                    <Typography className='text-xs text-neutral-400'>
                        {date}
                    </Typography>
                </div>
                <div>
                    <Link href={`/post/modify/${id}`}>
                        <Button
                            className='text-black hover:bg-transparent rounded-lg'
                            variant='contained'
                        >
                            수정하기(테스트)
                        </Button>
                    </Link>
                    <Button
                        onClick={onClickDelete}
                        className='text-black hover:bg-transparent rounded-lg'
                        variant='contained'
                    >
                        삭제하기(테스트)
                    </Button>
                </div>
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
        </>
    );
}
