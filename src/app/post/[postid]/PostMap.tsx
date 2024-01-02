'use client';
import { IGeolocation, geolocation } from '@/utils/geolocation';
import { IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RoomIcon from '@mui/icons-material/Room';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Typography } from '@mui/material';

import {
    CustomOverlayMap,
    Map,
    MapMarker,
    useKakaoLoader,
} from 'react-kakao-maps-sdk';
import { IPost } from '@/hooks/useQueryPost';
import Image from 'next/image';
import PostContent from './PostContent';

interface IProps {
    data: IPost;
}

export default function PostMap({ data }: IProps) {
    const { lat, lng } = JSON.parse(data.location);
    const [userLocation, setUserLocation] = useState<IGeolocation>({
        center: {
            lat: 0,
            lng: 0,
        },
        errMsg: null,
        isLoading: true,
    });
    const [center, setCenter] = useState({
        lat,
        lng,
    });

    // 유저위치로 지도중심이동
    function moveUserlocation() {
        setCenter(userLocation.center);
    }
    // 약속장소로 지도중심이동
    function moveMarkerLocation() {
        setCenter({ lat, lng });
    }

    useEffect(() => {
        geolocation({ setState: setUserLocation });
    }, []);

    return (
        <>
            <div className='w-full h-[500px] relative'>
                <Map
                    zoomable={false}
                    center={center}
                    style={{ width: '100%', height: '100%' }}
                    level={3}
                >
                    <MapMarker position={{ lat, lng }}></MapMarker>
                    <CustomOverlayMap
                        xAnchor={-0.08}
                        yAnchor={1.14}
                        position={{ lat, lng }}
                    >
                        <PostContent data={data} />
                    </CustomOverlayMap>
                    <CustomOverlayMap position={userLocation.center}>
                        <div className='label bg-white text-black px-4 shadow-md rounded-md text-xl'>
                            <span className='left'></span>
                            <span className='center'>현위치!</span>
                            <span className='right'></span>
                        </div>
                    </CustomOverlayMap>

                    <nav className='absolute z-10 top-0 right-0 gap-4 bg-transparent flex flex-col'>
                        <Tooltip
                            className='bg-[#FFB534] hover:brightness-125 hover:bg-[#FFB534] '
                            onClick={moveUserlocation}
                            title='현위치로 이동'
                            placement='left-start'
                        >
                            <IconButton>
                                <MyLocationIcon className='text-red-500 text-3xl ' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            className='bg-[#FFB534] hover:brightness-125  hover:bg-[#FFB534]'
                            onClick={moveMarkerLocation}
                            title='약속장소로 이동하기'
                            placement='left-start'
                        >
                            <IconButton>
                                <RoomIcon className='text-blue-500 text-3xl ' />
                            </IconButton>
                        </Tooltip>
                    </nav>
                </Map>
            </div>
        </>
    );
}
