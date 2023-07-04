const request = require("supertest");
const app = require("../app");
const path = require("path");
const BASE_URL_USER = `/api/v1/users/login`;
const BASE_URL = `/api/v1/product_images`;
let TOKEN, productImgId;

beforeAll(async () => {
  const user = {
    email: "pedro@gmail.com",
    password: "pedropaco",
  };

  const res = await request(app).post(BASE_URL_USER).send(user);
  TOKEN = res.body.token;
});

test("POST  BASE_URL should return a status code 201  res.body.url to be defined and res.body.filename to be defined", async () => {
  const imagePath = path.join(__dirname, `..`, `public`, `cocina.jpg`);

  const res = await request(app)
    .post(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)
    .attach(`image`, imagePath);

  productImgId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.url).toBeDefined();
  expect(res.body.filename).toBeDefined();
});

test("GET   BASE_URL   should status code 200 and res.body.length===1", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);
  expect(res.status).toBe(200);
});

test("DELETE -> 'BASE_URL/:productImgId', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${productImgId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);
});
