import { Button } from '@mui/material';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Modal from './Modal';
import Login from './Login';
import Register from './Register';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/modalAtom';
import { userState } from '@/recoil/authAtom';
import { signOut } from '@/apis/auth';
import { supabase } from '@/apis/dbApi';
import { toast } from 'react-toastify';
import SearchForm from './SearchForm';

const Header = () => {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [showModal, setShowModal] = useRecoilState(modalState);
    const handleOpen = (title: string) =>
        setShowModal({ show: true, key: title });

    const logout = async () => {
        try {
            console.log('111');
            // await signOut();
            const { error } = await supabase.auth.signOut();
            console.log('333');
            toast.success('로그아웃되었습니다');
        } catch (error) {
            console.log('222');
            toast.error('다시 한 번 시도해주세요');
        }
    };

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(event);
            if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                setUserInfo({
                    id: session?.user.id!,
                    profile_pic: session?.user.user_metadata.avatar_url,
                    full_name: session?.user.user_metadata.full_name,
                    email: session?.user.email!,
                });
                // user table에서 요구하는 스키마랑 들어가는 데이터랑 타입이 일치하지 않아서 생긴 에러
                const { error } = await supabase.from('user').insert({
                    id: session?.user.id,
                    email: session?.user.email!,
                    nickname: session?.user.user_metadata.full_name,
                    profile_pic: session?.user.user_metadata.avatar_url,
                });
                if (error) {
                    console.error('supabase error', error);
                }
            } else if (event === 'SIGNED_OUT') {
                console.log('나와라');
                setUserInfo({
                    id: '',
                    profile_pic: '',
                    full_name: '',
                    email: '',
                });
                localStorage.clear();
                console.log(event, session);
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
                        <li>
                            <SearchForm />
                        </li>
                        {!userInfo.id ? (
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
                                    <Button>
                                        <Link href={userInfo.id}>
                                            마이페이지
                                        </Link>
                                    </Button>
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
