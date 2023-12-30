import { Button } from '@mui/material';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Modal from './Modal';
import Login from './Login';
import Register from './Register';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from '@/recoil/modalAtom';
import { userState } from '@/recoil/authAtom';
import { getUser, signOut } from '@/apis/auth';
import { supabase } from '@/apis/dbApi';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

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
        const handleAuthStateChange = async (
            event: AuthChangeEvent,
            session: Session | null,
        ) => {
            console.log(event);
            console.log(session);
            // if(event === "")

            if (event === 'SIGNED_IN') {
                setUserInfo({
                    session,
                    // user: undefined,
                });

                const { user } = await getUser();
                console.log(user);
                const { error } = await supabase.from('user').insert({
                    email: session?.user.user_metadata.email,
                    password: '12345',
                    nickname: session?.user.user_metadata.full_name,
                    profile_pic: session?.user.user_metadata.avatar_url,
                });
                if (error) {
                    console.error('supabase error', error);
                }

                console.log(session, event);
            }
        };

        const subscription = supabase.auth.onAuthStateChange(
            handleAuthStateChange,
        );

        return () => {
            subscription.data.subscription.unsubscribe();
        };
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
                                    <Button onClick={() => getUser()}>
                                        유저정보
                                    </Button>
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
