import { NextResponse } from 'next/server';
import connect from '@/lib/dbConnection';
import PushSubscription from '@/lib/modals/pushSubscription';

export async function POST(req) {
  try {
    await connect();

    const { userId, subscription } = await req.json();

    if (!userId || !subscription) {
      return NextResponse.json({ error: 'userId and subscription are required' }, { status: 400 });
    }

    await PushSubscription.findOneAndUpdate(
      { userId },
      { subscription },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving subscription', error);
    return NextResponse.json({ error: 'Failed to save subscription' }, { status: 500 });
  }
}
