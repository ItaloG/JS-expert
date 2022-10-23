const { describe, it, before } = require("mocha");
const request = require("supertest");
const { expect } = require("chai");

const app = require("../../src/presentation/index");
const carCategoriesDatabase = require("../../database/carCategories.json");
const consumersDatabase = require("../../database/customers.json");

describe("API Suite test", () => {
  let carCategory = {};
  let consumer = {};
  before(() => {
    carCategory = carCategoriesDatabase[0];
    consumer = consumersDatabase[0];
  });

  describe("/car/available", () => {
    it("should request the available car with a car category and return a car and HTTP Status 200", async () => {
      const response = await request(app)
        .post("/car/available")
        .send(carCategory)
        .expect(200);

      expect(response.text).to.be.ok;
    });
  });

  describe("/car/final-price", () => {
    it("should request a final price with a customer data, a car category and the number of days, and return HTTP Status 200", async () => {
      const response = await request(app)
        .post("/car/final-price")
        .send({ consumer, carCategory, numberOfDays: 5 })
        .expect(200);

      expect(response.text).to.be.ok;
    });
  });

  describe('/car/rent', () => {
    it('should request a car rent with a customer data, a car category and the number of day, and return a transaction with HTTP Status 200', async () => {
      const response = await request(app)
        .post("/car/rent")
        .send({ consumer, carCategory, numberOfDays: 5 })
        .expect(200);

      expect(response.text).to.be.ok;
    });
  });

  describe("Undefined routes", () => {
    it("should request an inexistent route /car/hi and return HTTP Status 404", async () => {
      const response = await request(app).get("/car/hi").expect(404);
      expect(response.text).to.be.deep.equal('Not found!')
    });
  });
});
