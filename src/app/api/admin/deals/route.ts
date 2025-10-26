// src/app/api/admin/deals/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

// --- Initialize the Secure Client (SERVICE ROLE) ---
// This client bypasses RLS for reliable server-side read/write.
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
);

const jwtSecret = process.env.JWT_SECRET;

// Interface for type safety
interface DealPayload {
    id?: string; // Optional for POST, required for PUT
    firm: string;
    code: string;
    discount: string;
    expiry: string | null;
    slug: string;
    link: string;
    description: string;
    prop_score: number | null;
    verification_status: string;
}

// =======================================================
// CRITICAL FIX: Secure Authentication Function
// =======================================================
function verifyAdminToken(request: NextRequest): boolean {
    const tokenCookie = request.cookies.get('admin_token');

    if (!tokenCookie || !tokenCookie.value || !jwtSecret) {
        return false;
    }

    try {
        // Must verify the token with the secret to ensure it's authentic and unexpired
        jwt.verify(tokenCookie.value, jwtSecret);
        return true;
    } catch (error) {
        return false; // Token is invalid or expired
    }
}

// =======================================================
// GET: READ all Discount Codes
// =======================================================
export async function GET(request: NextRequest) {
    if (!verifyAdminToken(request)) {
        return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    try {
        // FIX: Use the supabaseAdmin client for reliable data fetching
        const { data, error } = await supabaseAdmin
            .from('prop_deals')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Fetch deals error:', error);
        return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
    }
}

// =======================================================
// POST: CREATE a new Discount Code
// =======================================================
export async function POST(request: NextRequest) {
    if (!verifyAdminToken(request)) {
        return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    try {
        const body: DealPayload = await request.json();
        const { firm, code, discount, expiry, slug, prop_score, description, link, verification_status } = body;

        // Basic validation
        if (!firm || !code || !discount || !slug) {
            return NextResponse.json({ error: 'Missing required fields: firm, code, discount, slug' }, { status: 400 });
        }

        const dealToInsert = {
            firm,
            code,
            discount,
            expiry: expiry || null,
            slug,
            prop_score: prop_score ? parseFloat(prop_score.toString()) : null,
            description: description || null,
            link: link || null,
            verification_status: verification_status || 'verified', // Default to 'verified'
        };

        // FIX: Use the supabaseAdmin client for reliable data insertion
        const { data, error } = await supabaseAdmin
            .from('prop_deals')
            .insert(dealToInsert)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Create deal error:', error);
        return NextResponse.json({ error: 'Failed to create deal' }, { status: 500 });
    }
}

// =======================================================
// PUT: UPDATE an existing Discount Code
// =======================================================
export async function PUT(request: NextRequest) {
    if (!verifyAdminToken(request)) {
        return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    try {
        const body: Partial<DealPayload> = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: 'Deal ID required for update' }, { status: 400 });
        }
        
        // Ensure prop_score is converted to a number if it exists
        if (updates.prop_score !== undefined && updates.prop_score !== null) {
            updates.prop_score = parseFloat(updates.prop_score.toString());
        }

        // Ensure expiry is null if empty string
        if (updates.expiry === "") {
             updates.expiry = null;
        }

        // FIX: Use the supabaseAdmin client for reliable updates
        const { data, error } = await supabaseAdmin
            .from('prop_deals')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Update deal error:', error);
        return NextResponse.json({ error: 'Failed to update deal' }, { status: 500 });
    }
}

// =======================================================
// DELETE: Delete a Discount Code
// =======================================================
export async function DELETE(request: NextRequest) {
    if (!verifyAdminToken(request)) {
        return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Deal ID required for delete' }, { status: 400 });
        }

        // FIX: Use the supabaseAdmin client for reliable deletion
        const { error } = await supabaseAdmin
            .from('prop_deals')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete deal error:', error);
        return NextResponse.json({ error: 'Failed to delete deal' }, { status: 500 });
    }
}