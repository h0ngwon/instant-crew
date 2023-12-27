import React from 'react';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import CreatePostMap from '@/components/createPost/CreatePostMap';
interface IPostPage {
    params: { postid: string };
}

export default function PostPage({ params: { postid } }: IPostPage) {
    return (
        <section className='bg-white w-full min-h-screen text-black'>
            <div className='flex'>
                <Avatar src='/broken-image.jpg' />
                <span>유저아이디 시간 등등</span>
            </div>
            <div>
                <div className='flex justify-between'>
                    <h1>제목</h1>
                    <button>참여하기</button>
                </div>
                <div className='bg-red-500 w-[500px] h-[500px] mx-auto' />
                <h1>내용</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti ullam aut expedita possimus aliquid a labore optio
                    porro! Maiores aliquam recusandae amet in odit blanditiis
                    exercitationem tempore. Minus, deleniti odit!
                </p>
                <CreatePostMap />
                <h1>댓글</h1>
                <div>
                    <div className='flex'>
                        <Avatar src='/broken-image.jpg' />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nam doloribus explicabo cupiditate alias vitae
                            tempora quo nulla nobis, excepturi quia nesciunt
                            facilis. Deserunt animi aperiam ab veniam quod quo
                            deleniti?
                        </p>
                    </div>
                    <div className='flex'>
                        <Avatar src='/broken-image.jpg' />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nam doloribus explicabo cupiditate alias vitae
                            tempora quo nulla nobis, excepturi quia nesciunt
                            facilis. Deserunt animi aperiam ab veniam quod quo
                            deleniti?
                        </p>
                    </div>
                </div>
                <form>
                    <textarea />
                </form>
            </div>
        </section>
    );
}
