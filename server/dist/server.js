"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const workerRoutes_1 = __importDefault(require("./routes/workerRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT, 10) || 8000;
const DATABASE_URI = process.env.DATABASE_URI;
const app = (0, express_1.default)();
// Middleware for parsing JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connecting to MongoDB
mongoose_1.default
    .connect(DATABASE_URI)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Not Connected to database", err));
app.get("/garage", (req, res) => {
    res.status(200).json({ message: "Server is running properly" });
});
// Middleware for our routes
app.use("/auth", authRoutes_1.default);
app.use("/api/client", clientRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/workers", workerRoutes_1.default);
// Setting up our port
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
