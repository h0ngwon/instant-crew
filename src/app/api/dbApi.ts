import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/db';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY
    ? process.env.NEXT_PUBLIC_SUPABASE_KEY
    : '';
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

// export const subscription = supabase.auth.onAuthStateChange(
//     (event, session) => {
//         console.log(event, session);

//         if (event === 'INITIAL_SESSION') {
//             // handle initial session
//         } else if (event === 'SIGNED_IN') {
//             // handle sign in event
//         } else if (event === 'SIGNED_OUT') {
//             // handle sign out event
//         } else if (event === 'PASSWORD_RECOVERY') {
//             // handle password recovery event
//         } else if (event === 'TOKEN_REFRESHED') {
//             // handle token refreshed event
//         } else if (event === 'USER_UPDATED') {
//             // handle user updated event
//         }
//     },
// );
