'use client';
import { Card } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import React, { ChangeEvent, useRef, useState } from 'react';

export default function ImgPrivew() {
    const [file, setFile] = useState<null | File>(null);
    const [url, setUrl] = useState<string | null>();
    const fileRef = useRef<HTMLInputElement>(null);

    async function onChangeFile(e: ChangeEvent<HTMLInputElement>) {
        const targetFile = e.target.files?.[0];
        if (!targetFile) {
            console.log('파일이없음');
        }
        if (targetFile) {
            const fileExtension = targetFile.name
                .split('.')
                .pop()
                ?.toLowerCase();
            const allowanceExtension = ['png', 'jpg', 'jpeg', 'webp'];
            if (
                fileExtension === undefined ||
                !allowanceExtension.includes(fileExtension)
            ) {
                return console.log(...allowanceExtension, '형식만 지원됩니다.');
            } else {
                setFile(targetFile);
                const reader = new FileReader();
                reader.readAsDataURL(targetFile);
                reader.onload = () => {
                    setUrl(reader.result as string);
                };
            }
        }
    }

    async function uploadStorage() {
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
        <>
            <input
                className='hidden'
                type='file'
                ref={fileRef}
                onChange={onChangeFile}
            />
            <Card
                className='w-full h-[350px]'
                onClick={() => fileRef.current?.click()}
            >
                {url && (
                    <Image
                        className='w-full h-[350px]'
                        src={url}
                        alt='테스트'
                        width={500}
                        height={500}
                    />
                )}
                이미지를 업로드해주세요
            </Card>
            <button onClick={uploadStorage}>파일업로드 테스트</button>
        </>
    );
}
