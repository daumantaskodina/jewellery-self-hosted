import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const arrayBuffer = await request.arrayBuffer();
    const blob = await put('white-gold-ring-polished-wedding-band.webp', arrayBuffer, {
      access: 'public',
      contentType: 'image/webp',
      addRandomSuffix: false
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Error uploading to blob:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
} 