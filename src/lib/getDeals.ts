// src/lib/getDeals.ts
import { supabase } from './supabase';

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

export async function getDeals(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('prop_deals')
    .select('*')
    .order('prop_score', { ascending: false });

  if (error) {
    console.error('Error fetching deals:', error);
    return [];
  }

  return data || [];
}

export async function getDealBySlug(slug: string): Promise<Deal | null> {
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
}