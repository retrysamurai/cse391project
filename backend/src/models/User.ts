import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IUser {
  userId: ObjectId;
  name: string;
  phone: string;
  gender: string;
  dob: Date;
  bloodGroup: string;
  area: string;
  address: string;
  email: string;
  password: string;
  lastDonated: Date;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
  userId: Schema.Types.ObjectId,
  name: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  bloodGroup: { type: String, required: true },
  area: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  lastDonated: Date
});

export default mongoose.model<IUserModel>("User", UserSchema);
