import mongoose, { Schema, Document } from "mongoose";

// Define the interface for Booking document
export interface BookingDocument extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  address: {
    flatNumber: string;
    buildingNumber: string;
    landmark: string;
    city: string;
  };
  contactNumber: number;
  bookingTime: Date;
}

const bookingSchema: Schema<BookingDocument> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  address: {
    flatNumber: { type: String, required: true },
    buildingNumber: { type: String, required: true },
    landmark: { type: String, required: true },
    city: { type: String, required: true },
  },
  contactNumber: { type: Number, required: true },
  bookingTime: { type: Date, required: true },
});

// Create and export the Booking model
export const Booking = mongoose.model<BookingDocument>(
  "Booking",
  bookingSchema
);
