import { MongoClient } from 'mongodb';

const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}
const MONGODB_URI: any = process.env.MONGODB_URI;
class Singleton {
  private static _instance: Singleton;
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;
  private constructor() {
    this.client = new MongoClient(MONGODB_URI, options);
    this.clientPromise = this.client
      .connect()
      .then(() => {
        return this.client;
      })
      .catch((err) => {
        return err;
      });
    if (process.env.NODE_ENV === 'development') {
      global._mongoClientPromise = this.clientPromise;
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance.clientPromise;
  }
}
const clientPromise = Singleton.instance;
export default clientPromise;
