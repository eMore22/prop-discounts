// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// The '!' tells TypeScript these variables will be defined (on Vercel)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create and export the Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseKey);