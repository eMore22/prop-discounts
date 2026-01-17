import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// GET all books
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const bookData = {
      id: body.id || body.asin || Date.now().toString(),
      title: body.title,
      subtitle: body.subtitle || null,
      author: body.author,
      description: body.description || null,
      cover_image: body.coverImage || null,
      amazon_link: body.amazonLink,
      price: body.price || null,
      pages: body.pages || null,
      publish_date: body.publishDate || null,
      rating: body.rating || null,
      reviews: body.reviews || null,
      category: body.category || 'Trading Education',
      asin: body.asin || null
    };

    const { data, error } = await supabaseAdmin
      .from('books')
      .insert(bookData)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE book
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Book ID required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('books')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}