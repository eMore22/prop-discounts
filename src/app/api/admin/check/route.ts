// src/app/api/admin/check/route.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // 1. Import jsonwebtoken

// Define a type for the decoded token payload
interface AdminTokenPayload extends jwt.JwtPayload {
    email: string;
}

export async function GET(request: NextRequest) {
    const tokenCookie = request.cookies.get('admin_token');

    if (!tokenCookie || !tokenCookie.value) {
        // If no token exists, the user is not authenticated
        return NextResponse.json({ authenticated: false, email: null }, { status: 401 });
    }

    const token = tokenCookie.value;
    const jwtSecret = process.env.JWT_SECRET; // Retrieve secret from environment

    if (!jwtSecret) {
        // Essential security check
        console.error("JWT_SECRET is not set in environment variables.");
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    try {
        // 2. VERIFY AND DECODE THE TOKEN
        const payload = jwt.verify(token, jwtSecret) as AdminTokenPayload;
        
        // 3. CRITICAL CHANGE: RETURN THE EMAIL FROM THE TOKEN
        return NextResponse.json({ 
            authenticated: true, 
            email: payload.email // Assumes your token payload includes 'email'
        }, { status: 200 });

    } catch (error) {
        // Token verification failed (e.g., expired or invalid token)
        console.error('Token verification failed:', error);
        
        // Clear the bad cookie for security
        const response = NextResponse.json({ authenticated: false, email: null }, { status: 401 });
        response.cookies.delete('admin_token');
        return response;
    }
}