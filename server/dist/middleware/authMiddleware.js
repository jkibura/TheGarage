"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (typeof authHeader === "string" && !(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
            console.log("Unauthorized: No Bearer token");
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = typeof authHeader === "string" ? authHeader.split(" ")[1] : undefined;
        if (!token) {
            console.log("Unauthorized: No token provided");
            return res.status(401).json({ message: "No token provided" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            console.log("Decoded token:", decoded);
            if (roles.length && !roles.includes(decoded.role)) {
                console.log("Forbidden: User role not authorized");
                return res.status(403).json({ message: "Forbidden" });
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            console.log("Invalid token:", err.message);
            return res.status(401).json({ message: "Invalid token" });
        }
    };
};
exports.authMiddleware = authMiddleware;
