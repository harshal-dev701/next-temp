import { NextResponse } from 'next/server';
import webpush from 'web-push';
import connect from '@/lib/dbConnection';
import PushSubscription from '@/lib/modals/pushSubscription';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'mailto:admin@example.com';

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
  // eslint-disable-next-line no-console
  console.warn('VAPID keys are not set. Push notifications will not work until they are configured.');
} else {
  webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

export async function POST(req: Request) {
  try {
    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'VAPID keys are not configured on the server' },
        { status: 500 }
      );
    }

    await connect();

    const { userId, title, message, url, icon } = await req.json();

    if (!userId || !title || !message) {
      return NextResponse.json(
        { error: 'userId, title and message are required' },
        { status: 400 }
      );
    }

    const sub = await PushSubscription.findOne({ userId });

    if (!sub) {
      return NextResponse.json({ error: 'User not subscribed' }, { status: 404 });
    }

    const payload = JSON.stringify({
      title,
      body: message,
      url: url || '/',
      icon: icon || '/file.svg'
    });

    try {
      await webpush.sendNotification(sub.subscription, payload);
      return NextResponse.json({ success: true });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sending web push', error);
      return NextResponse.json({ error: 'Failed to send push' }, { status: 500 });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unexpected error in /api/send-to-user', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


