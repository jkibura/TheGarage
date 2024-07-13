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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../src/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../../src/models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const DATABASE_URI = process.env.DATABASE_URI;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(DATABASE_URI, {});
    console.log("Connected to database");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    console.log("Disconnected from database");
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // Create a user before each test
    const hashedPassword = bcryptjs_1.default.hashSync("!Oo12345", 10);
    yield User_1.default.create({
        username: "oscar",
        email: "oscar@gmail.com",
        password: hashedPassword,
        role: "client",
    });
}));
it("allows registration of a user", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(server_1.default).post("/api/auth/register").send({
        username: "user",
        email: "user@gmail.com",
        password: "password123",
        role: "client",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Registration was successful");
}));
describe("POST /api/auth/login", () => {
    it("should login an existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).post("/api/auth/login").send({
            email: "oscar@gmail.com",
            password: "!Oo12345",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Login successful");
    }));
});
