import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/db';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY
    ? process.env.NEXT_PUBLIC_SUPABASE_KEY
    : '';
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
