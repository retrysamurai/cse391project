import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IDonate {
  donateId: ObjectId;
  recieverId: ObjectId;
  bloodGroup: string;
  donationDate: Date;
  donationBank: string;
}

export interface IDonateModel extends IDonate, Document {}

const DonateSchema: Schema = new Schema({
  donateId: Schema.Types.ObjectId,
  recieverId: Schema.Types.ObjectId,
  bloodGroup: String,
  donationDate: Date,
  donationBank: String
});

export default mongoose.model<IDonateModel>("Donate", DonateSchema);
