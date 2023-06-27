import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface ShortURL extends Document {
  originalURL: string;
  shortUrl: string;
  shortId: string;
  createdAt: Date;
  clicks: number;
  lastClickedAt: Date | null;
  referringSources: string[];
  user: Schema.Types.ObjectId | UserDocument;
}

const urlSchema = new Schema<ShortURL>({
  originalURL: { type: String, required: true },
  shortUrl: {type: String, required: true, unique: true},
  shortId: { type: String, required: true, unique: true},
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, required: true, default: 0 },
  lastClickedAt: { type: Date },
  referringSources: [String],
  user: { type: Schema.Types.ObjectId, ref: "Users" },
});

const ShortURLModel = mongoose.model<ShortURL>("ShortURL", urlSchema);

export default ShortURLModel;
