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
    } = data;

    const {
        data: userData,
        isError,
        isLoading,
    } = useQuery({
        queryFn: async () => {
            const response = await axios.get(`/api/user/${user_id}`);
            return response.data[0];
        },
        queryKey: ['user', user_id],
    });

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
            {userData ? (
                <div className='flex items-center gap-1'>
                    <Avatar src={userData.profile_pic} />
                    <Typography>{userData.nickname}</Typography>
                    <Typography className='text-xs text-neutral-400'>
                        {date}
                    </Typography>
                </div>
            ) : (
                <>로딩중</>
            )}

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
                <Button
                    onClick={onClickDelete}
                    className='text-black hover:bg-transparent rounded-lg'
                    variant='contained'
                >
                    삭제하기(테스트)
                </Button>
            </div>
        </>
    );
}
