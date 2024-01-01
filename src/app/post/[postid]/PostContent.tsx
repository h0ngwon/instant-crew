import { Card, CardHeader, CardMedia, Typography } from '@mui/material';
import { IPost } from '@/hooks/useQueryPost';
import Image from 'next/image';

interface IProps {
    data: IPost;
}

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

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader sx={{ px: 1 }} title={title} subheader={address} />
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
