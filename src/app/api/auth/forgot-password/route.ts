import connect from '@/lib/dbConnection';
import User from '@/lib/modals/users';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { setOTP } from '@/lib/otpStore';
import { sendOtpEmail } from '@/lib/email/sendOtpEmail';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new NextResponse(JSON.stringify({ message: 'Email is required' }), { status: 400 });
    }

    await connect();
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with email (expires in 10 minutes) - store before sending email
    setOTP(email, otp, 10);

    // Try to send email, but don't fail if email service is down
    try {
      await sendOtpEmail({ email, otp });
      if (process.env.NODE_ENV !== 'production') {
        console.log(`OTP for ${email}: ${otp}`);
      }
    } catch (emailError: any) {
      console.error('Email sending error:', emailError);
      // Log the error but don't fail the request - OTP is already stored
      // In production, you might want to handle this differently
      if (process.env.NODE_ENV !== 'production') {
        console.log(`OTP for ${email} (email failed, but OTP stored): ${otp}`);
      }
    }

    return new NextResponse(
      JSON.stringify({
        status: 200,
        message: 'OTP sent to your email',
        data: { email }
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
        message: error?.message || 'An unexpected error occurred'
      }),
      { status: 500 }
    );
  }
};

