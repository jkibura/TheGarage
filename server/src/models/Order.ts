import mongoose, { Document, Schema } from "mongoose";

interface IOrder extends Document {
  clientId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  additionalParts: string[];
  status: "pending" | "in progress" | "completed";
  assignedWorker?: mongoose.Types.ObjectId;
  numberPlate: string;
  timeOfService: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    additionalParts: {
      type: [String],
      default: [],
    },
    numberPlate: {
      type: String,
      required: true,
    },
    timeOfService: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      default: "pending",
    },
    assignedWorker: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
