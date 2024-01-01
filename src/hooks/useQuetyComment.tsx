import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useQueryComment = () => {
    //1. mutation을 사용한다.
    const queryClient = useQueryClient();
    // 불러올때
    // const {data, error, isError, isLoading} = useQuery();
    const { data, error, isLoading } = useQuery({
        queryFn: async () => {
            const response = await axios.get('/api/post/comment');
            return response.data;
        },
        queryKey: ['post'],
    });

    // 등록, 수정, 삭제 할 때
    const createComment = useMutation({
        mutationFn: async ({ Row }: any) => {
            const response = await axios.post('/api/post/comment', Row, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post'] });
            return true;
        },
        onError: (error) => {
            console.log(error);
        },
    });

    //2. useQuery로 comment를 가져온다.

    return { postComment: data, error, isLoading, createComment };
};

export default useQueryComment;
