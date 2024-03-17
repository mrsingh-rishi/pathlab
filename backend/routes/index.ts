const expressIndex = require("express");

const routerIndex = expressIndex.Router();
const { authMiddleware } = require("../middlewares/auth");
const authRouter = require("./auth");
const bookingRouter = require("./booking");

routerIndex.use("/auth", authRouter);
routerIndex.use("/booking", authMiddleware, bookingRouter);

module.exports = routerIndex;
