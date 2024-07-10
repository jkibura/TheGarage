import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "worker" | "client";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      // Jesse
      type: String,
      required: true,
      unique: true,
    },
    email: {
      // @mail.com
      type: String,
      required: true,
      unique: true,
    },
    password: {
      // 123
      type: String,
      required: true,
    },
    role: {
      // admin
      type: String,
      enum: ["admin", "worker", "client"],
      required: true,
      default: "client",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
