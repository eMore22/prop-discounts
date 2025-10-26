import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { dealId, eventType } = await request.json();
    
    // Get user info
    const userIp = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Insert analytics event
    const { error } = await supabase
      .from('deal_analytics')
      .insert({
        deal_id: dealId,
        event_type: eventType,
        user_ip: userIp,
        user_agent: userAgent
      });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dealId = searchParams.get('dealId');

    let query = supabase
      .from('deal_analytics')
      .select('event_type, created_at');

    if (dealId) {
      query = query.eq('deal_id', dealId);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Aggregate the data
    const stats = {
      code_copied: data?.filter(d => d.event_type === 'code_copied').length || 0,
      link_clicked: data?.filter(d => d.event_type === 'link_clicked').length || 0,
      page_viewed: data?.filter(d => d.event_type === 'page_viewed').length || 0,
      total: data?.length || 0
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}