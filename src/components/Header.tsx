import { Button } from '@mui/material';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Modal from './Modal';
import Login from './Login';
import Register from './Register';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from '@/recoil/modalAtom';
import { userState } from '@/recoil/authAtom';
import { signOut } from '@/apis/auth';
import { supabase } from '@/apis/dbApi';

const Header = () => {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [showModal, setShowModal] = useRecoilState(modalState);
    const handleOpen = (title: string) =>
        setShowModal({ show: true, key: title });

    const clearUserInfo = () => {
        setUserInfo({
            session: undefined,
            // user: undefined,
        });
    };

    const logout = () => {
        signOut();
        clearUserInfo();
    };

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setUserInfo({
                    session,
                    // user: undefined,
                });
                console.log(session, event);
            }
        });
    }, []);

    return (
        <header className='w-full'>
            <div className='h-[45px] w-full bg-main-background flex justify-between items-center p-4 '>
                <div className='text-3xl text-main-color font-bold font'>
                    <Link href='/'> InstantCrew</Link>
                </div>
                <nav role='navigation' aria-label='네비게이션'>
                    <ul className='flex flex-row gap-5 items-center'>
                        {!userInfo.session ? (
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
