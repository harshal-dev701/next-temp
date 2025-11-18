import { Schema, model, models, Model, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: false
    },
    lastName: {
      type: String,
      required: true,
      unique: false
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
