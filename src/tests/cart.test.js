const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");
const BASE_URL_USER = "/api/v1/users/login";
const BASE_URL = "/api/v1/cart";
let TOKEN, userId, product, cartId;

beforeAll(async () => {
  const user = {
    email: "pedro@gmail.com",
    password: "pedropaco",
  };
  const res = await request(app).post(BASE_URL_USER).send(user);

  TOKEN = res.body.token;
});

test("POST   BASE_URL, should return a 201 status and res.body.quantity===bpdy.quantity", async () => {
  const productBody = {
    title: "smart tv",
    description: "very smart",
    price: "500",
  };

  product = await Product.create(productBody);

  const cartBody = {
    quantity: 1,
    userId,
    productId: product.id,
  };

  const res = await request(app)
    .post(BASE_URL)
    .send(cartBody)
    .set("Authorization", `Bearer ${TOKEN}`);
  cartId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.quantity).toBe(cartBody.quantity);
});

test("GET -> 'URL_BASE', sholud status code 200 and res.body.length === 1", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT   BASE_URL/:id, sould return a status code 200 and res.body.quantity===body.quantity  ", async () => {
  const cartBody = {
    quantity: 2,
  };

  const res = await request(app)
    .put(`${BASE_URL}/${cartId}`)
    .send(cartBody)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(cartBody.quantity);
});

test("DELETE    BASE_URL/:id, should return a 204 status", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);
  await product.destroy();
});
