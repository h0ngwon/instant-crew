import { Data } from '@/app/api/post/recommend/route';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const getRandomData = (): Promise<AxiosResponse<Data, AxiosError>>=> {
    try {
        const res = axios.get<Data>('api/post/recommend', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (err) {
        throw new Error();
    }
};
