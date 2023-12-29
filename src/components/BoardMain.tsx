'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    GET_POST_BY_PAGE,
    GET_POST_BY_PAGE_AND_CATEGORY,
} from '@/app/api/post/route';
import axios from 'axios';

export type PostType = {
    category: string;
    content: string;
    created_at: string;
    date: string;
    id: string;
    location: string | null;
    picture: string | null;
    title: string;
    user_id: string | null;
};

export default function BoardMain({ category }: { category?: string }) {
    const [page, setPage] = useState<number>(0);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [locations, setLocations] = useState<string[]>([]);

    useEffect(() => {
        GET_POST_BY_PAGE_AND_CATEGORY(0, category).then((res) => {
            if (!res) return;
            setPage(0);
            setPosts(res);
        });
    }, [category]);

    useEffect(() => {
        if (!category) {
            GET_POST_BY_PAGE(page).then((res) => {
                if (!res) return;
                setPosts((prev) => [...prev, ...(res as PostType[])]);
            });
            return;
        }

        GET_POST_BY_PAGE_AND_CATEGORY(page, category).then((res) => {
            if (!res) return;
            setPosts((prev) => [...prev, ...(res as PostType[])]);
        });
    }, [page]);

    useEffect(() => {
        const handleInfinityScroll = () => {
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 1
                // 만약 0이라면 맨 밑에서 이벤트를 발생시켜줘, 1000 맨밑에서부터 1000px위에 있을때 이벤트를 발생시켜줘
            ) {
                // react-query + Obsecver 기능을 해가지고 더 편리하게 구현이 가능한거임
                setPage((prev) => prev + 1);
            }
        };
        window.addEventListener('scroll', handleInfinityScroll);
        return () => {
            window.removeEventListener('scroll', handleInfinityScroll);
        };
    }, []);
    const getLocationInfo = async (latitude: string, longitude: string) => {
        try {
            const response = await axios.get(
                `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
                {
                    headers: {
                        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}`,
                    },
                },
            );

            if (response.data.documents.length > 0) {
                const regionInfo = response.data.documents[0];
                console.log('지역 동 정보:', regionInfo);
                return regionInfo;
            } else {
                console.log('지역 동 정보를 찾을 수 없습니다.');
                return null;
            }
        } catch (error) {
            console.error('API 호출 중 오류:', error);
            return null;
        }
    };

    const creatorLocation = (location: string | null) => {
        const lat = location?.slice(7, 24);
        const long = location?.slice(32, 54);

        if (lat && long) {
            getLocationInfo(lat, long).then((regionInfo) => {
                // 여기에서 가져온 지역 동 정보(regionInfo)를 사용하여 표시할 수 있습니다.
                // 예를 들어, regionInfo에서 필요한 정보를 추출하여 UI에 표시할 수 있습니다.
            });
        } else {
            console.log('잘못된 좌표 정보입니다.');
        }
    };

    const createTime = (createtime: string) => {
        return createtime.slice(0, 16).replace('T', ' ');
    };

    const handleLocationInfo = async (location: string | null) => {
        if (!location) return;
        const lat = location?.slice(7, 24);
        const long = location?.slice(32, 54);
        if (lat && long) {
            const regionInfo = await getLocationInfo(lat, long);
            if (regionInfo) {
                const address = regionInfo?.address_name;
                setLocations((prev) => [...prev, address]);
            }
        } else {
            console.log('잘못된 좌표 정보입니다.');
        }
    };

    useEffect(() => {
        posts.forEach((item) => {
            handleLocationInfo(item.location);
        });
    }, [posts]);

    return (
        <main className='max-w-[1200px] m-auto grid grid-cols-2 gap-[50px] p-10 h-max'>
            {posts.map((item, index) => (
                <div
                    key={index}
                    className='border-solid border-[1px] rounded-[1.5rem] h-[180px]'
                >
                    <div className='float-left w-[180px] mr-[20px]'>
                        <Image
                            src={item.picture as string}
                            alt='게시글 이미지'
                            className='w-[100%] h-[180px] rounded-l-3xl'
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className='float-left w-[170px]'>
                        <h1 className='my-[20px] text-[1.3rem] font-bold'>
                            {creatorLocation(item.location)}
                        </h1>
                        <div className='my-[10px] h-[40px] truncate'>
                            {item.title}
                        </div>
                        <div>{createTime(item.created_at)}</div>
                    </div>
                </div>
            ))}
        </main>
    );
}
