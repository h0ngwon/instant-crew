import React from 'react';
import Avatar from '@mui/material/Avatar';
import { TextField, Typography } from '@mui/material';
import { IPost } from '@/hooks/useQueryPost';

interface IProps {
    data: IPost;
}
export default function PostComment({ data }: IProps) {
    return (
        <>
            <Typography variant='h4' className='font-semibold'>
                댓글
            </Typography>
            <div className='flex gap-4 flex-col '>
                <div className='flex gap-4'>
                    <Avatar src='/broken-image.jpg' />
                    <div className='flex flex-col'>
                        <span>
                            닉네임 <strong>시간</strong>
                        </span>

                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nam doloribus explicabo cupiditate alias vitae
                            tempora quo nulla nobis, excepturi quia nesciunt
                            facilis. Deserunt animi aperiam ab veniam quod quo
                            deleniti?
                        </p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <Avatar src='/broken-image.jpg' />
                    <div className='flex flex-col'>
                        <span>
                            닉네임 <strong>시간</strong>
                        </span>

                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nam doloribus explicabo cupiditate alias vitae
                            tempora quo nulla nobis, excepturi quia nesciunt
                            facilis. Deserunt animi aperiam ab veniam quod quo
                            deleniti?
                        </p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <Avatar src='/broken-image.jpg' />
                    <div className='flex flex-col'>
                        <span>
                            닉네임 <strong>시간</strong>
                        </span>

                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nam doloribus explicabo cupiditate alias vitae
                            tempora quo nulla nobis, excepturi quia nesciunt
                            facilis. Deserunt animi aperiam ab veniam quod quo
                            deleniti?
                        </p>
                    </div>
                </div>
            </div>
            {/*  */}
        </>
    );
}
