import connect from '@/lib/dbConnection';
import User from '@/lib/modals/users';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN } from '@/global/constants';
import bcrypt from 'bcrypt';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return new NextResponse(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }
    await connect();
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new NextResponse(JSON.stringify({ message: 'Invalid password' }), { status: 401 });
    }
    const token = jwt.sign({ userId: user._id }, process.env.NEXT_PUBLIC_JWT_SECRET!, { expiresIn: '1d' });
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });

    const { password: _, __v, ...userData } = user.toObject();
    const response = new NextResponse(
      JSON.stringify({ status: 200, message: 'Login successfully', data: { ...userData, access_token: token } }),
      { status: 200 }
    );

    return response;
  } catch (error: any) {
    console.error('POST error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
};
