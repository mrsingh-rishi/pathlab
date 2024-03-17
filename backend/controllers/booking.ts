import { Request, Response } from "express";
import { Booking } from "../models/booking";
const {
  validateBookingData,
  validateBookingUpdateData,
} = require("../validations/booking");

interface AuthenticatedRequest extends Request {
  userId?: string; // Define the custom property userId
}
// Create a booking
async function createBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { name, address, contactNumber, bookingTime } =
      validateBookingData(req);
    const userId = req.userId;
    console.log(userId);
    const booking = await Booking.create({
      user: userId,
      name,
      address,
      contactNumber,
      bookingTime,
    });

    res.status(201).json(booking);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
}

// Get all bookings
async function getAllBookings(req: Request, res: Response) {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

// Update a booking
async function updateBooking(req: Request, res: Response) {
  try {
    const bookingId = req.params.id; // Assuming booking ID is passed as a route parameter
    const updateData = validateBookingUpdateData(req);

    // Update the booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

// Delete a booking
async function deleteBooking(req: Request, res: Response) {
  try {
    const bookingId = req.params.id; // Assuming booking ID is passed as a route parameter

    // Find the booking by ID and delete it
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
// Get all bookings for a user
async function getAllUsersBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId; // Assuming user ID is passed as a route parameter

    // Find all bookings for the specified user
    const userBookings = await Booking.find({ user: userId });

    if (userBookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    res.status(200).json(userBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

export {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getAllUsersBooking,
};
