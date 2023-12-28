import { PostType } from '@/components/BoardMain';
import { supabase } from '../dbApi';
import { NextResponse } from 'next/server';
export const GET = async () => {
    let { data: post, error } = await supabase.from('post').select('*');
    // return NextResponse.json(post);
    return post;
};

// GET POST BY PAGE 동작 방식
// post 데이터를 요청을 ㅐㅎ야함 이때, 개수를 설정한다.
// 100개의 데이터가 있으면 10개씩 끊어서 가져온다.
// 10개로 나눠서 가져올 수 있음 -> 나눠지는거를 페이지라는 개념으로 가져간다.
// 5라는 페이지를 넣으면 -> 50번 째부터 ~ 60번 까지의 데이터를 가지고 와야한다.

// page = 5 -> page * pageSIZE(===50) , page * pageSIZE + pageSIZE(===60)
// 중요한건 이 기능을 supabase에서 해주냐 이렇게 끊어서 가져올 수 있느냐

// 우리가 페이지네이션을 하기 위해서 필요한 정보들이
// 1. 몇개 단위로 가져올 것인가 (page size로 우리가 설정하는 부분)
// 2. 현재 어디인가(현재 페이지) (state로 관리를 한다)
// 3. 총 몇개의 데이터가 있는가? (count로 가져옴)

const PAGE_SIZE = 10;
export const GET_POST_BY_PAGE = async (page: number = 0) => {
    const { data, count } = await supabase
        .from('post')
        .select('', { count: 'exact' })
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    console.log(data);
    console.log('총 개수:', count);
    //@ts-ignore
    return data as PostType[];
};

export const GET_POST_BY_PAGE_AND_CATEGORY = async (
    page: number = 0,
    category?: string,
) => {
    if (category) {
        const { data, count } = await supabase
            .from('post')
            .select('', { count: 'exact' })
            .eq('category', category)
            .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
        //@ts-ignore
        return data as PostType[];
    }
    return await GET_POST_BY_PAGE(page);
};
