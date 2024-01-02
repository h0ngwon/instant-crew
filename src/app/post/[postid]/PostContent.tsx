import { Card, CardHeader, CardMedia, Typography } from '@mui/material';
import { IPost } from '@/hooks/useQueryPost';
import Image from 'next/image';

interface IProps {
    data: IPost;
}

const categories = [
    {
        value: '맛집',
        label: '😋',
    },
    {
        value: '문화예술',
        label: '🎭︎',
    },
    {
        value: '스터디',
        label: '📖',
    },
    {
        value: '운동',
        label: '👟',
    },
];

export default function PostContent({ data }: IProps) {
    const { category, content, date, picture, title, address } = data;

    const selectedCategory = categories.find(({ value, label }) => {
        return value === category;
    });

    return (
        <Card className='max-w-[350px] px-2 w-full flex flex-col gap-1 py-1 '>
            <h1 className='text-2xl'>
                {title} {selectedCategory?.label}
            </h1>
            <div className='text-xs '>
                <p>주소:{address}</p>
                <p>날짜:{date}</p>
            </div>

            <CardMedia
                className='bg-neutral-100'
                sx={{
                    height: 125,
                    objectFit: 'fill',
                }}
                component='img'
                image={picture}
                alt='picture'
            />
            <p className='text-lg text-wrap w-full'>{content}</p>
        </Card>
    );
}
