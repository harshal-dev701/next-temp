import { Schema, model, models, Model, Document } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const User: Model<IUser> = (models.User as Model<IUser>) || model<IUser>('User', userSchema);

export default User;
