import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
/* import xss from "xss-clean"; */
import { setCspHeaders } from "./middleware/securityMiddleware";
import authRoutes from "./routes/authRoutes";
import clientRoutes from "./routes/clientRoutes";
import adminRoutes from "./routes/adminRoutes";
import workerRoutes from "./routes/workerRoutes";
import cors from "cors";
import { limiter } from "./middleware/rateLimiter";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;
const DATABASE_URI: string = process.env.DATABASE_URI as string;

const app: Express = express();

// Middleware for parsing JSON
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// Sanitize data against NoSQL Injection
// app.use(mongoSanitize());

// Prevent XSS attacks
// app.use(xss());

// middleware for rate limiter
// app.use(limiter);

// Use CSP middleware
// app.use(setCspHeaders());

// Connecting to MongoDB
mongoose
  .connect(DATABASE_URI)
  .then(() => console.log("Connected to database"))
  .catch((err: Error) => console.log("Not Connected to database", err));

// get request
app.get("/garage", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running properly" });
});

// Middleware for our routes
app.use("/api/auth", authRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/workers", workerRoutes);

// Setting up our port
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
