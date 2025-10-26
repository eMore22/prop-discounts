import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { dealId, voteType, comment } = await request.json();
    
    const userIp = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';

    // Check if user already voted
    const { data: existingVote } = await supabase
      .from('deal_votes')
      .select('*')
      .eq('deal_id', dealId)
      .eq('user_ip', userIp)
      .eq('vote_type', voteType)
      .single();

    if (existingVote) {
      return NextResponse.json({ error: 'Already voted' }, { status: 400 });
    }

    // Insert vote
    const { error: voteError } = await supabase
      .from('deal_votes')
      .insert({
        deal_id: dealId,
        vote_type: voteType,
        user_ip: userIp,
        comment: comment || null
      });

    if (voteError) throw voteError;

    // Update vote counts in prop_deals table
    const columnMap: { [key: string]: string } = {
      'got_paid': 'votes_got_paid',
      'still_waiting': 'votes_still_waiting',
      'failed': 'votes_failed'
    };

    const column = columnMap[voteType];
    
    if (column) {
      // Get current count
      const { data: deal } = await supabase
        .from('prop_deals')
        .select(`${column}, votes_got_paid, votes_still_waiting, votes_failed`)
        .eq('id', dealId)
        .single();

      if (deal) {
        const newCount = (deal[column] || 0) + 1;
        
        // Update the count
        await supabase
          .from('prop_deals')
          .update({ [column]: newCount })
          .eq('id', dealId);

        // Return updated vote counts
        return NextResponse.json({ 
          success: true,
          votes: {
            gotPaid: column === 'votes_got_paid' ? newCount : deal.votes_got_paid || 0,
            stillWaiting: column === 'votes_still_waiting' ? newCount : deal.votes_still_waiting || 0,
            failed: column === 'votes_failed' ? newCount : deal.votes_failed || 0
          }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json({ error: 'Failed to submit vote' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dealId = searchParams.get('dealId');

    if (!dealId) {
      return NextResponse.json({ error: 'dealId required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('deal_votes')
      .select('vote_type, comment, created_at')
      .eq('deal_id', dealId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch votes error:', error);
    return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 });
  }
}