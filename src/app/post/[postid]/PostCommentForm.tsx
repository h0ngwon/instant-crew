import React, { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { IPost } from '@/hooks/useQueryPost';
import { SubmitHandler, useForm } from 'react-hook-form';
import useQueryComment, { IComment } from '@/hooks/useQueryComment';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { supabase } from '@/apis/dbApi';

interface IProps {
    postData: IPost;
}
interface ICommentFormInput {
    content: string;
}

export default function PostCommentForm({ postData }: IProps) {
    const { id: post_id } = postData;

    const { createComment } = useQueryComment(post_id);

    const { register, resetField, handleSubmit } = useForm({
        defaultValues: {
            content: '',
        },
    });

    const onSubmit: SubmitHandler<ICommentFormInput> = async (data) => {
        const userData = await supabase.auth.getSession();
        const userId = userData.data.session?.user.id;
        const newComment = {
            ...data,
            user_id: userId,
            post_id,
        };
        createComment.mutate({ Row: newComment });
        resetField('content');
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
