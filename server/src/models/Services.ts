import mongoose, { Document, Schema } from "mongoose";

interface IService extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
}

const serviceSchema = new Schema<IService>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IService>("Service", serviceSchema);
