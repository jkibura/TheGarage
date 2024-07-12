import mongoose, { Document, Schema } from "mongoose";

interface ISpareParts extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
}

const sparesSchema = new Schema<ISpareParts>({
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

export default mongoose.model<ISpareParts>("Spares", sparesSchema);
