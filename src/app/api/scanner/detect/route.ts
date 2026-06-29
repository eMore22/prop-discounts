// src/app/api/scanner/detect/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { handleNewDomain } from '@/lib/scanner/certstream';

export async function POST(req: NextRequest) {
  try {
    const { domain } = await req.json();
    if (!domain) {
      return NextResponse.json({ error: 'Domain required' }, { status: 400 });
    }
    await handleNewDomain(domain);
    return NextResponse.json({ success: true, domain });
  } catch (err) {
    console.error('Scanner error:', err);
    return NextResponse.json({ error: 'Scanner failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { default: WebSocket } = await import('ws');

    const ws = new WebSocket('wss://certstream.calidog.io/');

    let processed = 0;
    const MAX = 500;

    ws.on('message', async (data: Buffer) => {
      try {
        const event = JSON.parse(data.toString());
        const domains: string[] = event.data?.leaf_cert?.all_domains || [];

        for (const domain of domains) {
          if (processed >= MAX) {
            ws.close();
            return;
          }
          processed++;
          await handleNewDomain(domain);
        }
      } catch {
        // Skip malformed events
      }
    });

    ws.on('error', (err: Error) => console.error('Certstream WS error:', err));
    ws.on('close', () => console.log(`Certstream closed after ${processed} certs`));

    return NextResponse.json({ success: true, message: 'Certstream monitor started' });
  } catch (err) {
    console.error('Certstream start error:', err);
    return NextResponse.json({ error: 'Failed to start monitor' }, { status: 500 });
  }
}
