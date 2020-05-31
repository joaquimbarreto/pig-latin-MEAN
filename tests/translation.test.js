const request = require("supertest");
const app = require("../server/app");
const Translation = require("../models/translation");
const { userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create translation for user", async () => {
  const response = await request(app)
    .post("/translations")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "From my test",
    })
    .expect(201);
  const translation = await Translation.findById(response.body._id);
  expect(translation).not.toBeNull();
  expect(translation.completed).toEqual(false);
});

test("Should fetch user translations", async () => {
  const response = await request(app)
    .get("/translations")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
});
