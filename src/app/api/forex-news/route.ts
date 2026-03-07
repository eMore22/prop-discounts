// src/app/api/forex-news/route.ts
// Fetches Forex Factory's public RSS calendar feed and returns parsed news/events.
// Forex Factory provides a public RSS feed at forexfactory.com/ff_calendar_thisweek.xml

import { NextResponse } from 'next/server';

export const revalidate = 1800; // Cache for 30 minutes

interface ForexEvent {
  title: string;
  country: string;
  date: string;
  time: string;
  impact: 'High' | 'Medium' | 'Low' | 'Holiday';
  forecast: string;
  previous: string;
  currency: string;
}

function parseImpact(text: string): ForexEvent['impact'] {
  const t = text.toLowerCase();
  if (t.includes('high')) return 'High';
  if (t.includes('medium')) return 'Medium';
  if (t.includes('holiday')) return 'Holiday';
  return 'Low';
}

function parseCurrency(title: string): string {
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'NZD', 'CNY'];
  for (const c of currencies) {
    if (title.includes(c)) return c;
  }
  return '';
}

export async function GET() {
  try {
    // Fetch Forex Factory's public RSS calendar
    const response = await fetch('https://nfs.faireconomy.media/ff_calendar_thisweek.xml', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PropCoupons/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`);
    }

    const xml = await response.text();

    // Parse XML manually (no external library needed)
    const events: ForexEvent[] = [];
    const itemRegex = /<event>([\s\S]*?)<\/event>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const item = match[1];

      const getTag = (tag: string) => {
        const m = item.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\/${tag}>|<${tag}[^>]*>([^<]*)<\/${tag}>`));
        return m ? (m[1] || m[2] || '').trim() : '';
      };

      const title = getTag('title');
      const country = getTag('country');
      const date = getTag('date');
      const time = getTag('time');
      const impact = parseImpact(getTag('impact'));
      const forecast = getTag('forecast');
      const previous = getTag('previous');
      const currency = country || parseCurrency(title);

      if (title) {
        events.push({ title, country, date, time, impact, forecast, previous, currency });
      }
    }

    // If XML parsing found nothing, return fallback message
    if (events.length === 0) {
      return NextResponse.json({
        events: [],
        source: 'Forex Factory',
        message: 'No events found in feed',
        cached_at: new Date().toISOString(),
      });
    }

    // Sort by date/time, return upcoming events first (max 20)
    const now = new Date();
    const upcoming = events
      .filter(e => {
        try {
          return new Date(`${e.date} ${e.time || '00:00'}`) >= now;
        } catch { return true; }
      })
      .slice(0, 20);

    return NextResponse.json({
      events: upcoming.length > 0 ? upcoming : events.slice(0, 20),
      source: 'Forex Factory',
      total: events.length,
      cached_at: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Forex Factory fetch error:', error.message);

    // Return fallback static data so the UI never breaks
    return NextResponse.json({
      events: [],
      source: 'Forex Factory',
      error: 'Unable to fetch live data',
      cached_at: new Date().toISOString(),
    });
  }
}