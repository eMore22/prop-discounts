import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { amazonUrl } = await request.json();

    if (!amazonUrl || !amazonUrl.includes('amazon.com')) {
      return NextResponse.json(
        { error: 'Invalid Amazon URL' },
        { status: 400 }
      );
    }

    // Extract ASIN from URL
    const asinMatch = amazonUrl.match(/\/dp\/([A-Z0-9]{10})/i) || 
                      amazonUrl.match(/\/product\/([A-Z0-9]{10})/i);
    
    if (!asinMatch) {
      return NextResponse.json(
        { error: 'Could not extract ASIN from URL' },
        { status: 400 }
      );
    }

    const asin = asinMatch[1];

    // Fetch the Amazon page
    const response = await fetch(amazonUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Amazon');
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract book data
    const title = $('#productTitle').text().trim() || 
                  $('span[id="ebooksProductTitle"]').text().trim();
    
    const author = $('#bylineInfo .author .a-link-normal').first().text().trim() ||
                   $('.author .contributorNameID').first().text().trim();
    
    const description = $('#bookDescription_feature_div').text().trim() ||
                       $('#feature-bullets').text().trim() ||
                       $('.a-expander-content.a-expander-partial-collapse-content').first().text().trim();
    
    // Get cover image
    const coverImage = $('#imgBlkFront').attr('src') || 
                       $('#landingImage').attr('src') ||
                       $('#ebooksImgBlkFront').attr('src');
    
    // Get price
    const priceWhole = $('.a-price-whole').first().text().trim();
    const priceFraction = $('.a-price-fraction').first().text().trim();
    const price = priceWhole && priceFraction ? `$${priceWhole}${priceFraction}` : 
                  $('.a-price .a-offscreen').first().text().trim() || 
                  'Price not available';
    
    // Get pages
    const pagesText = $('span:contains("pages")').first().text();
    const pagesMatch = pagesText.match(/(\d+)\s*pages/i);
    const pages = pagesMatch ? pagesMatch[1] : '';
    
    // Get publish date
    const publishDate = $('span:contains("Publication date")').next().text().trim() ||
                       $('#rpi-attribute-book_details-publication_date .rpi-attribute-value').text().trim();
    
    // Get rating
    const ratingText = $('.a-icon-star .a-icon-alt').first().text();
    const ratingMatch = ratingText.match(/(\d+\.?\d*)\s*out\s*of\s*5/i);
    const rating = ratingMatch ? ratingMatch[1] : '';
    
    // Get review count
    const reviewsText = $('#acrCustomerReviewText').text();
    const reviewsMatch = reviewsText.match(/(\d+[\d,]*)\s*ratings?/i);
    const reviews = reviewsMatch ? reviewsMatch[1].replace(/,/g, '') : '';

    // Return extracted data
    return NextResponse.json({
      asin,
      title: title || 'Title not found',
      author: author || 'Author not found',
      description: description ? description.substring(0, 500) : 'Description not available',
      coverImage: coverImage || '',
      price: price,
      pages: pages,
      publishDate: publishDate || new Date().toISOString().split('T')[0],
      rating: rating,
      reviews: reviews
    });

  } catch (error: any) {
    console.error('Amazon fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch book data from Amazon' },
      { status: 500 }
    );
  }
}