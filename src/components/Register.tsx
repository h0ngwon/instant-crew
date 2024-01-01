'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { authInput, signUp } from '@/apis/auth';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { modalState } from '@/recoil/modalAtom';
import axios from 'axios';

const Register = () => {
    const setShowModal = useSetRecoilState(modalState);

    // react-hook-form
    const {
        register, // onchage, onblur, onclick등 가진 객체 생성
        //form onsubimt에 들어가는 함수.
        //데이터가 유효할 때와 유효하지 않을 때 실행함수를 각각 받는다
        handleSubmit,
        setError, //errors에 별도의 에러메시지를 추가할 수 있게 해준다
        formState: { errors, isValid }, //register들의 에러메시지를 자동출력해준다
    } = useForm<authInput>({ mode: 'onBlur' });

    //데이터가 유효할 때 실행되는 함수
    const onValid = async (data: authInput) => {
        if (data.password !== data.passwordCheck) {
            setError(
                'passwordCheck', // 에러 핸들링할 input요소 name
                { message: '비밀번호가 일치하지 않습니다.' }, // 에러 메세지
                { shouldFocus: true }, // 에러가 발생한 input으로 focus 이동
            );
            return;
        }

        // const { data: signUpInfo, error } = await signUp(data);
        // if (error) {
        //     toast.error('이미 존재하는 이메일입니다');
        //     return;
        // }

        // toast.success('회원가입 성공!');
        // setShowModal({ show: false });
        try {
            const res = await axios.post('/api/signup', data);
            console.log(res);
            toast.success('회원가입 성공!');
            setShowModal({ show: false });
        } catch (error) {
            console.log(error);
            toast.error('회원가입 정보를 확인해주세요');
            return;
        }
    };

    return (
        <form className='flex flex-col' onSubmit={handleSubmit(onValid)}>
            <input
                type='text'
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
                    pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,14}$/,
                        message: '비밀번호 양식에 맞춰 입력해주세요',
                    },
                })}
            />
            <span className='text-red-600'>{errors?.password?.message}</span>
            <input
                type='password'
                placeholder='비밀번호 확인'
                className='p-2 mb-1'
                {...register('passwordCheck', {
                    required: '비밀번호가 일치하지 않습니다',
                    pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,14}$/,
                        message: '비밀번호가 일치하지 않습니다',
                    },
                })}
            />
            <span className='text-red-600'>
                {errors?.passwordCheck?.message}
            </span>
            <input
                type='nickname'
                placeholder='닉네임(2~10글자)'
                className='p-2 mb-2'
                {...register('nickname', {
                    required: '닉네임을 입력해주세요',
                    pattern: {
                        value: /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{2,10}$/,
                        message: '닉네임 양식에 맞춰 입력해주세요',
                    },
                })}
            />
            <span className='text-red-600'>{errors?.nickname?.message}</span>

            <Button type='submit' variant='outlined' disabled={!isValid}>
                회원가입
            </Button>
        </form>
    );
};

export default Register;
