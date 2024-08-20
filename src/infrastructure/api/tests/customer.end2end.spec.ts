import { app, sequelize } from "../express";
import request from "supertest";
describe("Customer e2e test", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });
  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Customer 1",
        address: {
          street: "Street 1",
          city: "City 1",
          number: 1,
          zipcode: "Zipcode 1",
        },
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Customer 1");
    expect(response.body.address.street).toBe("Street 1");
    expect(response.body.address.city).toBe("City 1");
    expect(response.body.address.number).toBe(1);
    expect(response.body.address.zipcode).toBe("Zipcode 1");
    expect(response.body.id).toBeDefined();
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "Customer 1",
    });
    expect(response.status).toBe(500);
  });
});
