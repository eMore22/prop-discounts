// src/app/api/admin/update-password/route.ts
// **This code replaces your existing file content.**

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// --- Initialize the Secure Client ---
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // 1. EXTRACT ALL REQUIRED FIELDS
    // The frontend component MUST send 'currentPassword'
    const { email, currentPassword, newPassword } = await request.json();

    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Email, current password, and new password are required' }, 
        { status: 400 }
      );
    }
    
    // --- SECURITY STEP 1: RETRIEVE THE CURRENT HASH ---
    const { data: userData, error: fetchError } = await supabaseAdmin
      .from('admin_users')
      .select('password_hash')
      .eq('email', email)
      .single();

    if (fetchError || !userData) {
      // Return a generic authentication error
      console.error('User fetch error:', fetchError);
      return NextResponse.json({ error: 'Authentication failed. User not found.' }, { status: 401 });
    }

    const currentHash = userData.password_hash;
    
    // --- SECURITY STEP 2: VERIFY THE CURRENT PASSWORD (CRITICAL STEP) ---
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, currentHash);

    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: 'Incorrect current password.' }, { status: 401 });
    }

    // --- SECURITY STEP 3: HASH THE NEW PASSWORD ---
    const saltRounds = 10;
    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    // --- SECURITY STEP 4: UPDATE THE DATABASE ---
    const { error: updateError } = await supabaseAdmin
      .from('admin_users')
      .update({ password_hash: newHashedPassword }) 
      .eq('email', email);                        

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
    }
    
    // --- Success Response ---
    return NextResponse.json({ message: 'Password updated successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Password update exception:', error);
    return NextResponse.json({ error: 'An internal error occurred.' }, { status: 500 });
  }
}