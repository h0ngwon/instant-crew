'use client';
import { getUser } from '@/apis/auth';
import { supabase } from '@/app/api/dbApi';
import { IPost } from '@/hooks/useQueryPost';
import { User } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface PostData {
    category: string;
    content: string;
    created_at: string;
    date: string;
    id: string;
    location: string | null;
    picture: string | null;
    title: string;
    user_id: string | null;
    address: string;
}

const MyPost = () => {
    const [user, setUser] = useState<User | null>(null);
    const [myPost, setMyPost] = useState<PostData[] | null>(null);

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
                    .from('post')
                    .select()
                    .eq('user_id', user?.user_metadata[0].id);

                if (data) {
                    setMyPost(data);
                }
                //setMyPost(data.);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [user?.user_metadata]);

    const postTime = (createat: string) => {
        const date = dayjs(createat).format('YY.MM.DD HH:mm');
        return date;
    };

    return (
        <div>
            <div className='w-[100%] h-[70px] bg-main-background flex justify-center items-center mb-[20px]'>
                <h1 className='font-bold text-[36px] p-5'>작성글</h1>
            </div>
            {myPost?.map((item) => {
                return (
                    <div key={item.id} className='border-solid border-[1px] rounded-[1.5rem] h-[180px] overflow-hidden p-[10px] mb-[10px]'>
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

export default MyPost;
