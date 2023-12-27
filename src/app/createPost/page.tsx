import ImgPrivew from '@/components/createPost/ImgPrivew';
import div from 'next/image';
import React from 'react';
import { Map } from 'react-kakao-maps-sdk';

export default function page() {
    return (
        <section className='bg-white text-black w-full h-screen'>
            <div className='flex'>
                <ImgPrivew />
                {/* <div className='bg-red-500 w-[500px] h-[500px]'></div> */}
                <form className='flex flex-col'>
                    <input />
                    <select name='category'>
                        <option value='맛집'>맛집</option>
                        <option value='문화예술'>문화예술</option>
                        <option value='스터디'>스터디</option>
                        <option value='운동'>운동</option>
                    </select>
                    <textarea className='resize-none'></textarea>
                </form>
            </div>
            <Map
                center={{ lat: 33.5563, lng: 126.79581 }}
                style={{ width: '100%', height: '500px' }}
                level={3}
            />
        </section>
    );
}
