const request = require("supertest");
const app = require("../app");

const BASE_URL = `/api/v1/users`;
test("GET  BASE_URL, should return a status code 200 and res.body must have length 1", async () => {
  const res = (await request(app).get(BASE_URL)).set(
    `Authorization`,
    `Bearer ${TOKEN}`
  );
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});
