import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import clientRoutes from "./routes/clientRoutes";
import adminRoutes from "./routes/adminRoutes";
import workerRoutes from "./routes/workerRoutes";
import cors from "cors";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;
const DATABASE_URI: string = process.env.DATABASE_URI as string;

const app: Express = express();

// Middleware for parsing JSON
app.use(express.json());

app.use(cors());

// Connecting to MongoDB
mongoose
  .connect(DATABASE_URI)
  .then(() => console.log("Connected to database"))
  .catch((err: Error) => console.log("Not Connected to database", err));

app.get("/garage", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running properly" });
});

// Middleware for our routes
app.use("/auth", authRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/workers", workerRoutes);

// Setting up our port
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
