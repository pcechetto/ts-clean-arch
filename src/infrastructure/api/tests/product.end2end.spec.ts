import { app, sequelize } from "../express";
import request from "supertest";

describe("Product e2e test", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });
  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 10,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(10);
    expect(response.body.id).toBeDefined();
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 10,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Product 2",
        price: 20,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response2.status).toBe(200);
    const response3 = await request(app)
      .get("/product")
      .send()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response3.status).toBe(200);
    expect(response3.body.products.length).toBe(2);
    expect(response3.body.products[0].name).toBe("Product 1");
    expect(response3.body.products[1].name).toBe("Product 2");
    expect(response3.body.products[0].price).toBe(10);
    expect(response3.body.products[1].price).toBe(20);
    expect(response3.body.products[0].id).toBeDefined();
    expect(response3.body.products[1].id).toBeDefined();
  });
});
