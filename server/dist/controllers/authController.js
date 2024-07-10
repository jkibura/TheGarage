"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheckController = exports.logoutController = exports.loginController = exports.registerController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    try {
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        const user = new User_1.default({ username, email, password: hashedPassword, role });
        yield user.save();
        res.status(200).json({ message: "Registration was successful" });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});
exports.registerController = registerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid credentials. Please try again" });
        }
        const isMatch = bcryptjs_1.default.compareSync(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Invalid credentials. Please try again" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: "2hr" });
        res.cookie("token", token, {
            httpOnly: true,
            /* secure: true, */
            sameSite: "strict",
        });
        res.status(200).json({ message: "Login successful", role: user.role });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "There was an error while logging in.", error });
    }
});
exports.loginController = loginController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
});
exports.logoutController = logoutController;
const authCheckController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new Error("Unauthorized");
        }
        // Verify the token
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        // Assuming your decodedToken includes the role information
        const role = decodedToken.role;
        res.status(200).json({ message: "Authenticated", role });
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
});
exports.authCheckController = authCheckController;
