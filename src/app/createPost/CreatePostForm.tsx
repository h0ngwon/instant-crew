'use client';
import React from 'react';
import CreatePostTextFields from './CreatePostTextFields';
import CreatePostMap from './CreatePostMap';
import ImgPrivew from './ImgPrivew';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@mui/material';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import useQueryPost from '@/hooks/useQueryPost';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/authAtom';
export interface ITextFields {
    title: string;
    category: '맛집' | '문화예술' | '스터디' | '운동';
    date: string;
    content: string;
    file: File;
    location: { lat: number; lng: number };
}

export default function CreatePostForm() {
    const methods = useForm<ITextFields>();
    const { createPost } = useQueryPost();
    const [userInfo, setUserInfo] = useRecoilState(userState);

    console.log(userInfo);

    async function submit(data: ITextFields) {
        const id = uuid();
        const { title, category, date, content, file, location } = data;
        if (!date) console.log('날짜가 없습니다.');
        if (!location) console.log('위치정보가 없습니다.');
        if (!file) console.log('사진이 없습니다.');

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
