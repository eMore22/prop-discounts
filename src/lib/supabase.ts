// src/lib/supabase.ts

import { createClient } from '@supabase/supabase-js';

// Define public environment variables
const publicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// CRITICAL CHECK: Throw a custom error if public keys are missing.
// This ensures the Vercel build process sees a clean check.
if (!publicUrl || !publicAnonKey) {
  throw new Error('Public Supabase keys (NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing. Please verify the keys are set on Vercel with the "Preview" scope.');
}

// Initialize the main client using the checked variables
export const supabase = createClient(publicUrl, publicAnonKey);