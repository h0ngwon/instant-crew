import Category from '@/components/Category';
import Recent from '@/components/Recent';
import Recommend from '@/components/Recommend';
import React, { useEffect } from 'react';
import './globals.css';
import './reset.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function Home() {
    return (
        <React.Fragment>
            <main role='main'>
                <ToastContainer />
                <Recommend />
                <Category />
                <Recent />
            </main>
        </React.Fragment>
    );
}
