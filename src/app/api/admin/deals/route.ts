import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

interface DealPayload {
    id?: string;
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

// ✅ Helper - creates client inside request context, never at build time
function getSupabaseAdmin() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Missing Supabase environment variables');
    }
    return createClient(supabaseUrl, supabaseServiceKey);
}

function verifyAdminToken(request: NextRequest): boolean {
    const tokenCookie = request.cookies.get('admin_token');
    const jwtSecret = process.env.JWT_SECRET;
    if (!tokenCookie || !tokenCookie.value || !jwtSecret) return false;
    try {
        jwt.verify(tokenCookie.value, jwtSecret);
        return true;
    } catch {
        return false;
    }
}

export async function GET(request: NextRequest) {
    if (!verifyAdminToken(request)) {
        return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('prop_deals')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Fetch deals error:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch deals' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!verifyAdminToken(request)) {
        return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const body: DealPayload = await request.json();
        const { firm, code, discount, expiry, slug, prop_score, description, link, verification_status } = body;

        if (!firm || !firm.trim()) return NextResponse.json({ error: 'Firm name is required' }, { status: 400 });
        if (!code || !code.trim()) return NextResponse.json({ error: 'Discount code is required' }, { status: 400 });
        if (!discount || !discount.trim()) return NextResponse.json({ error: 'Discount amount is required' }, { status: 400 });
        if (!link || !link.trim()) return NextResponse.json({ error: 'Affiliate link is required' }, { status: 400 });

        let normalizedDiscount = discount.trim();
        if (!normalizedDiscount.includes('%')) normalizedDiscount = normalizedDiscount + '%';

        const finalSlug = slug?.trim() || firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        const { data: existingDeal, error: checkError } = await supabaseAdmin
            .from('prop_deals')
            .select('slug')
            .eq('slug', finalSlug)
            .maybeSingle();

        if (checkError && checkError.code !== 'PGRST116') {
            return NextResponse.json({ error: 'Database error: ' + checkError.message }, { status: 500 });
        }
        if (existingDeal) {
            return NextResponse.json({ error: `A deal with slug "${finalSlug}" already exists.` }, { status: 409 });
        }

        const dealToInsert = {
            firm: firm.trim(),
            code: code.trim(),
            discount: normalizedDiscount,
            expiry: expiry || null,
            slug: finalSlug,
            prop_score: prop_score ? parseFloat(prop_score.toString()) : null,
            description: description?.trim() || null,
            link: link.trim(),
            verification_status: verification_status || 'verified',
        };

        const { data, error } = await supabaseAdmin
            .from('prop_deals')
            .insert(dealToInsert)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: `Database error: ${error.message}. ${error.hint || ''}` }, { status: 500 });
        }
        return NextResponse.json(data, { status: 201 });

    } catch (error: any) {
        console.error('Create deal error:', error);
        return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    if (!verifyAdminToken(request)) {
        return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const body: Partial<DealPayload> = await request.json();
        const { id, ...updates } = body;

        if (!id) return NextResponse.json({ error: 'Deal ID required for update' }, { status: 400 });

        if (updates.discount) {
            let normalizedDiscount = updates.discount.trim();
            if (!normalizedDiscount.includes('%')) normalizedDiscount = normalizedDiscount + '%';
            updates.discount = normalizedDiscount;
        }
        if (updates.prop_score !== undefined && updates.prop_score !== null) {
            updates.prop_score = parseFloat(updates.prop_score.toString());
        }
        if (updates.expiry === '') updates.expiry = null;
        if (updates.firm) updates.firm = updates.firm.trim();
        if (updates.code) updates.code = updates.code.trim();
        if (updates.slug) updates.slug = updates.slug.trim();
        if (updates.link) updates.link = updates.link.trim();
        if (updates.description) updates.description = updates.description.trim();

        const { data, error } = await supabaseAdmin
            .from('prop_deals')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
        }
        return NextResponse.json(data);

    } catch (error: any) {
        console.error('Update deal error:', error);
        return NextResponse.json({ error: error.message || 'Failed to update deal' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    if (!verifyAdminToken(request)) {
        return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'Deal ID required for delete' }, { status: 400 });

        const { error } = await supabaseAdmin
            .from('prop_deals')
            .delete()
            .eq('id', id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Delete deal error:', error);
        return NextResponse.json({ error: error.message || 'Failed to delete deal' }, { status: 500 });
    }
}