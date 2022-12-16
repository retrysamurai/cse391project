import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IRequest {
  requesterId: ObjectId;
  responderId: ObjectId;
  reqBloodGroup: string;
  resBloodGroup: string;
  area: string;
  reqDate: Date;
}

export interface IRequestModel extends IRequest, Document {}

const RequestSchema: Schema = new Schema({
  requesterId: Schema.Types.ObjectId,
  responderId: Schema.Types.ObjectId,
  reqBloodGroup: String,
  resBloodGroup: String,
  area: String,
  reqDate: Schema.Types.Date
});

export default mongoose.model<IRequestModel>("Request", RequestSchema);
