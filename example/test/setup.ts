import request from "supertest";
import { app } from "../app";

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "private-key";
});

// could be moved to setup/auth-helper.ts and imported into *.test.ts files
declare global {
  var signin: () => Promise<string[]>;
}

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie ?? [];
};
