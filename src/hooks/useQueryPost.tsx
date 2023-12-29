import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

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
