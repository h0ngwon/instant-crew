'use client';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useQueryPost from '@/hooks/useQueryPost';
import { useRecoilState } from 'recoil';
import { v4 as uuid } from 'uuid';
import { userState } from '@/recoil/authAtom';
import axios from 'axios';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

import PostMap from '@/components/common/PostMap';
import PostTextfields from '@/components/common/PostTextfields';
import PostImgPrivew from '@/components/common/PostImgPrivew';
import { redirect } from 'next/navigation';

export interface ITextFields {
    title: string;
    category: '맛집' | '문화예술' | '스터디' | '운동';
    date: string;
    content: string;
    file: File;
    location: { lat: number; lng: number };
    max_join: number;
}

export default function CreatePostPage() {
    const methods = useForm<ITextFields>();

    const { createPost } = useQueryPost();
    const [userInfo, setUserInfo] = useRecoilState(userState);

    useEffect(() => {
        if (createPost.isSuccess) {
            redirect('../');
        }
    }, [createPost.isSuccess]);

    async function submit(data: ITextFields) {
        const id = uuid();
        const { file, location } = data;
        if (!userInfo.id) return toast.error('로그인 후 시도해주세요');
        if (!location) return toast.error('위치정보를 등록해주세요');
        if (!file) return toast.error('사진을 등록해주세요');

        const geocoder = new kakao.maps.services.Geocoder();
        let coord = new kakao.maps.LatLng(location.lat, location.lng);

        // 주소가져오기
        const address = await new Promise<string>((resolve, reject) => {
            geocoder.coord2Address(
                coord.getLng(),
                coord.getLat(),
                (result: any, status: any) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const arr = { ...result };
                        const _arr = arr[0].address.address_name;
                        resolve(_arr);
                    } else {
                        reject(new Error('주소 변환 실패'));
                    }
                },
            );
        });

        // 사진가져오기
        const picture = await uploadStorage(file, id);

        // 업로드하기
        createPost.mutate({
            Row: {
                ...data,
                id,
                picture,
                address,
                user_id: userInfo.id,
            },
        });
    }

    async function uploadStorage(file: File, path: string) {
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', path);
        formData.append('bucket', 'post');

        const response = await axios.post('/api/storage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.publicUrl;
    }

    return (
        <section className='bg-white text-black w-full '>
            <FormProvider {...methods}>
                <form
                    className='flex flex-col gap-4 p-4'
                    onSubmit={methods.handleSubmit(submit)}
                >
                    <PostMap />
                    <div className='flex  gap-4'>
                        <PostImgPrivew />
                        <PostTextfields />
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
        </section>
    );
}
