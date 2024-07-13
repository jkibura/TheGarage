import request from "supertest";
import app from "../src/server";

describe("GET /", () => {
  it("should return a status code 200 and a message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Server is running properly");
  });
});
