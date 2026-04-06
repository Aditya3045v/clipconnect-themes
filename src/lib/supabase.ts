import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL and Anon Key are missing. Please add them to your .env file.");
}

// Ensure we don't pass empty strings to createClient if they are actually missing
// as it might still throw. If missing, we'll export a proxy or a dummy client
// but for now, let's just ensure they are strings to avoid total crash.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);
