import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import EmailOpen from '@/models/schema';

export async function GET(req: Request) {
    await connectToDatabase();

    console.log('Email open tracking endpoint hit');
    // Parse query params from the request URL
    const url = new URL(req.url);
    const emailId = url.searchParams.get('emailId');

    // Get IP and user agent from headers
    const ip = req.headers.get('x-forwarded-for') || 'Unknown IP';
    const userAgent = req.headers.get('user-agent') || 'Unknown Agent';

    if (!emailId) {
        return new NextResponse('Missing emailId', { status: 400 });
    }

    await EmailOpen.create({
        emailId,
        ip,
        userAgent,
        timestamp: new Date(),
    });

    // Return a 1x1 transparent GIF
    const pixel = Buffer.from(
        'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        'base64'
    );

    const headers = new Headers();
    headers.set('Content-Type', 'image/gif');
    headers.set('Content-Length', pixel.length.toString());
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

    return new NextResponse(pixel, {
        status: 200,
        headers,
    });
}
