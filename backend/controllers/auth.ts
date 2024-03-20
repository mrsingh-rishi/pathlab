import { Request, Response } from "express";
import { User, UserDocument } from "../models/user";
const { signupZod, loginBody } = require("../validations/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req: Request, res: Response) {
  try {
    const { success } = loginBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const user: UserDocument | null = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatch: boolean = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token: string = jwt.sign(
      { email: user.email, id: user._id },
      "secret"
    );

    return res.status(201).json({ message: "Login Successfully", token });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
async function signup(req: Request, res: Response) {
  try {
    const { success } = signupZod.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: "Bad Request" });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
    const newUser: UserDocument = new User({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();

    const token: string = jwt.sign(
      { email: newUser.email, id: newUser._id },
      "secret"
    );

    return res.status(201).json({ message: "Signup Successfully", token });
  } catch (error: any) {
    console.error("Error during signup:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error " + error.message });
  }
}

module.exports = {
  login,
  signup,
};
