import mongoose, { Schema, model, models, Model, Document } from 'mongoose';

export interface IPushSubscription extends Document {
  userId: string;
  subscription: any;
  createdAt: Date;
  updatedAt: Date;
}

const pushSubscriptionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    subscription: {
      type: Schema.Types.Mixed,
      required: true
    }
  },
  { timestamps: true }
);

const PushSubscription: Model<IPushSubscription> =
  (models.PushSubscription as Model<IPushSubscription>) ||
  model<IPushSubscription>('PushSubscription', pushSubscriptionSchema);

export default PushSubscription;


