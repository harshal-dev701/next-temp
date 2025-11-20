import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN } from '@/global/constants';

export const POST = async () => {
  try {
    const cookieStore = await cookies();

    // Clear the access token cookie
    cookieStore.delete(ACCESS_TOKEN);

    return new NextResponse(JSON.stringify({ status: 200, message: 'Logout successfully' }), { status: 200 });
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
