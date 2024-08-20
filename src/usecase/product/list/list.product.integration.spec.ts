import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 20);
    const product3 = new Product("789", "Product 3", 30);
    await productRepository.create(product1);
    await productRepository.create(product2);
    await productRepository.create(product3);
    const usecase = new ListProductUseCase(productRepository);
    const output = await usecase.execute();
    expect(output.products.length).toBe(3);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[2].id).toBe(product3.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[2].name).toBe(product3.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].price).toBe(product2.price);
    expect(output.products[2].price).toBe(product3.price);
  });
});
