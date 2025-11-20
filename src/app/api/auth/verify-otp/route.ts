import { NextResponse } from 'next/server';
import { getOTP, verifyOTP as verifyOTPStore } from '@/lib/otpStore';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return new NextResponse(JSON.stringify({ message: 'Email and OTP are required' }), { status: 400 });
    }

    const storedData = getOTP(email);

    if (!storedData) {
      return new NextResponse(JSON.stringify({ message: 'OTP not found or expired' }), { status: 404 });
    }

    if (Date.now() > storedData.expiresAt) {
      return new NextResponse(JSON.stringify({ message: 'OTP has expired' }), { status: 400 });
    }

    if (!verifyOTPStore(email, otp)) {
      return new NextResponse(JSON.stringify({ message: 'Invalid OTP' }), { status: 400 });
    }

    // OTP verified successfully
    return new NextResponse(
      JSON.stringify({
        status: 200,
        message: 'OTP verified successfully',
        data: { email, verified: true }
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
};

