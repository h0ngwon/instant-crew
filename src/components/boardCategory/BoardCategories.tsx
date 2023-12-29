import Link from 'next/link';

type Props = {
    category?: string;
};

const BoardCategories = ({ category }: Props) => {
    // category db data 호출해서 뿌려주기
    const categoryData = [
        { id: 1, name: '맛집' },
        { id: 2, name: '문화예술' },
        { id: 3, name: '스터디' },
        { id: 4, name: '운동' },
    ];

    return (
        <div className='flex gap-[150px] justify-center h-[100px] mt-[50px]'>
            {categoryData.map((item) => (
                <Link href={`/board?category=${item.name}`} key={item.id}>
                    <h2
                        className={`${
                            category === item.name
                                ? 'text-[#D24B4B] font-bold text-[1.5rem]'
                                : 'text-[#ACACAC] text-[1.5rem]'
                        }`}
                    >
                        {item.name}
                    </h2>
                </Link>
            ))}
        </div>
    );
};
export default BoardCategories;
