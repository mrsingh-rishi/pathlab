const expressIndex = require("express");

const routerIndex = expressIndex.Router();

const authRouter = require("./auth");

routerIndex.use("/auth", authRouter);

module.exports = routerIndex;
