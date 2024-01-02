import { atom } from 'recoil';

export interface AuthType {
    id: string;
    profile_pic: string;
    full_name: string;
    email: string;
}

export const userState = atom<AuthType>({
    key: 'userInfo', // unique ID (with respect to other atoms/selectors)
    default: {
        id: '',
        profile_pic: '',
        full_name: '',
        email: '',
    }, // default value (aka initial value)
});
