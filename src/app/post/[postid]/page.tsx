'use client';
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import Button from '@mui/material/Button';
import PostMap from './PostMap';
import { TextField, Typography } from '@mui/material';
import useQueryPost from '@/hooks/useQueryPost';
import { redirect } from 'next/navigation';
interface IPostPage {
    params: { postid: string };
}

export default function PostPage({ params: { postid } }: IPostPage) {
    const { post, loading, error } = useQueryPost(postid);

    // if (!loading && !post) {
    //     return redirect('../');
    // }

    console.log(post);
    // const {
    //     category,
    //     content,
    //     created_at,
    //     date,
    //     id,
    //     location,
    //     picture,
    //     title,
    //     user_id,
    // } = post[0];

    return (
        <section className='bg-white w-full min-h-screen flex flex-col gap-4 p-4 text-black'>
            {loading ? (
                <>로딩중</>
            ) : (
                <>
                    <div className='flex items-center gap-1'>
                        <Avatar src='/broken-image.jpg' />
                        <Typography>닉네임</Typography>
                        <Typography className='text-xs text-neutral-400'>
                            2023년12월28일
                        </Typography>
                    </div>
                    <div className='flex justify-between'>
                        <Typography variant='h4' className='font-semibold'>
                            제목
                        </Typography>
                        <Button
                            className='text-black hover:bg-transparent rounded-lg'
                            variant='contained'
                        >
                            참여하기
                        </Button>
                    </div>
                    <div className='bg-red-500 w-full h-[500px] mx-auto' />
                    <Typography variant='h4' className='font-semibold'>
                        내용
                    </Typography>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deleniti ullam aut expedita possimus aliquid a labore
                        optio porro! Maiores aliquam recusandae amet in odit
                        blanditiis exercitationem tempore. Minus, deleniti odit!
                    </p>
                    <Typography variant='h4' className='font-semibold'>
                        장소
                    </Typography>
                    <PostMap location={post[0].location} />
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
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Nam doloribus explicabo
                                    cupiditate alias vitae tempora quo nulla
                                    nobis, excepturi quia nesciunt facilis.
                                    Deserunt animi aperiam ab veniam quod quo
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
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Nam doloribus explicabo
                                    cupiditate alias vitae tempora quo nulla
                                    nobis, excepturi quia nesciunt facilis.
                                    Deserunt animi aperiam ab veniam quod quo
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
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Nam doloribus explicabo
                                    cupiditate alias vitae tempora quo nulla
                                    nobis, excepturi quia nesciunt facilis.
                                    Deserunt animi aperiam ab veniam quod quo
                                    deleniti?
                                </p>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <form>
                        <TextField
                            fullWidth
                            multiline
                            id='standard-basic'
                            label='댓글 작성하기'
                            variant='outlined'
                            rows={4}
                        />
                    </form>
                </>
            )}
        </section>
    );
}
