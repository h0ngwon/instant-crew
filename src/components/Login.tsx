'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { authInput, googleSignIn, signIn, userInfo } from '@/apis/auth';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Pick<authInput, 'email' | 'password'>>({ mode: 'onBlur' });
    const onSubmit: SubmitHandler<Pick<authInput, 'email' | 'password'>> = (
        data,
    ) => console.log(data);

    const onValid = (data: Pick<authInput, 'email' | 'password'>) => {
        signIn(data);
    };

    const googleLogin = async () => {
        googleSignIn();
    };

    return (
        <form className='flex flex-col' onSubmit={handleSubmit(onValid)}>
            <input
                type='email'
                placeholder='이메일'
                className='p-2 mb-1'
                {...register('email', {
                    required: '이메일을 입력해주세요',
                    pattern: {
                        value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: '이메일 양식에 맞춰 입력해주세요',
                    },
                })}
            />
            <span className='text-red-600'>{errors?.email?.message}</span>
            <input
                type='password'
                placeholder='비밀번호(6~14자 사이 글자+숫자)'
                className='p-2 mb-1'
                {...register('password', {
                    required: '비밀번호를 입력해주세요',
                    pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,14}$/,
                })}
            />
            <span className='text-red-600'>{errors?.password?.message}</span>
            <Button
                type='submit'
                variant='outlined'
                className='mb-1'
                disabled={!isValid}
            >
                로그인
            </Button>
            <Button
                type='button'
                variant='outlined'
                className='mb-1'
                onClick={googleLogin}
            >
                구글로 로그인
            </Button>
        </form>
    );
};

export default Login;
