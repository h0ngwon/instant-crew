import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

export default function useQueryPost(postid?: string) {
    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery({
        queryFn: async () => {
            const response = await axios.get(
                `/api/post${postid && `/${postid}`}`,
            );
            return response.data;
        },
        queryKey: ['post', postid && postid],
    });

    const { mutate: createPost } = useMutation({
        mutationFn: (formData: FormData) => {
            const response = axios.post('/api/storage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post'] });
        },
        onError: () => {},
    });

    return { post: data, error, loading: isLoading, createPost };
}
