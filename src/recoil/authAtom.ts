import { Session, User } from '@supabase/supabase-js';
import { atom } from 'recoil';

export interface AuthType {
    session: Session | undefined | null;
    user: User | undefined | null;
}

export const userState = atom<AuthType>({
    key: 'userInfo', // unique ID (with respect to other atoms/selectors)
    default: {
        session: null,
        user: null,
    }, // default value (aka initial value)
});
