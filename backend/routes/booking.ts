const expressBooking = require("express");

const routerBooking = expressBooking.Router();

const {
  createBooking,
  deleteBooking,
  getAllBookings,
  updateBooking,
  getAllUsersBooking,
} = require("../controllers/booking");

routerBooking.post("/", createBooking);
routerBooking.get("/", getAllBookings);
routerBooking.put("/:id", updateBooking);
routerBooking.delete("/:id", deleteBooking);
routerBooking.get("/user", getAllUsersBooking);

module.exports = routerBooking;
