'use client';
import React, { useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, useFormContext } from 'react-hook-form';
import { DateValidationError } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { IPost } from '@/hooks/useQueryPost';

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

interface IProps {
    data?: IPost;
}

export default function PostTextfields({ data }: IProps) {
    // react-hook-form context
    const { register, control } = useFormContext();

    console.log(data);
    // datepicker 에러
    const [error, setError] = React.useState<DateValidationError | null>(null);
    const errorMessage = useMemo(() => {
        switch (error) {
            case 'invalidDate': {
                return '잘못된 날짜형식 입니다.';
            }
            case 'disablePast': {
                return '선택불가능한 날짜입니다.';
            }

            default: {
                return '';
            }
        }
    }, [error]);

    return (
        <div className='flex flex-col w-full gap-3'>
            <TextField
                fullWidth
                id='outlined-basic'
                label='제목'
                variant='outlined'
                {...register('title', {
                    value: data?.title,
                    required: true,
                    maxLength: 20,
                })}
            />
            <TextField
                fullWidth
                select
                id='standard-basic'
                label='카테고리'
                variant='outlined'
                {...register('category', {
                    value: data?.category,
                    required: true,
                })}
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

            <Controller
                name='date'
                control={control}
                defaultValue={null}
                render={({ field: { onChange, value, ...restField } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                onChange={(event: any, context) => {
                                    if (context.validationError) {
                                        onChange(null);
                                    } else {
                                        onChange(
                                            `${event.$y}-${event.$M + 1}-${
                                                event.$D
                                            }`,
                                        );
                                    }
                                }}
                                onError={(error) => {
                                    setError(error);
                                }}
                                slotProps={{
                                    textField: {
                                        helperText: errorMessage,
                                    },
                                }}
                                value={dayjs(data?.date)}
                                minDate={dayjs()}
                                className='w-full'
                                label='일시'
                                disablePast
                                format='YYYY년 MM월 DD일'
                                {...restField}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                )}
            />

            <TextField
                fullWidth
                multiline
                id='standard-basic'
                label='내용'
                variant='outlined'
                rows={4}
                {...register('content', {
                    value: data?.content,
                    required: true,
                    maxLength: 100,
                })}
            />
        </div>
    );
}
