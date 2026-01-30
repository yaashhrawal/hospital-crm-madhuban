import { createClient } from '@supabase/supabase-js'

console.log('⚡ [SupabaseClient] URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('⚡ [SupabaseClient] KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)
