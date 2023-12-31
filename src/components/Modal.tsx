'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { modalState } from '@/recoil/modalAtom';
import { useRecoilState } from 'recoil';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FBF6EE',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    title: string;
    buttonName: string;
    children: React.ReactNode;
};

export default function BasicModal({ title, buttonName, children }: Props) {
    const [showModal, setShowModal] = useRecoilState(modalState);

    const handleClose = () => setShowModal({ show: false, key: title });

    return (
        <>
            {/* <Button onClick={handleOpen}>{title}</Button> */}
            <Modal
                open={showModal.show}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                        className='text-center'
                    >
                        {buttonName}
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }} />
                    {children}

                    <Button
                        onClick={handleClose}
                        className='absolute top-2 right-2'
                    >
                        ❌
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
