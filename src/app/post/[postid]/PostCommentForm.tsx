import React from 'react';
import { Button, TextField } from '@mui/material';
import { IPost } from '@/hooks/useQueryPost';
import { SubmitHandler, useForm } from 'react-hook-form';
import useQueryComment from '@/hooks/useQueryComment';

interface IProps {
    postData: IPost;
}
interface ICommentFormInput {
    content: string;
}
export default function PostCommentForm({ postData }: IProps) {
    const { user_id, id: post_id } = postData;

    const { createComment } = useQueryComment(post_id);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            content: '',
        },
    });
    const onSubmit: SubmitHandler<ICommentFormInput> = async (data) => {
        const newComment = {
            ...data,
            user_id,
            post_id,
        };
        createComment.mutate({ Row: newComment });
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <Button type='submit'>입력</Button>
            </form>
        </>
    );
}
