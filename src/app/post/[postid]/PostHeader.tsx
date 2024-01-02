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
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/authAtom';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

interface IProps {
    data: IPost;
}

export default function PostHeader({ data }: IProps) {
    const {
        date,
        id,
        title,
        user_id,
        user,
        created_at,
        max_join,
        join_user_id,
    } = data;
    const [userInfo, setUserInfo] = useRecoilState(userState);

    const { deletePost, modifyPost } = useQueryPost();

    function onClickDelete() {
        deletePost.mutate(id);
    }

    async function onClickJoin() {
        if (!userInfo.id) return toast.error('로그인 후 이용가능합니다.');
        await axios.put(`/api/user/${userInfo.id}`, { join_posts_id: id });

        modifyPost.mutate({
            Row: { join_user_id: [...join_user_id, userInfo.id] },
            postid: id,
        });
    }
    async function onClickCancelJoin() {
        await axios.put(`/api/user/${userInfo.id}`, {
            join_posts_id: id,
        });
        const newJoinUser = join_user_id.filter((id) => id !== userInfo.id);
        modifyPost.mutate({
            Row: { join_user_id: newJoinUser },
            postid: id,
        });
    }

    const newCreateAt = new Date(created_at);

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
                        {dayjs(newCreateAt).format('YYYY-MM-DD H시M분')}
                    </Typography>
                </div>
                {userInfo.id === user_id && (
                    <div className='flex gap-1 items-center'>
                        <Link href={`/post/modify/${id}`}>
                            <Button
                                className='text-black hover:bg-transparent rounded-lg'
                                variant='contained'
                            >
                                수정하기
                            </Button>
                        </Link>
                        <Button
                            onClick={onClickDelete}
                            className='text-black hover:bg-transparent rounded-lg'
                            variant='contained'
                        >
                            삭제하기
                        </Button>
                    </div>
                )}
            </div>

            <div className='flex justify-between'>
                <Typography variant='h4' className='font-semibold'>
                    {title}
                </Typography>
                {!join_user_id.includes(userInfo.id) ||
                    (id !== userInfo.id && (
                        <Button
                            disabled={join_user_id.length === max_join}
                            onClick={onClickJoin}
                            className='text-black hover:bg-transparent rounded-lg'
                            variant='contained'
                        >
                            {join_user_id.length}/{max_join} 참여하기
                        </Button>
                    ))}

                {join_user_id.includes(userInfo.id) && (
                    <Button
                        onClick={onClickCancelJoin}
                        className='text-black hover:bg-transparent rounded-lg'
                        variant='contained'
                    >
                        {join_user_id.length}/{max_join} 참여취소
                    </Button>
                )}
            </div>
        </>
    );
}
