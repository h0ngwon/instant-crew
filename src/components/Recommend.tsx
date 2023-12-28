import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Box,
    CardActionArea,
} from '@mui/material';

const Recommend = () => {
    return (
        <section id='recommend' className='h-[50vh]'>
            <div className='p-[30px] h-[85%]'>
                <h1 className='text-[30px] font-bold'>
                    <span className='text-main-color'>user</span>님 추천
                </h1>
                <div className='w-full h-[100%] grid grid-cols-2 gap-[20px]'>
                    <Card className='shadow-main-shadow'>
                        <Box className='w-full h-[100%] flex items-center'>
                            <CardMedia
                                className='w-[60%] h-[100%] object-contain'
                                image='/img/recommend_test.jpeg'
                            />
                            <CardContent>Test</CardContent>
                        </Box>
                    </Card>

                    <Card className='shadow-main-shadow'>
                        <Box className='w-full h-[100%] flex items-center'>
                            <CardMedia
                                className='w-[60%] h-[100%] object-contain'
                                image='/img/recommend_test.jpeg'
                            />
                            <CardContent>Test</CardContent>
                        </Box>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Recommend;
