import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_supabaseURL
const supabaseKEY = import.meta.env.VITE_supabaseKEY

export const supabaseClient = createClient(supabaseURL, supabaseKEY)