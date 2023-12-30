'use client';

import { Card, CardActionArea, CardContent } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import staticData from '../../static.json';
import Link from 'next/link';

const Category = () => {
    const banner: {
        id: number;
        url: string;
        content: string;
    }[] = staticData.banner;

    return (
        <section id='category' className='mt-[50px] h-[30vh]'>
            <div className='w-full flex justify-around items-center'>
                {banner.map((item) => {
                    return (
                        <Card key={item.id} className='w-[200px]'>
                            <Link href={`/board/?category=${item.content}`}>
                                <CardActionArea className='flex flex-col justify-center items-center'>
                                    <Image
                                        src={item.url}
                                        width={100}
                                        height={50}
                                        alt='w'
                                    />
                                    <CardContent>{item.content}</CardContent>
                                </CardActionArea>
                            </Link>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
};

export default Category;
