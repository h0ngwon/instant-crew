'use client';
import React from 'react';
import PostMap from './PostMap';
import useQueryPost from '@/hooks/useQueryPost';
import PostComment from './PostComment';
import PostCommentForm from './PostCommentForm';
import { redirect } from 'next/navigation';
import PostHeader from './PostHeader';
interface IPostPage {
    params: { postid: string };
}

export default function PostPage({ params: { postid } }: IPostPage) {
    const { post, loading, error } = useQueryPost(postid);

    if (!loading && !post) {
        return redirect('../');
    }

    return (
        <section className='bg-white w-full min-h-screen flex flex-col gap-4 p-4 text-black'>
            {loading && <>로딩중</>}
            {post && (
                <>
                    <PostHeader data={post![0]} />
                    <PostMap data={post![0]} />
                    <PostComment postData={post![0]} />
                    <PostCommentForm postData={post![0]} />
                </>
            )}
        </section>
    );
}
