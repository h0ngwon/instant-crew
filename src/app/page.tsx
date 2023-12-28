import { supabase } from '@/api/dbApi';
import Category from '@/components/Category';
import Recent from '@/components/Recent';
import Recommend from '@/components/Recommend';
import React from 'react';
import './globals.css';
import './reset.css';

export default async function Home() {
    try {
        const { data, error } = await supabase.from('post').select();
        if (error) throw new Error();
        console.log(data);
    } catch (err) {}
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
