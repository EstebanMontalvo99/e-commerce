const request = require("supertest");
const app = require("../app");
const BASE_URL_USERS = "/api/v1/users/login";
const BASE_URL = "/api/v1/categories";
let TOKEN, categoryId;

beforeAll(async () => {
  const user = {
    email: "pedro@gmail.com",
    password: "pedropaco",
  };
  const res = await request(app).post(BASE_URL_USERS).send(user);

  TOKEN = res.body.token;
});

test("POST BASE_URL should return status code 201, should return res.body.name===body.name", async () => {
  const category = {
    name: "Computers",
  };
  const res = await request(app)
    .post(BASE_URL)
    .send(category)
    .set("Authorization", `Bearer ${TOKEN}`);
  categoryId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(category.name);
});

test("GET BASE_URL should return status code 200, should return res.body.lenghth===1", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("DELETE BASE_URL should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${categoryId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);
});
