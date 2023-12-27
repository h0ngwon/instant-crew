import Form from '@/components/createPost/CreatePostForm';
import CreatePostMap from '@/components/createPost/CreatePostMap';
import ImgPrivew from '@/components/createPost/ImgPrivew';
import React from 'react';

export default function CreatePostPage() {
    return (
        <section className='bg-white text-black w-full h-screen'>
            <div className='flex'>
                <ImgPrivew />
                <Form />
            </div>
            <CreatePostMap />
        </section>
    );
}
