import connect from '@/lib/dbConnection';
import User from '@/lib/modals/users';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;
    console.log('body', body);
    if (!firstName || !lastName || !email || !password) {
      return new NextResponse(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }
    await connect();
    const user = await User.findOne({ email });
    if (user) {
      return new NextResponse(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }
    const newUser = new User(body);
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.NEXT_PUBLIC_JWT_SECRET!, { expiresIn: '1d' });
    const { password: _, __v, ...userData } = newUser.toObject();
    return new NextResponse(JSON.stringify({ status: 200, message: 'Signup successful', data: userData }), {
      status: 200
    });
  } catch (error: any) {
    console.error('POST error:', error);
    return Response.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
};
