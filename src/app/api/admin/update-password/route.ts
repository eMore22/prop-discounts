// src/app/api/admin/update-password/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    // ✅ Client created inside function - not at build time
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // ✅ Fixed: was SUPABASE_SERVICE_KEY
    );

    const { email, currentPassword, newPassword } = await request.json();

    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Email, current password, and new password are required' },
        { status: 400 }
      );
    }

    // STEP 1: Retrieve current hash
    const { data: userData, error: fetchError } = await supabaseAdmin
      .from('admin_users')
      .select('password_hash')
      .eq('email', email)
      .single();

    if (fetchError || !userData) {
      console.error('User fetch error:', fetchError);
      return NextResponse.json({ error: 'Authentication failed. User not found.' }, { status: 401 });
    }

    // STEP 2: Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userData.password_hash);

    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: 'Incorrect current password.' }, { status: 401 });
    }

    // STEP 3: Hash new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // STEP 4: Update database
    const { error: updateError } = await supabaseAdmin
      .from('admin_users')
      .update({ password_hash: newHashedPassword })
      .eq('email', email);

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Password updated successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Password update exception:', error);
    return NextResponse.json({ error: 'An internal error occurred.' }, { status: 500 });
  }
}