// src/app/api/admin/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    try {
        // ✅ Create client INSIDE the function so it only runs at request time,
        // not at build time when env vars aren't available
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY! // ✅ Fixed: was SUPABASE_SERVICE_KEY
        );

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

        const { data: admin, error } = await supabaseAdmin
            .from('admin_users')
            .select('*')
            .eq('email', email)
            .single();

        console.log('Database query result:', admin);
        console.log('Database query error:', error);

        if (error || !admin) {
            console.log('ERROR: Admin not found in database');
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        console.log('\n=== ADMIN FOUND ===');
        console.log('Admin email from DB:', JSON.stringify(admin.email));
        console.log('Admin role:', admin.role);

        console.log('\n=== PASSWORD COMPARISON (Bcrypt) ===');
        const isMatch = await bcrypt.compare(password, admin.password_hash);

        console.log('Passwords match (Bcrypt result)?', isMatch);

        if (!isMatch) {
            console.log('ERROR: Password mismatch (Bcrypt failed)');
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        console.log('\n=== CREATING SESSION (JWT) ===');

        const payload = {
            email: admin.email,
            role: admin.role,
        };

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined in environment variables.');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const token = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });

        console.log('Generated JWT:', token.substring(0, 30) + '...');

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
            maxAge: 60 * 60 * 24 * 7
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