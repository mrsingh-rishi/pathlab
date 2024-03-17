import mongoose, { Schema, Document } from "mongoose";

// Define the schema
export interface UserDocument extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const userSchema: Schema<UserDocument> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
});

export const User = mongoose.model<UserDocument>("User", userSchema);
