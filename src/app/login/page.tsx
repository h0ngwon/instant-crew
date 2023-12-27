'use client';
import * as React from 'react';
import Modal from '../../components/Modal';
import Register from '@/components/Register';
import Login from '@/components/Login';

const LoginPage = () => {
    const [isLogin, setIsLogin] = React.useState(false);
    return (
        <div>
            {isLogin ? (
                <>
                    <Modal title='로그인' buttonName='로그인'>
                        <Login />
                    </Modal>
                </>
            ) : (
                <>
                    <Modal title='회원가입' buttonName='회원가입'>
                        <Register />
                    </Modal>
                </>
            )}
        </div>
    );
};

export default LoginPage;
