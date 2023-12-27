'use client';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import RoomIcon from '@mui/icons-material/Room';
import { IGeolocation, geolocation } from '@/utils/geolocation';

export default function CreatePostMap() {
    const [currentLocation, setCurrentLocation] = useState<IGeolocation>({
        center: {
            lat: 1.450701,
            lng: 1.570667,
        },
        errMsg: null,
        isLoading: true,
    });
    const [newMarker, setnewMarker] = useState<{
        active: boolean;
        position: null | { lat: number; lng: number };
    }>({ active: false, position: null });

    function onClickMarkerActive() {
        setnewMarker({ ...newMarker, active: true });
    }

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

    useEffect(() => {
        geolocation({ setState: setCurrentLocation });
    }, []);

    return (
        <div className='relative w-full h-[500px]'>
            <Map
                center={currentLocation.center}
                style={{ width: '100%', height: '500px' }}
                level={3}
                onClick={(_t, mouseEvent) =>
                    setnewMarker({
                        active: false,
                        position: {
                            lat: mouseEvent.latLng.getLat(),
                            lng: mouseEvent.latLng.getLng(),
                        },
                    })
                }
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
            {/*  */}
            <div className='absolute z-10 top-0 right-0 bg-transparent flex flex-col'>
                <Tooltip
                    onClick={resetCurrentLocation}
                    title='현위치로 이동'
                    placement='left-start'
                >
                    <IconButton>
                        <MyLocationIcon className='text-red-500' />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    onClick={onClickMarkerActive}
                    title='위치정하기'
                    placement='left-start'
                >
                    <IconButton>
                        <RoomIcon className='text-blue-500' />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}
