import mongoose, { Schema, Document } from "mongoose";
import { customAlphabet } from "nanoid";

//generate customeID
const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  3
);

interface ShortURL extends Document {
  originalURL: string;
  shortUrl: string;
  createdAt: Date;
  clicks: Number;
  lastClickedAt: Date | null;
  referringSources: string[];
}

const urlSchema = new Schema<ShortURL>({
  originalURL: { type: String, required: true },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(),
  },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, required: true, default: 0 },
  lastClickedAt: { type: Date },
  referringSources: [String],
});

const shortUrl = mongoose.model<ShortURL>("ShortURL", urlSchema);

export default shortUrl;
