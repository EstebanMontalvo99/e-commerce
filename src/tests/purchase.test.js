const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
require("../models");

const BASE_URL_USERS = "/api/v1/users/login";
const BASE_URL = "/api/v1/purchase";
let TOKEN, userId, product;

beforeAll(async () => {
  const user = {
    email: "pedro@gmail.com",
    password: "pedropaco",
  };
  const res = await request(app).post(BASE_URL_USERS).send(user);

  TOKEN = res.body.token;
  userId = res.body.user.id;
});

test("POST      BASE_URL, should return status code 201 and res .body.quantity ===body.quantity", async () => {
  const productBody = {
    title: "Product1",
    description: "This product is very very smart",
    price: "120",
  };
  product = await Product.create(productBody);

  const cartBody = {
    quantity: 3,
    userId,
    productId: product.id,
  };

  await Cart.create(cartBody);
  const res = await request(app)
    .post(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);
  expect(res.status).toBe(201);
  expect(res.body[0].quantity).toBe(cartBody.quantity);
});

test("GET    BASE_URL, should return a status code 200 and res.body.length===1", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);
  await product.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});
