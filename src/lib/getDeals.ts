// src/lib/getDeals.ts
import { createClient } from '@supabase/supabase-js';

export interface Deal {
  id: string;
  firm: string;
  code: string;
  discount: string;
  expiry: string | null;
  slug: string;
  prop_score: number | null;
  description?: string;
  link?: string;
  verification_status?: 'verified' | 'sponsored' | 'community-favorite' | 'limited-time';
  votes_got_paid?: number;
  votes_still_waiting?: number;
  votes_failed?: number;
  created_at: string;
}

// Create client only when needed
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are not set');
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function getDeals(): Promise<Deal[]> {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('prop_deals')
      .select('*')
      .order('prop_score', { ascending: false });

    if (error) {
      console.error('Error fetching deals:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getDeals:', error);
    return [];
  }
}

export async function getDealBySlug(slug: string): Promise<Deal | null> {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('prop_deals')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching deal:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getDealBySlug:', error);
    return null;
  }
}