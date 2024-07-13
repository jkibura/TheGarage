"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import mongoSanitize from "express-mongo-sanitize";
// import xss from "xss-clean";
// import { setCspHeaders } from "./middleware/securityMiddleware";
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const workerRoutes_1 = __importDefault(require("./routes/workerRoutes"));
const cors_1 = __importDefault(require("cors"));
// import { limiter } from "./middleware/rateLimiter";
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT, 10) || 8000;
const DATABASE_URI = process.env.DATABASE_URI;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000",
}));
// Middleware for parsing JSON
app.use(express_1.default.json());
// Middleware for cookies
app.use((0, cookie_parser_1.default)());
// Serve static files from the 'uploads' directory
app.use("/uploads", express_1.default.static("uploads"));
// Middleware for parsing form data
// app.use(express.urlencoded({ extended: false }));
// Sanitize data against NoSQL Injection
// app.use(mongoSanitize());
// Prevent XSS attacks
// app.use(xss());
// middleware for rate limiter
// app.use(limiter);
// Use CSP middleware
// app.use(setCspHeaders());
// Connecting to MongoDB
mongoose_1.default
    .connect(DATABASE_URI)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Not Connected to database", err));
// get request
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running properly" });
});
// Middleware for our routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/client", clientRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/workers", workerRoutes_1.default);
// Setting up our port
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
}
// exporting our app for tests
exports.default = app;
