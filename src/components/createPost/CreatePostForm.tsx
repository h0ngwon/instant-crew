import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Iinput {
    title: string;
    category: '맛집' | '문화예술' | '스터디' | '운동';
    // date:""
    content: string;
}

const category = [
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

export default function Form() {
    return (
        <Box
            component='form'
            noValidate
            autoComplete='off'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '8px',
            }}
        >
            <TextField
                fullWidth
                id='outlined-basic'
                label='제목'
                variant='outlined'
            />
            <TextField
                fullWidth
                select
                id='standard-basic'
                label='카테고리'
                variant='outlined'
                SelectProps={{
                    native: true,
                }}
            >
                {category.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label.concat(' ', option.value)}
                    </option>
                ))}
            </TextField>
            <TextField
                fullWidth
                id='standard-basic'
                label='일시'
                variant='outlined'
            />
            <TextField
                fullWidth
                multiline
                id='standard-basic'
                label='내용'
                variant='outlined'
                rows={4}
            />
        </Box>
    );
}
