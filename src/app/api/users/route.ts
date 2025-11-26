import connect from '@/lib/dbConnection';
import User from '@/lib/modals/users';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify({ status: 200, data: users }), { status: 200 });
  } catch (error: any) {
    console.error('GET error:', error);
    return new NextResponse('error' + error.message || 'Internal server error', { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;
    if (!firstName || !lastName || !email || !password) {
      return new NextResponse('Missing required fields', { status: 400 });
    }
    await connect();
    const newUser = new User(body);
    await newUser.save();

    return new NextResponse(JSON.stringify(newUser), { status: 200 });
  } catch (error: any) {
    console.error('POST error:', error);
    return Response.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
};

// export const PUT = async (request: Request) => {
//   try {
//     const db = await clientPromise;
//     const requestData = await request.json();
//     const userData = requestData.data || requestData;

//     if (!userData.id) {
//       return Response.json({ error: 'Missing required field: id' }, { status: 400 });
//     }

//     // Extract id and remove it from update data
//     const { id, ...updateData } = userData;

//     const user = await db
//       .db('react-template')
//       .collection('users')
//       .updateOne({ _id: new ObjectId(id as string) }, { $set: updateData });
//     return Response.json(user as any);
//   } catch (error: any) {
//     console.error('PUT error:', error);
//     return Response.json({ error: error.message || 'Internal server error' }, { status: 500 });
//   }
// };

// export const DELETE = async (request: Request) => {
//   try {
//     const db = await clientPromise;
//     const requestData = await request.json();
//     const userData = requestData.data || requestData;

//     if (!userData.id) {
//       return Response.json({ error: 'Missing required field: id' }, { status: 400 });
//     }

//     const user = await db
//       .db('react-template')
//       .collection('users')
//       .deleteOne({ _id: new ObjectId(userData.id as string) });
//     return Response.json(user as any);
//   } catch (error: any) {
//     console.error('DELETE error:', error);
//     return Response.json({ error: error.message || 'Internal server error' }, { status: 500 });
//   }
// };
