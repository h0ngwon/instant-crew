import { atom } from 'recoil';

export interface ModalStateType {
    show: boolean;
    key?: string;
}

export const modalState = atom<ModalStateType>({
    key: 'modalState', // unique ID (with respect to other atoms/selectors)
    default: {
        show: false,
        key: '',
    }, // default value (aka initial value)
});
