import connect from '@/lib/dbConnection';
import User from '@/lib/modals/users';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { verifyOTP, deleteOTP, getOTP } from '@/lib/otpStore';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, otp, newPassword } = body;

    if (!email || !otp || !newPassword) {
      return new NextResponse(JSON.stringify({ message: 'Email, OTP, and new password are required' }), {
        status: 400
      });
    }

    // Verify OTP first
    const storedData = getOTP(email);

    if (!storedData) {
      return new NextResponse(JSON.stringify({ message: 'OTP not found or expired' }), { status: 404 });
    }

    if (Date.now() > storedData.expiresAt) {
      deleteOTP(email);
      return new NextResponse(JSON.stringify({ message: 'OTP has expired' }), { status: 400 });
    }

    if (!verifyOTP(email, otp)) {
      return new NextResponse(JSON.stringify({ message: 'Invalid OTP' }), { status: 400 });
    }

    // Validate password strength
    if (newPassword.length < 6) {
      return new NextResponse(JSON.stringify({ message: 'Password must be at least 6 characters' }), {
        status: 400
      });
    }

    await connect();
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    // Remove OTP from store after successful reset
    deleteOTP(email);

    return new NextResponse(
      JSON.stringify({
        status: 200,
        message: 'Password reset successfully'
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Reset password error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
};

