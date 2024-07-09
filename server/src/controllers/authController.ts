import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

export const registerController = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(200).json({ message: "Registration was successful" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Please try again" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Please try again" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.TOKEN_SECRET as string,
      { expiresIn: "1hr" }
    );
    res.json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error while logging in.", error });
  }
};
