import { Request } from "express";
import { z, ZodError } from "zod";
// Define Zod validation schema for the booking data
const bookingSchema = z.object({
  name: z.string(),
  address: z.object({
    flatNumber: z.string(),
    buildingNumber: z.string(),
    landmark: z.string(),
    city: z.string(),
  }),
  contactNumber: z.number(),
  bookingTime: z.string(),
});

const bookingUpdateSchema = z.object({
  name: z.string().optional(), // Name is optional for update
  address: z
    .object({
      flatNumber: z.string().optional(),
      buildingNumber: z.string().optional(),
      landmark: z.string().optional(),
      city: z.string().optional(),
    })
    .optional(),
  contactNumber: z.number().optional(), // Contact number is optional for update
  bookingTime: z.string().optional(), // Booking time is optional for update
});

// Function to validate request body using Zod schema
function validateBookingUpdateData(req: Request) {
  try {
    const { success } = bookingUpdateSchema.safeParse(req.body);
    if (!success) {
      throw new Error("Invalid booking data");
    }
    return req.body;
  } catch (error: any) {
    if (error instanceof ZodError) {
      throw new Error("Invalid booking update data " + error.message);
    }
    throw error;
  }
}

// Function to validate request body using Zod schema
function validateBookingData(req: Request) {
  try {
    const { success } = bookingSchema.safeParse(req.body);
    if (!success) {
      throw new Error("Invalid booking data");
    }
    return req.body;
  } catch (error: any) {
    if (error instanceof ZodError) {
      throw new Error("Invalid booking update data " + error.message);
    }
    throw error;
  }
}

module.exports = {
  validateBookingData,
  validateBookingUpdateData,
};
