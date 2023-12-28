'use client';
import { Card } from '@mui/material';
import Image from 'next/image';
import React, { ChangeEvent, useRef, useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { useFormContext } from 'react-hook-form';
export default function ImgPrivew() {
    const [file, setFile] = useState<null | File>(null);
    const [url, setUrl] = useState<string | null>();
    const fileRef = useRef<HTMLInputElement>(null);
    const { register, setValue } = useFormContext();

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
                setValue('file', targetFile);
                const reader = new FileReader();
                reader.readAsDataURL(targetFile);
                reader.onload = () => {
                    setUrl(reader.result as string);
                };
            }
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
                className='w-full h-[359px]  flex items-center justify-center shadow-lg bg-neutral-100 rounded-md'
                onClick={() => fileRef.current?.click()}
            >
                {url && (
                    <Image
                        className='w-full h-full'
                        src={url}
                        alt='테스트'
                        width={300}
                        height={300}
                    />
                )}
                {!url && (
                    <>
                        <ImageIcon className='text-blue-500 ' />
                        이미지를 업로드해주세요
                    </>
                )}
            </Card>
        </>
    );
}
