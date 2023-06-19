import mongoose, {Schema, Document } from "mongoose";
import shortid from "shortid";

interface ShortURL extends Document {
    originalURL: string;
    shortUrl: string;
    createdAt: Date;
}

const urlSchema = new Schema<ShortURL>(
    {
        originalURL: { type: String, required: true },
        shortUrl: { type: String, 
                    required: true, 
                    unique: true,
                   default: shortid.generate()
                },
        createdAt: { type: Date, default: Date.now },
      }
)

const shortUrl = mongoose.model<ShortURL>('ShortURL', urlSchema);

export default shortUrl