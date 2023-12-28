import Category from '@/components/Category';
import Recent from '@/components/Recent';
import Recommend from '@/components/Recommend';
import React from 'react';
import './globals.css';
import './reset.css';

export default async function Home() {
    return (
        <React.Fragment>
            <main role='main'>
                <Recommend />
                <Category />
                <Recent />
            </main>
        </React.Fragment>
    );
}
