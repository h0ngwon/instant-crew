import { Session, User } from '@supabase/supabase-js';
import { atom } from 'recoil';

export interface AuthType {
    id: string;
    avatar_url: string;
    full_name: string;
    email: string;
    // session: Session | undefined | null;
    // user: User | undefined | null;
}

export const userState = atom<AuthType>({
    key: 'userInfo', // unique ID (with respect to other atoms/selectors)
    default: {
        id: '',
        avatar_url: '',
        full_name: '',
        email: '',
        // session: null,
        // user: null,
    }, // default value (aka initial value)
});
