import { Request, Response } from "express";

const express = require("express");
const router = require("./routes/index");
const connectToDatabase = require("./db.ts");
const app = express();

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", router);

connectToDatabase();
app.listen(3000, () => console.log("listening on port 3000"));
