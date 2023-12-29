import Image from 'next/image';
import React, { useState } from 'react';
import SearchBtn from '../../public/img/search_btn.png';

const SearchForm = () => {
    const [searchInput, setSearchInput] = useState('');
    const handleSearchbtn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const target = e.target as HTMLFormElement;
        // const searchKeyword = (target[0] as HTMLInputElement).value;
        setSearchInput('');
    };
    return (
        <>
            <form onSubmit={handleSearchbtn} className='relative'>
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    required
                    className='w-[200px] h-[30px] rounded-2xl border-solid border-[0.5px] border-[#333]'
                />
                <button type='submit' className='absolute right-[5px] top-1'>
                    <Image src={SearchBtn} alt='' width={22} height={22} />
                </button>
            </form>
        </>
    );
};

export default SearchForm;
