'use client';
import { getUser } from '@/apis/auth';
import { supabase } from '@/app/api/dbApi';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { PostData } from './MyPost';
import Image from 'next/image';
import dayjs from 'dayjs';

interface IJoin {
    join_posts_id: string[];
}

const Join = () => {
    const [user, setUser] = useState<User | null>();
    const [myJoin, setMyJoin] = useState<IJoin | null>();
    const [myPost, setMyPost] = useState<PostData[] | null>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUser();
            setUser(data.user);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('user')
                    .select('join_posts_id')
                    .eq('id', user?.user_metadata[0].id);

                if (data && data.length > 0) {
                    console.log(data[0])
                    setMyJoin(data[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const makePost = async () => {
        if (myJoin?.join_posts_id) {
            myJoin?.join_posts_id.map(async (item) => {
                try {
                    const { data, error } = await supabase
                        .from('post')
                        .select()
                        .eq('id', item);
                    if (error) {
                        console.log(error);
                    }
                    if (data && data.length > 0) {
                        console.log('inner==========', data);
                        setMyPost(data);
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        }
    };

    const postTime = (createat: string) => {
        const date = dayjs(createat).format('YY.MM.DD HH:mm');
        return date;
    };

    useEffect(() => {
        makePost();
    }, [myJoin]);

    console.log(myJoin);
    return (
        <div>
            <div className='w-[100%] h-[70px] bg-main-background flex justify-center items-center mt-[50px]'>
                <h1 className='font-bold text-[36px] p-3'>참여 모임</h1>
            </div>
            {myPost?.map((item) => {
                return (
                    <div
                        key={item.id}
                        className='border-solid border-[1px] rounded-[1.5rem] h-[180px] overflow-hidden mt-[10px] mb-[10px]'
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
                                {item.address}
                            </h1>
                            <div className='my-[10px] h-[40px] truncate'>
                                {item.title}
                            </div>
                            <div>{postTime(item.created_at)}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Join;
