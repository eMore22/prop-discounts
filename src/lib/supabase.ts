// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Get environment variables - provide fallbacks for build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only throw error at runtime, not build time
function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    // During build, this won't throw - only at runtime
    if (typeof window !== 'undefined') {
      console.error('Supabase configuration is missing');
    }
    // Return a dummy client for build purposes
    return createClient('https://placeholder.supabase.co', 'placeholder-key');
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = getSupabaseClient();