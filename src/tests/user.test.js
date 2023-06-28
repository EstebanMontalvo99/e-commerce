const request = require("supertest");
const app = require("../app");

const BASE_URL = `/api/v1/users`;
let TOKEN, userId;
beforeAll(async () => {
  const user = {
    email: "pedro@gmail.com",
    password: "pedropaco",
  };
  const res = await request(app).post(`${BASE_URL}/login`).send(user);

  TOKEN = res.body.token;
});

test("GET  BASE_URL, should return a status code 200 and res.body must have length 1", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set(`Authorization`, `Bearer ${TOKEN}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST   URL_BASE should return a 201 code, res.body.firstName==body.firstName", async () => {
  const userCreate = {
    firstName: "Juan",
    lastName: "Paco",
    email: "juan@gmail.com",
    password: "juan",
    phone: "0998227362",
  };

  const res = await request(app).post(BASE_URL).send(userCreate);
  userId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(userCreate.firstName);
});

test("PUT BASE_URL/:id, should return status code 200 nd res.body.firstName=body.firstName", async () => {
  const userUpdate = {
    firstName: "Pedrito",
  };
  const res = await request(app)
    .put(`${BASE_URL}/${userId}`)
    .send(userUpdate)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(userUpdate.firstName);
});

test("POST  BASE_URL/login should return a status code 200  res.body.email===vpdy.email and token defined", async () => {
  const userLogin = {
    email: "juan@gmail.com",
    password: "juan",
  };

  const res = await request(app).post(`${BASE_URL}/login`).send(userLogin);

  expect(res.status).toBe(200);
  expect(res.body.user.email).toBe(userLogin.email);
  expect(res.body.token).toBeDefined();
});

test("POST  BASE_URL/login should return a status code 401  ", async () => {
  const userLogin = {
    email: "juan@gmail.com",
    password: "INVALID PASSWORD",
  };

  const res = await request(app).post(`${BASE_URL}/login`).send(userLogin);

  expect(res.status).toBe(401);
});

test("DELETE BASE_URL/:id, should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);
});
