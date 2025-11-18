// import { MongoClient } from 'mongodb';

// const options = {};

// declare global {
//   var _mongoClientPromise: Promise<MongoClient>;
// }
// const MONGODB_URI: any = process.env.NEXT_PUBLIC_MONGODB_URI;
// class Singleton {
//   private static _instance: Singleton;
//   private client: MongoClient;
//   private clientPromise: Promise<MongoClient>;
//   private constructor() {
//     this.client = new MongoClient(MONGODB_URI, options);
//     this.clientPromise = this.client.connect();
//     if (process.env.NODE_ENV === 'development') {
//       global._mongoClientPromise = this.clientPromise;
//     }
//   }

//   public static get instance() {
//     if (!this._instance) {
//       this._instance = new Singleton();
//     }
//     return this._instance.clientPromise;
//   }
// }
// const clientPromise = Singleton.instance;
// export default clientPromise;

import monggose from 'mongoose';

const MONGODB_URI: any = "mongodb+srv://harshal_2001:XROffice2001@react-template.yyzlsye.mongodb.net/?appName=react-template";

const connect = async () => {
  const cinnectionStatus = monggose.connection.readyState;
  if (cinnectionStatus === 1) {
    console.log('Connection already established');
    return;
  }
  if (cinnectionStatus === 2) {
    console.log('Connecting...');
    return;
  }
  try {
    monggose.connect(MONGODB_URI!, {
      dbName: 'next-template',
      bufferCommands: true
    });
    console.log('Connection established');
    return monggose.connection;
  } catch (error: any) {
    console.error('Error establishing connection:', error);
    throw new Error('error', error);
  }
};

export default connect;
