'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Box } from '@mui/material';
import { getRandomData } from '../axios/axiosApi';
import { Data } from '@/app/api/post/recommend/route';

const Recommend = () => {
    const [recommendData, setRecommendData] = useState<Data>([]);

    const fetchRandomData = async (): Promise<void> => {
        try {
            const response = await getRandomData();
            setRecommendData(response.data);
        } catch (err) {
            throw new Error();
        }
    };

    useEffect(() => {
        fetchRandomData();
    }, []);

    return (
        <section id='recommend' className='h-[50vh]'>
            <div className='p-[30px] h-[85%]'>
                <h1 className='text-[30px] font-bold'>
                    <span className='text-main-color'>user</span>님 추천
                </h1>
                <div className='w-full h-[100%] grid grid-cols-2 gap-[20px] mt-[20px]'>
                    {recommendData.map((rec) => {
                        return (
                            <Card key={rec.id} className='shadow-main-shadow'>
                                <Box className='w-full h-[100%] flex items-center'>
                                    <CardMedia
                                        className='w-[60%] h-[100%]'
                                        image={`${rec.picture}`}
                                    />
                                    <CardContent className='flex flex-col justify-center items-center w-[40%] truncate'>
                                        <div className='h-[50%] truncate'>
                                            <h1 className='text-[36px] font-bold truncate'>
                                                {rec.title}
                                            </h1>
                                        </div>
                                        <p className='text-[20px] mt-[10px] truncate'>
                                            {rec.content}
                                        </p>
                                        <p className='text-[16px] mt-[10px] truncate'>
                                            {rec.date}
                                        </p>
                                    </CardContent>
                                </Box>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Recommend;
