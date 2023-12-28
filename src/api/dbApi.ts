import { Database } from '@/types/db';
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ? process.env.NEXT_PUBLIC_SUPABASE_KEY : "";
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export const getData = async () => {
    try {
        const {data, error} = await supabase.from('post').select();
        if(error) throw new Error();
        return data;
    }catch (err) {
        throw new Error();
    }
}