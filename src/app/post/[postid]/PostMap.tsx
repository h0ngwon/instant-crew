'use client';
import { IGeolocation, geolocation } from '@/utils/geolocation';
import { IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RoomIcon from '@mui/icons-material/Room';
import MyLocationIcon from '@mui/icons-material/MyLocation';

import {
    CustomOverlayMap,
    Map,
    MapMarker,
    useKakaoLoader,
} from 'react-kakao-maps-sdk';

interface IPostMap {
    lat: number;
    lng: number;
}

export default function PostMap({ lat, lng }: IPostMap) {
    const [loading, error] = useKakaoLoader({
        appkey: process.env.NEXT_PUBLIC_KAKAO_KEY?.toString() || '',
    });
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
            <div className='w-screen h-[500px] relative'>
                <Map
                    // zoomable={false}
                    center={center}
                    style={{ width: '100%', height: '100%' }}
                    level={3}
                >
                    <MapMarker position={{ lat, lng }}>
                        <div className='flex justify-center items-center w-[150px] h-[34px]'>
                            약속장소입니다.
                        </div>
                    </MapMarker>
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
