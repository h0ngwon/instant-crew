import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <header className='w-full'>
            <div className='h-[45px] w-full bg-main-background flex justify-between items-center p-4 '>
                <div className='text-3xl text-main-color font-bold font'>
                    <Link href='/'> InstantCrew</Link>
                </div>
                <nav role='navigation' aria-label='네비게이션'>
                    <ul className='flex flex-row gap-5 items-center cursor-pointer'>
                        <li>LOGIN</li>
                        <li>REGISTER</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
