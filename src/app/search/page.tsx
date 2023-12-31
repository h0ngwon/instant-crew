import { supabase } from '@/apis/dbApi';
import Image from 'next/image';
import React from 'react';
interface Props {
    searchParams?: {
        search?: string;
    };
}
const search = async ({ searchParams }: Props) => {
    const { data: post, error } = await supabase
        .from('post')
        .select()
        .like('title', `%${searchParams?.search}%`);
    if (error) {
        alert('잘못된접근');
    }

    return (
        <>
            <main className='max-w-[1200px] m-auto grid grid-cols-2 gap-[50px] p-10 h-max'>
                {post?.length === 0 ? (
                    <p>검색어와 일치하는 결과가 없습니다.</p>
                ) : (
                    post?.map((item, index) => (
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
                                <div>{item.created_at}</div>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </>
    );
};

export default search;
