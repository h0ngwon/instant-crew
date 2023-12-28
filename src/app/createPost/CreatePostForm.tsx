'use client';
import React from 'react';
import CreatePostTextFields from './CreatePostTextFields';
import CreatePostMap from './CreatePostMap';
import ImgPrivew from './ImgPrivew';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@mui/material';
import axios from 'axios';
export interface ITextFields {
    title: string;
    category: '맛집' | '문화예술' | '스터디' | '운동';
    date: Date | null;
    content: string;
    url: string;
    file: File;
    location: { lat: number; lng: number };
}

export default function CreatePostForm() {
    const methods = useForm<ITextFields>();

    async function submit(data: ITextFields) {
        const { title, category, date, content, url, file, location } = data;

        if (!date) console.log('날짜가 없습니다.');
        if (!location) console.log('위치정보가 없습니다.');
        if (!file) console.log('사진이 없습니다.');

        console.log(file);
        const downloadUrl = await uploadStorage(file);
        console.log(downloadUrl);
    }

    async function uploadStorage(file: File) {
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/storage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FormProvider {...methods}>
            <form
                className='flex flex-col gap-4 p-4'
                onSubmit={methods.handleSubmit(submit)}
            >
                <CreatePostMap />
                <div className='flex gap-4'>
                    <ImgPrivew />
                    <CreatePostTextFields />
                </div>
                <div className='flex justify-center gap-8'>
                    <Button
                        type='submit'
                        className='text-white  bg-blue-400'
                        variant='contained'
                        color='primary'
                    >
                        완료
                    </Button>
                    <Button
                        type='submit'
                        className='text-white   bg-red-400'
                        variant='contained'
                        color='error'
                    >
                        취소
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
