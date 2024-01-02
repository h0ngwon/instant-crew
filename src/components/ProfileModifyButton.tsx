'use client';
import { ModalStateType, modalState } from '@/recoil/modalAtom';
import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import Modal from './Modal';
import ProfileModifyForm from './ProfileModifyForm';

const ProfileModifyButton = () => {
    const [showModal, setShowModal] =
        useRecoilState<ModalStateType>(modalState);
    const handleOpen = (title: string) =>
        setShowModal({ show: true, key: title });

    return (
        <div className='m-[30px]'>
            <Button
                className='bg-main-color hover:bg-main-background hover:text-main-color'
                variant='contained'
                onClick={() => handleOpen('프로필변경')}
            >
                프로필 변경
            </Button>
            {showModal.key === '프로필변경' && (
                <Modal title='프로필 변경' buttonName='프로필 변경'>
                    <ProfileModifyForm />
                </Modal>
            )}
        </div>
    );
};

export default ProfileModifyButton;
