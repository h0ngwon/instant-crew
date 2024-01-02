import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { TextField, Typography } from '@mui/material';
import { IPost } from '@/hooks/useQueryPost';
import useQueryComment, { IComment } from '@/hooks/useQueryComment';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { supabase } from '@/apis/dbApi';

interface IProps {
    postData: IPost;
}

export default function PostComment({ postData }: IProps) {
    // 코멘트 데이터 조회하려면 필요한거
    // 각 게시글에 맞는 코멘트를 조회한다.
    // 각 게시글마다 코맨트 조회하려면 post_id
    // post_id
    // comments: []
    const { getComment } = useQueryComment(postData.id, postData.picture);

    const postTime = (createat: string) => {
        const date = dayjs(createat).format('YY.MM.DD HH:mm');
        return date;
    };

    return (
        <>
            <Typography variant='h4' className='font-semibold'>
                댓글
            </Typography>
            <div className='flex gap-4 flex-col '>
                {getComment?.map((item) => {
                    return (
                        <div className='flex gap-4' key={item.id}>
                            <Avatar src={item.user.profile_pic} />
                            <div className='flex flex-col'>
                                <span>
                                    {item.user.nickname}{' '}
                                    <strong className='text-gray-400'>
                                        {postTime(item.created_at)}
                                    </strong>
                                </span>
                                <p>{item.content}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
