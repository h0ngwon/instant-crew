'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    GET_POST_BY_PAGE,
    GET_POST_BY_PAGE_AND_CATEGORY,
} from '@/app/api/post/route';
import dayjs from 'dayjs';

export type PostType = {
    category: string;
    content: string;
    created_at: string;
    date: string;
    id: string;
    location: string | null;
    picture: string | null;
    title: string;
    user_id: string | null;
};

export default function BoardMain({ category }: { category?: string }) {
    const [page, setPage] = useState<number>(0);
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        GET_POST_BY_PAGE_AND_CATEGORY(0, category).then((res) => {
            if (!res) return;
            setPage(0);
            setPosts(res);
        });
    }, [category]);

    useEffect(() => {
        if (!category) {
            GET_POST_BY_PAGE(page).then((res) => {
                if (!res) return;
                setPosts((prev) => [...prev, ...(res as PostType[])]);
            });
            return;
        }

        GET_POST_BY_PAGE_AND_CATEGORY(page, category).then((res) => {
            if (!res) return;
            setPosts((prev) => [...prev, ...(res as PostType[])]);
        });
    }, [page]);

    useEffect(() => {
        const handleInfinityScroll = () => {
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 1
                // 만약 0이라면 맨 밑에서 이벤트를 발생시켜줘, 1000 맨밑에서부터 1000px위에 있을때 이벤트를 발생시켜줘
            ) {
                // react-query + Obsecver 기능을 해가지고 더 편리하게 구현이 가능한거임
                setPage((prev) => prev + 1);
            }
        };
        window.addEventListener('scroll', handleInfinityScroll);
        return () => {
            window.removeEventListener('scroll', handleInfinityScroll);
        };
    }, []);

    const postTime = (createat: string) => {
        const date = dayjs(createat).format('YY.MM.DD HH:mm');
        return date;
    };

    return (
        <main className='max-w-[1200px] m-auto grid grid-cols-2 gap-[50px] p-10 h-max'>
            {posts.map((item, index) => (
                <div
                    key={index}
                    className='border-solid border-[1px] rounded-[1.5rem] h-[180px]'
                >
                    <div className='float-left w-[180px] mr-[20px]'>
                        <Image
                            src={item.picture as string}
                            alt='게시글 이미지'
                            className='w-[100%] h-[180px] rounded-l-3xl'
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className='float-left w-[170px]'>
                        <h1 className='my-[20px] text-[1.3rem] font-bold'>
                            {item.location}
                        </h1>
                        <div className='my-[10px] h-[40px] truncate'>
                            {item.title}
                        </div>
                        <div>{postTime(item.created_at)}</div>
                    </div>
                </div>
            ))}
        </main>
    );
}
