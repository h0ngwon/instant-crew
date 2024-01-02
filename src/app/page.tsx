import Category from '@/components/Category';
import Recent from '@/components/Recent';
import Recommend from '@/components/Recommend';
import React, { useEffect } from 'react';
import './globals.css';
import './reset.css';
import { Divider } from '@mui/material';

export default async function Home() {
    return (
        <React.Fragment>
            <main role='main'>
                <Recommend />
                <Divider variant='middle' className='mt-[70px]' />
                <Category />
                <Divider variant='middle' />
                <Recent />
            </main>
        </React.Fragment>
    );
}
