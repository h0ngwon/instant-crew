'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import SearchBtn from '../../public/img/search_btn.png';
import { useRouter } from 'next/navigation';

const SearchForm = () => {
    const [searchInput, setSearchInput] = useState('');
    const router = useRouter();

    const handleSearchbtn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const target = e.target as HTMLFormElement;
        // const searchKeyword = (target[0] as HTMLInputElement).value;
        setSearchInput('');

        router.push(`/search/?search=${searchInput}`);
    };
    return (
        <>
            <form onSubmit={handleSearchbtn} className='relative'>
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    required
                    className='w-[200px] h-[30px] rounded-2xl border-solid border-[0.5px] border-[#333] pl-[10px] pr-[25px]'
                />
                <button type='submit' className='absolute right-[5px] top-1'>
                    <Image src={SearchBtn} alt='' width={22} height={22} />
                </button>
            </form>
        </>
    );
};

export default SearchForm;
