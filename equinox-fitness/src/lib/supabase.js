import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a function to generate a Supabase client that uses the Clerk token
// This ensures that Requests to Supabase are authenticated natively using Row Level Security
export const getSupabaseClient = (supabaseAccessToken) => {
  const options = {};
  
  if (supabaseAccessToken) {
    options.global = {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    };
  }

  return createClient(supabaseUrl, supabaseAnonKey, options);
};
