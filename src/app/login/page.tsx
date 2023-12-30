'use client';
import * as React from 'react';
import Modal from '../../components/Modal';
import Register from '@/components/Register';
import Login from '@/components/Login';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/authAtom';
import { Button } from '@mui/material';
import { signOut, test } from '@/apis/auth';
import { getUser } from '../../apis/auth';

const LoginPage = () => {
    const [userInfo, setUserInfo] = useRecoilState(userState);

    const clearUserInfo = () => {
        setUserInfo({
            session: undefined,
        });
    };

    const logout = () => {
        signOut();
        clearUserInfo();
    };

    React.useEffect(() => {
        console.log(userInfo);
        test();
    }, []);

    return (
        <div>
            {!userInfo.session ? (
                <>
                    <Modal title='로그인' buttonName='로그인'>
                        <Login />
                    </Modal>
                    <Modal title='회원가입' buttonName='회원가입'>
                        <Register />
                    </Modal>
                </>
            ) : (
                <Button onClick={logout}>로그아웃</Button>
            )}
        </div>
    );
};

export default LoginPage;
