// src/lib/supabase-admin.ts

import { createClient } from '@supabase/supabase-js';

// Get the secure, server-only keys
const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

// CRITICAL CHECK: Throw a custom error if keys are missing
if (!supabaseUrl || !serviceKey) {
  throw new Error('Supabase Admin Client initialization failed. Check SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables in Vercel Preview/Production scopes.');
}

// Initialize and export the secure, server-side client
export const supabaseAdmin = createClient(supabaseUrl, serviceKey);