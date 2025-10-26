// src/app/api/admin/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // <--- NEW: Import jsonwebtoken for signing

// --- Configuration: Secure Supabase Client ---
// Create a client using the SECRET service_role key to bypass RLS policies
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
);
// --- Configuration End ---

export async function POST(request: NextRequest) {
    try {
        console.log('=== RAW REQUEST ===');
        const body = await request.json();
        console.log('Full body:', body);

        const { email, password } = body;

        console.log('\n=== LOGIN ATTEMPT ===');
        console.log('Received email:', JSON.stringify(email));

        if (!email || !password) {
            console.log('ERROR: Missing email or password');
            return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
        }

        console.log('\n=== QUERYING DATABASE (with Service Role) ===');
        console.log('Looking for email:', email);

        // 1. QUERY using the SECURE 'supabaseAdmin' client
        const { data: admin, error } = await supabaseAdmin
            .from('admin_users')
            .select('*')
            .eq('email', email)
            .single();

        console.log('Database query result:', admin);
        console.log('Database query error:', error);

        if (error || !admin) {
            console.log('ERROR: Admin not found in database');
            // Always return generic message for security
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        console.log('\n=== ADMIN FOUND ===');
        console.log('Admin email from DB:', JSON.stringify(admin.email));
        console.log('Admin role:', admin.role);

        // 2. SECURE PASSWORD COMPARISON using bcrypt.compare
        console.log('\n=== PASSWORD COMPARISON (Bcrypt) ===');
        const isMatch = await bcrypt.compare(password, admin.password_hash);

        console.log('Passwords match (Bcrypt result)?', isMatch);

        if (!isMatch) {
            console.log('ERROR: Password mismatch (Bcrypt failed)');
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // =======================================================
        // 🔑 CRITICAL FIX: Replace Base64 token with signed JWT
        // =======================================================
        console.log('\n=== CREATING SESSION (JWT) ===');
        
        // Payload must include the email for /api/admin/check/route.ts
        const payload = {
            email: admin.email,
            role: admin.role,
        };

        const jwtSecret = process.env.JWT_SECRET;
        
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined in environment variables.');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const token = jwt.sign(
            payload, 
            jwtSecret,
            { expiresIn: '7d' } // Token expires in 7 days
        );

        console.log('Generated JWT:', token.substring(0, 30) + '...'); // Log safely

        const response = NextResponse.json({ 
            success: true, 
            admin: {
                email: admin.email,
                role: admin.role
            }
        });

        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        console.log('=== LOGIN SUCCESS ===\n');
        return response;
    } catch (error) {
        console.error('\n=== LOGIN ERROR ===');
        console.error('Error:', error);
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}