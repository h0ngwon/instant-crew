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
    const {
        category,
        content,
        created_at,
        date,
        id,
        location,
        picture,
        title,
        user_id,
        address,
    } = data;

    const selectedCategory = categories.find(({ value, label }) => {
        return value === category;
    });

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                sx={{ px: 1 }}
                title={`${title} ${selectedCategory?.label}`}
                subheader={address}
            />
            <CardMedia
                sx={{ height: 125, objectFit: 'fill' }}
                component='img'
                image={picture}
                alt='picture'
            />

            <Typography sx={{ px: 1 }} variant='h6' className='font-semibold'>
                {content}
            </Typography>
        </Card>
    );
}
