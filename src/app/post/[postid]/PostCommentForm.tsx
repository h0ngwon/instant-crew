import React from 'react';
import { TextField } from '@mui/material';
import { IPost } from '@/hooks/useQueryPost';
import { useForm } from 'react-hook-form';

interface IProps {
    data: IPost;
}
export default function PostCommentForm({ data }: IProps) {
    const { register, handleSubmit } = useForm();

    return (
        <>
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
            >
                <TextField
                    inputProps={{ maxLength: 100 }}
                    fullWidth
                    multiline
                    id='standard-basic'
                    label='댓글 작성하기'
                    variant='outlined'
                    rows={2}
                    {...register('content', { required: true })}
                />
            </form>
        </>
    );
}
