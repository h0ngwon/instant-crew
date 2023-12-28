import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Modal from './Modal';
import Login from './Login';
import Register from './Register';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/modalAtom';
import { userState } from '@/recoil/authAtom';
import { signOut } from '@/apis/auth';

const Header = () => {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [showModal, setShowModal] = useRecoilState(modalState);
    const handleOpen = (title: string) =>
        setShowModal({ show: true, key: title });

    const clearUserInfo = () => {
        setUserInfo({
            session: undefined,
            user: undefined,
        });
    };

    const logout = () => {
        signOut();
        clearUserInfo();
    };
    return (
        <header className='w-full'>
            <div className='h-[45px] w-full bg-main-background flex justify-between items-center p-4 '>
                <div className='text-3xl text-main-color font-bold font'>
                    <Link href='/'> InstantCrew</Link>
                </div>
                <nav role='navigation' aria-label='네비게이션'>
                    <ul className='flex flex-row gap-5 items-center'>
                        {!userInfo.user ? (
                            <>
                                <li>
                                    <Button
                                        onClick={() => handleOpen('로그인')}
                                    >
                                        로그인
                                    </Button>
                                    {showModal.key === '로그인' && (
                                        <Modal
                                            title='로그인'
                                            buttonName='로그인'
                                        >
                                            <Login />
                                        </Modal>
                                    )}
                                </li>
                                <li>
                                    <Button
                                        onClick={() => handleOpen('회원가입')}
                                    >
                                        회원가입
                                    </Button>

                                    {showModal.key === '회원가입' && (
                                        <Modal
                                            title='회원가입'
                                            buttonName='회원가입'
                                        >
                                            <Register />
                                        </Modal>
                                    )}
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Button onClick={logout}>로그아웃</Button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
