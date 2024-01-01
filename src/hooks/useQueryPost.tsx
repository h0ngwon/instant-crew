import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';
export interface IPost {
    category: string;
    content: string;
    created_at: Date;
    date: string;
    id: string;
    location: string;
    picture: string;
    title: string;
    user_id: string;
    address: string;
}
export default function useQueryPost(postid?: string) {
    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery<IPost[]>({
        queryFn: async () => {
            const response = await axios.get(
                `/api/post${postid ? `/${postid}` : ''}`,
            );
            return response.data;
        },
        queryKey: postid ? ['post', { postid }] : ['post'],
    });

    const createPost = useMutation({
        mutationFn: async ({ Row }: any) => {
            const response = await axios.post('/api/post', Row, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post'] });
        },
        onError: (error) => {
            console.log(error);
        },
    });
    const deletePost = useMutation({
        mutationFn: async (postid: string) => {
            const response = await axios.delete(`/api/post/${postid}`);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post'] });
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const modifyPost = useMutation({
        mutationFn: async ({ postid, Row }: any) => {
            const response = await axios.put(`/api/post/${postid}`, Row, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', postid] });
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return {
        post: data,
        error,
        loading: isLoading,
        createPost,
        deletePost,
        modifyPost,
    };
}
