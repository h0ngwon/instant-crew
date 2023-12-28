import BoardCategories from '@/components/boardCategory/BoardCategories';
import axios from 'axios';
import BoardMain from '@/components/BoardMain';

interface Props {
    searchParams?: {
        category?: string;
        search?: string;
    };
}
const Board = async ({ searchParams }: Props) => {
    const category = searchParams?.category;

    // const test = await axios.get('../api/post');
    // const posts = await GET();

    // category 선택한 데이터 받아오기
    // url query string을 사용하기 = server side rendering  지금방식

    /* const filteredPosts = posts?.filter((item) => {
        if (item.category === category) {
            return item;
        }
    }); */
    // 요건 서버 컴포넌트인데
    // 유저가 스크롤을 내릴 때 페이지네이션을 하고 싶다 -> 유저와 상호작용
    // 유저와 상호작용 === 클라이언트 컴포넌트
    return (
        <>
            <div className='flex justify-center mt-4'>
                <BoardCategories category={category} />
            </div>
            <BoardMain category={category} />
        </>
    );
};
export default Board;
