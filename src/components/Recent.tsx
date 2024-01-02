'use client';
import { Data } from '@/app/api/post/recommend/route';
import { getRecentData } from '@/axios/axiosApi';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Recent = () => {
    const [recentData, setRecentData] = useState<Data>([]);

    const fetchRecentData = async (): Promise<void> => {
        try {
            const response = await getRecentData();
            setRecentData(response.data);
        } catch (err) {
            throw new Error();
        }
    };

    useEffect(() => {
        fetchRecentData();
    }, []);

    return (
        <section id='recent' className='h-[50vh] mt-[30px]'>
            <div className='p-[30px]'>
                <h1 className='text-[30px] font-bold'>최신 게시글</h1>
                <div className='w-[100%] h-[100%] mt-[30px]'>
                    <ul className='flex justify-between gap-[20px] items-center'>
                        {recentData.map((rec) => {
                            return (
                                <li key={rec.id}>
                                    <Link
                                        href={`/post/${rec.id}`}
                                        className='w-[100%] h-[200px] relative flex justify-center'
                                    >
                                        <div className='relative inline-block overflow-hidden'>
                                            <div className='absolute inset-0 bg-gradient-image'></div>
                                            <Image
                                                className='h-[100%] object-cover'
                                                src={`${rec.picture}`}
                                                width={300}
                                                height={100}
                                                alt='r'
                                            />
                                        </div>
                                        <div className='w-[100%] flex justify-center absolute bottom-0 text-white font-bold text-[25px] p-[10px] truncate'>
                                            <p className='truncate'>
                                                {rec.title}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Recent;
