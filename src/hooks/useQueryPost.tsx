import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
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
}
export default function useQueryPost(postid?: string) {
    const queryClient = useQueryClient();
    console.log(postid);
    const { data, error, isLoading } = useQuery<IPost[]>({
        queryFn: async () => {
            const response = await axios.get(
                `/api/post${postid && `/${postid}`}`,
            );
            return response.data;
        },
        queryKey: ['post', postid && postid],
    });

    const { mutate: createPost } = useMutation({
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

    return { post: data, error, loading: isLoading, createPost };
}
