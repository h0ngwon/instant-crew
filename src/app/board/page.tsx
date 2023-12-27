import BoardCategories from '@/components/boardCategory/BoardCategories';
import { GET } from '../api/post/route';
import axios from 'axios';
import Image from 'next/image';
interface Props {
    searchParams?: {
        category?: string;
        search?: string;
    };
}
const Board = async ({ searchParams }: Props) => {
    const category = searchParams?.category;

    // const test = await axios.get('../api/post');
    const posts = await GET();

    // category 선택한 데이터 받아오기
    // url query string을 사용하기 = server side rendering  지금방식

    const filteredPosts = posts?.filter((item) => {
        if (item.category === category) {
            return item;
        }
    });

    return (
        <>
            <div className='flex justify-center mt-4'>
                <BoardCategories category={category} />
            </div>
            <main className='grid grid-cols-2 gap-10 p-10'>
                {filteredPosts?.map((item, index) => (
                    <div
                        key={index}
                        className='border-solid border-[1px] rounded'
                    >
                        <div className='float-left'>
                            <Image
                                src={item.picture as string}
                                alt='게시글 이미지'
                                className='w-auto mr-[10px]'
                                width={100}
                                height={100}
                            />
                        </div>
                        <div>
                            <h1>{item.category}</h1>
                            <div>{item.title}</div>
                            <div>{item.content}</div>
                        </div>
                    </div>
                ))}
            </main>
        </>
    );
};
export default Board;
