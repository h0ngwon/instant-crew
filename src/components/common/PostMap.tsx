'use client';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import RoomIcon from '@mui/icons-material/Room';
import { IGeolocation, geolocation } from '@/utils/geolocation';
import { useFormContext } from 'react-hook-form';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { Card } from '@mui/material';

interface IProps {
    location?: string;
}

export default function PostMap({ location }: IProps) {
    // const current = JSON.parse(location!);
    // 카카오 로더
    const [loading, error] = useKakaoLoader({
        appkey: process.env.NEXT_PUBLIC_KAKAO_KEY?.toString() || '',
    });
    // react-hook-form context
    const { setValue } = useFormContext();

    // 현재위치
    const [currentLocation, setCurrentLocation] = useState<IGeolocation>(() => {
        if (location) {
            const { lat, lng } = JSON.parse(location);

            return {
                center: {
                    lat,
                    lng,
                },
                errMsg: null,
                isLoading: false,
            };
        } else {
            return {
                center: {
                    lat: 1.450701,
                    lng: 1.570667,
                },
                errMsg: null,
                isLoading: true,
            };
        }
    });
    // 마커추가
    const [newMarker, setnewMarker] = useState<{
        active: boolean;
        position: null | { lat: number; lng: number };
    }>(() => {
        if (location) {
            const { lat, lng } = JSON.parse(location);
            return { active: false, position: { lat, lng } };
        } else {
            return { active: false, position: null };
        }
    });

    // 현위치로 지도중심이동
    function resetCurrentLocation() {
        setCurrentLocation((prev) => ({
            ...prev,
            center: {
                lat: prev.center.lat + 1,
                lng: prev.center.lng + 1,
            },
        }));
        geolocation({ setState: setCurrentLocation });
    }

    // 현위치 감지
    useEffect(() => {
        if (location) return;
        geolocation({ setState: setCurrentLocation });
    }, [location]);

    // 마커추가기능 활성화
    function onClickMarkerActive() {
        setnewMarker({ ...newMarker, active: true });
    }
    // 지도에 마커추가
    function onClickNewMarker(
        _t: kakao.maps.Map,
        mouseEvent: kakao.maps.event.MouseEvent,
    ) {
        if (!newMarker.active) return;
        setValue('location', {
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
        });

        setnewMarker({
            active: false,
            position: {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
            },
        });
    }

    return (
        <Card className='relative w-full h-[500px] '>
            <Map
                className={`${newMarker.active && '[&_svg]:cursor-pointer'}`}
                zoomable={false}
                center={currentLocation.center}
                style={{ width: '100%', height: '500px' }}
                level={3}
                onClick={onClickNewMarker}
            >
                {!currentLocation.isLoading && (
                    <MapMarker position={currentLocation.center}>
                        <div className='flex justify-center items-center w-[150px] h-[34px]'>
                            {currentLocation.errMsg
                                ? currentLocation.errMsg
                                : '현재위치'}
                        </div>
                    </MapMarker>
                )}
                {newMarker.position && (
                    <MapMarker position={newMarker.position}>
                        <div className='flex justify-center items-center w-[150px] h-[34px]'>
                            친구들 모여라
                        </div>
                    </MapMarker>
                )}
            </Map>
            {/* 맵네비 */}
            <nav className='absolute z-10 top-0 right-0 gap-4 bg-transparent flex flex-col'>
                <Tooltip
                    className='bg-[#FFB534] hover:brightness-125 hover:bg-[#FFB534] '
                    onClick={resetCurrentLocation}
                    title='현위치로 이동'
                    placement='left-start'
                >
                    <IconButton>
                        <MyLocationIcon className='text-red-500 text-3xl ' />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    className='bg-[#FFB534] hover:brightness-125  hover:bg-[#FFB534]'
                    onClick={onClickMarkerActive}
                    title='위치정하기'
                    placement='left-start'
                >
                    <IconButton>
                        <RoomIcon className='text-blue-500 text-3xl ' />
                    </IconButton>
                </Tooltip>
            </nav>
        </Card>
    );
}
