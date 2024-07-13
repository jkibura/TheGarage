import request from "supertest";
import app from "../../src/server";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URI = process.env.DATABASE_URI as string;

beforeAll(async () => {
  await mongoose.connect(DATABASE_URI, {});
  console.log("Connected to database");
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log("Disconnected from database");
});

it("allows registration of a user", async () => {
  const res = await request(app).post("/api/auth/register").send({
    username: "user",
    email: "user@gmail.com",
    password: "password123",
    role: "client",
  });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty("message", "Registration was successful");
});

describe("POST /api/auth/login", () => {
  it("should login an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "oscar@gmail.com",
      password: "!Oo12345",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Login successful");
  });
});
