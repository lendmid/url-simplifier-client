import { createClient } from '@supabase/supabase-js'

const { VITE_SUPABASE_KEY } = import.meta.env;
const supabaseUrl = 'https://oulquaokiutzfspypiht.supabase.co'

export const supabase = createClient(supabaseUrl, VITE_SUPABASE_KEY)

