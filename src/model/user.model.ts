import mongoose, { Schema, Document, Model} from "mongoose";
import bcrypt from "bcrypt";
import { ShortURL } from "./url.model";

export interface UserModel extends Model<UserDocument> {}

export interface UserDocument extends Document {
  createdAt: Date;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  isValidPassword: (password: string) => Promise<boolean>;
  objectId: Schema.Types.ObjectId;
  urls: Array<Schema.Types.ObjectId | ShortURL>;
}


const userSchema = new Schema<UserDocument>(
  {
    createdAt: { type: Date, default: Date.now },

    first_name: { type: String, required: true },

    last_name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    objectId: { type: Schema.Types.ObjectId },

    urls: [{ type: Schema.Types.ObjectId, ref: "ShortURL" }]
    
  }
);

userSchema.pre<UserDocument>("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export default mongoose.model<UserDocument>("Users", userSchema);
