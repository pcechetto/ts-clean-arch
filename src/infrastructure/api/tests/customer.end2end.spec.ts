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

  it("should list all customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "City",
          number: 123,
          zipcode: "12345",
        },
      });
    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Jane",
        address: {
          street: "Street 2",
          city: "City 2",
          number: 1234,
          zipcode: "12344",
        },
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/customer").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    const customer = listResponse.body.customers[0];
    expect(customer.name).toBe("John");
    expect(customer.address.street).toBe("Street");
    const customer2 = listResponse.body.customers[1];
    expect(customer2.name).toBe("Jane");
    expect(customer2.address.street).toBe("Street 2");
  });
});
